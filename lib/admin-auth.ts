import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scrypt = promisify(scryptCb);

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_PATH = path.join(DATA_DIR, ".admin.json");
const SESSIONS_PATH = path.join(DATA_DIR, ".sessions.json");

const SESSION_COOKIE = "ks_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 saat

type AdminStore = { passwordHash: string; createdAt: string };
type Sessions = Record<string, { createdAt: number }>;

async function readJson<T>(p: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(p, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  return scrypt(password, salt, 64).then(
    (buf) => `${salt}:${(buf as Buffer).toString("hex")}`,
  );
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const buf = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  if (buf.length !== expected.length) return false;
  return timingSafeEqual(buf, expected);
}

/** İlk kurulum yapıldı mı? */
export async function isAdminSetup(): Promise<boolean> {
  const store = await readJson<AdminStore | null>(ADMIN_PATH, null);
  return store !== null;
}

/** İlk kurulum: şifre belirle + oturum aç. */
export async function setupAdmin(password: string): Promise<{ ok: boolean; error?: string }> {
  if (await isAdminSetup()) return { ok: false, error: "Admin zaten kurulu." };
  if (password.length < 8) return { ok: false, error: "Şifre en az 8 karakter olmalı." };
  const passwordHash = await hashPassword(password);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    ADMIN_PATH,
    JSON.stringify({ passwordHash, createdAt: new Date().toISOString() }, null, 2),
    "utf-8",
  );
  await createSession();
  return { ok: true };
}

async function createSession(): Promise<string> {
  const sessions = await readJson<Sessions>(SESSIONS_PATH, {});
  const now = Date.now();
  // süresi dolmuşları temizle
  for (const [k, v] of Object.entries(sessions)) {
    if (now - v.createdAt > SESSION_TTL_MS) delete sessions[k];
  }
  const token = randomBytes(32).toString("hex");
  sessions[token] = { createdAt: now };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SESSIONS_PATH, JSON.stringify(sessions, null, 2), "utf-8");
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return token;
}

export async function loginAdmin(password: string): Promise<{ ok: boolean; error?: string }> {
  const store = await readJson<AdminStore | null>(ADMIN_PATH, null);
  if (!store) return { ok: false, error: "Admin henüz kurulmadı." };
  if (!(await verifyPassword(password, store.passwordHash))) {
    return { ok: false, error: "Hatalı şifre." };
  }
  await createSession();
  return { ok: true };
}

export async function logoutAdmin(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const sessions = await readJson<Sessions>(SESSIONS_PATH, {});
    delete sessions[token];
    await fs.writeFile(SESSIONS_PATH, JSON.stringify(sessions, null, 2), "utf-8").catch(() => {});
  }
  jar.delete(SESSION_COOKIE);
}

/** SERVER SIDE yetki kontrolü — tüm mutation'lar bunu çağırır. */
export async function requireAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const sessions = await readJson<Sessions>(SESSIONS_PATH, {});
  const s = sessions[token];
  if (!s) return false;
  if (Date.now() - s.createdAt > SESSION_TTL_MS) return false;
  return true;
}

import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { requireAdmin } from "@/lib/admin-auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
};

function sanitize(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(-80) || "image"
  );
}

/**
 * Admin dosya yükleme: PNG/JPG/WEBP, max 5MB, unique dosya adı.
 * NOT: public/uploads altına yazar. `next start` / VPS gibi kalıcı
 * filesystem'de persist olur; serverless/ephemeral dosya sistemlerinde
 * (örn. salt static export) kalıcı değildir — o durumda S3/R2 benzeri
 * harici storage'a taşınmalıdır.
 */
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Form okunamadı." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Sadece PNG, JPG ve WEBP desteklenir." },
      { status: 400 },
    );
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Dosya boyutu 0–5MB aralığında olmalı." },
      { status: 400 },
    );
  }

  const base = sanitize(file.name.replace(/\.[a-z0-9]+$/i, ""));
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}-${base}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

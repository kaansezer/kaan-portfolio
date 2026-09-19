"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLoginAction, adminSetupAction } from "@/lib/admin-actions";

export default function LoginForm({ mode }: { mode: "setup" | "login" }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r =
      mode === "setup" ? await adminSetupAction(password) : await adminLoginAction(password);
    setBusy(false);
    if (!r.ok) {
      setError(r.error ?? "İşlem başarısız.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <div>
        <label
          htmlFor="admin-password"
          className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted)]"
        >
          {mode === "setup" ? "YENİ ADMIN ŞİFRESİ (MİN 8 KARAKTER)" : "ADMIN ŞİFRESİ"}
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete={mode === "setup" ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-sm border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[15px] text-[var(--ink)]"
        />
      </div>
      {error && (
        <p role="alert" className="text-[14px] text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || password.length === 0}
        className="w-full rounded-sm bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#0b1512] transition-all hover:brightness-110 disabled:opacity-50"
      >
        {busy ? "Bekleyin..." : mode === "setup" ? "Kurulumu Tamamla" : "Giriş Yap"}
      </button>
    </form>
  );
}

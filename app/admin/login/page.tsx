import { redirect } from "next/navigation";
import { adminSetupState } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  if (await requireAdmin()) redirect("/admin");
  const setup = await adminSetupState();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5">
      <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--accent-ink)]">
        KS · REV-A — ADMIN
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)]">
        {setup ? "Admin Girişi" : "Admin Kurulumu"}
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">
        {setup
          ? "Devam etmek için admin şifrenizi girin."
          : "Henüz admin şifresi belirlenmedi. İlk kurulum için bir şifre oluşturun."}
      </p>
      <LoginForm mode={setup ? "login" : "setup"} />
    </main>
  );
}

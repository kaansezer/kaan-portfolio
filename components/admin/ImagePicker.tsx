"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

/** Upload (dosya seç) + URL girişi + önizleme. */
export default function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Yükleme başarısız.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Yükleme başarısız.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
        {label}
      </span>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/....png veya https://..."
          className="min-w-0 flex-1 rounded-sm border border-[var(--line)] bg-[var(--bg)] px-3 py-2 font-mono text-[12px] text-[var(--ink)]"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-[var(--line)] px-4 py-2 text-[13px] text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)] disabled:opacity-50"
        >
          {busy ? <Loader2 size={15} aria-hidden className="animate-spin" /> : <ImagePlus size={15} aria-hidden />}
          {busy ? "Yükleniyor" : "Dosya Seç"}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[13px] text-red-400">{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Seçili görsel önizleme"
          className="mt-2 max-h-36 rounded-sm border border-[var(--line)] object-contain"
        />
      )}
    </div>
  );
}

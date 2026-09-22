"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Eye, Plus, Save, Trash2 } from "lucide-react";
import { saveProjectAction, type ProjectInput } from "@/lib/admin-actions";
import {
  MEDIA_TYPES,
  SECTION_LAYOUTS,
  SECTION_TYPES,
  STATUS_OPTIONS,
  type CaseSectionType,
  type CaseStudyProject,
  type MediaType,
  type ProjectStatus,
  type ProjectStage,
} from "@/lib/case-study-types";
import ImagePicker from "./ImagePicker";
import ProjectDetail from "../ProjectDetail";

const TABS = ["GENERAL", "CASE STUDY", "TECH SPECS", "TAGS", "MEDIA", "CONTRIBUTION", "SEO"] as const;

type Draft = Omit<CaseStudyProject, "createdAt" | "updatedAt">;

function field(label: string, children: React.ReactNode) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const inputCls =
  "w-full rounded-sm border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[14px] text-[var(--ink)]";
const btnCls =
  "inline-flex items-center gap-2 rounded-sm border border-[var(--line)] px-4 py-2 text-[13px] text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]";

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

let uid = 0;
function uidOf(prefix: string) {
  uid += 1;
  return `${prefix}${Date.now().toString(36)}${uid}`;
}

export default function ProjectEditor({ initial }: { initial: Draft }) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [tab, setTab] = useState<(typeof TABS)[number]>("GENERAL");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError(null);
    const input: ProjectInput = {
      ...draft,
      slug: draft.slug ?? "",
      coverImage: draft.coverImage ?? "",
      thumbnail: draft.thumbnail ?? "",
      seoTitle: draft.seoTitle ?? "",
      seoDescription: draft.seoDescription ?? "",
      status: draft.status as ProjectInput["status"],
      specs: draft.specs.map((s, i) => ({ ...s, sortOrder: i + 1 })),
      sections: draft.sections.map((s, i) => ({ ...s, sortOrder: i + 1 })),
      media: draft.media.map((m, i) => ({ ...m, caption: m.caption ?? "", sortOrder: i + 1 })),
      pipeline: draft.pipeline ?? [],
      tags: draft.tags ?? [],
    };
    const r = await saveProjectAction(input);
    setSaving(false);
    if (!r.ok) {
      setError(r.error ?? "Kaydetme başarısız.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      {/* tab bar */}
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--line)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`relative shrink-0 px-4 py-3 font-mono text-[12px] tracking-[0.16em] transition-colors ${
              tab === t ? "text-[var(--accent-ink)]" : "text-[var(--muted)] hover:text-[var(--ink-dim)]"
            }`}
          >
            {t}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-px bg-[var(--accent)] ${tab === t ? "" : "hidden"}`}
            />
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {tab === "GENERAL" && (
          <>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                {field("PROJECT ID (ÖR. U1)", (
                  <input
                    value={draft.projectCode}
                    onChange={(e) => set("projectCode", e.target.value)}
                    className={`${inputCls} font-mono`}
                  />
                ))}
              </div>
              <div>
                {field("STATUS", (
                  <select
                    value={draft.status}
                    onChange={(e) => set("status", e.target.value as ProjectStatus)}
                    className={inputCls}
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
              <div>
                {field("SORT ORDER", (
                  <input
                    type="number"
                    value={draft.sortOrder}
                    onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
                    className={inputCls}
                  />
                ))}
              </div>
            </div>
            {field("TITLE", (
              <input value={draft.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
            ))}
            {field("SHORT DESCRIPTION", (
              <textarea
                value={draft.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                rows={2}
                className={inputCls}
              />
            ))}
            {field("LONG DESCRIPTION", (
              <textarea
                value={draft.longDescription}
                onChange={(e) => set("longDescription", e.target.value)}
                rows={3}
                className={inputCls}
              />
            ))}
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                {field("CATEGORY", (
                  <input value={draft.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Avionics" />
                ))}
              </div>
              <div>
                {field("TEAM / ORGANIZATION", (
                  <input value={draft.organization} onChange={(e) => set("organization", e.target.value)} className={inputCls} />
                ))}
              </div>
              <div>
                {field("DATE / YEAR", (
                  <input value={draft.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <ImagePicker label="COVER IMAGE" value={draft.coverImage ?? ""} onChange={(v) => set("coverImage", v || undefined)} />
              <ImagePicker label="THUMBNAIL" value={draft.thumbnail ?? ""} onChange={(v) => set("thumbnail", v || undefined)} />
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="inline-flex cursor-pointer items-center gap-2 text-[14px] text-[var(--ink-dim)]">
                <input type="checkbox" checked={draft.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-[#dc8b32]" />
                Featured
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-[14px] text-[var(--ink-dim)]">
                <input type="checkbox" checked={draft.visible} onChange={(e) => set("visible", e.target.checked)} className="h-4 w-4 accent-[#dc8b32]" />
                Visible (yayında)
              </label>
            </div>
            <div className="rounded-sm border border-[var(--line-soft)] p-4">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
                DEVELOPMENT PIPELINE (OPSİYONEL)
              </p>
              <div className="mt-3 space-y-2">
                {(draft.pipeline ?? []).map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={s.label}
                      onChange={(e) =>
                        set("pipeline", (draft.pipeline ?? []).map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                      }
                      className={`${inputCls} font-mono text-[12px]`}
                    />
                    <select
                      value={s.state}
                      onChange={(e) =>
                        set("pipeline", (draft.pipeline ?? []).map((x, j) => (j === i ? { ...x, state: e.target.value as ProjectStage["state"] } : x)))
                      }
                      className={`${inputCls} w-32`}
                    >
                      <option value="done">✓ done</option>
                      <option value="active">● active</option>
                      <option value="todo">○ todo</option>
                    </select>
                    <button
                      type="button"
                      aria-label="Aşamayı sil"
                      onClick={() => set("pipeline", (draft.pipeline ?? []).filter((_, j) => j !== i))}
                      className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] hover:text-red-400"
                    >
                      <Trash2 size={14} aria-hidden />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set("pipeline", [...(draft.pipeline ?? []), { label: "STAGE", state: "todo" as const }])}
                  className={btnCls}
                >
                  <Plus size={14} aria-hidden /> Aşama Ekle
                </button>
              </div>
            </div>
          </>
        )}

        {tab === "CASE STUDY" && (
          <div className="space-y-4">
            {draft.sections.map((s, i) => (
              <div key={s.id} className="rounded-sm border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] text-[var(--accent-ink)]">{i + 1}</span>
                  <select
                    value={s.type}
                    onChange={(e) =>
                      set("sections", draft.sections.map((x, j) => (j === i ? { ...x, type: e.target.value as CaseSectionType } : x)))
                    }
                    className={`${inputCls} w-44 font-mono text-[12px]`}
                    aria-label="Bölüm tipi"
                  >
                    {SECTION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {s.type === "custom" && (
                    <input
                      value={s.title}
                      onChange={(e) =>
                        set("sections", draft.sections.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))
                      }
                      placeholder="Örn. EMI / EMC"
                      className={`${inputCls} min-w-40 flex-1`}
                      aria-label="Özel başlık"
                    />
                  )}
                  <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[13px] text-[var(--muted)]">
                    <input
                      type="checkbox"
                      checked={s.visible}
                      onChange={(e) =>
                        set("sections", draft.sections.map((x, j) => (j === i ? { ...x, visible: e.target.checked } : x)))
                      }
                      className="h-4 w-4 accent-[#dc8b32]"
                    />
                    Görünür
                  </label>
                  <button type="button" aria-label="Yukarı taşı" onClick={() => set("sections", move(draft.sections, i, -1))} className="rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowUp size={14} aria-hidden />
                  </button>
                  <button type="button" aria-label="Aşağı taşı" onClick={() => set("sections", move(draft.sections, i, 1))} className="rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowDown size={14} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Bölümü sil"
                    onClick={() => {
                      if (window.confirm("Bu bölüm silinsin mi?")) {
                        set("sections", draft.sections.filter((_, j) => j !== i));
                      }
                    }}
                    className="rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-red-400"
                  >
                    <Trash2 size={14} aria-hidden />
                  </button>
                </div>
                <textarea
                  value={s.content}
                  onChange={(e) =>
                    set("sections", draft.sections.map((x, j) => (j === i ? { ...x, content: e.target.value } : x)))
                  }
                  rows={5}
                  placeholder="Markdown: **kalın**, *italik*, # başlık, - liste, [link](https://...)"
                  className={`${inputCls} mt-3 font-mono text-[13px] leading-relaxed`}
                />
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ImagePicker
                    label="BÖLÜM GÖRSELİ (OPSİYONEL)"
                    value={s.image ?? ""}
                    onChange={(v) =>
                      set("sections", draft.sections.map((x, j) => (j === i ? { ...x, image: v || undefined } : x)))
                    }
                  />
                  <div>
                    {field("CAPTION", (
                      <input
                        value={s.caption ?? ""}
                        onChange={(e) =>
                          set("sections", draft.sections.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)))
                        }
                        className={inputCls}
                      />
                    ))}
                  </div>
                </div>
                {s.image && (
                  <div className="mt-3">
                    {field("YERLEŞİM (GÖRSEL VARSA)", (
                      <select
                        value={s.layout ?? "text-image"}
                        onChange={(e) =>
                          set("sections", draft.sections.map((x, j) => (j === i ? { ...x, layout: e.target.value as typeof x.layout } : x)))
                        }
                        className={`${inputCls} max-w-xs font-mono text-[12px]`}
                      >
                        {SECTION_LAYOUTS.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                set("sections", [
                  ...draft.sections,
                  { id: uidOf("sec"), type: "overview" as const, title: "", content: "", visible: true, sortOrder: draft.sections.length + 1 },
                ])
              }
              className={btnCls}
            >
              <Plus size={14} aria-hidden /> Bölüm Ekle
            </button>
          </div>
        )}

        {tab === "TECH SPECS" && (
          <div className="space-y-2">
            {draft.specs.map((s, i) => (
              <div key={s.id} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                <input
                  value={s.label}
                  onChange={(e) => set("specs", draft.specs.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  placeholder="LABEL"
                  aria-label="Özellik adı"
                  className={`${inputCls} font-mono text-[12px]`}
                />
                <input
                  value={s.value}
                  onChange={(e) => set("specs", draft.specs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
                  placeholder="VALUE"
                  aria-label="Özellik değeri"
                  className={inputCls}
                />
                <div className="flex items-center gap-1">
                  <button type="button" aria-label="Yukarı taşı" onClick={() => set("specs", move(draft.specs, i, -1))} className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowUp size={14} aria-hidden />
                  </button>
                  <button type="button" aria-label="Aşağı taşı" onClick={() => set("specs", move(draft.specs, i, 1))} className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowDown size={14} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Özelliği sil"
                    onClick={() => set("specs", draft.specs.filter((_, j) => j !== i))}
                    className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] hover:text-red-400"
                  >
                    <Trash2 size={14} aria-hidden />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("specs", [...draft.specs, { id: uidOf("spec"), label: "", value: "", sortOrder: draft.specs.length + 1 }])}
              className={btnCls}
            >
              <Plus size={14} aria-hidden /> Teknik Özellik Ekle
            </button>
          </div>
        )}

        {tab === "TAGS" && (
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
              TEKNOLOJİLER / ETİKETLER
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(draft.tags ?? []).map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-sm border border-[var(--line)] bg-[var(--panel)] py-1.5 pl-3 pr-1.5 font-mono text-[12px] text-[var(--ink-dim)]"
                >
                  {t}
                  <button
                    type="button"
                    aria-label={`${t} etiketini sil`}
                    onClick={() => set("tags", (draft.tags ?? []).filter((_, j) => j !== i))}
                    className="rounded-sm p-0.5 text-[var(--muted)] hover:text-red-400"
                  >
                    <Trash2 size={12} aria-hidden />
                  </button>
                </span>
              ))}
            </div>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("newTag") as HTMLInputElement;
                const v = input.value.trim();
                if (v && !(draft.tags ?? []).includes(v)) {
                  set("tags", [...(draft.tags ?? []), v]);
                }
                input.value = "";
              }}
            >
              <input
                name="newTag"
                placeholder="Örn. STM32, FreeRTOS, CAN"
                aria-label="Yeni etiket"
                className={`${inputCls} max-w-xs font-mono text-[12px]`}
              />
              <button type="submit" className={btnCls}>
                <Plus size={14} aria-hidden /> Ekle
              </button>
            </form>
          </div>
        )}

        {tab === "MEDIA" && (
          <div className="space-y-4">
            {draft.media.map((m, i) => (
              <div key={m.id} className="rounded-sm border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={m.type}
                    onChange={(e) =>
                      set("media", draft.media.map((x, j) => (j === i ? { ...x, type: e.target.value as MediaType } : x)))
                    }
                    className={`${inputCls} w-40 font-mono text-[12px]`}
                    aria-label="Medya tipi"
                  >
                    {MEDIA_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <button type="button" aria-label="Yukarı taşı" onClick={() => set("media", move(draft.media, i, -1))} className="rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowUp size={14} aria-hidden />
                  </button>
                  <button type="button" aria-label="Aşağı taşı" onClick={() => set("media", move(draft.media, i, 1))} className="rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-[var(--ink)]">
                    <ArrowDown size={14} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Medyayı sil"
                    onClick={() => {
                      if (window.confirm("Bu görsel silinsin mi?")) {
                        set("media", draft.media.filter((_, j) => j !== i));
                      }
                    }}
                    className="ml-auto rounded-sm border border-[var(--line)] p-1.5 text-[var(--muted)] hover:text-red-400"
                  >
                    <Trash2 size={14} aria-hidden />
                  </button>
                </div>
                <div className="mt-3">
                  <ImagePicker label="GÖRSEL" value={m.image} onChange={(v) => set("media", draft.media.map((x, j) => (j === i ? { ...x, image: v } : x)))} />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    {field("TITLE", (
                      <input value={m.title} onChange={(e) => set("media", draft.media.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} className={inputCls} />
                    ))}
                  </div>
                  <div>
                    {field("CAPTION", (
                      <input value={m.caption ?? ""} onChange={(e) => set("media", draft.media.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)))} className={inputCls} />
                    ))}
                  </div>
                  <div>
                    {field("ALT", (
                      <input value={m.alt} onChange={(e) => set("media", draft.media.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} className={inputCls} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                set("media", [
                  ...draft.media,
                  { id: uidOf("med"), type: "photo" as const, image: "", title: "", caption: "", alt: "", sortOrder: draft.media.length + 1 },
                ])
              }
              className={btnCls}
            >
              <Plus size={14} aria-hidden /> Görsel Ekle
            </button>
          </div>
        )}

        {tab === "CONTRIBUTION" && (
          <div className="space-y-2">
            {draft.contributions.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={c}
                  onChange={(e) => set("contributions", draft.contributions.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder="- PCB layout"
                  aria-label={`Katkı ${i + 1}`}
                  className={inputCls}
                />
                <button
                  type="button"
                  aria-label="Katkıyı sil"
                  onClick={() => set("contributions", draft.contributions.filter((_, j) => j !== i))}
                  className="rounded-sm border border-[var(--line)] p-2 text-[var(--muted)] hover:text-red-400"
                >
                  <Trash2 size={14} aria-hidden />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set("contributions", [...draft.contributions, ""])} className={btnCls}>
              <Plus size={14} aria-hidden /> Katkı Ekle
            </button>
          </div>
        )}

        {tab === "SEO" && (
          <>
            {field("SEO TITLE (OPSİYONEL)", (
              <input value={draft.seoTitle ?? ""} onChange={(e) => set("seoTitle", e.target.value || undefined)} className={inputCls} />
            ))}
            {field("SEO DESCRIPTION (OPSİYONEL)", (
              <textarea value={draft.seoDescription ?? ""} onChange={(e) => set("seoDescription", e.target.value || undefined)} rows={3} className={inputCls} />
            ))}
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-5 text-[14px] text-red-400">
          {error}
        </p>
      )}

      <div className="sticky bottom-0 mt-8 flex flex-wrap gap-3 border-t border-[var(--line)] bg-[var(--bg)] py-4">
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[#0b1512] transition-all hover:brightness-110 disabled:opacity-50"
        >
          <Save size={15} aria-hidden />
          {saving ? "Kaydediliyor..." : "Kaydet / Yayınla"}
        </button>
        <button type="button" onClick={() => setPreview(true)} className={btnCls}>
          <Eye size={15} aria-hidden /> Önizleme
        </button>
      </div>

      {/* Önizleme: yayındaki proje sayfasıyla AYNI ProjectDetail bileşeni —
          ayrı bir "sahte admin tasarımı" yok, yalnızca kapatılabilir bir
          tam ekran katman içinde render edilir (admin panelinden ayrılmadan). */}
      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Proje önizlemesi"
          className="fixed inset-0 z-[200] overflow-y-auto bg-[var(--bg)]"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--header-bg)] px-5 py-3 backdrop-blur-md md:px-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-ink)]">
              ÖNİZLEME — YAYINDA DEĞİL
            </p>
            <button
              type="button"
              onClick={() => setPreview(false)}
              className={btnCls}
            >
              Önizlemeyi Kapat
            </button>
          </div>
          <ProjectDetail
            project={{
              ...draft,
              id: draft.id || "preview",
              slug: draft.slug?.trim() || (draft.title ? draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "preview"),
              tags: draft.tags ?? [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
            onBack={() => setPreview(false)}
          />
        </div>
      )}
    </div>
  );
}

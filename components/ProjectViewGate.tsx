"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ProjectNavContext } from "./ProjectNavContext";
import ProjectDetail from "./ProjectDetail";
import type { CaseStudyProject } from "@/lib/case-study-types";

function paramOf(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("project");
}

/** Bir sonraki paint'ten SONRA çalışır — keyfi setTimeout yerine çift rAF:
    DOM'un commit olduğunu ve tarayıcının layout'u gerçekten uyguladığını
    garanti eden deterministik yol. */
function afterNextPaint(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}

/**
 * Navbar'ın hemen altını yönetir: geçerli bir ?project=slug varsa TAM SAYFA
 * case-study görünümünü (ProjectDetail), yoksa normal anasayfa içeriğini
 * (children) render eder. Modal/overlay YOK — tek scroll container.
 *
 * KRİTİK: `active` (geçerli slug'a karşılık gelen proje) tek doğruluk
 * kaynağıdır. Render her zaman ikisinden BİRİNİ döner — asla ikisi de değil,
 * asla hiçbiri değil. Geçersiz/bulunamayan bir slug, sessizce anasayfaya
 * düşer (boş sayfa yerine) ve URL'deki parametre temizlenir.
 *
 * URL state (?project=slug) ve tarayıcı geri tuşu korunur: CaseStudyList
 * artık kendi state'ini tutmuyor, kart tıklaması `useProjectNav().openProject`
 * ile buraya bildiriliyor (bkz. ProjectNavContext).
 */
export default function ProjectViewGate({
  projects,
  children,
}: {
  projects: CaseStudyProject[];
  children: ReactNode;
}) {
  const [slug, setSlug] = useState<string | null>(() => {
    const initial = paramOf();
    return initial && projects.some((p) => p.slug === initial) ? initial : null;
  });
  const [pushedByUs, setPushedByUs] = useState(false);
  // Proje görünümünden ana sayfaya GERÇEKTEN dönüldüğünde true olur —
  // ilk yüklemede (hiç proje hiç açılmamışken) yanlışlıkla #projeler'e
  // kaydırma yapılmasını engeller.
  const wasShowingProjectRef = useRef(false);

  // Tarayıcının native scroll restoration'ı bu SPA-tarzı durum değişimiyle
  // (aynı doküman, aynı URL kökü, çok farklı içerik/yükseklik) çakışıyor:
  // "geri" gidince eski, artık anlamsız bir scrollY'ye zıplıyor ve Hero'nun
  // scroll-scrub tasarımı o noktada metni henüz göstermediği için sayfa
  // "boşmuş" gibi görünüyordu. Kontrolü tamamen kendimiz üstleniyoruz.
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  const openProject = useCallback((s: string) => {
    setSlug(s);
    setPushedByUs(true);
    window.history.pushState({ project: s }, "", `?project=${s}`);
    window.scrollTo(0, 0);
  }, []);

  const closeProject = useCallback(() => {
    if (pushedByUs) {
      setPushedByUs(false);
      window.history.back();
    } else {
      setSlug(null);
    }
  }, [pushedByUs]);

  // geri/ileri tuşu
  useEffect(() => {
    const onPop = () => setSlug(paramOf());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const active = projects.find((p) => p.slug === slug) ?? null;
  const showingProject = active !== null;

  // Geçersiz/bulunamayan slug (veya kapatma) → URL'de parametre kalmasın.
  useEffect(() => {
    if (showingProject) return;
    if (paramOf()) window.history.replaceState(null, "", window.location.pathname);
  }, [showingProject]);

  // Proje görünümünden ana sayfaya dönüşü izle: Projeler bölümü DOM'a
  // GERÇEKTEN commit olduktan sonra (bir sonraki paint'ten sonra) oraya
  // kaydır — hem "PROJELERE DÖN" tıklaması hem tarayıcı geri tuşu için
  // aynı yol, çünkü ikisi de aynı `slug`/`active` state'ini günceller.
  useEffect(() => {
    if (showingProject) {
      wasShowingProjectRef.current = true;
      return;
    }
    if (!wasShowingProjectRef.current) return;
    wasShowingProjectRef.current = false;
    afterNextPaint(() => {
      // `behavior: "instant"` KASITLI: site genelinde `scroll-behavior: smooth`
      // var (globals.css), bu da normal `scrollIntoView()`'ı ~1sn'lik bir
      // animasyona çeviriyor — sonuçta doğru yere varıyor ama o saniye
      // boyunca ekran, sayfanın ortasından geçtiği için "boşmuş" gibi
      // görünüyordu. Bu bir state RESTORATION'ı, sayfa içi navigasyon değil;
      // anında olmalı.
      document.getElementById("projeler")?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }, [showingProject]);

  return (
    <ProjectNavContext.Provider value={{ openProject }}>
      {active ? <ProjectDetail project={active} onBack={closeProject} /> : children}
    </ProjectNavContext.Provider>
  );
}

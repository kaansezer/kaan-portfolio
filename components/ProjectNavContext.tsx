"use client";

import { createContext, useContext } from "react";

type ProjectNav = { openProject: (slug: string) => void };

export const ProjectNavContext = createContext<ProjectNav | null>(null);

/** Proje kartından detay sayfasını açmak için — bkz. ProjectViewGate. */
export function useProjectNav(): ProjectNav {
  const ctx = useContext(ProjectNavContext);
  if (!ctx) throw new Error("useProjectNav must be used within ProjectViewGate");
  return ctx;
}

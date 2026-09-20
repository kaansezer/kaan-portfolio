import type { Metadata } from "next";

/** Panel hiçbir arama motorunda ve link önizlemesinde görünmesin. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

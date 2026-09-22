import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Public_Sans } from "next/font/google";
import { profile, site } from "@/data/portfolio";
import "./globals.css";

// latin-ext şart: ş ğ ı İ Ş Ğ bu alt kümede; onsuz Türkçe karakterler
// yedek fonta düşer ve satır içinde karışık tipografi görünür.
// (next/font alt küme listesini derleme anında okur — değişken/spread kabul etmez.)

/** Başlık (display) — hero h1 ve .font-display kullananlar. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Teknik etiket / nav / buton. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Gövde metni. */
const publicSans = Public_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const TITLE = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  // Göreli og:image / canonical URL'lerin mutlak hale gelmesi için şart.
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: site.url,
    siteName: `${profile.name} · Portfolyo`,
    title: TITLE,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#031b17" },
    { media: "(prefers-color-scheme: light)", color: "#efece1" },
  ],
};

/** FOUC önleme: kayıtlı/varsayılan temayı ilk boyamadan önce uygula. */
const themeInit = `(function(){try{var t=localStorage.getItem("ks-theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.classList.remove("dark","light");document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${publicSans.variable} ${jetbrainsMono.variable} ${fraunces.variable} min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

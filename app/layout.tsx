import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaan Sezer — Elektrik-Elektronik Mühendisi",
  description:
    "STM32/ARM tabanlı gömülü sistemler, çok katmanlı PCB tasarımı ve aviyonik uygulamalar. Kaan Sezer portfolyo.",
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

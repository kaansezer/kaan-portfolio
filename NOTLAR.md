# Portfolyo Sistem Notları (kaansezer.com)

## Teknoloji
- Next.js 16.3.5 (App Router), React 19, TypeScript, Tailwind v4, framer-motion, lucide-react, react-markdown, zod
- AGENTS.md: Next.js sürümü yeni; kod yazmadan önce node_modules/next/dist/docs/ okunmalı

## Yapı
- app/: layout.tsx, page.tsx (tek sayfa: Hero, Deneyim, Projeler, Eğitim, Yetenekler, İletişim), admin/ (login, projects), api/admin/upload
- components/: bölüm bileşenleri, CaseStudyModal/List, ThemeToggle, HeroPCBExploded; components/admin/ (ProjectEditor, ImagePicker, LoginForm, AdminProjectList)
- data/portfolio.ts: profil, nav, deneyim, eğitim, yetenekler (sabit içerik, Türkçe)
- data/projects.json: proje/case study verisi (DB yok, dosya tabanlı)
- lib/: projects-store.ts (JSON okuma/yazma), admin-auth.ts (scrypt şifre, data/.admin.json + .sessions.json, cookie ks_admin_session, 12 saat), admin-actions.ts, case-study-types.ts

## Admin paneli
- /admin: giriş + proje CRUD + görsel yükleme; veriler dosyaya yazılır → sunucuda kalıcı disk gerekir (Vercel serverless'a uygun değil)

## Deploy
- Kendi VPS: PM2 (deploy/ecosystem.config.js, /var/www/kaan, port 3000) + Nginx reverse proxy (deploy/nginx-kaan.conf, kaansezer.com, client_max_body_size 10m) + certbot SSL

## Komutlar
npm run dev | build | start | lint

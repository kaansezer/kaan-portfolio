# Project Map: Kaan Sezer Portfolio

## Tech Stack
- **Framework**: Next.js 16.3.5 (App Router)
- **UI**: React 19.2.8 with TypeScript 5
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Animation**: Framer Motion 13.3.0
- **Icons**: Lucide React 1.46.0
- **Markdown**: react-markdown 10.1.0
- **Validation**: Zod 4.6.5

## Key Directories
```
app/                       # App Router pages & root layout
├── layout.tsx            # Metadata, fonts (Fraunces, Public Sans, JetBrains Mono)
├── page.tsx              # Home (main portfolio)
├── robots.ts             # robots.txt
├── sitemap.ts            # sitemap.xml
├── opengraph-image.tsx   # Dynamic OG image
└── admin/                # Admin panel
    ├── layout.tsx
    └── page.tsx

components/               # React components
├── Hero.tsx              # Hero section (main entry)
├── HeroPCBExploded.tsx   # PCB exploded view
├── hero/                 # Hero sub-components
│   ├── BoardStack.tsx    # Scroll-driven PCB stack
│   ├── useHeroScroll.ts  # Scroll detection hook
│   └── config.ts         # Hero animation config
├── Header.tsx            # Nav + theme toggle
├── Experience.tsx        # Work experience section
├── Projects.tsx          # Portfolio projects list
├── CaseStudyList.tsx     # Project cards
├── CaseStudyModal.tsx    # Project modal overlay
├── ProjectMediaTabs.tsx  # Media tabs in modal
├── Skills.tsx            # Skills grid
├── Education.tsx         # Education section
├── Contact.tsx           # Contact section
├── Reveal.tsx            # Scroll-reveal wrapper
├── ThemeToggle.tsx       # Dark/light theme switcher
└── [utility components]

data/                     # Content & config
├── portfolio.ts          # Site/profile metadata, skills, education
└── projects.json         # Project data (CMS store)

lib/                      # Utilities
├── admin-auth.ts         # Admin auth logic
├── admin-actions.ts      # Server actions
├── projects-store.ts     # Project data persistence
└── case-study-types.ts   # TypeScript types

app/globals.css           # Design tokens & animations
```

## Pages & Routes
- `/` — Home (Hero, Experience, Projects, Skills, Education, Contact)
- `/admin` — Admin panel (login, project editor)

## Design System

### Colors (CSS Custom Properties)
**Dark (default & .dark)**
- `--bg: #031b17` (main background)
- `--bg-deep: #02120f`
- `--panel: #06241e`, `--panel-soft: #0a2b24`
- `--accent: #dc8b32` (orange/warm)
- `--ink: #e7e3d8` (main text)
- Hero-specific: `--hero-bg`, `--hero-accent`, `--hero-glow`

**Light (.light)**
- `--bg: #efece1` (warm ivory)
- Same accent/token structure for light mode

### Typography
- **Display**: Fraunces (serif) — headings
- **Body**: Public Sans — default text
- **Mono**: JetBrains Mono — technical labels, nav

### Animations
- Scroll-driven hero stack (JavaScript-based)
- Hero floating card: `animate-hero-float` (8s loop)
- Scroll indicator dot: `scroll-dot` (2.4s loop)
- Reduced motion: respected globally

### Key Classes
- `.tech-grid` — subtle grid overlay
- `.hero-grid` — larger grid for hero
- `.hero-glow` — radial glow (top-right)
- `.hero-stack` — scale factor for PCB stack (`--k` scales by viewport)

## Important Components

### Hero System
- `Hero.tsx` — main wrapper
- `HeroPCBExploded.tsx` — 3D PCB exploded view
- `BoardStack.tsx` — scroll-driven stack animation
- `useHeroScroll.ts` — scroll velocity & position tracking

### Sections
- `Experience.tsx` — CV-style work history
- `Projects.tsx` — project showcase intro
- `CaseStudyList.tsx` → `CaseStudyModal.tsx` — project details & media

### Admin
- Login form → auth token
- Project editor with image picker
- Local JSON store (`projects.json`)

## Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint
```

## Entry Points
- **Server**: `app/layout.tsx` (metadata, fonts)
- **Page**: `app/page.tsx` (Home)
- **Admin**: `app/admin/page.tsx` (Protected)

## Key Files to Know
- `app/globals.css` — All design tokens & animations
- `data/portfolio.ts` — Metadata & content (update for SEO, bio, skills)
- `components/Hero.tsx` — Hero state & scroll logic
- `app/layout.tsx` — Fonts & metadata setup

## Known Quirks
- Fonts subset to `latin-ext` for Turkish characters (ş, ğ, ı, İ)
- Hero stack scaling: `.hero-stack --k` varies by viewport
- Scroll hint only shows on wide (≥1280px) & tall (≥820px) screens
- Admin store is JSON file; no database

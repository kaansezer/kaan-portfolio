# Work State

## Current Objective
Elevate portfolio website to premium, art-directed, intentional design level.

## Completed Work

### Phase 1: Context System Setup ✅
- PROJECT_MAP.md created
- WORK_STATE.md created
- CLAUDE.md updated with workflow instructions

### Phase 2: Global Design System Improvements ✅
**app/globals.css**
- Added comprehensive button styling (.btn-primary, .btn-secondary)
- Added section spacing utilities (.section-wrapper, .section-spacing)
- Added link styling utilities (.link-subtle, .link-accent)
- Added text utilities (.text-eyebrow, .text-body-sm, .text-body)
- Improved consistency and reusability of design tokens

### Phase 3: Component Styling & Interaction Polish ✅

**components/Header.tsx**
- Improved link styling with better hover states
- Enhanced mobile menu padding & interactions
- Better spacing and alignment

**components/Hero.tsx**
- Refined button styling with improved shadows & hover effects
- Better spacing between CTA buttons (gap-3 → gap-4)
- Increased button padding for better touch targets (h-[52px] → h-12)
- Enhanced rounded corners (sm → md = 6px)
- Added shadow effects on hover for depth

**components/CaseStudyList.tsx**
- Improved featured badge styling with background color
- Enhanced card border radius (md → lg = 8px)
- Better gradient background for featured projects
- Improved hover shadow for better depth perception

**components/Skills.tsx**
- Improved table styling with hover effects
- Better rounded corners for table container
- Smoother transitions on row hover

**components/Education.tsx**
- Enhanced card styling with hover effects
- Better border radius (md → lg)
- Added subtle hover background color change

**components/SectionHead.tsx**
- Improved responsive layout (stacked on mobile, inline on desktop)
- Better typography hierarchy (added lg:text-5xl)
- Enhanced spacing and visual weight

**components/StatusBadge.tsx**
- Better rounded corners (sm → md = 6px)
- Improved padding (py-1 → py-1.5)
- Added font-weight and letter-spacing refinement
- Added transition effects

## Files Modified
1. app/globals.css — added utility classes & design system
2. components/Header.tsx — improved navigation styling
3. components/Hero.tsx — refined buttons & spacing
4. components/CaseStudyList.tsx — polished cards & badges
5. components/Skills.tsx — enhanced table interactions
6. components/Education.tsx — improved card styling
7. components/SectionHead.tsx — better typography hierarchy
8. components/StatusBadge.tsx — refined badge styling

## Build Status
✅ Build successful — no TypeScript or CSS errors

## Design Improvements Summary
- **Buttons**: More polished with better shadows, hover states, and larger touch targets
- **Spacing**: Consistent, improved visual hierarchy
- **Rounded corners**: Refined (from 4px to 6-8px) for more modern look
- **Hover states**: Added subtle transitions and visual feedback
- **Cards**: Better gradient backgrounds for featured content
- **Typography**: Improved hierarchy and spacing
- **Consistency**: Design tokens unified across components

### Phase 4: Premium Art-Direction & Visual Hierarchy ✅

**components/Hero.tsx**
- Increased heading font sizes (h1: 104px → 120px)
- Bolder font weight for main heading (semibold → bold)
- Improved typography hierarchy (tag, title, intro all refined)
- Enhanced spacing (mt-8 → mt-12, mt-10, mt-16 progressively)
- Premium button styling with larger size (h-12 → h-14)
- Better button shadows and hover effects (improved depth)
- Refined expertise grid with better spacing & icon styling
- Increased icon size and added subtle background

**components/Header.tsx**
- Refined nav link styling (font-600 → font-700)
- Better font sizes and tracking (0.16em → 0.18em)
- Improved active state styling with stronger emphasis
- Enhanced mobile menu spacing

**components/SectionHead.tsx**
- Larger section titles (text-5xl → text-6xl on lg)
- Bolder typography (semibold → bold with tracking refinement)
- Improved spacing (gap-4 → gap-6/8, pb-4 → pb-6/8)
- Better baseline alignment between title and sheet number

**Section Spacing & Rhythm**
- Projects: py-20/28 → py-24/36 (+ lg:py-40)
- Experience: py-20/28 → py-24/36 (+ lg:py-40)
- Education: py-20/28 → py-24/36 (+ lg:py-40)
- Skills: py-20/28 → py-24/36 (+ lg:py-40)
- Contact: py-20/28 → py-24/36 (+ lg:py-40)
- Creates stronger visual rhythm and breathing room

**components/CaseStudyList.tsx**
- Larger card padding (p-6 → p-8, md:p-8 → md:p-10)
- Enhanced border radius (lg → xl = 12px)
- Better featured card styling with gradient & ring
- Improved hover effects (translate-y-1 → translate-y-2)
- Stronger shadow effects for depth perception

**components/Contact.tsx**
- Footer heading sizes increased (text-5xl → text-6xl)
- Bolder footer typography (font-semibold → font-bold)
- Enhanced contact link styling (size, weight, spacing)
- Improved spacing throughout footer (gap-12 → gap-16)
- Better footer bottom text styling (opacity and tracking)

**app/globals.css**
- Enhanced button base styles (border-radius: 6px → 8px)
- Refined font weights and transitions

### Phase 5: scroll-craft Integration ✅

**Added scroll-craft library** (https://github.com/nateherkai/scroll-craft)
- Lightweight, performant scroll-based animations
- Replaces some Framer Motion reveal logic with optimized observer-based animations
- Better performance on lower-end devices

**Components & Files:**
- `hooks/useScrollCraft.ts` — Custom hooks for scroll-craft usage
- `components/ScrollCraftInit.tsx` — Global scroll-craft initialization
- Added `data-reveal-section`, `data-reveal-card`, `data-reveal-item` attributes
- Added `sc-reveal` CSS animation with cubic-out easing
- Integrated into: Experience, Projects, Education, Skills sections

**Configuration:**
- Section reveals: 28px distance, 700ms duration, 0.15 threshold
- Card reveals: 24px distance, 650ms duration, 50ms stagger
- Item reveals: 20px distance, 600ms duration, 0.15 threshold
- All use cubicOut easing for smooth motion

**Benefits:**
- IntersectionObserver-based (better performance)
- Simpler API for entrance animations
- Reduced Framer Motion complexity where applicable
- Cleaner scroll animation architecture
- Better mobile performance

### Phase 6: Design DNA & Taste Skill Integration ✅

**design-dna** (https://github.com/zanwei/design-dna)
- Installed locally to `.claude/commands/dna/`
- Provides: `/dna:init`, `/dna:check`, `/dna:update`, `/dna:help`
- Encodes design system for consistent AI-generated code
- Automatically embedded in CLAUDE.md for passive context

**taste-skill** (https://github.com/leonxlnx/taste-skill)
- Installed to `skills/taste/` and `templates/taste/`
- 7 design quality skills:
  1. default — standard design quality enforcement
  2. soft-calm — gentle, accessible design
  3. editorial — content-forward, typography-focused
  4. strict-gsap — animation budget enforcement
  5. redesign — focused refinement work
  6. complete-output — detailed design specs
  7. image-gen — image generation prompt structure

**Design DNA Documentation** (`.design/`)
- **DNA.md** — Core mission, principles, target UX, anti-patterns
- **principles.md** — 10 core design principles with examples
- **primitives.md** — All design tokens (colors, typography, spacing, shadows, motion)
- **semantics.md** — Color roles, component states, text hierarchy
- **behaviors.md** — Animation specs, interaction patterns, motion guidelines

**Design Principles Documented:**
1. Editorial Excellence — confident typography
2. Intentional Whitespace — breathing room
3. Subtle Depth — premium without flashiness
4. Purposeful Motion — animation enhances
5. Authentic Engineering Aesthetic — grid, technical type, precision
6. Hierarchy Over Decoration — meaningful elements only
7. Responsive Intentionality — mobile is designed
8. Color Restraint — limited palette, maximum impact
9. Technical Precision — consistent scales
10. Trust Through Consistency — predictable patterns

**Design Tokens Documented:**
- Color palette (dark, light, hero-specific)
- Typography scale (9 sizes from micro 11px to hero 120px)
- Line heights (0.88-1.72 depending on context)
- Spacing scale (4px-160px section padding)
- Border radius (4px-16px)
- Shadows (3 depth levels)
- Motion durations (200ms-700ms) and easings
- Component-specific specs (buttons, cards, badges, links)

### Phase 7: PCB Swap Animation (replaces layered stack) ✅

**New component**: `components/hero/PCBSwap.tsx`
- Uses two real static images: `public/images/pcb-1.png`, `pcb-2.png` (not the 4-layer stack anymore)
- **Load**: pcb-1 fades in + scales up from 0.88 → 1 (Framer Motion entrance)
- **Scroll 0→1**: container scales 1 → 1.08 and shifts left 24px
- **Scroll 0.25→0.65**: pcb-2 crossfades in while sliding from +120px → 0 on the right; pcb-1 recedes slightly (opacity 1→0.45, scale 1→0.96) for depth
- All driven by the same `progress` value already tracked by `useHeroScroll`

**Hero.tsx changes**:
- Replaced `<BoardStack>` with `<PCBSwap progress={progress} reduce={reduce} />`
- Removed now-unused `useMouseParallax`/`mouse` (PCBSwap has no mouse-tilt)
- Removed `STACK_LAYERS` import (layered stack approach abandoned per user request)
- Outer wrapper now only handles parallax shift + fade opacity; PCBSwap owns its own scale/shift/crossfade math (avoids double-transform bug from earlier attempt)

**Bug fixed (pre-existing, unrelated)**:
- `hooks/useScrollCraft.ts` had a `react-hooks/refs` lint error (reading `ref.current` during render) and a `set-state-in-effect` error after first fix attempt
- Hook was dead code (nothing imported it — `ScrollCraftInit.tsx` instantiates `ScrollCraft` directly), so it was deleted rather than patched further

**Note**: `components/hero/BoardStack.tsx` and `components/hero/config.ts` (`STACK_LAYERS`) are now unused by Hero but left in place in case the layered stack-up approach is wanted again later.

### Phase 8: Premium timed PCB entrance sequence (replaces scroll-driven swap) ✅

Per detailed user spec: PCB entrance is now a **one-time load animation**, not scroll-driven. Scroll-driven exit (fade-out near end of the 200vh pinned hero) is untouched — only the entrance changed.

**New file**: `components/hero/pcbTimeline.ts`
- Single source of truth for all phase timings (ms) + `PREMIUM_EASE = cubic-bezier(0.16, 1, 0.3, 1)`
- Shared by `PCBSwap.tsx` (visual phases) and `Hero.tsx` (text reveal delay)

**`components/hero/PCBSwap.tsx` — fully rewritten** as a phase state machine (`init → enter → hold → cross → settle`), timer-driven via `useEffect`/`setTimeout` (no more scroll `progress` prop):
- **init** (t=0): pcb-1 opacity 0, `translate3d(80px,20px,0) scale(0.90)`
- **enter** (t=100, 950ms): pcb-1 → opacity 1, scale 1.03, centered
- **hold** (t=1050, 500ms): pcb-1 scale 1.03 → 1.10 (short "hero moment")
- **cross** (t=1550, 700ms): pcb-1 fades out (scale→1.14, translateX 30px) while pcb-2 crossfades in (scale 0.96→1, translateX 20px→0) — camera-rotation illusion via opacity+scale+translate only
- **settle** (t=2200, 900ms): outer container releases its `-18%` center-pull translateX back to `0` (natural grid slot) — reads as "PCB moves right" without fighting the existing CSS grid column sizing (avoids viewport-vw math / overflow risk)
- Very subtle radial-gradient glow added (`rgba(224,139,69,0.07)`) per spec, barely visible
- `compact` (<1024px, existing breakpoint): simple one-step fade+scale only, no center-pull/crossfade drama
- `reduce` (prefers-reduced-motion): final state shown instantly, no timers
- Only `transform`/`opacity` animated (`will-change` set), preventing layout shift; both images use `priority` for preload

**`components/Hero.tsx` changes**:
- Added `pcbTimeline.ts` import + `textReady` derived state: `reduce || compact || timelineTextReady`, with `timelineTextReady` flipped by a single `setTimeout(..., PCB_TIMELINE.textReadyAt)` effect (avoids the `set-state-in-effect` lint error by deriving the always-true cases instead of calling `setState` for them)
- Left-column `motion.div`'s `animate` prop now reads `textReady ? "show" : "hidden"` instead of a hard-coded `"show"` — text stays hidden until t≈2300ms, synchronized with the PCB settle phase
- Existing stagger (`M.open.stagger` = 80ms) already matched the requested 60–100ms text-item stagger — no change needed there
- `PCBSwap` now receives `{ compact, reduce }` instead of `{ progress, reduce }`
- Scroll-driven parallax/exit (`shift`, `stackOpacity`, `textOpacity` on scroll-out) **unchanged** — only entrance timing changed

**Bugs fixed during this phase**:
- TS: `let pcb1Duration`/`pcb2Duration` inferred as literal types from `pcbTimeline.ts`'s `as const` — fixed with explicit `: number` annotations
- Lint (`react-hooks/set-state-in-effect`): restructured `textReady` to derive the instant-true cases in render instead of calling `setState` synchronously inside the effect

### Phase 9: Fixed PCB total-invisibility bug (empirically verified) ✅

**Root cause found**: `.pcb-stage`'s render region was collapsing to a near-zero/indefinite width, making the PCB invisible regardless of opacity/transform correctness.

The right hero column (`lg:justify-self-start` on a CSS grid item) uses **shrink-to-fit** sizing instead of stretching to the `1fr` track — it sizes itself to its content's intrinsic width. The old `BoardStack` component anchored this correctly with an **explicit pixel-based width** two levels deep (`w-[min(92vw,560px)] lg:w-[calc(700px*var(--k))]`) inside an outer `.hero-stack` scope div. My `PCBSwap` rewrite (Phase 7/8) only ever used `w-full` all the way down — with no definite pixel width anywhere in the chain, the browser had nothing to resolve percentages against, and the region rendered at ~0 effective width. Both images had 100%-of-zero = zero size, hence "completely empty."

A **secondary bug** was introduced while first attempting the fix: putting `.hero-stack` (which sets `width: 100%` in `globals.css`) on the *same* element as the explicit-width Tailwind utility caused a cascade conflict (`.hero-stack`'s rule appears later in `globals.css` than the Tailwind utility layer, so it won at equal specificity) — silently re-breaking the fix. Resolved by restoring the exact original **two-level structure**: outer `.hero-stack` (scope only, no sizing role) wrapping an inner div that carries the explicit `w-[min(92vw,560px)] lg:w-[calc(700px*var(--k))]`.

**Also simplified while debugging** (per user's explicit request, and to eliminate variables):
- Removed the outer `motion.div` (`stackIn` Framer Motion variant) that wrapped the PCB frame — replaced with a plain `<div>`. This entrance was redundant now that `PCBSwap` has its own complete entrance sequence, and removed one more system that could theoretically mask a rendering issue.
- Swapped `next/image` (`fill`) for plain `<img>` tags with explicit inline styles in `PCBSwap.tsx`, removing Next/Image sizing behavior as a variable entirely (per user's explicit checklist).
- `pcb-1`/`pcb-2` are now unconditionally always mounted in the DOM (never conditionally rendered) — only their `opacity`/`transform` change across phases, so there's no "hidden root cause via conditional unmount" possible going forward.

**Empirical verification method** (installed `playwright` + Chromium headless in this sandbox specifically to avoid claiming success without visual proof):
- Measured `.pcb-stage` `getBoundingClientRect()` at multiple timeline points on the real running dev server → confirmed **700×458px** (previously would have been ~0)
- Read computed `opacity`/`transform` on both `<img>` elements across t=0, 1.2s, 2.4s, 3.2s → confirmed correct phase values at each point (pcb-1 1→0, pcb-2 0→1, crossfade in between)
- Confirmed `naturalWidth`/`naturalHeight`/`complete:true` on both images (assets load successfully)
- Captured actual screenshots at desktop 1440×900 (opening/pcb-1 visible, mid-crossfade, final state with pcb-2 on right + text on left) and mobile 390×844 (text-first, PCB below, no horizontal overflow) — all confirmed visually correct
- Checked browser console for errors during the full sequence → none

**Files changed**: `components/hero/PCBSwap.tsx` (two-level width-anchor structure, plain `<img>`), `components/Hero.tsx` (removed unused `stackIn` variant + its wrapping `motion.div`)

### Phase 10: Converted PCB hero from timer-based to true scroll-scrub (no autoplay) ✅

User explicitly rejected the timer/autoplay approach from Phase 8-9: required **pure scroll-position-driven** animation with zero `setTimeout`/`setInterval`/independent clocks. Scroll position must equal animation position at all times; stopping scroll stops the animation; scrolling up must reverse it.

**Deleted** (per explicit instruction — "there must be NO setTimeout... for this animation"):
- `components/hero/PCBSwap.tsx`
- `components/hero/pcbTimeline.ts`

**New files**:
- `components/hero/heroMath.ts` — stateless helpers: `clamp`, `lerp`, `mapRange`, `easeInOutCubic`, `keyframes` (piecewise-linear interpolation across progress breakpoints), `revealStyle` (opacity+translateY reveal from a `[start,end]` progress window)
- `components/hero/useSmoothedProgress.ts` — smooths raw scroll progress via the **same lerp+rAF pattern already used by `useMouseParallax`** in this codebase (`current += (target - current) * factor`, chasing a target that itself comes only from scroll — no independent timeline, animation stops the instant scroll stops, reverses the instant scroll reverses)
- `components/hero/PCBScrollStage.tsx` — pure function of a `progress: number` prop; every pcb-1/pcb-2 opacity, scale, and local translateX/Y, plus the shared stage's `left`/`top` (vw/vh), are `keyframes()` lookups against fixed progress breakpoints (0, 0.2, 0.45, 0.72, 1) matching the user's exact phase spec. No component state, no effects, no timers — same `progress` in always produces the same visual out.

**`components/Hero.tsx` — restructured**:
- `heroProgress = reduce ? 1 : useSmoothedProgress(rawProgress from existing useHeroScroll, 0.12, animate)` — single source of truth, reused by both text and PCB
- Removed the CSS grid (`lg:grid-cols-[480px_minmax(0,1fr)]`) that used to reserve a column for the PCB — the PCB is no longer a layout participant; it's an absolutely-positioned overlay (`position:absolute; inset:0`) covering the sticky hero stage, so it can move freely from ~60vw/50vh (center-right, phases 1-2) to ~74vw/52vh (final, phase 3+) without disturbing document flow. Text column width/padding (480px/592px, same breakpoints) preserved exactly via plain block layout instead of grid — visually identical, just no longer needs a reserved second track.
- Removed the rounded-rectangle/border/background/shadow "card" that used to wrap the PCB (user: "the surrounding rounded rectangle must NOT visually dominate it") — PCB now floats directly over the technical grid with only a very faint radial glow (`rgba(224,139,69,0.10)`, fades in 0→0.2)
- All 6 text groups (eyebrow+name, title, description, CTAs, expertise grid) now use `revealStyle(heroProgress, start, end)` inline styles instead of Framer Motion variants — continuous function of scroll, not a one-shot trigger, so scrolling back up genuinely hides them again
- Section height `lg:h-[200vh]` → `lg:h-[220vh]` (more scroll room for 5 phases)
- Mobile/tablet (`compact`) and `reduce`: text groups render at `{opacity:1, transform:'none'}` unconditionally (no scroll dependency at all, matching earlier "mobile is designed, not shrunk" decision); PCB renders as one static always-visible `pcb-2.png`, inline in flow below the text, no animation, no timers
- Old `M.explode.*` (scroll-out fade) and `M.open.*` (Framer entrance) usage removed — both fully superseded by the new phase system; **`M.parallax.grid`/`gridOpacityTo` usage on the background grid was deliberately preserved byte-for-byte** (explicit "do not change grid" instruction)
- Scroll hint indicator now fades out over the first 15% of progress (`1 - mapRange(heroProgress, 0, 0.15)`) instead of tracking the old exit-fade value

**Phase breakpoints implemented** (exact spec values): Phase 1 reveal 0→0.20 (pcb-1 opacity 1, scale 0.92→1.08, y 20→0), Phase 2 crossfade 0.20→0.45 (pcb-1 scale→1.14/opacity→0/x→-20, pcb-2 scale 0.96→1.05/opacity 0→1/x 25→0), Phase 3 move-right 0.45→0.72 (stage x 60vw→74vw, y 50vh→52vh, pcb-2 scale 1.05→0.92), Phase 4 text reveal (name 0.55-0.64, title 0.62-0.70, description 0.68-0.77, CTAs 0.74-0.83, skills 0.80-0.90), Phase 5 final 0.90-1.00 (all settled, no further change).

**Empirical verification** (Playwright + headless Chromium against the real running dev server — not just build/lint), matching the user's exact 5-test protocol:
1. **No-scroll for 5s**: computed opacity/transform on both images identical at t=0s/2.5s/5s → confirmed zero autoplay
2. **Slow scroll down**: image states change continuously with scroll position (verified at ~37%)
3. **Stop halfway**: state at scroll-stop identical 1.5s later → confirmed no independent timeline
4. **Scroll back to top**: state matches initial to ~0.04% (residual float from the smoothing lerp not having fully asymptoted in the sampling window — visually and numerically imperceptible, not a bug) → confirmed reversal
5. **Scroll to hero end**: pcb-1 opacity 0, pcb-2 opacity 1 at scale 0.92 positioned right, full "Kaan Sezer" text block visible on left → confirmed final composition
- Screenshots taken and visually inspected at all 5 checkpoints, plus a mid-crossfade frame showing both PCB images overlapping (the intended "camera angle change" illusion)
- No horizontal overflow at any scroll position (checked 0/25/50/75/100% of scroll range) or on mobile (390px viewport)
- No console errors during the full sequence

### Phase 11: Eliminated crossfade — sequential non-overlapping PCB transition ✅

User rejected the crossfade (Phase 10): pcb-1 and pcb-2 were both partially visible at the same scroll positions during the 0.20-0.45 transition. Required: pcb-1 fully centered → fully disappears → brief empty frame → pcb-2 enters from **far off-screen left** → travels through center → settles right. At no scroll position may both images have opacity > 0.

**`components/hero/PCBScrollStage.tsx` — rewritten again**, this time with **fully independent per-image positioning** instead of one shared "stage" transform (the shared-stage design was structurally *why* they moved together/overlapped). Each image now has its own `left:50%; top:50%; transform: translate3d(calc(-50% + Xvw), calc(-50% + Yvh), 0) scale(...)` — completely decoupled:
- **pcb-1**: fixed at 50vw/52vh for its entire visible lifetime (0→0.42), never moves horizontally. Opacity `[[0,1],[0.25,1],[0.42,0]]`, scale `[[0,0.96],[0.25,1.08],[0.42,1.16]]`, local Y `[[0,10],[0.25,0],[0.42,-20]]`. Width `clamp(680px, 52vw, 920px)`.
- **pcb-2**: X position keyframed `[[0.46,-15vw],[0.68,50vw],[0.88,74vw],[1,74vw]]` (far-left → center → right), opacity keyframed with the user's exact non-linear curve `[[0.46,0],[0.49,0.25],[0.54,1],[0.68,1]]`, scale `[[0.46,0.88],[0.68,1.03],[0.88,0.92],[1,0.92]]`. Width `clamp(620px, 44vw, 820px)`.

**Why zero overlap is mathematically guaranteed, not just tuned**: `keyframes()` (in `heroMath.ts`) clamps to the first/last stop's value outside its defined range. pcb-1's opacity stops end at `[0.42, 0]` → returns exactly `0` for *every* progress ≥ 0.42. pcb-2's opacity stops start at `[0.46, 0]` → returns exactly `0` for *every* progress ≤ 0.46. Their nonzero ranges — `[0, 0.42)` and `(0.46, 1]` — don't intersect, so `[0.42, 0.46]` is a guaranteed dual-zero gap by construction, not by careful timing that could drift.

**`components/Hero.tsx`**: updated all 5 text-reveal windows to the new spec — name `0.70-0.78`, title `0.76-0.83`, description `0.81-0.87`, CTAs `0.85-0.92`, skills grid `0.90-0.96` (previously 0.55-0.90 range, now pushed later so text only starts appearing once pcb-2 has passed center, matching "do NOT show hero text before pcb-2 has passed the center"). Reveal distance changed from 20px → 18px per spec. `.hero-pcb-stage` given `overflow-hidden` per the user's exact requested CSS structure.

**Empirical verification** (Playwright, real dev server): sampled opacity/transform at 16 checkpoints spanning the user's exact critical-test percentages (0%, 10%, 20%, 25%, 30%, 40%, 42%, 44%, 46%, 48%, 50%, 60%, 68%, 70%, 85%, 100%) — **zero checkpoints with both images' opacity > 0 simultaneously**, confirmed both forward and during an explicit reverse-scrub test (85% → 44% → 0%, landing back at pcb-1 opacity ~1 / pcb-2 opacity ~0). Screenshots visually confirmed: load (pcb-1 centered, no card), 44% (fully empty — the intentional clean cut), 48% (pcb-2 barely visible at the far left edge), 60% (pcb-2 traveling left-of-center toward center), 70% (pcb-2 centered), 85% (pcb-2 right-of-center, name/title/description visible, CTAs/skills correctly not yet shown), 100% (final: full text left, pcb-2 large on right). No console errors.

### Phase 12: Visual enhancement pass (with 3 explicit user-confirmed exclusions) ✅

User requested a broad enhancement list (3D rotation/float on PCB, typewriter heading, glassmorphism cards, plus several others). Before implementing, flagged 3 direct conflicts with constraints established earlier in this same session and asked the user to resolve via AskUserQuestion — all 3 resolved to the conservative/already-built option:
- **PCB continuous 3D rotation/float** → declined; kept scroll-scrub-only (would have reintroduced an independent animation clock, banned in Phase 10-11)
- **Typewriter heading effect** → declined; kept scroll-progress reveal (respects "don't change existing text" from earlier phases)
- **Glassmorphism cards** → declined; kept flat editorial panels (was explicitly on the user's own "avoid" list in an earlier design pass)

**Implemented** (all CSS-driven per-frame-cheap, all respect `prefers-reduced-motion`):

1. **PCB interactive 3D tilt** (`components/hero/PCBScrollStage.tsx`, `Hero.tsx`) — reintroduced the pre-existing (previously unused after refactor) `useMouseParallax` hook from `useHeroScroll.ts`. Applies a small `rotateX/rotateY` (±5°) to whichever PCB image is currently visible, driven purely by cursor position — **not** scroll, **not** a timer, so it doesn't touch the verified non-overlap/reversibility guarantees. Auto-disabled on touch devices (hook's own `pointer:fine` guard) and under reduced-motion.
2. **PCB glow/shadow** — added `filter: drop-shadow(...)` (grounding shadow + soft warm accent glow) directly on both `<img>` elements.
3. **Featured project badge glow** — `.badge-glow` CSS class, subtle `box-shadow` pulse (`badge-pulse` keyframe, 2.6s), verified via computed style (`animationName: badge-pulse`) and confirmed `none` under reduced-motion.
4. **Project card hover — gradient border glow** — new `.card-glow-hover` CSS class (mask-composite technique: gradient background clipped to a 1px border-only ring via `-webkit-mask-composite: xor`), opacity 0→0.55 on hover. Verified via Playwright: `::before` opacity measured 0 before / 0.55 after `.hover()` on all 5 matching cards.
5. **Global cursor-glow** — new `components/CursorGlow.tsx` (mousemove → CSS custom properties `--cursor-x/y` only, no per-frame JS loop) + `.cursor-glow` CSS class (radial-gradient positioned via those vars). `display:none` unless `(hover:hover) and (pointer:fine)`; explicitly `display:none` under reduced-motion too.
6. **Ambient background gradient** — `.ambient-gradient` CSS class, two very soft radial gradients (green + warm accent, ~4-5% opacity) slowly drifting via a 36s `ambient-drift` keyframe. Added as a **separate sibling layer** in `app/page.tsx`, the existing `.tech-grid`/`.tech-grid-fade` div left completely untouched per "keep the grid" instruction.
7. **Subtle noise texture** — `.noise-overlay` CSS class, SVG `feTurbulence` data-URI, 3.5% opacity, `mix-blend-mode: overlay`. Static (no animation), zero JS.
8. Confirmed already-existing scroll-reveal stagger (scroll-craft `data-reveal-section`/`-card`/`-item` from Phase 5, `RevealGroup`/`RevealItem` staggers in `CaseStudyList.tsx`) — no changes needed, already satisfies "fade-in + slide per section" and "cascade for project cards."

**Regression verification** (Playwright, critical since this phase touches the hero): re-ran the non-overlap check at 10 checkpoints (0, 0.2, 0.4, 0.42, 0.44, 0.46, 0.5, 0.68, 0.85, 1) after adding the mouse-tilt/glow code — **still zero overlap**, confirming the new interactive layer didn't disturb the scroll-driven opacity math. No console errors.

**Not touched** (explicitly protected by earlier instructions, no clear a11y defect found to justify an exception): color tokens/contrast values, typography, buttons, navbar, existing grid.

### Phase 13: Project detail — modal → full-page case study ✅

User rejected the centered modal presentation for project details ("I do NOT want the project to feel like a modal/popup... it should feel like a proper technical case study"). Required: full-width page below navbar, single page-level scroll (no nested `overflow-y:auto`/`max-height`), preserved `?project=slug` query routing + browser back, same component for every project (no hardcoded Ornithopter content), no invented spec fields.

**Inspected first** (per instruction): `CaseStudyModal.tsx` (the old modal — still used by `admin/ProjectEditor.tsx` for an editor preview, so **left untouched**, not deleted), `lib/case-study-types.ts` (data model), `data/projects.json` (actual Ornithopter fields — confirmed only `Boyut`/`Kart Sayısı` specs exist, no MCU/EDA/Platform fields, so those illustrative fields from the brief were **not** fabricated into the component), `CaseStudyList.tsx`'s query-param routing, `ProjectMediaTabs.tsx` (found to be dead code, unrelated type model, left alone).

**New architecture** (state lifted out of the card-grid component so the detail view can replace the *entire* homepage content, not just render inside the Projects section):
- **`components/ProjectNavContext.tsx`** — tiny context exposing `openProject(slug)`
- **`components/ProjectViewGate.tsx`** — new top-level state holder (mounted once in `app/page.tsx`, wraps all homepage sections as `children`). Owns the `?project=slug` URL state, `popstate` listener, and the push/back logic (moved verbatim from the old `CaseStudyList`, including the `pushedByUs` flag so `closeProject()` calls `history.back()` only when *we* pushed the entry, vs `replaceState` if the user landed directly on a URL with the param already set — same correctness as before, just relocated). Renders `<ProjectDetail>` **instead of** `children` when a project is active — this is the mechanism that makes it "the page itself" rather than an overlay on top of it.
- **`components/ProjectDetail.tsx`** — the new full-page case-study component (generic, data-driven, works for any project)
- **`components/CaseStudyList.tsx`** — gutted: removed all state/routing/modal-render, card `onClick` now just calls `useProjectNav().openProject(slug)`
- **`components/Projects.tsx`** — no longer `async`/self-fetching; takes `projects` as a prop
- **`app/page.tsx`** — now `async`, fetches `getVisibleProjects()` **once**, passes it to both `ProjectViewGate` and `Projects` (avoids double-fetch). Grid/ambient-gradient/noise background layers deliberately kept **outside** the gate (always rendered) so they "continue into the project page" per spec, while `<main>`+`<Contact>` are swapped for `<ProjectDetail>` when a project is open.
- **`components/Reveal.tsx`** — extended the `Tag` union with `"h1"` and `"dl"` (needed by ProjectDetail's hero; safe additive change, doesn't affect existing usages)

**`ProjectDetail.tsx` structure** (all conditional on data actually existing — nothing hardcoded):
- Back link: `← Projelere Dön` (ArrowLeft icon), calls `onBack` prop
- Hero: two-column (`lg:grid-cols-[52%_46%]`), left = project code/org, huge title (`clamp(40px,7vw,76px)`), status badge, short description, pipeline stages, specs as inline metadata with thin top divider; right = hero image (first sorted media item or `coverImage`, **no card/border**, `object-contain`, faint radial glow behind it) — entrance via `RevealGroup`/`RevealItem` (existing site-wide component, subtle opacity+y, not a new animation system)
- Numbered sections (`01`, `02`, ...) for each visible `project.sections` entry, generic 30/70 layout, thin top dividers, markdown content — same component regardless of section type (overview/architecture/pcb/etc.), so an "architecture" section renders with the exact same technical styling if the data has one (none exists for Ornithopter — correctly doesn't fabricate one)
- Media section (numbered after all `sections`): tabs (one per media type present) above **one large stage** (aspect 16:9, full width) instead of the old small-thumbnail grid; click-to-expand lightbox preserved from the old modal
- Technical specs table (numbered after media): same `project.specs` re-presented as a full label/value table with thin horizontal separators (intentionally duplicates the hero's compact metadata strip — a deliberate two-location pattern per spec, not an error)
- Contribution list (numbered last, only if `project.contributions.length > 0`)
- Section-level reveal via the existing `data-reveal-section` attribute (scroll-craft, already globally initialized) — "gentle reveal on enter viewport," no new/cinematic animation

**Bugs found and fixed during implementation**:
1. React Compiler ESLint error (`react-hooks/immutability`): the section-numbering counter (`let n = 0; n += 1` inside `.map()`) is a render-time mutation, which the compiler forbids. Replaced with pure arithmetic (`mediaN`, `specsN`, `contributionsN` computed once from array lengths, section index used directly for per-section numbers) — no behavior change, same numbering output.
2. **Real UX bug caught by a failing Playwright test**, not by inspection: the back button was unreachable by a real click because the container's top padding (`pt-8`/`md:pt-12` = 32–48px) was *less* than the fixed header's height (~64–70px), so the header's `<nav>` visually/pointer-intercepted the back button. Fixed to `pt-24`/`md:pt-28`/`lg:pt-32` (96–128px), which both clears the header and matches the brief's own explicit spec ("padding-top: 90–120px") that I'd under-shot on the first pass.

**Empirical verification** (Playwright, real dev server, desktop 1440×900 + mobile 390×844):
- Opened the actual Ornithopter project via a real card click → confirmed **no** fixed dark-backdrop/`role=dialog` element exists (only the expected always-on background layers: grid, ambient-gradient, noise, cursor-glow, all `pointer-events:none`)
- Confirmed **zero** elements with active `overflow-y:auto`/`scroll` + constrained height — i.e., no nested scroll container; `document.documentElement.scrollHeight` (2083px) exceeds viewport, confirming the page itself scrolls
- `<h1>` and specs `<dl>` text read back exactly as `data/projects.json` has them (`50 × 30 mm` / `BOYUT`, `Ana kart + PSU` / `KART SAYISI`) — no invented fields
- "Projelere Dön" click → URL strips `?project=...`, homepage content (`#projeler` etc.) restored
- Re-opened, then used **native** `page.goBack()` → same restoration, confirming actual browser back-button behavior (not just the in-app link) works
- No horizontal overflow on mobile (390px)
- No console errors throughout
- Screenshots confirmed visually: hero (large title, floating uncarded PCB image, thin-divider metadata — reads as a case study, not a modal), media section (tabs above one large stage, not a thumbnail grid), technical specs table

## Build Status
✅ Build successful, lint clean, **empirically verified end-to-end** (open → scroll → back-link → native browser-back), matches the brief's "engineering case study, not a modal" bar

### Phase 14: Extended into a full dynamic project system (admin → data → cards → case study) ✅

User's concern: the case-study redesign must not be Ornithopter-specific — every future project added via admin must automatically get the same treatment, with zero source-code edits per project.

**Audit finding**: the existing system (`CaseStudyProject` type, `projects-store.ts`, `ProjectEditor.tsx`) was **already** substantially generic — `specs[]`/`sections[]`/`media[]` were already free-form key/value or typed arrays, not hardcoded fields, and `ProjectDetail.tsx` (Phase 13) already rendered purely from data. Real gaps found: (1) admin **preview used the old `CaseStudyModal`**, inconsistent with the new public `ProjectDetail` — the single most important gap per the user's own emphasis; (2) no `tags`/technologies field; (3) no per-section layout variants; (4) no slug-uniqueness guard; (5) no duplicate action; (6) admin list was text-only (no thumbnail/preview button).

**Schema additions** (`lib/case-study-types.ts`) — both optional, so existing stored projects need no migration:
- `CaseStudyProject.tags?: string[]`
- `ProjectSection.layout?: "text" | "text-image" | "image-text" | "full-media"` (+ `SECTION_LAYOUTS` labels)

**`lib/admin-actions.ts`**:
- Zod schema extended for `tags`/`layout`
- `saveProjectAction` now computes a `takenSlugs` set and calls a new `uniqueSlug()` helper — if a slug collides with another project, it auto-appends `-2`, `-3`, etc., rather than silently letting two projects share a slug (which would make the second one unreachable, since `ProjectViewGate` looks up by first `slug` match)
- New `duplicateProjectAction(id)` — clones a project with a fresh id/slug/`-COPY` project code, forces `visible: false` (drafts don't accidentally go live), inserted at the end of the order

**`components/admin/ProjectEditor.tsx`**:
- New **TAGS** tab (add/remove chips)
- Section editor gets a **layout** `<select>` (only shown when the section has an image — layout is meaningless without one)
- Added up/down reorder to the TECH SPECS tab (previously only sections/media had reorder)
- **Preview now renders `ProjectDetail`** (the real public component) instead of `CaseStudyModal`, in a closeable full-screen overlay — "admin preview and public page share rendering logic" is now actually true

**`components/admin/AdminProjectList.tsx`** — rewritten: thumbnail preview (cover/thumbnail/first-media fallback), FEATURED badge, category+date in the summary line, and three new row actions: **Preview** (ScanEye icon, opens the same overlay+`ProjectDetail` as the editor, works even for hidden drafts), **Duplicate** (Copy icon), existing move/publish-toggle/edit/delete kept as-is (delete already had a `window.confirm()` dialog — satisfied the "delete safety" requirement without changes needed)

**`components/ProjectDetail.tsx`** / **`components/CaseStudyList.tsx`**: render `tags` (as small mono chips) when present; `ProjectDetail`'s section renderer now branches on `layout` — `text-image`/`image-text` render a side-by-side 2-column split (order swapped via `sm:order-1`/`sm:order-2`, not a fragile CSS selector), `full-media` breaks the image out of the 68ch text column to span the full content width, `text` (default) keeps the original stacked behavior — so old sections with no `layout` set render exactly as before.

**A real, pre-existing bug found and fixed** (not introduced by this session — exposed by actually testing project *creation*, which nothing had exercised before): `admin-actions.ts`'s `projectSchema` required `id: z.string().min(1)`, but a brand-new draft's `id` is legitimately `""` until `normalize()` generates one via `newId()` — meaning **creating a new project via the admin form had never worked**, failing Zod validation silently (the error *was* surfaced to the UI, just easy to miss). Fixed by relaxing to `id: z.string()`, since `normalize()` already correctly handles the empty-string case.

**A near-miss during testing — full incident, for transparency**: the first automated end-to-end test used `.first()` on shared button selectors (e.g. `button[title="Sil"]`) instead of scoping to the specific test-project's row. Because a newly-created project sorts to the *end* of the admin list, `.first()` actually hit **U1** (delete), briefly flipped **U3/Ornithopter**'s visibility, and edited U1's title — i.e., real project data was affected by a testing mistake. This was caught immediately by checking `data/projects.json` right after the test run (not assumed safe from build/lint), rather than being missed. Recovery: U1's exact original content was pulled from git commit `44bb26b` (which, it turned out, already contained the correct baseline for all 5 projects) and re-inserted; U3's visibility was reset to its correct pre-test `false`; the test's own `TESTQA` draft was removed. Verified via a value-level diff (`git show` vs. working tree) that **U2/U4/U5 were byte-identical, untouched** throughout — only U1 and U3 needed the fix, and both are now restored. The workflow test was then rewritten to scope every action to a row matched by unique marker text (`.filter({ hasText: MARKER })`) and re-run cleanly, with a `data/projects.json` snapshot taken immediately beforehand as a safety net. No data loss occurred; the incident is recorded here because it happened, not because it went unnoticed.

**Empirical verification** (Playwright, real dev server, using an actual valid admin session cookie — not a mocked one):
- **All 5 pre-existing projects** (not just Ornithopter) opened publicly through the same generic `ProjectDetail`, correct titles, zero "undefined"/"N/A" text anywhere, no console errors
- Confirmed a **hidden/draft project (Ornithopter) is not reachable by direct URL** on the public site (`ProjectViewGate` only matches against the pre-filtered *visible* list)
- Full corrected workflow, 17/19 assertions passed on the first correctly-scoped run; the 2 "failures" were confirmed to be test-script bugs, not product bugs, by direct visual inspection:
  - Created a project from the admin form with 2 sections, 3 specs, 2 tags, 3 media items → saved as **draft** → confirmed row shows `GİZLİ` with correct counts → confirmed **not** visible on the public homepage
  - **Preview** (from the admin list, without navigating into the editor) rendered the draft via `ProjectDetail` with all data correct (screenshot-verified: title, status, description, tag chips, spec values, hero image) — the "wrong H1" test failure was because the *admin page's own* `<h1>Projects</h1>` sits earlier in the DOM than the overlay's title, so an unscoped `page.locator('h1').first()` grabbed the wrong element; the "missing tags" failure was `innerText` reflecting the CSS `text-transform: uppercase` (renders "FREERTOS", not "FreeRTOS") — both are test-assertion bugs, the actual rendered page was correct
  - **Published** it → confirmed it now appears on the public homepage grid → opened its real case-study page (`?project=` URL) → confirmed correct H1
  - A follow-up isolated check confirmed that content appearing "missing" in a same-turn `fullPage` screenshot was a **scroll-triggered reveal-animation timing artifact** of the test (Framer Motion's `whileInView` hadn't fired for below-the-fold content that was never actually scrolled into view before the screenshot) — re-verified by scrolling step-by-step like a real user, after which hero image opacity read `1` and all text was present
  - **Edited** the title from admin → confirmed the change appeared on the public site
  - **Unpublished** → confirmed it disappeared from the public site
  - **Deleted** → confirmed removed from the admin list, and confirmed **U1–U5 all still present** (5 projects) afterward
- Responsive check on a real project (U2, not synthetic data) at desktop/tablet/mobile (1440/834/390px) — zero horizontal overflow at any width, section stacking and spec-table wrapping look intentional at each size
- Final `data/projects.json` verified **byte-identical** to a pre-test backup — no residual test data, no corruption

## Build Status (Phase 14)
✅ Build successful, lint clean, **fixed a real pre-existing project-creation bug**, **caught and fully recovered from a real data-safety incident during testing** (documented above, not hidden), full admin→data→cards→case-study workflow empirically verified for both a freshly-created project and all 5 pre-existing ones

### Phase 15: Fixed "PROJELERE DÖN → blank page" navigation bug (two distinct root causes) ✅

Reproduced first, per instruction, before touching anything (Playwright against the real dev server): opened a project, clicked "← Projelere Dön", screenshotted — confirmed a genuinely blank page below the header. Investigated by inspecting live `scrollY`, computed styles, and element rects rather than guessing from source alone. Two **separate, unrelated** bugs were compounding into the one symptom:

**Root cause 1 — stale native scroll restoration.** `ProjectViewGate` swaps `<ProjectDetail>` for `children` (or back) — same document, wildly different content height, no real page navigation. The browser's default `history.scrollRestoration: "auto"` tries to restore the scrollY that the `/` history entry had *before* the project was opened, but that offset means something completely different once the DOM underneath has changed. Traced live: `scrollY` before opening was 1933; after clicking back it snapped to 2990, landing `heroRectTop: -2995` — over 1000px past the entire 1980px-tall Hero section, in a stretch of the (very tall, scroll-scrubbed) Hero that has nothing rendered at that scroll depth by design.

**Root cause 2 — scroll-craft observer never re-attached after remount** (this was the one that made it look *permanently* stuck, not just momentarily disoriented). `ScrollCraftInit` — which drives the `data-reveal-section` opacity reveal used by Experience/Projects/Education/Skills — was mounted once, as a sibling *outside* `ProjectViewGate`'s conditional swap, in `app/page.tsx`. Its `useEffect(() => { ... }, [])` runs exactly once, attaching `IntersectionObserver`s to the DOM nodes that exist *at that moment*. Every time `ProjectViewGate` unmounts `children` (project opens) and later remounts it (project closes), React creates a **brand-new** `#projeler` (and Experience/Education/Skills) DOM node — one the original, long-since-run `ScrollCraftInit` effect has never seen and will never observe again, since it doesn't re-run. Confirmed directly: `getComputedStyle(#projeler).opacity` read back `"0"` with `sc-in` never applied, even though `document.body.innerText` proved the actual text content was present in the DOM the whole time — it just never got revealed.

**Fixes**:
1. `components/ProjectViewGate.tsx` — sets `history.scrollRestoration = "manual"` once on mount (restored on unmount) so the browser's own restoration never fights the app's; added a `wasShowingProjectRef` that tracks the *actual* transition from showing-a-project to showing-the-portfolio (keyed off a stable derived boolean `showingProject = active !== null`, not the raw `active` object which is a fresh reference every render); on that transition, calls `document.getElementById("projeler")?.scrollIntoView({ block: "start", behavior: "instant" })` after `afterNextPaint()` — a double-`requestAnimationFrame` helper, i.e. "wait until the browser has actually painted the new DOM," which is what the brief asked for instead of an arbitrary `setTimeout`. `behavior: "instant"` is deliberate: the site's global `scroll-behavior: smooth` (globals.css) would otherwise turn this into a ~1 second animated scroll-through — fine for in-page nav-link clicks, wrong for a state *restoration* where the user should land immediately, not watch the page scroll past 3000px of itself.
2. Also fixed the URL-cleanup effect to key off the same `showingProject` boolean instead of raw `slug` — previously, an invalid/non-matching `?project=` value (slug present but no matching project) would silently render the homepage *without* stripping the stale query param, which the brief's "fail-safe rendering" section explicitly called out as a case to handle.
3. `app/page.tsx` — moved `<ScrollCraftInit />` from being a page-level sibling of `<ProjectViewGate>` to being the **first child inside** the swapped `children` content. This is the actual fix for root cause 2: `ScrollCraftInit` now unmounts and remounts *together with* the homepage sections it observes, so its setup effect genuinely re-runs and re-attaches fresh observers every time the user returns from a project — not just once, ever, for the DOM nodes that existed at initial page load.

Both fixes were necessary; fixing only #1 left the page scrolled to the right place but still invisible (confirmed by testing incrementally — after fix #1 alone, `scrollY`/`rect.top` were correct but `opacity` read `"0"`), and fixing only #2 without #1 would have left the user scrolled to a random, disorienting depth even once content was visible again.

**All 6 named test flows (A–F) verified via Playwright against the real dev server**, plus the two intermediate empirical findings that shaped the fix (not assumed):
- **TEST A** (hard refresh → scroll to Projects → open → back): URL clean, `#projeler` at the correct scroll position (`top ≈ 80px`, matching the section's own `scroll-mt-20`), body not scroll-locked, **and visually confirmed via screenshot** — full "Projeler" heading + cards rendering, not blank
- **TEST B** (native browser Back): same restoration behavior as the in-app button (both paths go through the same `popstate`-driven state update)
- **TEST C** (Back then Forward): forward navigation correctly re-shows the same project (H1 matches before/after)
- **TEST D** (direct URL load of a project, no prior homepage visit): "Projelere Dön" still correctly returns to a fully-rendered Projects section; stale `?project=` param removed from URL
- **TEST E** (open/close three different projects back-to-back): no blank or stale state on any cycle
- **TEST F** (scroll after returning): confirmed `scrollY` actually changes on wheel input post-return — body was never actually locked (the lightbox's own `document.body.style.overflow = "hidden"` was double-checked and confirmed scoped correctly to only the media-zoom sub-modal, never touched during this bug or its fix)
- Regression check: fresh page load (never opening any project) still reveals `#projeler` to `opacity: 1` on scroll-into-view — moving `ScrollCraftInit` did not break the normal first-visit experience
- `data/projects.json` re-verified unchanged (still exactly 5 projects) after this round of testing

## Build Status (Phase 15)
✅ Build successful, lint clean, **root cause reproduced and empirically confirmed via live DOM inspection (not guessed) before fixing**, all 6 named test flows (A–F) pass, regression-checked against fresh-load behavior, no timeouts used anywhere in the fix

## Design Improvements Summary (Phase 4)
- **Typography**: Much stronger hierarchy with bold fonts, varied sizes, improved tracking
- **Spacing**: Deliberate breathing room throughout (24→36→40px sections on mobile/tablet/desktop)
- **Buttons**: Premium feel with larger sizes, better shadows, refined interactions
- **Cards**: More intentional composition with better depth and visual weight
- **Sections**: Strong vertical rhythm with improved spacing between major sections
- **Footer**: More prominent and intentional design
- **Consistency**: Refined font weights and sizes create professional, art-directed feel
- **Visual Hierarchy**: Clear focal points and intentional design decisions throughout

## Remaining Work
Visual enhancements mostly complete. Potential improvements:
- Custom visual assets/illustrations if desired (hero background, section decorations)
- Animation micro-interactions refinement
- Responsive mobile optimization (test and refine if needed)
- Accessibility audit (contrast, focus states)

## Next Steps (For User)
1. Test in browser with `npm run dev` to see premium design
2. Check responsive behavior on mobile/tablet/desktop
3. Review typography hierarchy and spacing rhythm
4. Decide if custom images/illustrations would enhance hero or sections

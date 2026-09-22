# Design Primitives

## Colors

### Dark Theme (Default)
```
--bg: #031b17                    (main background)
--bg-deep: #02120f               (deeper background)
--panel: #06241e                 (elevated surfaces)
--panel-soft: #0a2b24            (hover states)

--accent: #dc8b32                (primary action)
--accent-ink: #f4b266            (text on accent)
--accent-soft: rgba(182,118,45,0.35)  (subtle backgrounds)

--ink: #e7e3d8                   (primary text)
--ink-dim: #c9c9bd               (secondary text)
--muted: #9aa99f                 (tertiary text)

--line: rgba(90,140,120,0.16)    (borders)
--line-soft: rgba(90,140,120,0.09)
--grid: rgba(90,140,120,0.06)    (grid overlay)
```

### Light Theme
```
--bg: #efece1
--panel: #e4dfcd
--accent: #b26a24
(all other tokens follow same language)
```

### Hero-Specific
```
--hero-bg: #0a1712
--hero-ink: #f7f3e8
--hero-accent: #d98a4d
(hero has its own warm palette, distinct from main site)
```

## Typography

### Fonts
- **Display**: Fraunces (serif) — headings, hero name
- **Body**: Public Sans (sans) — default text
- **Mono**: JetBrains Mono — technical labels, tags

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extra Bold: 800

### Size Scale
```
Hero name:        120px (clamp 48px - 120px)
Section heading:  48-64px (text-4xl to text-6xl)
Subheading:       24-32px (text-2xl to text-3xl)
Body:             16-17px (text-base)
Small:            14px (text-sm)
Micro:            11-12px (mono labels)
```

### Line Height
```
Display (headings):   0.88-0.92 (tight)
Body:                 1.7-1.72 (spacious)
Label:                1.55-1.6 (readable)
```

### Letter Spacing
```
Display:              -0.03em to -0.025em
Body:                 normal
Mono/Labels:          0.16em to 0.38em (varies by context)
```

## Spacing Scale

### Margin/Padding
```
4px    - minimal
8px    - micro
12px   - xs
16px   - sm
20px   - md
24px   - lg
28px   - xl
32px   - 2xl
36px   - 3xl
40px+  - hero/section spacing
```

### Section Spacing
```
Mobile:   py-24 (96px)
Tablet:   py-36 (144px)
Desktop:  py-40 (160px)
```

### Gap Scales
```
Between buttons: gap-3 to gap-4 (12-16px)
Between cards: gap-8 (32px)
Between grid items: gap-6 (24px)
```

## Border Radius
```
sm:  4px    (rarely used now)
md:  6px    (buttons, badges)
lg:  8px    (cards)
xl:  12px   (featured cards, large containers)
2xl: 16px   (hero PCB frame)
```

## Shadows

### Depth Levels
```
Subtle:    0 2px 8px rgba(0,0,0,0.12)
Medium:    0 8px 24px rgba(0,0,0,0.25)
Strong:    0 12px 40px rgba(0,0,0,0.35)
Hero:      0 20px 60px rgba(0,0,0,0.4)
```

## Motion

### Durations
```
Fast:      200ms  (micro-interactions)
Standard:  300ms  (hover, transitions)
Medium:    600ms  (entrance animations)
Slow:      700ms+ (section reveals)
```

### Easing
```
Primary:   cubic-bezier(0.22, 1, 0.36, 1)  (custom ease-out)
Ease-out:  ease-out / cubicOut
Standard:  ease-in-out
```

### Transitions
```
Colors:        all 0.2s ease-out
Transforms:    all 0.3s cubic-bezier(...)
Shadows:       box-shadow 0.2s ease-out
Opacity:       opacity 0.3s ease-out
```

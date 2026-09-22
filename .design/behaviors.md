# Design Behaviors: Motion & Interaction

## Entrance Animations (scroll-craft)

### Section Reveals
```
Distance:    28px down
Duration:    700ms
Delay:       0ms (inherent from scroll position)
Easing:      cubicOut
Trigger:     15% threshold
Animation:   translateY + opacity fade-in
```

### Card Reveals
```
Distance:    24px down
Duration:    650ms
Delay:       50ms (staggered)
Easing:      cubicOut
Trigger:     12% threshold
Animation:   translateY + opacity
```

### Item Reveals (skills, list items)
```
Distance:    20px down
Duration:    600ms
Delay:       0ms
Easing:      cubicOut
Trigger:     15% threshold
Animation:   translateY + opacity
```

## Hover & Interactive States

### Buttons
```
Primary Button:
  - Hover: -translate-y-1.5 (6px up)
  - Shadow: 0_16px_32px_rgba(217,138,77,0.35)
  - Duration: 300ms
  - Easing: cubic-bezier(0.22, 1, 0.36, 1)
  - Active: return to baseline (0 translate)

Secondary Button:
  - Hover: --accent/8 background, --accent text
  - Border: thicken to --accent
  - Shadow: 0_8px_24px_rgba(217,138,77,0.25)
  - Duration: 300ms
```

### Cards (Projects, Education)
```
Hover States:
  - Transform: -translate-y-2 (8px up)
  - Border: --accent if not featured
  - Shadow: 0_12px_40px_rgba(0,0,0,0.35)
  - Duration: 300ms
  - Featured cards: already elevated, subtle change only
```

### Links
```
Text Links:
  - Color: --muted → --accent-ink
  - Duration: 300ms
  - No underline (implicit in color change)

Footer Links:
  - Transform: translate-x-1 on hover
  - Color: --ink-dim → --accent-ink
  - Duration: 300ms
  - Icon color: --muted → --accent-ink
```

### Navigation
```
Active Link:
  - Color: --accent
  - Font weight: 700 (emphasize)
  - Underline: below text (1px, --accent)
  - Smooth transition: 300ms

Hover Link:
  - Color: --accent-ink
  - Duration: 300ms
```

## Scroll-Driven Animations (Hero)

### Hero Parallax System
```
Text parallax:  -travelled * 0.6 (slower than scroll)
Stack parallax: -travelled * 0.8
Grid parallax:  -travelled * 0.3 (very slow)

Progress-based fades:
  - Text fade-out: starts at 75% progress
  - Stack fade-out: starts at 80% progress
  - Smooth cubic-out interpolation
```

### Hero Entrance (Framer Motion)
```
Tag line:
  - Delay: stagger start
  - Animation: opacity + blur + translateY
  - Duration: 600ms

Name (h1):
  - Delay: stagger + 100ms
  - Per-word animation
  - Duration: 600ms
  - Scale from 0.95 on load

CTA Buttons:
  - Delay: stagger + 400ms
  - Opacity + translateY entrance
  - Duration: 600ms

Expertise Grid:
  - Delay: stagger + 500ms
  - Opacity + translateY
  - Duration: 600ms
```

## Reduced Motion

All animations respect `prefers-reduced-motion`:
```
Scroll animations: disabled (parallax, progress-based)
Entrance animations: opacity only (no transforms)
Hover animations: disabled or instant
Duration: 0.01ms override for all @keyframes
```

## Transition Guidelines

### Color Transitions
```
Background colors:   0.2s ease-out
Text colors:         0.3s ease-out
Border colors:       0.3s ease-out
```

### Transform Transitions
```
Translate:           0.3s cubic-bezier(0.22, 1, 0.36, 1)
Scale:               0.3s ease-out
Rotate:              0.3s ease-out
```

### Shadow Transitions
```
Box-shadow:          0.2s ease-out
(Shadows never laggy or delayed)
```

### Complex Animations
```
Stagger delay:       0.06s to 0.08s between items
Spring animations:   Avoid; use ease-out instead
Duration variance:   600-700ms for reveals, 300ms for interactions
```

## Performance Notes
- 3D transforms use `transform3d()` (GPU acceleration)
- Use `will-change: transform` on animated elements sparingly
- Parallax capped at scroll velocity thresholds
- Animations disabled on `prefers-reduced-motion`
- scroll-craft uses IntersectionObserver (efficient)
- Framer Motion handles complex hero animations

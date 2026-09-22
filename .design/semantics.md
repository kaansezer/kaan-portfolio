# Design Semantics

## Color Roles

### Text Hierarchy
```
Primary (Main):   --ink (#e7e3d8)          → Headings, main content
Secondary:        --ink-dim (#c9c9bd)      → Body text, descriptions
Tertiary:         --muted (#9aa99f)        → Labels, metadata
Accent:           --accent-ink (#f4b266)   → Emphasized text, links
Disabled:         rgba(151, 169, 159, 0.5) → Inactive states
```

### Surfaces
```
Base:             --bg (#031b17)           → Main background
Elevated:         --panel (#06241e)        → Cards, containers
Hover:            --panel-soft (#0a2b24)   → Elevated on hover
Overlay:          rgba(0,0,0,0.5+)         → Modals, darkening
Accent Bg:        --accent-soft            → Highlight backgrounds
```

### Borders & Dividers
```
Strong:           --line (0.16 opacity)    → Card borders, dividers
Soft:             --line-soft (0.09)       → Subtle separators
Grid:             --grid (0.06)            → Background grid only
Accent:           --accent (0.4 opacity)   → Interactive borders
```

### Interactive States
```
Default:          --ink-dim or --muted
Hover:            --accent-ink (warm)
Active:           --accent (strong)
Disabled:         --muted (low opacity)
Focus:            2px solid --accent
```

## Semantic Spacing

### Hero & Above-Fold
```
Gap (text↔visual):   10-16px (lg), 16px (xl)
Vertical rhythm:     mt-12 to mt-16 (text elements)
CTA spacing:         mt-14 from intro
```

### Sections
```
Padding:             py-24 (mobile), py-36 (tablet), py-40 (desktop)
Internal gap:        gap-12 to gap-16 (grid columns)
Gap to next:         Implicit in py (no additional gap needed)
```

### Components
```
Button padding:      px-8 py-3.5 (standard)
Card padding:        p-8 (normal), p-10 (large)
Card gap:            gap-8 between sections
Input padding:       px-3 py-2
```

## Component Roles

### Buttons
```
Primary:
  - Size: h-14, px-8
  - Color: --accent background, dark text
  - Hover: -translate-y-1.5, shadow[0_16px_32px]
  - Font: mono, 700, 12px, tracking-wide

Secondary:
  - Size: h-14, px-8
  - Color: border --accent, transparent bg
  - Hover: --accent/8 background, --accent text
  - Font: mono, 700, 12px, tracking-wide
```

### Cards
```
Project Card:
  - Padding: p-8 (normal), p-10 (featured)
  - Radius: rounded-xl (12px)
  - Border: --line (normal), --accent/45 (featured)
  - Hover: -translate-y-2, stronger shadow
  - Featured: gradient bg, ring overlay, glow

Education Card:
  - Similar to project card
  - Hover: subtle background shift
```

### Badges & Labels
```
Status Badge:
  - Padding: px-2.5 py-1.5
  - Radius: rounded-md (6px)
  - Font: mono, 600, 10-11px
  - Semantic colors per status

Featured Badge:
  - Background: --accent/5
  - Border: --accent/30
  - Icon: filled star
```

### Links
```
Text Link:
  - Color: --muted (default)
  - Hover: --accent-ink, underline implicit
  - Transition: 300ms ease-out

Subtle Link:
  - Color: --ink-dim
  - Hover: --accent-ink, translate-x-1
```

## Section Semantics

### Hero
- Own color palette (hero-bg, hero-accent)
- Largest typography (120px name)
- Maximum whitespace
- Premium framing around visual

### Experience/Projects/Education/Skills
- Standard --bg color
- Consistent section heading scale (48-64px)
- Uniform py-24/36/40 spacing
- Scroll-craft reveals for rhythm

### Contact/Footer
- Standard palette
- Bold heading (56-64px)
- Larger link text (16px)
- Enhanced spacing (gap-16)

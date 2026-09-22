# Design Principles

## 1. Editorial Excellence
**"Confident typography tells the story"**

Typography is not decoration—it's the primary communication tool. Font sizes, weights, and spacing are deliberate.

- Section headings: Bold (700+), 48-64px, tight line height
- Hero name: Extra large (120px), bold, negative letter spacing
- Body: Regular weight, 16-17px, generous line height (1.7)
- No auto-scaled fonts except hero (which uses clamp for responsiveness)

**Example:** The hero name "Kaan Sezer" is 120px and bold because this is a personal brand—it demands confidence.

---

## 2. Intentional Whitespace
**"Breathing room is not wasted space"**

Whitespace creates visual hierarchy and prevents cognitive overload.

- Section padding: 96px (mobile) → 160px (desktop)
- Gap between columns: 16px minimum
- Margins between elements: Never less than 8px
- Cards: Minimum 32px internal padding
- Lists: 16px+ gap between items

**Example:** Projects section has py-40 on desktop so the content feels substantial, not cramped.

---

## 3. Subtle Depth
**"Premium doesn't mean flashy"**

Use shadows and layering to create depth perception without being obvious.

- Card shadows: 8-12px, 0.25-0.35 opacity
- Hover elevation: -2px to -8px translate (up)
- No glowing effects or halos
- Border transparency: 0.09-0.16 (subtle)
- Accent backgrounds: 5-8% opacity (very subtle)

**Example:** Featured project cards have a gentle glow and ring, not neon glow.

---

## 4. Purposeful Motion
**"Animation should enhance, never distract"**

Every animation has a job: reveal, confirm, or delight.

- Entrance animations: 600-700ms, ease-out (confident start)
- Interaction feedback: 200-300ms (snappy)
- Scroll parallax: Subtle (0.3-0.8 factor) and capped
- Never use animations for decoration
- Respect reduced-motion preferences

**Example:** Buttons lift up on hover (-1.5px) to confirm interactivity, then shadow deepens.

---

## 5. Authentic Engineering Aesthetic
**"Design language matches the content"**

The visual identity reflects engineering precision: grids, technical typography, layer stacks, circuit-inspired elements.

- Monospace font for labels and tags (not decorative, functional)
- Grid overlays in hero section
- PCB stack visual (actual technical content)
- Technical metadata (project codes, status badges)
- No forced "tech" decoration (avoid random circuit patterns)

**Example:** Expertise badges use monospace and accent colors because they're technical specifications, not decorative elements.

---

## 6. Hierarchy Over Decoration
**"Remove decoration, not meaning"**

Every visual element serves information hierarchy. No decorative icons unless they're metaphorical.

- Icons appear beside text (functional labels)
- Lines separate sections (structural, not decorative)
- Colors differentiate states and roles
- Typography weight distinguishes importance

**Example:** Accent lines in the hero are visual separators that mark structure, not decorative flourishes.

---

## 7. Responsive Intentionality
**"Mobile layout is designed, not squeezed"**

The mobile experience is deliberate, not auto-derived from desktop.

- Touch targets: Minimum 44x44px (buttons are h-14 = 56px)
- Mobile spacing: Slightly increased for finger interaction
- Typography: Scales gracefully (clamp functions)
- Stacking: Vertical layouts with maintained visual hierarchy
- No hamburger menus (nav is simple enough for inline)

**Example:** Section headings scale from 36px (mobile) to 64px (desktop), not a linear interpolation.

---

## 8. Color Restraint
**"Limited palette, maximum impact"**

Three main colors: dark background, warm accent, neutral text. Hero has its own warm palette.

- Primary: --accent (#dc8b32 or #b26a24 in light)
- Background: Dark first (maintains premium feel)
- Text: Warm white/off-white (not pure white, reduces eye strain)
- No third brand color (monochromatic would be boring, tri-chrome is reserved)

**Example:** The orange accent appears strategically in buttons, active states, and accents—not scattered everywhere.

---

## 9. Technical Precision
**"Design system scales consistently"**

All spacing, sizing, and animation values follow scales.

- Spacing: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 36px, 40px+
- Font sizes: Paired scale (display, body, small)
- Shadows: Three depth levels (subtle, medium, strong)
- Border radius: 4px, 6px, 8px, 12px, 16px (intentional, not arbitrary)
- Animation durations: 200ms, 300ms, 600ms, 700ms (not every 50ms)

**Example:** All card padding uses multiples of 4: p-8 (32px), p-10 (40px), never p-9 (36px) unless exceptional.

---

## 10. Trust Through Consistency
**"Patterns repeat predictably"**

Once a pattern is established, repeat it. Users trust systems they can predict.

- All sections use the same spacing rhythm
- All cards follow the same elevation/shadow pattern
- All buttons behave identically
- All links use the same hover pattern
- All labels use the same monospace + small cap styling

**Example:** Hovering any button produces the same lift and shadow—no surprises.

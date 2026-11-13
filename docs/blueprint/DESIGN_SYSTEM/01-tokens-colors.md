# Design System — 01: Core Rules & Color Tokens

← [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) | [Blueprint INDEX](../INDEX.md) | [02 — Typography & utilities →](./02-typography-utilities.md)

Token source: [src/app/globals.css](../../../src/app/globals.css) `@theme {}` block.

---

## Core Rules

| Rule | Detail |
|---|---|
| Theme | Light-only Sandpiper brand: cream paper, ink text, Sandpiper blue primary, sunny-yellow accent (from the Pencil brand file). `color-scheme: light` global. No light/dark toggle. The Payload admin has its own theme in `src/app/(payload)/custom.css` → [CMS.md](../CMS.md). |
| Color space | `oklch()` — wide-gamut, perceptually uniform. Never convert to hex. |
| Token location | `src/app/globals.css` `@theme {}` |
| Tailwind version | v4 — `@theme {}` auto-generates utility classes, no `tailwind.config.*` |
| Important modifier | `!` suffix — e.g. `font-sans!` (NOT `!font-sans`) |
| Class merger | `cn()` from `src/lib/cn.ts` — handles `!` suffix correctly via tailwind-merge v3 |

**Never add raw color values in JSX.** Always use token class or `var(--color-*)`.

---

## Tailwind v4 @theme Mechanics

```css
/* src/app/globals.css */
@theme {
  --color-primary: oklch(0.8 0.105 75);
  /* ↑ auto-generates: bg-primary, text-primary, border-primary, fill-primary, ... */

  --radius-md: 0.5rem;
  /* ↑ auto-generates: rounded-md */

  --font-sans: var(--font-outfit), ui-sans-serif;
  /* ↑ auto-generates: font-sans */
}
```

---

## Brand Palette (Sandpiper)

Raw palette — semantic tokens below are mapped onto these. Use them directly for brand moments (bands, stickers, ribbons).

| Utility | CSS variable | oklch | Hex in design |
|---|---|---|---|
| `bg-sunny` | `--color-sunny` | `oklch(0.896 0.166 95.7)` | `#FEDB41` |
| `bg-sunny-soft` | `--color-sunny-soft` | `oklch(0.954 0.084 97.4)` | `#FFF1B0` |
| `bg-blue` | `--color-blue` | `oklch(0.405 0.222 266.1)` | `#142DBE` |
| `bg-blue-deep` | `--color-blue-deep` | `oklch(0.325 0.177 266.4)` | `#0D1F8C` |
| `bg-berry` | `--color-berry` | `oklch(0.593 0.203 6.2)` | `#D9336B` (one pink accent per section, max) |
| `text-ink` | `--color-ink` | `oklch(0.234 0.109 268.3)` | `#0A1450` |
| `bg-cream` | `--color-cream` | `oklch(0.987 0.023 96)` | `#FFFBEA` |
| `bg-paper` | `--color-paper` | `oklch(1 0 0)` | `#FFFFFF` |
| `text-slate` | `--color-slate` | `oklch(0.458 0.034 285)` | `#55556A` |

Semantic mapping: `background`=cream, `surface`=paper, `surface-raised`=sunny-soft, `foreground`=ink, `foreground-muted`=slate, `primary`=blue (hover blue-deep), `sea`=sunny, `ring`=blue.

Motion tokens: `animate-marquee(-reverse)` (set `--marquee-duration`), `animate-orbit(-reverse)`, `animate-progress` (`--slide-ms`). Helper classes in `globals.css`: `.container-wide` (1440 artboard, 56px → 20px gutters), `.sticker-pop` (scroll-driven pop-in), `.wobble` (`--wobble` hover tilt), `.no-scrollbar`. All motion is disabled under `prefers-reduced-motion`.

> The per-token values in the tables below predate the rebrand; the live values are in `globals.css`.

## Surface Tokens

| Utility class | CSS variable | oklch value | Elevation |
|---|---|---|---|
| `bg-background` | `--color-background` | `oklch(0.155 0.008 60)` | Page background (lowest) |
| `bg-surface` | `--color-surface` | `oklch(0.19 0.009 60)` | Cards, inputs |
| `bg-surface-raised` | `--color-surface-raised` | `oklch(0.225 0.01 60)` | Dropdowns, tooltips |
| `bg-surface-overlay` | `--color-surface-overlay` | `oklch(0.265 0.011 60)` | Modals, sheets (highest) |

Elevation rule: `background < surface < surface-raised < surface-overlay`

---

## Text Tokens

| Utility class | CSS variable | Use |
|---|---|---|
| `text-foreground` | `--color-foreground` | Primary text |
| `text-foreground-muted` | `--color-foreground-muted` | Secondary, descriptions |
| `text-foreground-subtle` | `--color-foreground-subtle` | Placeholder, disabled labels |

---

## Border Tokens

| Utility class | CSS variable | Use |
|---|---|---|
| `border-border` | `--color-border` | Default borders (auto-applied globally) |
| `border-border-strong` | `--color-border-strong` | Hover/focus border state |
| `border-input` | `--color-input` | Form field borders |

---

## Primary Color Tokens (Crema / Amber — `oklch(0.8 0.105 75)`)

| Utility class | CSS variable | Use |
|---|---|---|
| `bg-primary` | `--color-primary` | Primary actions |
| `bg-primary-hover` | `--color-primary-hover` | Hover state |
| `bg-primary-active` | `--color-primary-active` | Active/pressed state |
| `text-primary-foreground` | `--color-primary-foreground` | Text on primary bg |
| `bg-primary-subtle` | `--color-primary-subtle` | 14% opacity tint |
| `shadow-primary-glow` | `--color-primary-glow` | Glow effect (30% opacity) |
| `ring-ring` | `--color-ring` | Focus ring (= primary) |

---

## Accent Tokens (Sea)

| Utility class | CSS variable | Use |
|---|---|---|
| `text-sea` / `bg-sea` | `--color-sea` (`oklch(0.7 0.09 195)`) | Secondary accent — waterside motif, tags, gradient end |
| `bg-sea-subtle` | `--color-sea-subtle` | 14% opacity tint |

---

## Semantic Color Tokens

| Group | Fill | Hover | Foreground | Subtle (14% bg) |
|---|---|---|---|---|
| Destructive | `bg-destructive` | `bg-destructive-hover` | `text-destructive-foreground` | `bg-destructive-subtle` |
| Success | `bg-success` | `bg-success-hover` | `text-success-foreground` | `bg-success-subtle` |
| Warning | `bg-warning` | `bg-warning-hover` | `text-warning-foreground` | `bg-warning-subtle` |

---

## Card Tokens

| Utility class | Use |
|---|---|
| `bg-card` | Card background (= `bg-surface`) |
| `text-card-foreground` | Card text (= `text-foreground`) |

---

← [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) | → [02 — Typography & utilities](./02-typography-utilities.md)

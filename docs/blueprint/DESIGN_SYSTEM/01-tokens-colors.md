# Design System — 01: Core Rules & Color Tokens

← [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) | [Blueprint INDEX](../INDEX.md) | [02 — Typography & utilities →](./02-typography-utilities.md)

Token source: [src/app/globals.css](../../../src/app/globals.css) `@theme {}` block.

---

## Core Rules

| Rule | Detail |
|---|---|
| Theme | Dark-only, warm espresso neutrals (hue ~60) with a crema/amber primary and a sea-teal accent. `color-scheme: dark` global. No light/dark toggle. The Payload admin has its own theme in `src/app/(payload)/custom.css` → [CMS.md](../CMS.md). |
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

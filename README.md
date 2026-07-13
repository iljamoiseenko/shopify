# Shopify Product Card Component

A product card component built from scratch with TailwindCSS on top of a headless-friendly
Shopify (Dawn-based) theme.

## What's implemented

- **Sale badge + markdown pricing** — an "On Sale!" pill badge and a struck-through compare-at
  price appear automatically when a product's `compare_at_price` is higher than its price.
- **Color swatches** — clicking a swatch swaps the card's main image to that variant's image.
  Falls back to a small thumbnail swatch when the option value isn't a recognizable color name.
- **Secondary image on hover** — hovering the card cross-fades to the product's second image
  (pure CSS, no JS) using `group-hover`.
- **Title, brand (vendor), and price** are always shown.

## Where it lives

- [`snippets/product-card.liquid`](snippets/product-card.liquid) — the card markup/logic.
- [`assets/product-card.js`](assets/product-card.js) — a small custom element (`<product-card-swatches>`)
  that handles swatch clicks.
- [`sections/product-card-grid.liquid`](sections/product-card-grid.liquid) — a demo section (theme-editor
  configurable, pick any products as blocks) used to showcase the card.
- The demo section is wired into `templates/index.json` ("Product card component demo") so it's visible
  on the store's home page.

## TailwindCSS setup notes

- Tailwind is compiled via the CLI into `assets/tailwind.css` and loaded from `layout/theme.liquid`
  alongside the theme's own `base.css`.
- All utility classes are prefixed with `tw-` (see `tailwind.config.js`) so they can't collide with the
  theme's existing class names (e.g. Dawn already defines its own `.grid`).
- `corePlugins.preflight` is disabled to avoid resetting the rest of the theme's styles. Because of this,
  `tw-border` needs `tw-border-solid` alongside it (Preflight normally supplies the base `border-style: solid`).
- The theme sets `html { font-size: 62.5% }` (Dawn's own `1rem = 10px` convention), so Tailwind's default
  rem-based spacing/font-size/border-radius scale would render ~37% too small. `tailwind.config.js`
  overrides those scales with fixed px values instead.

## Running locally

Requires Node 20.16+ / 22+ (the Shopify CLI needs it) and the Shopify CLI logged into the store.

```bash
npm install
npm run dev   # runs `tailwindcss --watch` and `shopify theme dev` together
```

Then open the local preview URL printed by the CLI (defaults to `http://127.0.0.1:9292`).

To produce a production CSS build only:

```bash
npm run build:css
```

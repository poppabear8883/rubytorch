# RubyTorch: landing page

A single-page, ultra-dark marketing site for RubyTorch LLC, built with React 19, Vite 8, Tailwind CSS v4 and `motion`.

## Run it

```bash
cd site
NODE_ENV=development npm install --include=dev   # the shell here has NODE_ENV=production; plain `npm install` elsewhere
npm run dev        # http://localhost:5173  (component kit at /__kit, dev only)
npm run build      # runs the contrast gate first (prebuild), then tsc + vite build
```

Tests run from the project root (`playwright.config.ts`, projects at 360, 768 and 1440 px):

```bash
npm install                      # in the project root: installs @playwright/test
npx playwright test              # blocking + non-blocking specs in site/tests
node scripts/shots.mjs 1440 900  # mid-scroll screenshots into .shots/
node scripts/fps.mjs             # rough scroll smoothness check
```

## Brand system

| Token | Hex | Role |
|---|---|---|
| graphite / surface | #0B0B0F | Page background. The only surface for small Ember text. |
| surface-alt | #121216 | Alternate bands (Graphite mixed 3% toward Ivory). |
| surface-raised | #1E1D21 | Menu sheet, chip row, form panel (8% mix). No Crimson text on it (2.99:1). |
| ivory / ink | #F5F2F0 | Headings and body text |
| blush / muted | #E7C7CF | Secondary text. Hairlines use blush at 15%. |
| ember | #E13A5B | Small ruby text (labels, active index), on Graphite only (4.64:1) |
| crimson | #C81E4A | Large type (24px and up), rules, progress bar, primary button with Ivory text |
| ruby | #B0103A | Button hover, front flame. Never text. |
| deep-ruby | #8B0029 | Back flame, image falloff. Never text. |

`scripts/contrast.mjs` reads these tokens from `src/index.css` and **fails the build** if any text pair drops below AA. The measured values are written to the bottom of `index.css` (`npm run contrast`).

The fonts are **Sora** (display) and **Inter** (body and labels). Both are self-hosted through `@fontsource-variable`, so there are no external requests.

## Logo

`src/components/Logo.tsx` uses the **official artwork** Mike supplied. Masters (and the palette sheet) are in `raw/brand/`; trimmed transparent PNGs are in `public/brand/` (`flame.png`, `torch.png`). Favicons (`public/favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`) are generated from the flame. The handle is Ivory on transparent, so the logo is for dark backgrounds only. If vendor SVGs arrive, drop them in and point `SRC` in `Logo.tsx` at them.

## Images

Every image is listed in `src/content/images.ts`. Masters are in `site/raw/*.png`. Running `npm run images` grades them toward Crimson, runs colour QA (rejects orange or magenta) and writes WebP files to `public/images/`.

| Image | Status |
|---|---|
| hero-desktop (≥1024px), hero-mobile (<1024px) | final |
| approach, cta | final |
| product-cinderlens, product-flintpath, product-brasswire, product-kilnshift | **placeholder** (tagged in dev) |

To replace a product shot, drop a 3:2 PNG into `raw/` under the same name, run `npm run images`, and set `status: 'final'`.

Known limit: the hero source is 1536 px wide, so it looks slightly soft on 1920 px+ or retina screens. You can drop in higher-resolution finals without any code changes.

## Fictional content to replace

- **Products:** Cinderlens, Flintpath, Brasswire and Kilnshift, with all their copy, are invented (`src/content/products.ts`). Ashline and Coalface were dropped because they collide with existing software companies. The web check isn't a trademark clearance.
- **Company copy:** the thesis, approach, principles and contact text are in `src/content/copy.ts`. They describe a model ("owned for the long term", "secure by default") that RubyTorch should confirm.
- **Contact form:** a demo. Submitting shows "Thanks — this demo form isn't connected yet." Footer Privacy and Terms links go to `#`.

## Review status

- **Visual cross-review (@ui-ux): done.** Fixes made and re-screenshotted:
  - Contact fields have a 2px Ivory focus outline.
  - Placeholder text is raised to 75% Blush (AA on the form panel).
  - Section labels no longer carry numbers, so 01–04 belongs only to the products.
  - The mobile product chip row has a right-edge fade that clears at the end of the row.
- **Copy, CTA, mobile and a11y sign-off (@ux): pending.** @ui-ux's mechanical checks found no problems. Mike can waive this sign-off.
- Playwright: 31 passed, 0 failed, 2 skipped (the mobile-menu test is skipped at 1440 by design).
- `npm run build` warns that the JS chunk is over 500 kB. This is cosmetic for now; code-split `motion` if it matters.

## Next steps

- Official SVG logo (the PNGs are crisp up to ~450px tall; SVG would be sharper beyond that)
- OG / social card
- A real form endpoint
- Real product screenshots and proof points
- Prerendering, so the page has content before JS runs

# RubyTorch: landing page

A single-page, ultra-dark marketing site for RubyTorch LLC and its three products — **ForceIDE**, **Collab AI Pro** and **Phoenix** — built with React 19, Vite 8, Tailwind CSS v4 and `motion`. It is written for companies and small development teams.

## Run it

```bash
NODE_ENV=development npm install --include=dev   # the shell here has NODE_ENV=production; plain `npm install` elsewhere
npm run dev        # http://localhost:5173  (component kit at /__kit, dev only)
npm run build      # runs the contrast gate first (prebuild), then tsc + vite build
```

Playwright tests (`playwright.config.ts`, projects at 360, 768 and 1440 px) expect the dev server to be running (they cover the hero video and pause control, the product worlds, the switcher, anchors under the sticky UI, and a text-clipping check at each width):

```bash
npm run test:e2e                 # blocking + non-blocking specs in tests/
```

## Page structure

Nav → Hero (full-bleed video that plays once) → Family (`#about`) → Products (`#products`: sticky switcher + `#forceide`, `#collab-ai-pro`, `#phoenix` worlds) → How we build (`#principles`) → Book a demo (`#contact`) → Footer.

- RubyTorch ruby is the master shell (nav, hero, type, CTAs). Each product world re-tints locally with its own accents, set as `--a1/--a2/--a3` on the section.
- Each world has the product mark, name, category, headline, summary, a "Built for" line, a graphic with a small animated CSS motif (ForceIDE validate → review gate → deploy; Collab AI Pro model voices converging; Phoenix Backlog → Complete board with approval ticks), four features, a trust line and a CTA. Motifs are in `src/components/motifs/`.
- The hero video is decorative (`aria-hidden`), muted and plays once, then holds on its final frame (the pause control disappears when it ends). It is replaced by the still poster under `prefers-reduced-motion`, Data Saver or a failed load; it pauses off screen and has a visible pause button.

## Content and links

- Copy lives in `src/content/` (`copy.ts`, `products.ts`, `nav.ts`). The copy came from the product copy deck and is grounded in the product descriptions; nothing is invented (no metrics, pricing or customer names).
- **External URLs are in one place: `src/content/links.ts`.** Phoenix goes to https://phoenixaipro.com (opens in a new tab). ForceIDE and Collab AI Pro have no public site yet, so their CTAs read "Book a demo" and go to `#contact`, preselecting "Product of interest" in the form.
- Hero video sources are listed in `src/content/media.ts` (`hero.webm`, then `hero.mp4`).

## Brand system

| Token | Hex | Role |
|---|---|---|
| graphite / surface | #0B0B0F | Page background. The only surface for small Ember text. |
| surface-alt | #121216 | Alternate bands (Graphite mixed 3% toward Ivory). |
| surface-raised | #1E1D21 | Menu sheet, form panel, motif cards (8% mix). No Crimson text on it (2.99:1). |
| ivory / ink | #F5F2F0 | Headings and body text |
| blush / muted | #E7C7CF | Secondary text. Hairlines use blush at 15%. |
| ember | #E13A5B | Small ruby text on Graphite only (4.64:1) |
| crimson | #C81E4A | Large type (24px and up), rules, primary button with Ivory text |
| ruby | #B0103A | Button hover. Never text. |
| deep-ruby | #8B0029 | Image falloff. Never text. |

Product accents (marks, rules, glows, motifs; text only where listed): ForceIDE `fx-blue #1060FF` → `fx-cyan #00E5FF`; Collab AI Pro `cb-orange #FF7A3D`, `cb-teal #08C99B`, `cb-violet #6E4BFF`; Phoenix `ph-flame #F0471A` → `ph-amber #FFB11F`. The only accent colours used for small text are `fx-cyan`, `cb-teal` and `ph-amber`.

`scripts/contrast.mjs` reads these tokens from `src/index.css` and **fails the build** if any text pair drops below AA. It checks Ivory, Blush and each accent label against Graphite, surface-alt and every product glow stop mixed 32% into Graphite, and the non-text accents at 3:1. The measured values are written to the bottom of `index.css` (`npm run contrast`).

Fonts: **Sora** (display), **Inter** (body) and **Saira Condensed** (500/600/700, latin only, for the tracked uppercase labels). All are self-hosted through `@fontsource`, so there are no external requests.

## Logo and product marks

`src/components/Logo.tsx` uses the official RubyTorch artwork (`public/brand/flame.png`, `torch.png`; masters in `raw/brand/`). The handle is Ivory, so it is for dark backgrounds only.

The product marks in `public/brand/` (`forceide-mark.png`, `collab-mark.png`, `phoenix-mark.png`) are generated from Mike's files in `raw/brand/incoming/` by `node scripts/marks.mjs`: it keys out the ForceIDE black background, clears fringe pixels and trims each mark. The brand board (`rubytorch-brand-board.png`) is the design reference.

## Images and video

Every image is listed in `src/content/images.ts`. The product art, family backdrop, hero poster and hero video are final, generated media (masters in `raw/`, outputs in `public/images/` and `public/video/`).

| Asset | Used for |
|---|---|
| `public/video/hero.webm`, `hero.mp4`, `images/hero-poster.webp` | Hero video "Forge" (Higgsfield kling-video v4.0, master `raw/hero-v2/c.mp4`; 8 s, plays once: fades in from black and ends on the assembled monolith; the poster is that final frame). Other candidates are in `public/video/candidates/` and `raw/hero-v2/`; v1 is in `raw/hero-v1/`. |
| `images/product-forceide.webp`, `product-collab.webp`, `product-phoenix.webp` | Product world graphics (blue/cyan, orange/teal/violet, flame/amber) |
| `images/family.webp` | Decorative backdrop of the Family band |
| `images/approach.webp`, `cta.webp` | How we build panel, Contact backdrop |
| `images/hero-desktop.webp`, `hero-mobile.webp` | Fallback if the poster fails to load |

**Do not run `npm run images` over the product art.** `scripts/images.mjs` grades every `raw/*.png` toward Crimson and rejects non-ruby colours, so it would recolour or fail the blue, orange, teal and amber product images. It is only for the ruby-graded masters (hero, approach, cta).

The old placeholder files (`public/images/product-{cinderlens,flintpath,brasswire,kilnshift}.webp` and their `raw/` masters) are no longer referenced; they can be deleted.

## Review status

- Playwright (`playwright.config.ts`, projects at 360, 768 and 1440 px): see the latest run in the task report. The mobile-menu test is skipped at 1440 by design. The `@visual` snapshots (hero and the ForceIDE band at 360 and 1440) were regenerated for this design.
- Copy, CTA, mobile and a11y sign-off (@ux): pending. Mike can waive it.
- Facts to confirm before launch: the product descriptions come from internal summaries, and third-party names (Salesforce, GitHub, Claude, GPT, Codex and others) are used descriptively. "Phoenix" is a common name and has not been through a trademark check.

## Next steps

- Official SVG logo and product marks (the PNGs are crisp up to about 450px tall)
- OG / social card image
- A real form endpoint (the form is a demo: it shows "Thanks — this demo form isn't connected yet.")
- Real product screenshots and public URLs for ForceIDE and Collab AI Pro (put them in `src/content/links.ts`)
- Privacy and Terms pages (footer links go to `#`)
- Prerendering, so the page has content before JS runs

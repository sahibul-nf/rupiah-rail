# Rupiah Rail

Static landing page for an early-stage settlement-infrastructure concept: a calmer cash-out path from stablecoins to Indonesian bank accounts. The site is for partnership and technical-validation discovery. It is not a live product, does not collect financial data, and does not connect wallets.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The default Astro URL is `http://localhost:4321`. For a fixed uncommon port:

```bash
npx astro dev --host --port 4327
```

## Production build

```bash
npm run build
```

Output is written to `dist/` as a static site. Preview it with `npm run preview`.

## Netlify deployment (GitHub)

1. Push this repository to GitHub.
2. In Netlify, add a new site → Import from Git → select the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy. `netlify.toml` already sets these values.

No environment variables, functions, or identity features are required.

## Stack and dependencies

- **Astro** (static output) + **TypeScript** + **Tailwind CSS v4**
- **React** (`@astrojs/react`) only to host Motion islands
- **Motion for React** (`motion`) for three restrained interactions:
  1. Hero content reveal on load
  2. Staggered reveal of the three “How it could work” steps
  3. Subtle button/card hover translation (color/border still comes from CSS)

`MotionConfig` is set to `reducedMotion="user"`. When the OS prefers reduced motion, transforms are omitted and opacity-only transitions remain.

No backend, database, authentication, analytics, or API keys.

## 21st.dev

No 21st.dev components were copied or installed. Community blocks reviewed (marketing heroes, Charter-style templates, announcement banners, alert dialogs) added Radix/shadcn weight without improving this copy-led page. UI is original Tailwind plus the Motion islands above.

Typography uses the system UI font stack (no external font CDN).

## Copy and compliance

All visitor-facing strings live in `src/data/copy.ts`. Illustrative quotes are labeled as such. The status strip, Privacy, and Terms pages state that this is not a live financial service and that the project is not affiliated with MiniPay, Celo, PEXX, Noah, or their affiliates.

## Project layout

```
src/
  data/copy.ts
  layouts/BaseLayout.astro
  pages/index.astro
  pages/privacy.astro
  pages/terms.astro
  components/          # header, sections, footer
  components/react/    # Motion islands
  styles/global.css
public/favicon.svg     # original geometric mark
```

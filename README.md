# Matheus Reis — Portfolio

Single-page, bilingual (EN default / PT-BR) portfolio. React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · Motion · react-i18next · Lucide.

## Run

```bash
npm install --legacy-peer-deps   # (typescript-eslint peer ranges lag behind newest TS)
cp .env.example .env             # set VITE_SITE_URL, VITE_CONTACT_EMAIL, VITE_LINKEDIN_URL
npm run dev                      # http://localhost:5173
npm run build && npm run preview # production build on :4173
```

Quality: `npm run lint` · `npx tsc -b` · `npm test` (Vitest) · `npm run e2e` (Playwright + axe; builds and serves the production bundle).

## Edit content

| What | Where |
|---|---|
| Contact links, availability flag | `src/data/profile.ts` (or `.env`) — empty values are hidden everywhere |
| Companies | `src/data/experience.ts` |
| Technology categories | `src/data/technologies.ts` (+ titles in locales) |
| Certifications | `src/data/certifications.ts` — `status: 'completed' | 'in-progress'`; images go in `public/images/certs/` |
| Projects | `src/data/projects.ts` + `projects.items.<id>` in both locale files |
| All copy | `src/i18n/locales/{en,pt-BR}/translation.json` (a test enforces key parity) |

Case studies: add any of `problem`, `challenge`, `approach`, `decisions`, `contribution`, `results` under a project's locale entry and they appear in its dialog automatically. Add `repoUrl` / `liveUrl` in the data file only for public repos.

## Résumé (ATS-friendly)

`npm run cv` builds `public/cv/Matheus-Reis-CV-pt-BR.pdf` and `-en.pdf` from `scripts/cv/content.mjs` (single column, real text, standard headings, no tables or images). The site's **Download CV** button picks the PDF for the visitor's language and only appears when the file exists.

## Deploy

Static output in `dist/` — deploy to Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3+CDN. Before deploying set `VITE_SITE_URL` (canonical, OG image, JSON-LD) and update `public/robots.txt` and `public/sitemap.xml` with the real domain.

## Design notes

Fonts: Sora (display), Instrument Sans (body), JetBrains Mono (small technical labels), self-hosted via Fontsource. Tokens live in `src/styles/index.css`.
# matheus-portifolio

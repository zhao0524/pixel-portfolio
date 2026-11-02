hello

# Pixel Portfolio

An interactive pixel-art workspace overlooking the Toronto skyline, built with Next.js.
Click the laptop to open the portfolio; click the lamp (or the top-right button) to switch between day and night.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

- `src/app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`, `Portfolio.tsx`)
- `src/components/` — design-system components ported from the Magic Patterns export
- `magic-patterns-design/` — the original Magic Patterns (Vite) export, kept for reference; excluded from the Next.js build and lint

## Editing content

Portfolio text (name, bio, projects, experience, email) lives in `src/components/LaptopScreen/index.tsx` defaults,
and the scene passes `name="David Zhao"` from `src/components/WorkspaceScene/index.tsx`.

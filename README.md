hello

# Pixel Portfolio

An interactive pixel-art portfolio: a cozy desk in front of a floor-to-ceiling window overlooking the Toronto skyline
(CN Tower, Rogers Centre, the lake and sailboats). The design was created in [Magic Patterns](https://magicpatterns.com)
and implemented as a Next.js app.

## Features

- **Laptop zoom** — click the laptop (or focus it and press Enter/Space) to zoom into the screen and open the portfolio.
  Close with the button or `Esc`.
- **Portfolio screen** — retro terminal UI with About, Projects, Experience and Contact tabs.
- **Day / night** — click the desk lamp or the top-right button to switch themes; the skyline lights up and the lamp glows at night.
- **Live desk clock** showing the visitor's local time.
- Keyboard accessible and respects `prefers-reduced-motion`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 3.4 with design tokens as CSS variables
- Framer Motion for animations, Lucide for icons

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx        # root layout, metadata, fonts
    page.tsx          # home page
    Portfolio.tsx     # client wrapper that renders the scene and syncs the page background with the theme
    globals.css       # Tailwind + design tokens (colors, shadows, spacing)
  components/
    WorkspaceScene/   # top-level scene: layering, day/night, laptop zoom
    LaptopScreen/     # portfolio content shown inside the laptop
    BackgroundSkyline/# Toronto skyline (day/night)
    ...               # other design-system components (Button, Card, Badge, NavTabs, Clock, ...)
magic-patterns-design/ # original Magic Patterns (Vite) export, kept for reference
```

`magic-patterns-design/` is not part of the app: it is excluded from the TypeScript build and ESLint.

## Content

The portfolio currently uses **placeholder content** (bio, projects, experience and `hello@example.com`).
It is defined in the defaults of `src/components/LaptopScreen/index.tsx`, and the displayed name is passed in
`src/components/WorkspaceScene/index.tsx`.

## Deployment

To be decided.

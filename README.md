hello

# Pixel Portfolio

An interactive pixel-art portfolio: a cozy desk in front of a floor-to-ceiling window overlooking the Toronto skyline
(CN Tower, Rogers Centre, the lake and sailboats). The design was created in [Magic Patterns](https://magicpatterns.com)
and implemented as a Next.js app.

## Features

- **Laptop zoom** — click the laptop (or focus it and press Enter/Space) to zoom into the screen and open the portfolio.
  Close with the button or `Esc`.
- **Portfolio screen** — retro terminal UI with About (bio and resume), Projects, Experience and Contact tabs.
- **Desk buddy chat** — click the character under the lamp (or its speech bubble) to ask questions about David.
  Answers come from Google Gemini, using only the portfolio content and resume.
- **Day / night** — click the desk lamp or the top-right button to switch themes; the skyline lights up and the lamp glows at night.
- **Live desk clock** showing the visitor's local time.
- Keyboard accessible and respects `prefers-reduced-motion`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 3.4 with design tokens as CSS variables
- Framer Motion for animations, Lucide for icons
- Google Gemini API (called from a server route) for the desk buddy chat

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then add your GEMINI_API_KEY
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | For the chat | Google Gemini API key ([create one](https://aistudio.google.com/apikey)). Server-only; never exposed to the browser. Without it the chat replies that it's offline. |
| `GEMINI_MODEL` | No | Gemini 3.x model to use. Defaults to `gemini-3.5-flash`; busy or slow requests retry on `gemini-3.5-flash-lite`. |

Put real values in `.env.local` (git-ignored). Set the same variables in your hosting provider when deploying.

## Project structure

```
src/
  app/
    layout.tsx        # root layout, metadata, fonts
    page.tsx          # home page
    Portfolio.tsx     # client wrapper that renders the scene and syncs the page background with the theme
    api/chat/route.ts # desk buddy chat: builds the prompt from the content files and calls Gemini
    globals.css       # Tailwind + design tokens (colors, shadows, spacing)
  components/
    WorkspaceScene/   # top-level scene: layering, day/night, laptop zoom, desk buddy
    LaptopScreen/     # portfolio content shown inside the laptop
    ClaudeChat/       # desk buddy chat window
    BackgroundSkyline/# Toronto skyline (day/night)
    ...               # other design-system components (Button, Card, Badge, NavTabs, Clock, ...)
  content/
    portfolio.ts      # about (name, role, bio), projects, experience, contact links and resume path
    resume.ts         # plain-text resume used as chat knowledge
public/
  David_Zhao_swe.pdf  # resume shown in the About tab
  projects/           # project screenshots
magic-patterns-design/ # original Magic Patterns (Vite) export, kept for reference
```

`magic-patterns-design/` is not part of the app: it is excluded from the TypeScript build and ESLint.

## Content

- **Projects, experience, contact links and resume path** live in `src/content/portfolio.ts` and are passed to the
  laptop screen from `src/app/Portfolio.tsx` (and to the chat from `src/app/api/chat/route.ts`).
- **Name, role and bio** are `ABOUT` in `src/content/portfolio.ts`.
- **Project screenshots** go in `public/projects/` and are referenced by each project's `image` field. Projects
  without one show a "Screenshot coming soon" placeholder.
- **Resume** is `public/David_Zhao_swe.pdf`; replace the file (keeping the name) to update it, and update the text
  copy in `src/content/resume.ts` so the chat knows about the changes.
- The **chat** answers only from these files, so updating them updates what it knows.

## Deployment

To be decided.

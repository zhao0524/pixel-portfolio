<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Commands: `npm run dev`, `npm run build`, `npm run lint`.
- `magic-patterns-design/` is the original Magic Patterns export; keep it, but it is excluded from tsconfig and ESLint.
- Styling uses Tailwind CSS 3.4 (`tailwind.config.mjs`) with design tokens as CSS variables in `src/app/globals.css`.
- Commit messages must not mention AI.

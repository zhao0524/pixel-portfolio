# Card

Pixel-bordered content card for project entries and experience items on the portfolio screen. Thick 4px border, hard offset shadow (no blur, no radius), monospace type. Interactive cards "lift" on hover and "press" flat on click.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `ReactNode` | – | Uppercase bold heading (project / role) |
| `subtitle` | `ReactNode` | – | Secondary line (company, project type) |
| `meta` | `ReactNode` | – | Boxed label top-right (date / range) |
| `media` | `ReactNode` | – | Visual slot above content, pixelated rendering |
| `tags` | `string[]` | – | Rendered as dark pixel chips |
| `footer` | `ReactNode` | – | Dashed-divider footer for links/actions |
| `variant` | `'default' \| 'accent' \| 'muted'` | `'default'` | White, amber highlight, or grey archived |
| `interactive` | `boolean` | `!!href` | Hover lift / press effect + focus ring |
| `href` / `target` | `string` | – | Renders as `<a>` instead of `<article>` |
| `className` | `string` | – | Merged via `tailwind-merge` |

## Usage

```tsx
import { Card } from 'components/Card'

<Card
  title="Pixel Quest"
  subtitle="Browser RPG"
  meta="2025"
  tags={['React', 'Canvas']}
  href="/projects/pixel-quest"
  footer={<span className="underline">View project →</span>}
>
  A retro dungeon crawler.
</Card>

<Card title="Frontend Engineer" subtitle="Acme Studio" meta="2023 – Now">
  Built the design system.
</Card>
```

Notes: leave ~4px extra room right/bottom for the offset shadow. Use `accent` sparingly for featured items.

# Logo

David Zhao portfolio wordmark: an 8×8 pixel "D" monogram glyph plus the name set in **Pixelify Sans**. Used in the laptop-screen nav/header.

> Placeholder: the linked repo contains no logo asset (README only). This is a proposed pixel-art mark pending a real asset.

The component loads Pixelify Sans from Google Fonts on mount (falls back to monospace).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Scales text and glyph together |
| `tone` | `'dark' \| 'light'` | `'dark'` | `light` for dark backgrounds |
| `showGlyph` | `boolean` | `true` | Pixel monogram |
| `showText` | `boolean` | `true` | Wordmark |
| `name` | `string` | `'David Zhao'` | Wordmark text |
| `href` | `string` | — | Renders a focusable link with hover/focus states |
| `className` | `string` | — | |

Also exports `PixelGlyph` (`size`, `className`) — glyph uses `currentColor`.

## Usage

```tsx
import { Logo } from 'components/Logo'

<header className="bg-zinc-900 px-5 py-3">
  <Logo tone="light" href="/" />
</header>

<Logo size="lg" showText={false} />
```

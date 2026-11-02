# BooksLeft

Optional pixel-art decor: a stack of books lying flat, meant to sit on the left side of the portfolio desk scene. Rendered as a crisp-edged SVG that scales by whole art pixels.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `books` | `BookSpec[]` | `DEFAULT_BOOKS` | Bottom → top. Each: `color`, `shade`, `length?` (18), `thickness?` (4), `offset?` (0) in art pixels |
| `pixelSize` | `number` | `4` | CSS px per art pixel |
| `withMug` | `boolean` | `false` | Adds a small mug on top |
| `label` | `string` | — | Accessible label; when omitted the SVG is `aria-hidden` (decorative) |
| `className` | `string` | `''` | Extra classes on the `<svg>` |

## Usage

```tsx
import { BooksLeft } from 'components/BooksLeft'

<div className="flex items-end">
  <BooksLeft pixelSize={3} withMug />
</div>
```

Align to the desk surface with `items-end` so the bottom book rests on the desk line.

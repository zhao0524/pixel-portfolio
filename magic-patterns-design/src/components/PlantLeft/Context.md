# PlantLeft

Optional left-side potted plant decor drawn as pixel art (16×22 grid of SVG rects with crisp edges). Use it to dress the bottom-left corner of pixel-style scenes, rooms, or hero sections.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `pixelSize` | `number` | `6` | Size of one art pixel in px (output is `16×pixelSize` by `22×pixelSize`). |
| `pot` | `'terracotta' \| 'stone' \| 'cream'` | `'terracotta'` | Pot color variant. |
| `label` | `string` | — | Accessible label. Omit for purely decorative use (renders `aria-hidden`). |
| `className` | `string` | — | Extra classes (e.g. positioning). |
| `style` | `CSSProperties` | — | Inline styles merged onto the SVG. |

## Usage

```tsx
import { PlantLeft } from 'components/PlantLeft'

<div className="relative h-64">
  <PlantLeft className="absolute left-3 bottom-0" />
</div>

<PlantLeft pot="stone" pixelSize={4} label="Potted plant" />
```

## Notes
- Leaves lean right, so place it on the left edge of a composition.
- Use integer `pixelSize` values to keep pixels sharp.

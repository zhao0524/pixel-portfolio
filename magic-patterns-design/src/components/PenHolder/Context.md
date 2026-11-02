# PenHolder

Optional pixel-art pen holder decor prop for the portfolio desk scene. Pure SVG on a 16×20 pixel grid rendered with `crispEdges`, so it scales without blurring.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'slate' \| 'terracotta' \| 'mint'` | `'slate'` | Cup color palette |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Width 48 / 80 / 128px |
| `pens` | `number` | `3` | Pens shown in the cup (clamped 0–4) |
| `label` | `string` | `'Pen holder'` | Accessible label. Pass `''` to mark decorative (`aria-hidden`) |
| `className` | `string` | `''` | Extra classes (e.g. absolute positioning on the desk) |

## Usage

```tsx
import { PenHolder } from 'components/PenHolder'

<PenHolder />
<PenHolder variant="terracotta" size="lg" pens={4} />
<div className="relative">
  <PenHolder size="sm" label="" className="absolute bottom-2 right-6" />
</div>
```

## Notes
- Non-interactive decor; use `label=""` when purely ornamental.
- Bottom of the SVG is the cup base, so align with `items-end` on a desk surface.

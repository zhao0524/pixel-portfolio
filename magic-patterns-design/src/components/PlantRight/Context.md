# PlantRight

Optional right-side decor: a potted plant drawn as pixel art (16×20 grid of SVG rects, `crispEdges`). Use it to dress the right edge of hero sections, room scenes, or footers in the pixel portfolio. Decorative by default (`aria-hidden`), non-interactive (`pointer-events-none`).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pixelSize` | `number` | `6` | Pixel cell size in px. Rendered size = 16×pixelSize by 20×pixelSize. |
| `palette` | `'leafy' \| 'autumn' \| 'night'` | `'leafy'` | Leaf and pot color scheme. |
| `anchored` | `boolean` | `false` | Pins to `absolute bottom-0 right-0` of the nearest positioned parent. |
| `sway` | `boolean` | `true` | Stepped foliage sway; disabled under `prefers-reduced-motion`. |
| `label` | `string` | — | If provided, exposes the plant as `role="img"` with this label. |
| `className` | `string` | `''` | Extra classes (e.g. margins to offset from the corner). |

`PLANT_RIGHT_MAP` (string[]) is also exported for reuse.

## Usage

```tsx
import { PlantRight } from 'components/PlantRight'

<section className="relative min-h-[400px]">
  {/* content */}
  <PlantRight anchored pixelSize={8} className="mr-6" />
</section>
```

# DeskSurface

Warm, pixel-style wood desk plane that spans the bottom of a scene and anchors the laptop and desk decor. Built from flat solid-color bands (top surface, back highlight, front edge, contact shadow) with optional pixel grain streaks — no gradients.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'oak' \| 'walnut' \| 'maple'` | `'oak'` | Wood finish |
| `height` | `number \| string` | `160` | Total desk height (px or CSS length) |
| `edgeHeight` | `number` | `28` | Front edge band height in px |
| `showGrain` | `boolean` | `true` | Render pixel grain streaks |
| `anchored` | `boolean` | `false` | `absolute bottom-0 inset-x-0` — pin to bottom of a `relative` scene |
| `itemsInset` | `number` | `24` | Px that children sink into the desk top so they look grounded |
| `children` | `ReactNode` | — | Items placed on the desk, centered and bottom-aligned with a gap |
| `className` | `string` | — | Extra classes on the root |

`DESK_PALETTES` is exported for matching other scene elements to the wood colors.

## Usage

```tsx
import { DeskSurface } from 'components/DeskSurface'

<div className="relative h-screen w-full overflow-hidden bg-[#F3E6CF]">
  <DeskSurface anchored tone="oak" height={180}>
    <Laptop />
    <Mug />
  </DeskSurface>
</div>
```

The component is decorative (`role="presentation"`); give placed items their own accessible labels.

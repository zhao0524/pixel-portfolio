# Button

Pixel-styled button primitive used throughout the laptop-screen portfolio content. Square corners, monospace uppercase label, and a chunky notched "pixel" frame drawn with stacked box-shadows plus a hard drop shadow that collapses when pressed.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'solid' \| 'outline'` | `'solid'` | Solid = ink fill / white text; outline = white fill / ink text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Frame is 3px on `sm`, 4px otherwise |
| `loading` | `boolean` | `false` | Shows a stepped pixel spinner, disables the button |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Use lucide icons at 14px |
| ...native button attrs | | | `type` defaults to `button` |

The frame is drawn outside the box and the component adds a matching margin, so siblings won't overlap it. Use `gap-6` between adjacent buttons.

## Usage

```tsx
import { Button } from 'components/Button'
import { ArrowRightIcon } from 'lucide-react'

<Button>Start</Button>
<Button variant="outline" rightIcon={<ArrowRightIcon size={14} />}>View work</Button>
<Button size="lg" loading>Saving</Button>
```

`pixelFrame(px, color, drop?)` is exported for reuse in other pixel-bordered surfaces.

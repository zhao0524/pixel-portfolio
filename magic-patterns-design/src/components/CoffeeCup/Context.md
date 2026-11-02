# CoffeeCup

Pixel-art desk coffee cup (with saucer) and a subtle looping steam wisp. A decorative prop for the pixel portfolio desk scene. Rendered as a crisp-edged SVG on a 16×20 pixel grid; steam is animated with framer-motion and turns off automatically when the user prefers reduced motion.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `number` | `64` | Width in px; height scales to 20/16 of width. Use multiples of 16 for crisp pixels. |
| `variant` | `'cream' \| 'red' \| 'blue' \| 'black'` | `'cream'` | Mug color palette. |
| `steaming` | `boolean` | `true` | Shows the steam wisps. |
| `speed` | `number` | `2.4` | Steam loop duration (seconds). Vary between cups to avoid sync. |
| `label` | `string` | `'Coffee cup'` | Accessible label; pass `''` to mark as decorative. |
| `className` | `string` | — | Positioning classes. |

## Usage

```tsx
import { CoffeeCup } from 'components/CoffeeCup'

<CoffeeCup />
<CoffeeCup size={96} variant="red" speed={3} />
<CoffeeCup steaming={false} label="" className="absolute bottom-4 right-8" />
```

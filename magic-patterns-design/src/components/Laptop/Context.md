# Laptop

Open pixel-art laptop — the scene's focal point. Clicking it zooms the screen (shared-layout animation via framer-motion) into a full-viewport dialog that reveals nested `children`. Close with the X button, Esc, or by clicking the backdrop.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content shown inside the zoomed screen |
| `idleLabel` | `string` | `'CLICK TO OPEN'` | Text on the idle screen (blinking cursor appended) |
| `screenTitle` | `string` | `'portfolio.exe'` | Window title + dialog aria-label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Pixel unit (3 / 4 / 5px) |
| `zoomed` | `boolean` | — | Controlled zoom state |
| `defaultZoomed` | `boolean` | `false` | Initial state when uncontrolled |
| `onZoomChange` | `(z: boolean) => void` | — | Zoom change callback |
| `disabled` | `boolean` | `false` | Render as static art |
| `className` | `string` | — | Extra classes on the laptop button |

Also exports `LAPTOP_PALETTE` (PICO-8-inspired colors) and `pixelBorder(unit, color)` for notched pixel borders.

## Usage

```tsx
import { Laptop } from 'components/Laptop'

<Laptop screenTitle="about.exe">
  <h2 className="text-2xl font-bold text-[#29adff]">Hi, I'm David.</h2>
</Laptop>
```

## Notes
- Dimensions are multiples of the pixel unit; keep it on whole pixels for crisp art.
- Content inside the zoomed screen inherits monospace font and light text on navy `#1d2b53`.

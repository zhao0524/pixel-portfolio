# Lamp

A modern pixel-art desk lamp that works as the app's light/dark theme toggle. When it's **on** (light theme), the bulb lights up, the shade turns amber, and a warm glow and stepped light beam appear. When it's **off** (dark theme), it shows the unlit lamp.

Renders as a `button` with `role="switch"` and `aria-checked`, so it works with the keyboard and screen readers. Pixels stay sharp because the SVG uses `shapeRendering="crispEdges"`. Animations use framer-motion.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `on` | `boolean` | — | Controlled state. `true` = light theme. |
| `defaultOn` | `boolean` | `false` | Starting state when uncontrolled. |
| `onToggle` | `(on: boolean) => void` | — | Called with the next state when clicked. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Lamp width of 48 / 80 / 128px. |
| `syncDocumentTheme` | `boolean` | `false` | Toggles the `dark` class on `<html>` (off = dark). |
| `showLabel` | `boolean` | `false` | Shows a "Light"/"Dark" pixel caption. |
| `label` | `string` | `'Toggle light theme'` | Accessible name. |
| `disabled` | `boolean` | `false` | Turns off interaction. |
| `className` | `string` | `''` | Classes added to the wrapper. |

## Usage

```tsx
import { Lamp } from 'components/Lamp'

// Uncontrolled, drives Tailwind dark mode directly
<Lamp defaultOn syncDocumentTheme />

// Controlled
const [light, setLight] = useState(true)
<Lamp on={light} onToggle={setLight} showLabel />
```

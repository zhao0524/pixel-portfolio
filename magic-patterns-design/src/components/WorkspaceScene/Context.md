# WorkspaceScene

Top-level pixel-art composition, modeled on the reference photo: a seated view of a honey-wood desk in front of a floor-to-ceiling window, looking out at the Toronto skyline (CN Tower, Rogers Centre dome, lake, sailboats, tree-lined shore). Owns light/dark theme state and the laptop zoom-in.

## Layers (back → front)
1. `BackgroundSkyline` — day and night copies crossfaded by opacity.
2. Window frame — tall charcoal mullions + sill.
3. Desk — warm wood with sun shafts.
4. Desk objects — big plant and succulent in white pots, pen cup, book stack and clock (left); open laptop (center); lamp, white mug with steam, trailing ivy (right).

All art is drawn on the same 320×180 pixel grid as the skyline, so everything stays aligned at any width (16:9).

## Behavior
- **Lamp / top-right button** toggles day ↔ night. At night a plum colour-matrix copy of the room fades in on top (only opacity is animated), the lamp bulb and a warm glow switch on, and the laptop screen and clock keep glowing.
- **Laptop** click (or Enter/Space) zooms the scene into the screen and then opens `LaptopScreen`, or `laptopContent` if you provide it. Close with the button or `Esc`.
- The clock shows the real time and only re-renders itself.
- Motion respects `prefers-reduced-motion`.

## Props
| Prop | Type | Default |
|---|---|---|
| `defaultTheme` | `'light' \| 'dark'` | `'light'` |
| `theme` / `onThemeChange` | controlled theme | — |
| `laptopContent` | `ReactNode` | `<LaptopScreen />` |
| `defaultZoomed` / `onZoomChange` | zoom state | `false` |
| `label` | `string` | scene description |
| `className` | `string` | — |

## Usage
```tsx
import { WorkspaceScene } from 'components/WorkspaceScene'

<WorkspaceScene onZoomChange={(z) => console.log(z)} />
```

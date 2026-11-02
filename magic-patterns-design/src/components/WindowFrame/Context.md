# WindowFrame

Dark modern window frame with mullion dividers. Sits above the desk scene and frames the skyline view. Renders a built-in pixel-style dusk skyline when no children are passed; pass any content as `children` to frame a custom view.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | built-in skyline | Content shown through the glass |
| `columns` | `number` | `3` | Vertical panes (mullions = columns − 1) |
| `rows` | `number` | `1` | Horizontal panes (transoms = rows − 1) |
| `height` | `number` | `320` | Frame height in px; width fills parent |
| `showSill` | `boolean` | `true` | Ledge along the bottom |
| `showReflection` | `boolean` | `true` | Subtle diagonal glass glare |
| `label` | `string` | `'View through the window'` | Accessible label on the `<figure>` |
| `className` | `string` | `''` | Extra classes on the wrapper |

## Usage

```tsx
import { WindowFrame } from 'components/WindowFrame'

<WindowFrame />

<WindowFrame columns={4} rows={2} height={280}>
  <MySkylineScene />
</WindowFrame>
```

## Notes
- Frame and mullions use `zinc-900`, with `zinc-700/800` for the sill; place it on a dark (`zinc-950`) wall.
- Children fill the glass area absolutely (`inset-0`), so make them `h-full w-full`.

# Notebook

Pixel-art desk notebook prop for portfolio scenes. Has closed (cover, label, elastic band, ribbon) and open (ruled spread with handwriting) states. Rendered as a crisp-edged SVG so it scales cleanly by whole pixels.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `'closed' \| 'open'` | `'closed'` | Which state to show |
| `color` | `'brown' \| 'red' \| 'blue' \| 'green'` | `'brown'` | Cover palette |
| `pixelSize` | `number` | `6` | CSS px per art pixel (closed = 24×18 px grid, open = 40×18) |
| `written` | `boolean` | `true` | Show ink scribbles on open pages |
| `onToggle` | `(next) => void` | — | If set, renders as a button that toggles state |
| `label` | `string` | auto | Accessible label |
| `className` | `string` | — | Extra wrapper classes |

## Usage

```tsx
import { Notebook } from 'components/Notebook'

<Notebook state="closed" color="red" />

const [state, setState] = useState<NotebookState>('closed')
<Notebook state={state} onToggle={setState} />
```

Notes: the wrapper aligns art to its bottom edge, so it sits flush on a desk surface. Swapping states cross-fades with a quick horizontal squash.

# Badge

Small pixel-art tag for labeling skills, tech stacks, or project status. Square corners, 2px dark border, hard offset drop shadow, uppercase pixel/monospace type (uses `--font-pixel` if defined, falling back to "Press Start 2P" → monospace).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'outline'` | `'default'` | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height, padding, font size |
| `icon` | `ReactNode` | — | Leading icon (svg sized to 12px) |
| `dot` | `boolean` | `false` | Square status pixel before the label |
| `shadow` | `boolean` | `true` | Hard pixel drop shadow |
| `className` | `string` | — | Extra classes |

Also accepts all native `<span>` attributes and forwards its ref.

## Usage

```tsx
import { Badge } from 'components/Badge'
import { CodeIcon } from 'lucide-react'

<Badge icon={<CodeIcon />}>React</Badge>
<Badge variant="success" dot>Live</Badge>
<Badge variant="primary" size="sm">New</Badge>
```

## Guidelines

- Use `default`/`outline` for skill and tech tags; reserve colored variants for status.
- Pair `dot` with status labels (Live, In progress, Archived).
- Keep labels to 1–2 words.

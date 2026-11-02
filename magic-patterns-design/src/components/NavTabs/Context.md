# NavTabs

Pixel-art tab navigation for switching between portfolio sections (About / Projects / Experience / Contact) inside the laptop screen. Chunky 4px borders, square corners, inset "bevel" shadows, uppercase monospace labels. The active tab is amber and merges into the panel below; inactive tabs are slate and lift on hover.

Accessible: `role="tablist"` / `role="tab"`, roving tabindex, ArrowLeft/ArrowRight/Home/End keyboard navigation (skips disabled tabs).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `NavTabItem[]` | `DEFAULT_NAV_TABS` | `{ id, label, icon?, disabled? }` |
| `value` | `string` | — | Controlled active id |
| `defaultValue` | `string` | first enabled | Uncontrolled initial id |
| `onChange` | `(id: string) => void` | — | Fires on selection |
| `size` | `'sm' \| 'md'` | `'md'` | |
| `fullWidth` | `boolean` | `false` | Tabs stretch to fill |
| `ariaLabel` | `string` | `'Portfolio sections'` | |
| `idPrefix` | `string` | auto | Tabs get `${idPrefix}-tab-${id}`, and `aria-controls="${idPrefix}-panel-${id}"` |
| `className` | `string` | — | |

## Usage

```tsx
import { NavTabs } from 'components/NavTabs'

const [tab, setTab] = useState('about')

<NavTabs value={tab} onChange={setTab} idPrefix="screen" fullWidth />
<div role="tabpanel" id={`screen-panel-${tab}`} aria-labelledby={`screen-tab-${tab}`}
  className="border-4 border-t-0 border-slate-900 bg-amber-300 p-4">
  …
</div>
```

Pair the panel with `border-4 border-t-0 border-slate-900 bg-amber-300` so the active tab visually connects to it.

## Notes
- Font stack prefers `"Press Start 2P"`; it falls back to monospace unless that font is loaded in `index.css`.

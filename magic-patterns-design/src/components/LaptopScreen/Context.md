# LaptopScreen

Nested portfolio content layer rendered inside the pixel-room laptop screen when the user zooms in. Retro terminal look (dark slate screen, monospace, emerald/amber accents, hard pixel shadows) with tabbed About / Projects / Experience / Contact sections. Ships with placeholder content.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | `'David'` | Title bar path + About heading |
| `role` | `string` | `'Developer & Designer'` | Tagline |
| `bio` | `string` | placeholder | About paragraph |
| `projects` | `LaptopScreenProject[]` | `DEFAULT_PROJECTS` | `{ title, description, tags, href? }` |
| `experience` | `LaptopScreenExperience[]` | `DEFAULT_EXPERIENCE` | `{ role, company, period, summary }` |
| `email` | `string` | `'hello@example.com'` | Contact mailto button |
| `defaultSection` | `'about' \| 'projects' \| 'experience' \| 'contact'` | `'about'` | Initial tab |
| `isOpen` | `boolean` | `true` | Drives scale/fade zoom reveal (framer-motion) |
| `onClose` | `() => void` | — | Shows a close button in the title bar |
| `className` | `string` | `''` | Extra classes on the root |

Fills its parent (`h-full w-full`, min height 360px) — size it via the container that maps to the laptop screen area.

## Usage

```tsx
import { LaptopScreen } from 'components/LaptopScreen'

<div className="h-[420px] w-[640px]">
  <LaptopScreen
    name="David"
    role="Software Engineer"
    defaultSection="projects"
    isOpen={zoomed}
    onClose={() => setZoomed(false)}
  />
</div>
```

## Accessibility
- Tabs use `role="tablist"/"tab"/"tabpanel"` with `aria-selected` and `aria-controls`.
- Root is a labeled `region`; close button has `aria-label`.

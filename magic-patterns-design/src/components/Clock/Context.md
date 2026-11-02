# Clock

Digital desk clock with seven-segment LCD-style digits that updates in real time (ticks aligned to each second). Unlit segments stay faintly visible for an authentic LCD look; colons blink every second.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `'12h' \| '24h'` | `'24h'` | Hour format. `12h` shows an AM/PM indicator. |
| `showSeconds` | `boolean` | `true` | Show smaller seconds digits. |
| `showDate` | `boolean` | `false` | Show a date strip (e.g. `FRI 30 OCT`). |
| `blink` | `boolean` | `true` | Blink colon separators (disabled when `time` is set). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Overall scale. |
| `time` | `Date` | — | Freeze at a fixed time; disables live updates. |
| `label` | `string` | — | Small caption printed on the housing. |
| `className` | `string` | — | Extra classes for the housing (merged with tailwind-merge). |

## Usage

```tsx
import { Clock } from 'components/Clock'

<Clock />
<Clock format="12h" showDate label="Desk Clock" />
<Clock size="lg" time={new Date(2026, 9, 30, 21, 7)} showSeconds={false} />
```

## Notes

- Renders a semantic `<time>` with an `aria-label`; digits are `aria-hidden` and the time is not announced every tick.
- Uses `date-fns` for date/aria formatting.

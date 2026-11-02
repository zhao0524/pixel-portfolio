// AUTO-GENERATED — do not edit manually.
// Re-run the design system builder to regenerate.

import type { ComponentPreviewModule } from './previewTypes';
import __BackgroundSkylinePreviews from './BackgroundSkyline/BackgroundSkyline.previews';
import __BadgePreviews from './Badge/Badge.previews';
import __BooksLeftPreviews from './BooksLeft/BooksLeft.previews';
import __ButtonPreviews from './Button/Button.previews';
import __CardPreviews from './Card/Card.previews';
import __ClockPreviews from './Clock/Clock.previews';
import __CoffeeCupPreviews from './CoffeeCup/CoffeeCup.previews';
import __DeskSurfacePreviews from './DeskSurface/DeskSurface.previews';
import __LampPreviews from './Lamp/Lamp.previews';
import __LaptopPreviews from './Laptop/Laptop.previews';
import __LaptopScreenPreviews from './LaptopScreen/LaptopScreen.previews';
import __LogoPreviews from './Logo/Logo.previews';
import __NavTabsPreviews from './NavTabs/NavTabs.previews';
import __NotebookPreviews from './Notebook/Notebook.previews';
import __PenHolderPreviews from './PenHolder/PenHolder.previews';
import __PlantLeftPreviews from './PlantLeft/PlantLeft.previews';
import __PlantRightPreviews from './PlantRight/PlantRight.previews';
import __WindowFramePreviews from './WindowFrame/WindowFrame.previews';
import __WorkspaceScenePreviews from './WorkspaceScene/WorkspaceScene.previews';
const __contextMd: Record<string, string> = {
  "BackgroundSkyline": `# BackgroundSkyline

Pixel-art Toronto waterfront, modeled on the reference photo: a bright blue sky with big pixel clouds, glass and sandstone towers, a tall tan CN Tower with a red-banded pod, the white Rogers Centre dome, a tree-lined promenade, and a blue lake with ripples and two sailboats. Everything is drawn as crisp SVG rects on a 320×180 grid, with the shoreline at y=118.

The view looks north from the Toronto Islands. From west to east you see CityPlace condos, then the Rogers Centre and CN Tower, then the Financial District: Royal Bank Plaza (gold, sawtooth), TD Bank Tower (black), ICE Condos (slanted tops), Commerce Court West, First Canadian Place (the tallest, white, with roof masts), Scotia Plaza (red granite with a notched top), Bay Adelaide Centre, Harbour Plaza, CIBC Square (angled top), and Aura (glowing crown at night), with the One Yonge / St. Lawrence condos furthest east. All the landmarks are listed in \`LANDMARKS\`.

\`day\` and \`night\` use identical geometry, so you can crossfade between them.
- **Day:** vivid blue sky, white clouds, glassy windows and reflections.
- **Night:** a dusky pastel night with a crescent moon, twinkling stars, warm lit windows, a soft pink glow on the CN Tower with a blinking beacon, light reflections in the water, and dimmed clouds and sails.

It fills its parent (\`h-full w-full\`), anchored to the bottom, and covers the area via \`slice\`. It respects \`prefers-reduced-motion\`.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`variant\` | \`'day' \\| 'night'\` | \`'day'\` | Time of day |
| \`animated\` | \`boolean\` | \`true\` | Clouds drift, boats bob, stars twinkle, beacon blinks |
| \`title\` | \`string\` | — | Accessible label; omit it to make the art decorative |
| \`className\` / \`style\` | | | Wrapper overrides |

\`SKYLINE_PALETTES\` is also exported.

## Usage
\`\`\`tsx
<section className="relative aspect-video w-full">
  <BackgroundSkyline variant={isDark ? 'night' : 'day'} className="absolute inset-0" />
</section>
\`\`\`
`,
  "Badge": `# Badge

Small pixel-art tag for labeling skills, tech stacks, or project status. Square corners, 2px dark border, hard offset drop shadow, uppercase pixel/monospace type (uses \`--font-pixel\` if defined, falling back to "Press Start 2P" → monospace).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`variant\` | \`'default' \\| 'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info' \\| 'outline'\` | \`'default'\` | Color scheme |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Height, padding, font size |
| \`icon\` | \`ReactNode\` | — | Leading icon (svg sized to 12px) |
| \`dot\` | \`boolean\` | \`false\` | Square status pixel before the label |
| \`shadow\` | \`boolean\` | \`true\` | Hard pixel drop shadow |
| \`className\` | \`string\` | — | Extra classes |

Also accepts all native \`<span>\` attributes and forwards its ref.

## Usage

\`\`\`tsx
import { Badge } from 'components/Badge'
import { CodeIcon } from 'lucide-react'

<Badge icon={<CodeIcon />}>React</Badge>
<Badge variant="success" dot>Live</Badge>
<Badge variant="primary" size="sm">New</Badge>
\`\`\`

## Guidelines

- Use \`default\`/\`outline\` for skill and tech tags; reserve colored variants for status.
- Pair \`dot\` with status labels (Live, In progress, Archived).
- Keep labels to 1–2 words.
`,
  "BooksLeft": `# BooksLeft

Optional pixel-art decor: a stack of books lying flat, meant to sit on the left side of the portfolio desk scene. Rendered as a crisp-edged SVG that scales by whole art pixels.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`books\` | \`BookSpec[]\` | \`DEFAULT_BOOKS\` | Bottom → top. Each: \`color\`, \`shade\`, \`length?\` (18), \`thickness?\` (4), \`offset?\` (0) in art pixels |
| \`pixelSize\` | \`number\` | \`4\` | CSS px per art pixel |
| \`withMug\` | \`boolean\` | \`false\` | Adds a small mug on top |
| \`label\` | \`string\` | — | Accessible label; when omitted the SVG is \`aria-hidden\` (decorative) |
| \`className\` | \`string\` | \`''\` | Extra classes on the \`<svg>\` |

## Usage

\`\`\`tsx
import { BooksLeft } from 'components/BooksLeft'

<div className="flex items-end">
  <BooksLeft pixelSize={3} withMug />
</div>
\`\`\`

Align to the desk surface with \`items-end\` so the bottom book rests on the desk line.
`,
  "Button": `# Button

Pixel-styled button primitive used throughout the laptop-screen portfolio content. Square corners, monospace uppercase label, and a chunky notched "pixel" frame drawn with stacked box-shadows plus a hard drop shadow that collapses when pressed.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`variant\` | \`'solid' \\| 'outline'\` | \`'solid'\` | Solid = ink fill / white text; outline = white fill / ink text |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Frame is 3px on \`sm\`, 4px otherwise |
| \`loading\` | \`boolean\` | \`false\` | Shows a stepped pixel spinner, disables the button |
| \`fullWidth\` | \`boolean\` | \`false\` | Stretches to container width |
| \`leftIcon\` / \`rightIcon\` | \`ReactNode\` | — | Use lucide icons at 14px |
| ...native button attrs | | | \`type\` defaults to \`button\` |

The frame is drawn outside the box and the component adds a matching margin, so siblings won't overlap it. Use \`gap-6\` between adjacent buttons.

## Usage

\`\`\`tsx
import { Button } from 'components/Button'
import { ArrowRightIcon } from 'lucide-react'

<Button>Start</Button>
<Button variant="outline" rightIcon={<ArrowRightIcon size={14} />}>View work</Button>
<Button size="lg" loading>Saving</Button>
\`\`\`

\`pixelFrame(px, color, drop?)\` is exported for reuse in other pixel-bordered surfaces.
`,
  "Card": `# Card

Pixel-bordered content card for project entries and experience items on the portfolio screen. Thick 4px border, hard offset shadow (no blur, no radius), monospace type. Interactive cards "lift" on hover and "press" flat on click.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`title\` | \`ReactNode\` | – | Uppercase bold heading (project / role) |
| \`subtitle\` | \`ReactNode\` | – | Secondary line (company, project type) |
| \`meta\` | \`ReactNode\` | – | Boxed label top-right (date / range) |
| \`media\` | \`ReactNode\` | – | Visual slot above content, pixelated rendering |
| \`tags\` | \`string[]\` | – | Rendered as dark pixel chips |
| \`footer\` | \`ReactNode\` | – | Dashed-divider footer for links/actions |
| \`variant\` | \`'default' \\| 'accent' \\| 'muted'\` | \`'default'\` | White, amber highlight, or grey archived |
| \`interactive\` | \`boolean\` | \`!!href\` | Hover lift / press effect + focus ring |
| \`href\` / \`target\` | \`string\` | – | Renders as \`<a>\` instead of \`<article>\` |
| \`className\` | \`string\` | – | Merged via \`tailwind-merge\` |

## Usage

\`\`\`tsx
import { Card } from 'components/Card'

<Card
  title="Pixel Quest"
  subtitle="Browser RPG"
  meta="2025"
  tags={['React', 'Canvas']}
  href="/projects/pixel-quest"
  footer={<span className="underline">View project →</span>}
>
  A retro dungeon crawler.
</Card>

<Card title="Frontend Engineer" subtitle="Acme Studio" meta="2023 – Now">
  Built the design system.
</Card>
\`\`\`

Notes: leave ~4px extra room right/bottom for the offset shadow. Use \`accent\` sparingly for featured items.
`,
  "Clock": `# Clock

Digital desk clock with seven-segment LCD-style digits that updates in real time (ticks aligned to each second). Unlit segments stay faintly visible for an authentic LCD look; colons blink every second.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`format\` | \`'12h' \\| '24h'\` | \`'24h'\` | Hour format. \`12h\` shows an AM/PM indicator. |
| \`showSeconds\` | \`boolean\` | \`true\` | Show smaller seconds digits. |
| \`showDate\` | \`boolean\` | \`false\` | Show a date strip (e.g. \`FRI 30 OCT\`). |
| \`blink\` | \`boolean\` | \`true\` | Blink colon separators (disabled when \`time\` is set). |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Overall scale. |
| \`time\` | \`Date\` | — | Freeze at a fixed time; disables live updates. |
| \`label\` | \`string\` | — | Small caption printed on the housing. |
| \`className\` | \`string\` | — | Extra classes for the housing (merged with tailwind-merge). |

## Usage

\`\`\`tsx
import { Clock } from 'components/Clock'

<Clock />
<Clock format="12h" showDate label="Desk Clock" />
<Clock size="lg" time={new Date(2026, 9, 30, 21, 7)} showSeconds={false} />
\`\`\`

## Notes

- Renders a semantic \`<time>\` with an \`aria-label\`; digits are \`aria-hidden\` and the time is not announced every tick.
- Uses \`date-fns\` for date/aria formatting.
`,
  "CoffeeCup": `# CoffeeCup

Pixel-art desk coffee cup (with saucer) and a subtle looping steam wisp. A decorative prop for the pixel portfolio desk scene. Rendered as a crisp-edged SVG on a 16×20 pixel grid; steam is animated with framer-motion and turns off automatically when the user prefers reduced motion.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`size\` | \`number\` | \`64\` | Width in px; height scales to 20/16 of width. Use multiples of 16 for crisp pixels. |
| \`variant\` | \`'cream' \\| 'red' \\| 'blue' \\| 'black'\` | \`'cream'\` | Mug color palette. |
| \`steaming\` | \`boolean\` | \`true\` | Shows the steam wisps. |
| \`speed\` | \`number\` | \`2.4\` | Steam loop duration (seconds). Vary between cups to avoid sync. |
| \`label\` | \`string\` | \`'Coffee cup'\` | Accessible label; pass \`''\` to mark as decorative. |
| \`className\` | \`string\` | — | Positioning classes. |

## Usage

\`\`\`tsx
import { CoffeeCup } from 'components/CoffeeCup'

<CoffeeCup />
<CoffeeCup size={96} variant="red" speed={3} />
<CoffeeCup steaming={false} label="" className="absolute bottom-4 right-8" />
\`\`\`
`,
  "DeskSurface": `# DeskSurface

Warm, pixel-style wood desk plane that spans the bottom of a scene and anchors the laptop and desk decor. Built from flat solid-color bands (top surface, back highlight, front edge, contact shadow) with optional pixel grain streaks — no gradients.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`tone\` | \`'oak' \\| 'walnut' \\| 'maple'\` | \`'oak'\` | Wood finish |
| \`height\` | \`number \\| string\` | \`160\` | Total desk height (px or CSS length) |
| \`edgeHeight\` | \`number\` | \`28\` | Front edge band height in px |
| \`showGrain\` | \`boolean\` | \`true\` | Render pixel grain streaks |
| \`anchored\` | \`boolean\` | \`false\` | \`absolute bottom-0 inset-x-0\` — pin to bottom of a \`relative\` scene |
| \`itemsInset\` | \`number\` | \`24\` | Px that children sink into the desk top so they look grounded |
| \`children\` | \`ReactNode\` | — | Items placed on the desk, centered and bottom-aligned with a gap |
| \`className\` | \`string\` | — | Extra classes on the root |

\`DESK_PALETTES\` is exported for matching other scene elements to the wood colors.

## Usage

\`\`\`tsx
import { DeskSurface } from 'components/DeskSurface'

<div className="relative h-screen w-full overflow-hidden bg-[#F3E6CF]">
  <DeskSurface anchored tone="oak" height={180}>
    <Laptop />
    <Mug />
  </DeskSurface>
</div>
\`\`\`

The component is decorative (\`role="presentation"\`); give placed items their own accessible labels.
`,
  "Lamp": `# Lamp

A modern pixel-art desk lamp that works as the app's light/dark theme toggle. When it's **on** (light theme), the bulb lights up, the shade turns amber, and a warm glow and stepped light beam appear. When it's **off** (dark theme), it shows the unlit lamp.

Renders as a \`button\` with \`role="switch"\` and \`aria-checked\`, so it works with the keyboard and screen readers. Pixels stay sharp because the SVG uses \`shapeRendering="crispEdges"\`. Animations use framer-motion.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`on\` | \`boolean\` | — | Controlled state. \`true\` = light theme. |
| \`defaultOn\` | \`boolean\` | \`false\` | Starting state when uncontrolled. |
| \`onToggle\` | \`(on: boolean) => void\` | — | Called with the next state when clicked. |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Lamp width of 48 / 80 / 128px. |
| \`syncDocumentTheme\` | \`boolean\` | \`false\` | Toggles the \`dark\` class on \`<html>\` (off = dark). |
| \`showLabel\` | \`boolean\` | \`false\` | Shows a "Light"/"Dark" pixel caption. |
| \`label\` | \`string\` | \`'Toggle light theme'\` | Accessible name. |
| \`disabled\` | \`boolean\` | \`false\` | Turns off interaction. |
| \`className\` | \`string\` | \`''\` | Classes added to the wrapper. |

## Usage

\`\`\`tsx
import { Lamp } from 'components/Lamp'

// Uncontrolled, drives Tailwind dark mode directly
<Lamp defaultOn syncDocumentTheme />

// Controlled
const [light, setLight] = useState(true)
<Lamp on={light} onToggle={setLight} showLabel />
\`\`\`
`,
  "Laptop": `# Laptop

Open pixel-art laptop — the scene's focal point. Clicking it zooms the screen (shared-layout animation via framer-motion) into a full-viewport dialog that reveals nested \`children\`. Close with the X button, Esc, or by clicking the backdrop.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`children\` | \`ReactNode\` | — | Content shown inside the zoomed screen |
| \`idleLabel\` | \`string\` | \`'CLICK TO OPEN'\` | Text on the idle screen (blinking cursor appended) |
| \`screenTitle\` | \`string\` | \`'portfolio.exe'\` | Window title + dialog aria-label |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Pixel unit (3 / 4 / 5px) |
| \`zoomed\` | \`boolean\` | — | Controlled zoom state |
| \`defaultZoomed\` | \`boolean\` | \`false\` | Initial state when uncontrolled |
| \`onZoomChange\` | \`(z: boolean) => void\` | — | Zoom change callback |
| \`disabled\` | \`boolean\` | \`false\` | Render as static art |
| \`className\` | \`string\` | — | Extra classes on the laptop button |

Also exports \`LAPTOP_PALETTE\` (PICO-8-inspired colors) and \`pixelBorder(unit, color)\` for notched pixel borders.

## Usage

\`\`\`tsx
import { Laptop } from 'components/Laptop'

<Laptop screenTitle="about.exe">
  <h2 className="text-2xl font-bold text-[#29adff]">Hi, I'm David.</h2>
</Laptop>
\`\`\`

## Notes
- Dimensions are multiples of the pixel unit; keep it on whole pixels for crisp art.
- Content inside the zoomed screen inherits monospace font and light text on navy \`#1d2b53\`.
`,
  "LaptopScreen": `# LaptopScreen

Nested portfolio content layer rendered inside the pixel-room laptop screen when the user zooms in. Retro terminal look (dark slate screen, monospace, emerald/amber accents, hard pixel shadows) with tabbed About / Projects / Experience / Contact sections. Ships with placeholder content.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`name\` | \`string\` | \`'David'\` | Title bar path + About heading |
| \`role\` | \`string\` | \`'Developer & Designer'\` | Tagline |
| \`bio\` | \`string\` | placeholder | About paragraph |
| \`projects\` | \`LaptopScreenProject[]\` | \`DEFAULT_PROJECTS\` | \`{ title, description, tags, href? }\` |
| \`experience\` | \`LaptopScreenExperience[]\` | \`DEFAULT_EXPERIENCE\` | \`{ role, company, period, summary }\` |
| \`email\` | \`string\` | \`'hello@example.com'\` | Contact mailto button |
| \`defaultSection\` | \`'about' \\| 'projects' \\| 'experience' \\| 'contact'\` | \`'about'\` | Initial tab |
| \`isOpen\` | \`boolean\` | \`true\` | Drives scale/fade zoom reveal (framer-motion) |
| \`onClose\` | \`() => void\` | — | Shows a close button in the title bar |
| \`className\` | \`string\` | \`''\` | Extra classes on the root |

Fills its parent (\`h-full w-full\`, min height 360px) — size it via the container that maps to the laptop screen area.

## Usage

\`\`\`tsx
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
\`\`\`

## Accessibility
- Tabs use \`role="tablist"/"tab"/"tabpanel"\` with \`aria-selected\` and \`aria-controls\`.
- Root is a labeled \`region\`; close button has \`aria-label\`.
`,
  "Logo": `# Logo

David Zhao portfolio wordmark: an 8×8 pixel "D" monogram glyph plus the name set in **Pixelify Sans**. Used in the laptop-screen nav/header.

> Placeholder: the linked repo contains no logo asset (README only). This is a proposed pixel-art mark pending a real asset.

The component loads Pixelify Sans from Google Fonts on mount (falls back to monospace).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Scales text and glyph together |
| \`tone\` | \`'dark' \\| 'light'\` | \`'dark'\` | \`light\` for dark backgrounds |
| \`showGlyph\` | \`boolean\` | \`true\` | Pixel monogram |
| \`showText\` | \`boolean\` | \`true\` | Wordmark |
| \`name\` | \`string\` | \`'David Zhao'\` | Wordmark text |
| \`href\` | \`string\` | — | Renders a focusable link with hover/focus states |
| \`className\` | \`string\` | — | |

Also exports \`PixelGlyph\` (\`size\`, \`className\`) — glyph uses \`currentColor\`.

## Usage

\`\`\`tsx
import { Logo } from 'components/Logo'

<header className="bg-zinc-900 px-5 py-3">
  <Logo tone="light" href="/" />
</header>

<Logo size="lg" showText={false} />
\`\`\`
`,
  "NavTabs": `# NavTabs

Pixel-art tab navigation for switching between portfolio sections (About / Projects / Experience / Contact) inside the laptop screen. Chunky 4px borders, square corners, inset "bevel" shadows, uppercase monospace labels. The active tab is amber and merges into the panel below; inactive tabs are slate and lift on hover.

Accessible: \`role="tablist"\` / \`role="tab"\`, roving tabindex, ArrowLeft/ArrowRight/Home/End keyboard navigation (skips disabled tabs).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| \`items\` | \`NavTabItem[]\` | \`DEFAULT_NAV_TABS\` | \`{ id, label, icon?, disabled? }\` |
| \`value\` | \`string\` | — | Controlled active id |
| \`defaultValue\` | \`string\` | first enabled | Uncontrolled initial id |
| \`onChange\` | \`(id: string) => void\` | — | Fires on selection |
| \`size\` | \`'sm' \\| 'md'\` | \`'md'\` | |
| \`fullWidth\` | \`boolean\` | \`false\` | Tabs stretch to fill |
| \`ariaLabel\` | \`string\` | \`'Portfolio sections'\` | |
| \`idPrefix\` | \`string\` | auto | Tabs get \`\${idPrefix}-tab-\${id}\`, and \`aria-controls="\${idPrefix}-panel-\${id}"\` |
| \`className\` | \`string\` | — | |

## Usage

\`\`\`tsx
import { NavTabs } from 'components/NavTabs'

const [tab, setTab] = useState('about')

<NavTabs value={tab} onChange={setTab} idPrefix="screen" fullWidth />
<div role="tabpanel" id={\`screen-panel-\${tab}\`} aria-labelledby={\`screen-tab-\${tab}\`}
  className="border-4 border-t-0 border-slate-900 bg-amber-300 p-4">
  …
</div>
\`\`\`

Pair the panel with \`border-4 border-t-0 border-slate-900 bg-amber-300\` so the active tab visually connects to it.

## Notes
- Font stack prefers \`"Press Start 2P"\`; it falls back to monospace unless that font is loaded in \`index.css\`.
`,
  "Notebook": `# Notebook

Pixel-art desk notebook prop for portfolio scenes. Has closed (cover, label, elastic band, ribbon) and open (ruled spread with handwriting) states. Rendered as a crisp-edged SVG so it scales cleanly by whole pixels.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`state\` | \`'closed' \\| 'open'\` | \`'closed'\` | Which state to show |
| \`color\` | \`'brown' \\| 'red' \\| 'blue' \\| 'green'\` | \`'brown'\` | Cover palette |
| \`pixelSize\` | \`number\` | \`6\` | CSS px per art pixel (closed = 24×18 px grid, open = 40×18) |
| \`written\` | \`boolean\` | \`true\` | Show ink scribbles on open pages |
| \`onToggle\` | \`(next) => void\` | — | If set, renders as a button that toggles state |
| \`label\` | \`string\` | auto | Accessible label |
| \`className\` | \`string\` | — | Extra wrapper classes |

## Usage

\`\`\`tsx
import { Notebook } from 'components/Notebook'

<Notebook state="closed" color="red" />

const [state, setState] = useState<NotebookState>('closed')
<Notebook state={state} onToggle={setState} />
\`\`\`

Notes: the wrapper aligns art to its bottom edge, so it sits flush on a desk surface. Swapping states cross-fades with a quick horizontal squash.
`,
  "PenHolder": `# PenHolder

Optional pixel-art pen holder decor prop for the portfolio desk scene. Pure SVG on a 16×20 pixel grid rendered with \`crispEdges\`, so it scales without blurring.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`variant\` | \`'slate' \\| 'terracotta' \\| 'mint'\` | \`'slate'\` | Cup color palette |
| \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Width 48 / 80 / 128px |
| \`pens\` | \`number\` | \`3\` | Pens shown in the cup (clamped 0–4) |
| \`label\` | \`string\` | \`'Pen holder'\` | Accessible label. Pass \`''\` to mark decorative (\`aria-hidden\`) |
| \`className\` | \`string\` | \`''\` | Extra classes (e.g. absolute positioning on the desk) |

## Usage

\`\`\`tsx
import { PenHolder } from 'components/PenHolder'

<PenHolder />
<PenHolder variant="terracotta" size="lg" pens={4} />
<div className="relative">
  <PenHolder size="sm" label="" className="absolute bottom-2 right-6" />
</div>
\`\`\`

## Notes
- Non-interactive decor; use \`label=""\` when purely ornamental.
- Bottom of the SVG is the cup base, so align with \`items-end\` on a desk surface.
`,
  "PlantLeft": `# PlantLeft

Optional left-side potted plant decor drawn as pixel art (16×22 grid of SVG rects with crisp edges). Use it to dress the bottom-left corner of pixel-style scenes, rooms, or hero sections.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`pixelSize\` | \`number\` | \`6\` | Size of one art pixel in px (output is \`16×pixelSize\` by \`22×pixelSize\`). |
| \`pot\` | \`'terracotta' \\| 'stone' \\| 'cream'\` | \`'terracotta'\` | Pot color variant. |
| \`label\` | \`string\` | — | Accessible label. Omit for purely decorative use (renders \`aria-hidden\`). |
| \`className\` | \`string\` | — | Extra classes (e.g. positioning). |
| \`style\` | \`CSSProperties\` | — | Inline styles merged onto the SVG. |

## Usage

\`\`\`tsx
import { PlantLeft } from 'components/PlantLeft'

<div className="relative h-64">
  <PlantLeft className="absolute left-3 bottom-0" />
</div>

<PlantLeft pot="stone" pixelSize={4} label="Potted plant" />
\`\`\`

## Notes
- Leaves lean right, so place it on the left edge of a composition.
- Use integer \`pixelSize\` values to keep pixels sharp.
`,
  "PlantRight": `# PlantRight

Optional right-side decor: a potted plant drawn as pixel art (16×20 grid of SVG rects, \`crispEdges\`). Use it to dress the right edge of hero sections, room scenes, or footers in the pixel portfolio. Decorative by default (\`aria-hidden\`), non-interactive (\`pointer-events-none\`).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`pixelSize\` | \`number\` | \`6\` | Pixel cell size in px. Rendered size = 16×pixelSize by 20×pixelSize. |
| \`palette\` | \`'leafy' \\| 'autumn' \\| 'night'\` | \`'leafy'\` | Leaf and pot color scheme. |
| \`anchored\` | \`boolean\` | \`false\` | Pins to \`absolute bottom-0 right-0\` of the nearest positioned parent. |
| \`sway\` | \`boolean\` | \`true\` | Stepped foliage sway; disabled under \`prefers-reduced-motion\`. |
| \`label\` | \`string\` | — | If provided, exposes the plant as \`role="img"\` with this label. |
| \`className\` | \`string\` | \`''\` | Extra classes (e.g. margins to offset from the corner). |

\`PLANT_RIGHT_MAP\` (string[]) is also exported for reuse.

## Usage

\`\`\`tsx
import { PlantRight } from 'components/PlantRight'

<section className="relative min-h-[400px]">
  {/* content */}
  <PlantRight anchored pixelSize={8} className="mr-6" />
</section>
\`\`\`
`,
  "WindowFrame": `# WindowFrame

Dark modern window frame with mullion dividers. Sits above the desk scene and frames the skyline view. Renders a built-in pixel-style dusk skyline when no children are passed; pass any content as \`children\` to frame a custom view.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`children\` | \`ReactNode\` | built-in skyline | Content shown through the glass |
| \`columns\` | \`number\` | \`3\` | Vertical panes (mullions = columns − 1) |
| \`rows\` | \`number\` | \`1\` | Horizontal panes (transoms = rows − 1) |
| \`height\` | \`number\` | \`320\` | Frame height in px; width fills parent |
| \`showSill\` | \`boolean\` | \`true\` | Ledge along the bottom |
| \`showReflection\` | \`boolean\` | \`true\` | Subtle diagonal glass glare |
| \`label\` | \`string\` | \`'View through the window'\` | Accessible label on the \`<figure>\` |
| \`className\` | \`string\` | \`''\` | Extra classes on the wrapper |

## Usage

\`\`\`tsx
import { WindowFrame } from 'components/WindowFrame'

<WindowFrame />

<WindowFrame columns={4} rows={2} height={280}>
  <MySkylineScene />
</WindowFrame>
\`\`\`

## Notes
- Frame and mullions use \`zinc-900\`, with \`zinc-700/800\` for the sill; place it on a dark (\`zinc-950\`) wall.
- Children fill the glass area absolutely (\`inset-0\`), so make them \`h-full w-full\`.
`,
  "WorkspaceScene": `# WorkspaceScene

Top-level pixel-art composition, modeled on the reference photo: a seated view of a honey-wood desk in front of a floor-to-ceiling window, looking out at the Toronto skyline (CN Tower, Rogers Centre dome, lake, sailboats, tree-lined shore). Owns light/dark theme state and the laptop zoom-in.

## Layers (back → front)
1. \`BackgroundSkyline\` — day and night copies crossfaded by opacity.
2. Window frame — tall charcoal mullions + sill.
3. Desk — warm wood with sun shafts.
4. Desk objects — big plant and succulent in white pots, pen cup, book stack and clock (left); open laptop (center); lamp, white mug with steam, trailing ivy (right).

All art is drawn on the same 320×180 pixel grid as the skyline, so everything stays aligned at any width (16:9).

## Behavior
- **Lamp / top-right button** toggles day ↔ night. At night a plum colour-matrix copy of the room fades in on top (only opacity is animated), the lamp bulb and a warm glow switch on, and the laptop screen and clock keep glowing.
- **Laptop** click (or Enter/Space) zooms the scene into the screen and then opens \`LaptopScreen\`, or \`laptopContent\` if you provide it. Close with the button or \`Esc\`.
- The clock shows the real time and only re-renders itself.
- Motion respects \`prefers-reduced-motion\`.

## Props
| Prop | Type | Default |
|---|---|---|
| \`defaultTheme\` | \`'light' \\| 'dark'\` | \`'light'\` |
| \`theme\` / \`onThemeChange\` | controlled theme | — |
| \`laptopContent\` | \`ReactNode\` | \`<LaptopScreen />\` |
| \`defaultZoomed\` / \`onZoomChange\` | zoom state | \`false\` |
| \`label\` | \`string\` | scene description |
| \`className\` | \`string\` | — |

## Usage
\`\`\`tsx
import { WorkspaceScene } from 'components/WorkspaceScene'

<WorkspaceScene onZoomChange={(z) => console.log(z)} />
\`\`\`
`
};

export const componentRegistry: ComponentPreviewModule[] = [
__BackgroundSkylinePreviews,
__BadgePreviews,
__BooksLeftPreviews,
__ButtonPreviews,
__CardPreviews,
__ClockPreviews,
__CoffeeCupPreviews,
__DeskSurfacePreviews,
__LampPreviews,
__LaptopPreviews,
__LaptopScreenPreviews,
__LogoPreviews,
__NavTabsPreviews,
__NotebookPreviews,
__PenHolderPreviews,
__PlantLeftPreviews,
__PlantRightPreviews,
__WindowFramePreviews,
__WorkspaceScenePreviews].

filter((m) => m && m.componentName).
map((m) => ({ ...m, contextMd: __contextMd[m.componentName] ?? m.contextMd })).
sort((a, b) => a.componentName.localeCompare(b.componentName));
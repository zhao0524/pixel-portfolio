# BackgroundSkyline

Pixel-art Toronto waterfront, modeled on the reference photo: a bright blue sky with big pixel clouds, glass and sandstone towers, a tall tan CN Tower with a red-banded pod, the white Rogers Centre dome, a tree-lined promenade, and a blue lake with ripples and two sailboats. Everything is drawn as crisp SVG rects on a 320×180 grid, with the shoreline at y=118.

The view looks north from the Toronto Islands. From west to east you see CityPlace condos, then the Rogers Centre and CN Tower, then the Financial District: Royal Bank Plaza (gold, sawtooth), TD Bank Tower (black), ICE Condos (slanted tops), Commerce Court West, First Canadian Place (the tallest, white, with roof masts), Scotia Plaza (red granite with a notched top), Bay Adelaide Centre, Harbour Plaza, CIBC Square (angled top), and Aura (glowing crown at night), with the One Yonge / St. Lawrence condos furthest east. All the landmarks are listed in `LANDMARKS`.

`day` and `night` use identical geometry, so you can crossfade between them.
- **Day:** vivid blue sky, white clouds, glassy windows and reflections.
- **Night:** a dusky pastel night with a crescent moon, twinkling stars, warm lit windows, a soft pink glow on the CN Tower with a blinking beacon, light reflections in the water, and dimmed clouds and sails.

It fills its parent (`h-full w-full`), anchored to the bottom, and covers the area via `slice`. It respects `prefers-reduced-motion`.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'day' \| 'night'` | `'day'` | Time of day |
| `animated` | `boolean` | `true` | Clouds drift, boats bob, stars twinkle, beacon blinks |
| `title` | `string` | — | Accessible label; omit it to make the art decorative |
| `className` / `style` | | | Wrapper overrides |

`SKYLINE_PALETTES` is also exported.

## Usage
```tsx
<section className="relative aspect-video w-full">
  <BackgroundSkyline variant={isDark ? 'night' : 'day'} className="absolute inset-0" />
</section>
```

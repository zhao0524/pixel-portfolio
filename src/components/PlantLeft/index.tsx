import React from 'react';

export type PlantLeftPot = 'terracotta' | 'stone' | 'cream';

export interface PlantLeftProps {
  /** Size of one pixel in px. Default 6 (renders 96×132). */
  pixelSize?: number;
  /** Pot color variant. */
  pot?: PlantLeftPot;
  /** Accessible label. When omitted, the plant is treated as decorative. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LEAF_DARK = '#2f6b3a';
const LEAF_LIGHT = '#58a15a';
const LEAF_HIGHLIGHT = '#8fd07a';
const SOIL = '#4a3222';

const POTS: Record<PlantLeftPot, {body: string;shade: string;rim: string;rimShade: string;}> = {
  terracotta: { body: '#c8673e', shade: '#9c4a2a', rim: '#de8256', rimShade: '#b4583a' },
  stone: { body: '#8a8f98', shade: '#666b73', rim: '#a9aeb6', rimShade: '#7b8088' },
  cream: { body: '#e9dcc3', shade: '#c4b496', rim: '#f6ecd8', rimShade: '#d8c9ab' }
};

// 16 × 22 pixel map
// . empty · g dark leaf · G light leaf · h highlight · s soil
// r rim · R rim shade · p pot · P pot shade
export const PLANT_LEFT_MAP: string[] = [
'......h.........',
'.....hG...h.....',
'....hGg..hG.....',
'....Gg..hGg..h..',
'.h..Gg..Gg..hG..',
'.hG.Gg.Gg..GGg..',
'..Gg.gGg..Gg....',
'...Gg.gg.Gg.....',
'....Ggg.gg..h...',
'.....gg.g..hG...',
'......gggGgG....',
'.......gggg.....',
'...rrrrrrrrrr...',
'...RRRRRRRRRR...',
'....ppppppPP....',
'....pppppPPP....',
'....ppppppPP....',
'.....pppppP.....',
'.....ppppPP.....',
'.....pppppP.....',
'......ppPP......',
'......PPPP......'];


export function PlantLeft({ pixelSize = 6, pot = 'terracotta', label, className, style }: PlantLeftProps) {
  const p = POTS[pot];
  const colors: Record<string, string> = {
    g: LEAF_DARK,
    G: LEAF_LIGHT,
    h: LEAF_HIGHLIGHT,
    s: SOIL,
    r: p.rim,
    R: p.rimShade,
    p: p.body,
    P: p.shade
  };
  const cols = 16;
  const rows = PLANT_LEFT_MAP.length;
  const decorative = !label;

  return (
    <svg
      width={cols * pixelSize}
      height={rows * pixelSize}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      className={['block select-none', className].filter(Boolean).join(' ')}
      style={{ imageRendering: 'pixelated', ...style }}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}>
      
      {PLANT_LEFT_MAP.map((row, y) =>
      row.split('').map((ch, x) => {
        const fill = colors[ch];
        if (!fill) return null;
        return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
      })
      )}
    </svg>);

}
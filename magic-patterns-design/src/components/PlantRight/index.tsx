import React from 'react';

export type PlantRightPalette = 'leafy' | 'autumn' | 'night';

export interface PlantRightProps {
  /** Size in px of a single pixel cell. Default 6. */
  pixelSize?: number;
  /** Color palette for leaves and pot. */
  palette?: PlantRightPalette;
  /** When true, pins the plant to the bottom-right of its nearest positioned parent. */
  anchored?: boolean;
  /** Gentle sway animation on the foliage. Respects reduced motion. */
  sway?: boolean;
  /** Accessible label. When omitted, the plant is treated as decorative. */
  label?: string;
  className?: string;
}

type Cell = '.' | 'D' | 'L' | 'H' | 'S' | 'P' | 'R' | 'T' | 'O';

// 16 x 20 pixel map. Rows 0-11 foliage, 12 stem, 13-19 pot.
// D = dark leaf, L = leaf, H = leaf highlight, S = stem,
// P = pot body, R = pot rim, T = pot shadow, O = soil
export const PLANT_RIGHT_MAP: string[] = [
'......LL........',
'.....LHLL.......',
'..LL.LLLD...LL..',
'.LHLL.LD...LHLL.',
'.LLLDL.S..LLLLD.',
'..LDD.LS.LLHLD..',
'.....DLSLLLDD...',
'..LLL..SDD......',
'.LHLLD.S..LL....',
'..LLDDLS.LHLL...',
'....DD.SLLLDD...',
'.......S.DD.....',
'.......S........',
'..RRRRRRRRRRRR..',
'..ROOOOOOOOOOR..',
'...PPPPPPPPPT...',
'...PPPPPPPPPT...',
'....PPPPPPPT....',
'....PPPPPPPT....',
'.....TTTTTT.....'];


const PALETTES: Record<PlantRightPalette, Record<Exclude<Cell, '.'>, string>> = {
  leafy: {
    D: '#2f6b3a',
    L: '#4caf50',
    H: '#9be36b',
    S: '#3e7d32',
    P: '#c96a3c',
    R: '#e08a55',
    T: '#8f4524',
    O: '#4a3022'
  },
  autumn: {
    D: '#9a3b1c',
    L: '#e07a2c',
    H: '#ffc35a',
    S: '#6b4a24',
    P: '#5f6f8a',
    R: '#7f90ad',
    T: '#3f4a5e',
    O: '#3a2a1e'
  },
  night: {
    D: '#1f3b4d',
    L: '#2f7a8a',
    H: '#7fe0d0',
    S: '#245a5e',
    P: '#4b3f72',
    R: '#6d5ea6',
    T: '#2c2448',
    O: '#1c1626'
  }
};

const FOLIAGE_ROWS = 13;

export function PlantRight({
  pixelSize = 6,
  palette = 'leafy',
  anchored = false,
  sway = true,
  label,
  className = ''
}: PlantRightProps) {
  const cols = PLANT_RIGHT_MAP[0].length;
  const rows = PLANT_RIGHT_MAP.length;
  const colors = PALETTES[palette];

  const foliage: React.ReactNode[] = [];
  const pot: React.ReactNode[] = [];

  PLANT_RIGHT_MAP.forEach((row, y) => {
    row.split('').forEach((ch, x) => {
      if (ch === '.') return;
      const rect =
      <rect
        key={`${x}-${y}`}
        x={x}
        y={y}
        width={1}
        height={1}
        fill={colors[ch as Exclude<Cell, '.'>]} />;


      if (y < FOLIAGE_ROWS) foliage.push(rect);else
      pot.push(rect);
    });
  });

  const decorative = !label;

  return (
    <div
      className={[
      'pointer-events-none select-none',
      anchored ? 'absolute bottom-0 right-0' : 'inline-block',
      className].
      join(' ')}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={label}>
      
      <style>{`
        @keyframes plant-right-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .plant-right-foliage { animation: none !important; }
        }
      `}</style>
      <svg
        width={cols * pixelSize}
        height={rows * pixelSize}
        viewBox={`0 0 ${cols} ${rows}`}
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        className="block">
        
        <g
          className="plant-right-foliage"
          style={{
            transformOrigin: `${cols / 2}px ${FOLIAGE_ROWS}px`,
            transformBox: 'view-box',
            animation: sway ? 'plant-right-sway 4s steps(4, end) infinite' : undefined
          }}>
          
          {foliage}
        </g>
        <g>{pot}</g>
      </svg>
    </div>);

}
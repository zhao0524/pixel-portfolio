import React from 'react';

export type DeskSurfaceTone = 'oak' | 'walnut' | 'maple';

export interface DeskSurfaceProps {
  /** Wood finish of the desk. */
  tone?: DeskSurfaceTone;
  /** Total height of the desk (top + front edge). Number = px, string = any CSS length. */
  height?: number | string;
  /** Height of the front edge band in px. */
  edgeHeight?: number;
  /** Show pixel wood-grain streaks on the top surface. */
  showGrain?: boolean;
  /** Pin the desk to the bottom of a relatively-positioned scene. */
  anchored?: boolean;
  /** How far (px) placed items sink into the desk top so they look grounded. */
  itemsInset?: number;
  /** Objects placed on the desk (laptop, mug, plant…). Rendered bottom-aligned on the surface. */
  children?: React.ReactNode;
  className?: string;
}

type WoodPalette = {
  surface: string;
  grain: string;
  highlight: string;
  edge: string;
  edgeDark: string;
  shadow: string;
};

export const DESK_PALETTES: Record<DeskSurfaceTone, WoodPalette> = {
  oak: {
    surface: '#B9814F',
    grain: '#A06A3D',
    highlight: '#D39A64',
    edge: '#8A5530',
    edgeDark: '#6B3F22',
    shadow: '#4A2A16'
  },
  walnut: {
    surface: '#7A4B2E',
    grain: '#663C23',
    highlight: '#946041',
    edge: '#5A341D',
    edgeDark: '#432513',
    shadow: '#2C180C'
  },
  maple: {
    surface: '#D8A86F',
    grain: '#C3915A',
    highlight: '#ECC28C',
    edge: '#A8743F',
    edgeDark: '#87592D',
    shadow: '#5C3B1E'
  }
};

// Deterministic grain streaks: [top %, left %, width %]
const GRAIN_STREAKS: Array<[number, number, number]> = [
[14, 4, 22],
[14, 38, 12],
[14, 70, 26],
[32, 12, 30],
[32, 56, 18],
[32, 84, 12],
[50, 2, 14],
[50, 26, 24],
[50, 64, 30],
[68, 8, 18],
[68, 40, 28],
[68, 78, 16],
[84, 18, 20],
[84, 52, 14],
[84, 74, 22]];


export function DeskSurface({
  tone = 'oak',
  height = 160,
  edgeHeight = 28,
  showGrain = true,
  anchored = false,
  itemsInset = 24,
  children,
  className = ''
}: DeskSurfaceProps) {
  const palette = DESK_PALETTES[tone];
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      role="presentation"
      className={[
      'w-full select-none',
      anchored ? 'absolute inset-x-0 bottom-0' : 'relative',
      className].
      join(' ')}
      style={{ height: resolvedHeight }}>
      
      <div className="flex h-full w-full flex-col">
        {/* Top surface */}
        <div
          className="relative w-full flex-1 overflow-hidden"
          style={{ backgroundColor: palette.surface }}>
          
          {/* Back-edge highlight */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: palette.highlight }} />
          
          {showGrain &&
          GRAIN_STREAKS.map(([top, left, width], i) =>
          <div
            key={i}
            aria-hidden
            className="absolute h-[3px]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${width}%`,
              backgroundColor: palette.grain
            }} />

          )}
        </div>

        {/* Front edge */}
        <div className="relative w-full shrink-0" style={{ height: edgeHeight }}>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ backgroundColor: palette.highlight }} />
          
          <div
            aria-hidden
            className="absolute inset-x-0 top-[3px] bottom-1"
            style={{ backgroundColor: palette.edge }} />
          
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1"
            style={{ backgroundColor: palette.edgeDark }} />
          
        </div>

        {/* Contact shadow */}
        <div
          aria-hidden
          className="h-1.5 w-full shrink-0"
          style={{ backgroundColor: palette.shadow }} />
        
      </div>

      {children &&
      <div
        className="pointer-events-none absolute inset-x-0 bottom-full flex items-end justify-center"
        style={{ transform: `translateY(${itemsInset}px)` }}>
        
          <div className="pointer-events-auto flex items-end gap-6">{children}</div>
        </div>
      }
    </div>);

}
import React from 'react';

export interface WindowFrameProps {
  /** The view shown through the glass (e.g. a skyline scene). */
  children?: React.ReactNode;
  /** Number of vertical panes (mullions = columns - 1). */
  columns?: number;
  /** Number of horizontal panes (transoms = rows - 1). */
  rows?: number;
  /** Height of the frame in px. Width fills the parent. */
  height?: number;
  /** Show the window sill/ledge along the bottom. */
  showSill?: boolean;
  /** Show a subtle glass reflection over the panes. */
  showReflection?: boolean;
  /** Accessible label for the framed view. */
  label?: string;
  className?: string;
}

export function WindowFrame({
  children,
  columns = 3,
  rows = 1,
  height = 320,
  showSill = true,
  showReflection = true,
  label = 'View through the window',
  className = ''
}: WindowFrameProps) {
  const cols = Math.max(1, Math.floor(columns));
  const rws = Math.max(1, Math.floor(rows));

  return (
    <figure
      aria-label={label}
      className={`relative w-full select-none ${className}`}>
      
      {/* Outer frame */}
      <div
        className="relative w-full overflow-hidden rounded-[2px] border-[10px] border-zinc-900 bg-zinc-900 shadow-[0_0_0_2px_#3f3f46,0_12px_32px_rgba(0,0,0,0.45)]"
        style={{ height }}>
        
        {/* Inner bevel */}
        <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_0_2px_#27272a,inset_0_0_0_4px_#09090b]" />

        {/* View */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          {children ?? <DefaultSkyline />}
        </div>

        {/* Glass reflection */}
        {showReflection &&
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
            'linear-gradient(115deg, transparent 0%, transparent 38%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 46%, transparent 48%, transparent 56%, rgba(255,255,255,0.04) 58%, rgba(255,255,255,0.04) 60%, transparent 62%)'
          }} />

        }

        {/* Mullion grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rws}, 1fr)`
          }}>
          
          {Array.from({ length: cols * rws }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return (
              <div
                key={i}
                className="border-zinc-900"
                style={{
                  borderRightWidth: col < cols - 1 ? 4 : 0,
                  borderLeftWidth: col > 0 ? 4 : 0,
                  borderBottomWidth: row < rws - 1 ? 3 : 0,
                  borderTopWidth: row > 0 ? 3 : 0,
                  boxShadow:
                  'inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.4)'
                }} />);


          })}
        </div>
      </div>

      {/* Sill */}
      {showSill &&
      <div aria-hidden="true" className="relative -mt-[2px]">
          <div className="mx-[-8px] h-3 rounded-[2px] border-t-2 border-zinc-700 bg-zinc-800 shadow-[0_6px_12px_rgba(0,0,0,0.4)]" />
          <div className="mx-[-4px] h-1 bg-zinc-950" />
        </div>
      }
    </figure>);

}

const BUILDINGS: {x: number;w: number;h: number;tone: string;}[] = [
{ x: 0, w: 9, h: 46, tone: '#1e293b' },
{ x: 8, w: 7, h: 62, tone: '#273449' },
{ x: 15, w: 10, h: 38, tone: '#1e293b' },
{ x: 24, w: 6, h: 74, tone: '#334155' },
{ x: 30, w: 11, h: 52, tone: '#1e293b' },
{ x: 41, w: 8, h: 66, tone: '#273449' },
{ x: 49, w: 12, h: 44, tone: '#1e293b' },
{ x: 60, w: 7, h: 80, tone: '#334155' },
{ x: 67, w: 10, h: 56, tone: '#273449' },
{ x: 77, w: 8, h: 40, tone: '#1e293b' },
{ x: 85, w: 9, h: 68, tone: '#273449' },
{ x: 93, w: 7, h: 50, tone: '#1e293b' }];


function DefaultSkyline() {
  return (
    <svg
      role="img"
      aria-label="City skyline at dusk"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full"
      shapeRendering="crispEdges">
      
      <rect width="100" height="100" fill="#0f172a" />
      <rect y="55" width="100" height="45" fill="#1e1b4b" opacity="0.6" />
      <rect y="78" width="100" height="22" fill="#4c1d95" opacity="0.35" />
      <rect x="78" y="12" width="6" height="6" fill="#fde68a" />
      {[
      [10, 10],
      [22, 22],
      [40, 8],
      [55, 18],
      [68, 6],
      [90, 26],
      [33, 30]].
      map(([x, y], i) =>
      <rect key={i} x={x} y={y} width="0.6" height="0.6" fill="#e2e8f0" />
      )}
      {BUILDINGS.map((b, i) =>
      <g key={i}>
          <rect x={b.x} y={100 - b.h} width={b.w} height={b.h} fill={b.tone} />
          {Array.from({ length: Math.floor(b.h / 6) }).map((_, r) =>
        Array.from({ length: Math.floor(b.w / 2.5) }).map((__, c) =>
        (i * 7 + r * 3 + c * 5) % 4 === 0 ?
        <rect
          key={`${r}-${c}`}
          x={b.x + 1 + c * 2.5}
          y={100 - b.h + 3 + r * 6}
          width="1"
          height="1.6"
          fill="#fbbf24"
          opacity="0.85" /> :

        null
        )
        )}
        </g>
      )}
    </svg>);

}
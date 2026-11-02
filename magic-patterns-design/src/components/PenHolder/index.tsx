import React from 'react';

export type PenHolderVariant = 'slate' | 'terracotta' | 'mint';
export type PenHolderSize = 'sm' | 'md' | 'lg';

export interface PenHolderProps {
  /** Cup color palette */
  variant?: PenHolderVariant;
  /** Rendered size (pixel scale) */
  size?: PenHolderSize;
  /** Number of pens/pencils shown in the cup (0–4) */
  pens?: number;
  /** Accessible label; pass empty string to mark as decorative */
  label?: string;
  className?: string;
}

type Palette = {body: string;shade: string;rim: string;outline: string;};

const PALETTES: Record<PenHolderVariant, Palette> = {
  slate: { body: '#64748b', shade: '#475569', rim: '#94a3b8', outline: '#1e293b' },
  terracotta: { body: '#c2410c', shade: '#9a3412', rim: '#fb923c', outline: '#431407' },
  mint: { body: '#34d399', shade: '#059669', rim: '#a7f3d0', outline: '#064e3b' }
};

const SIZES: Record<PenHolderSize, number> = { sm: 48, md: 80, lg: 128 };

type Pen = {x: number;top: number;color: string;tip: string;};

const ALL_PENS: Pen[] = [
{ x: 4, top: 2, color: '#facc15', tip: '#fde68a' }, // pencil
{ x: 7, top: 0, color: '#2563eb', tip: '#1e293b' }, // blue pen
{ x: 10, top: 3, color: '#dc2626', tip: '#1e293b' }, // red pen
{ x: 6, top: 4, color: '#f8fafc', tip: '#94a3b8' } // ruler/marker
];

export function PenHolder({
  variant = 'slate',
  size = 'md',
  pens = 3,
  label = 'Pen holder',
  className = ''
}: PenHolderProps) {
  const p = PALETTES[variant];
  const px = SIZES[size];
  const count = Math.max(0, Math.min(4, Math.floor(pens)));
  const visiblePens = ALL_PENS.slice(0, count);
  const decorative = label === '';

  return (
    <svg
      viewBox="0 0 16 20"
      width={px}
      height={px * 20 / 16}
      shapeRendering="crispEdges"
      className={`inline-block select-none ${className}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}>
      
      {/* Pens (behind the cup) */}
      {visiblePens.map((pen, i) =>
      <g key={i}>
          <rect x={pen.x} y={pen.top} width={1} height={1} fill={pen.tip} />
          <rect x={pen.x} y={pen.top + 1} width={1} height={9 - pen.top} fill={pen.color} />
          <rect x={pen.x + 1} y={pen.top + 1} width={1} height={9 - pen.top} fill={p.outline} opacity={0.35} />
        </g>
      )}

      {/* Cup outline */}
      <rect x={2} y={8} width={12} height={1} fill={p.outline} />
      <rect x={2} y={8} width={1} height={11} fill={p.outline} />
      <rect x={13} y={8} width={1} height={11} fill={p.outline} />
      <rect x={3} y={19} width={10} height={1} fill={p.outline} />

      {/* Rim */}
      <rect x={3} y={9} width={10} height={1} fill={p.rim} />

      {/* Body */}
      <rect x={3} y={10} width={10} height={9} fill={p.body} />

      {/* Shading on right side */}
      <rect x={11} y={10} width={2} height={9} fill={p.shade} />

      {/* Highlight on left */}
      <rect x={4} y={11} width={1} height={5} fill={p.rim} opacity={0.7} />

      {/* Band detail */}
      <rect x={3} y={14} width={10} height={1} fill={p.shade} />
    </svg>);

}
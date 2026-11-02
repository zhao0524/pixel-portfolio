import React from 'react';

export type BookSpec = {
  /** Spine fill color */
  color: string;
  /** Darker shade used for the spine outline/bottom edge */
  shade: string;
  /** Book length in pixel units (default 18) */
  length?: number;
  /** Book thickness in pixel units (default 4) */
  thickness?: number;
  /** Horizontal offset in pixel units relative to the stack's left edge */
  offset?: number;
};

export type BooksLeftProps = {
  /** Books from bottom to top. Defaults to a warm 4-book stack. */
  books?: BookSpec[];
  /** Size of a single art pixel in CSS px (default 4) */
  pixelSize?: number;
  /** Show a small mug on top of the stack */
  withMug?: boolean;
  /** Accessible label. If omitted the decor is hidden from screen readers. */
  label?: string;
  className?: string;
};

export const DEFAULT_BOOKS: BookSpec[] = [
{ color: '#3b5b92', shade: '#24395e', length: 20, thickness: 4, offset: 0 },
{ color: '#b4453a', shade: '#742a23', length: 18, thickness: 3, offset: 2 },
{ color: '#d9a441', shade: '#94691f', length: 17, thickness: 4, offset: 1 },
{ color: '#4f8a5b', shade: '#2f5638', length: 15, thickness: 3, offset: 3 }];


const PAGE = '#f3ead7';
const OUTLINE = '#1f1a17';

export function BooksLeft({
  books = DEFAULT_BOOKS,
  pixelSize = 4,
  withMug = false,
  label,
  className = ''
}: BooksLeftProps) {
  const normalized = books.map((b) => ({
    ...b,
    length: b.length ?? 18,
    thickness: b.thickness ?? 4,
    offset: b.offset ?? 0
  }));

  const width = Math.max(...normalized.map((b) => b.offset + b.length), 1) + 2;
  const stackHeight = normalized.reduce((sum, b) => sum + b.thickness, 0);
  const mugHeight = withMug ? 6 : 0;
  const height = stackHeight + mugHeight + 1;

  // Build from bottom up
  let y = height - 1;
  const rects: React.ReactNode[] = [];

  normalized.forEach((b, i) => {
    const top = y - b.thickness;
    const x = b.offset + 1;
    // outline
    rects.push(
      <rect key={`o${i}`} x={x - 1} y={top} width={b.length + 2} height={b.thickness + 1} fill={OUTLINE} />
    );
    // cover body
    rects.push(<rect key={`c${i}`} x={x} y={top + 1} width={b.length} height={b.thickness - 1} fill={b.color} />);
    // bottom shade
    rects.push(<rect key={`s${i}`} x={x} y={top + b.thickness - 1} width={b.length} height={1} fill={b.shade} />);
    // pages on right edge
    if (b.thickness > 2) {
      rects.push(
        <rect key={`p${i}`} x={x + b.length - 2} y={top + 1} width={2} height={b.thickness - 2} fill={PAGE} />
      );
    }
    // spine band
    rects.push(<rect key={`b${i}`} x={x + 2} y={top + 1} width={1} height={b.thickness - 1} fill={b.shade} />);
    // highlight
    rects.push(
      <rect key={`h${i}`} x={x + 4} y={top + 1} width={Math.max(b.length - 8, 1)} height={1} fill="#ffffff" opacity={0.25} />
    );
    y = top;
  });

  if (withMug) {
    const topBook = normalized[normalized.length - 1];
    const mx = (topBook?.offset ?? 0) + 1 + Math.floor((topBook?.length ?? 10) / 2) - 3;
    const my = y - mugHeight + 1;
    rects.push(
      <g key="mug">
        <rect x={mx - 1} y={my - 1} width={7} height={mugHeight} fill={OUTLINE} />
        <rect x={mx} y={my} width={5} height={mugHeight - 2} fill="#e8e1d4" />
        <rect x={mx} y={my} width={5} height={1} fill="#6b3f26" />
        <rect x={mx + 6} y={my + 1} width={2} height={1} fill={OUTLINE} />
        <rect x={mx + 7} y={my + 1} width={1} height={3} fill={OUTLINE} />
        <rect x={mx + 6} y={my + 3} width={2} height={1} fill={OUTLINE} />
      </g>
    );
  }

  return (
    <svg
      className={`block select-none ${className}`}
      width={width * pixelSize}
      height={height * pixelSize}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ imageRendering: 'pixelated' }}>
      
      {rects}
    </svg>);

}
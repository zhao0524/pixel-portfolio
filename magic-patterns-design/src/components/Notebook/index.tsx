import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type NotebookState = 'closed' | 'open';
export type NotebookColor = 'brown' | 'red' | 'blue' | 'green';

export interface NotebookProps {
  /** Closed cover or open spread */
  state?: NotebookState;
  /** Cover color palette */
  color?: NotebookColor;
  /** Size of one art pixel in CSS px (default 6) */
  pixelSize?: number;
  /** Show handwriting scribbles on the open pages */
  written?: boolean;
  /** Makes the notebook a button that calls onToggle when clicked */
  onToggle?: (next: NotebookState) => void;
  /** Accessible label */
  label?: string;
  className?: string;
}

export interface NotebookPalette {
  outline: string;
  cover: string;
  coverLight: string;
  coverDark: string;
}

export const NOTEBOOK_PALETTES: Record<NotebookColor, NotebookPalette> = {
  brown: { outline: '#2b1d14', cover: '#8a5a3b', coverLight: '#a8754f', coverDark: '#6b4329' },
  red: { outline: '#2a1214', cover: '#b33b3b', coverLight: '#d25a52', coverDark: '#862a2c' },
  blue: { outline: '#121a2a', cover: '#3b5fa8', coverLight: '#5a7fc6', coverDark: '#2a4580' },
  green: { outline: '#13221a', cover: '#3f7d55', coverLight: '#5a9c6e', coverDark: '#2c5c3e' }
};

const PAGE = '#f3ead7';
const PAGE_SHADE = '#d8ccb2';
const RULE = '#b9c9e0';
const MARGIN = '#e3a3a3';
const INK = '#3a3550';
const RIBBON = '#d94a3d';
const SHADOW = 'rgba(0,0,0,0.25)';

export function Notebook({
  state = 'closed',
  color = 'brown',
  pixelSize = 6,
  written = true,
  onToggle,
  label,
  className = ''
}: NotebookProps) {
  const p = NOTEBOOK_PALETTES[color];
  const isOpen = state === 'open';
  const width = (isOpen ? 40 : 24) * pixelSize;
  const height = 18 * pixelSize;
  const ariaLabel = label ?? (isOpen ? 'Open notebook' : 'Closed notebook');

  const art =
  <AnimatePresence mode="wait" initial={false}>
      <motion.svg
      key={state}
      width={width}
      height={height}
      viewBox={isOpen ? '0 0 40 18' : '0 0 24 18'}
      shapeRendering="crispEdges"
      role="img"
      aria-label={ariaLabel}
      initial={{ opacity: 0, scaleX: 0.85 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleX: 0.85 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{ display: 'block', imageRendering: 'pixelated' }}>
      
        {isOpen ? <OpenArt p={p} written={written} /> : <ClosedArt p={p} />}
      </motion.svg>
    </AnimatePresence>;


  if (onToggle) {
    return (
      <motion.button
        type="button"
        onClick={() => onToggle(isOpen ? 'closed' : 'open')}
        aria-pressed={isOpen}
        aria-label={`${ariaLabel} — click to ${isOpen ? 'close' : 'open'}`}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        className={`inline-flex cursor-pointer items-end justify-center bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 ${className}`}
        style={{ minWidth: width, height }}>
        
        {art}
      </motion.button>);

  }

  return (
    <div className={`inline-flex items-end justify-center ${className}`} style={{ minWidth: width, height }}>
      {art}
    </div>);

}

function ClosedArt({ p }: {p: NotebookPalette;}) {
  return (
    <g>
      <rect x={1} y={17} width={22} height={1} fill={SHADOW} />
      <rect x={0} y={0} width={24} height={17} fill={p.outline} />
      {/* page edges */}
      <rect x={21} y={2} width={2} height={13} fill={PAGE} />
      <rect x={22} y={4} width={1} height={1} fill={PAGE_SHADE} />
      <rect x={22} y={8} width={1} height={1} fill={PAGE_SHADE} />
      <rect x={22} y={12} width={1} height={1} fill={PAGE_SHADE} />
      {/* cover */}
      <rect x={1} y={1} width={20} height={15} fill={p.cover} />
      <rect x={1} y={1} width={20} height={1} fill={p.coverLight} />
      <rect x={1} y={15} width={20} height={1} fill={p.coverDark} />
      {/* spine */}
      <rect x={1} y={1} width={3} height={15} fill={p.coverDark} />
      <rect x={4} y={1} width={1} height={15} fill={p.outline} opacity={0.35} />
      {[3, 6, 9, 12].map((y) =>
      <rect key={y} x={2} y={y} width={1} height={1} fill={p.coverLight} />
      )}
      {/* label */}
      <rect x={7} y={4} width={9} height={5} fill={p.outline} />
      <rect x={8} y={5} width={7} height={3} fill={PAGE} />
      <rect x={9} y={6} width={5} height={1} fill={PAGE_SHADE} />
      {/* elastic band */}
      <rect x={18} y={1} width={1} height={15} fill={p.outline} />
      {/* ribbon */}
      <rect x={12} y={16} width={1} height={2} fill={RIBBON} />
    </g>);

}

function OpenArt({ p, written }: {p: NotebookPalette;written: boolean;}) {
  const rules = [4, 6, 8, 10, 12];
  return (
    <g>
      <rect x={1} y={17} width={38} height={1} fill={SHADOW} />
      <rect x={0} y={0} width={40} height={17} fill={p.outline} />
      {/* cover rim */}
      <rect x={1} y={1} width={38} height={15} fill={p.cover} />
      <rect x={1} y={15} width={38} height={1} fill={p.coverDark} />
      {/* pages */}
      <rect x={2} y={1} width={17} height={14} fill={PAGE} />
      <rect x={21} y={1} width={17} height={14} fill={PAGE} />
      <rect x={2} y={14} width={17} height={1} fill={PAGE_SHADE} />
      <rect x={21} y={14} width={17} height={1} fill={PAGE_SHADE} />
      {/* gutter */}
      <rect x={18} y={1} width={1} height={14} fill={PAGE_SHADE} />
      <rect x={21} y={1} width={1} height={14} fill={PAGE_SHADE} />
      <rect x={19} y={1} width={2} height={15} fill={p.outline} opacity={0.55} />
      {/* margins */}
      <rect x={5} y={1} width={1} height={13} fill={MARGIN} />
      <rect x={24} y={1} width={1} height={13} fill={MARGIN} />
      {/* rules */}
      {rules.map((y) =>
      <React.Fragment key={y}>
          <rect x={3} y={y} width={15} height={1} fill={RULE} />
          <rect x={22} y={y} width={15} height={1} fill={RULE} />
        </React.Fragment>
      )}
      {written &&
      <g fill={INK}>
          <rect x={7} y={3} width={8} height={1} />
          <rect x={7} y={5} width={10} height={1} />
          <rect x={7} y={7} width={6} height={1} />
          <rect x={7} y={9} width={9} height={1} />
          <rect x={7} y={11} width={4} height={1} />
          <rect x={26} y={3} width={7} height={1} />
          <rect x={26} y={5} width={9} height={1} />
          {/* tiny doodle */}
          <rect x={28} y={8} width={3} height={1} />
          <rect x={27} y={9} width={1} height={2} />
          <rect x={31} y={9} width={1} height={2} />
          <rect x={28} y={11} width={3} height={1} />
        </g>
      }
      {/* ribbon */}
      <rect x={20} y={15} width={1} height={3} fill={RIBBON} />
    </g>);

}
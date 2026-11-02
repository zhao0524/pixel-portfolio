'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type CoffeeCupVariant = 'cream' | 'red' | 'blue' | 'black';

export interface CoffeeCupProps {
  /** Rendered width in px (height scales proportionally). Default 64. */
  size?: number;
  /** Mug color. Default 'cream'. */
  variant?: CoffeeCupVariant;
  /** Show the looping steam animation. Default true. */
  steaming?: boolean;
  /** Steam loop duration in seconds. Default 2.4. */
  speed?: number;
  /** Accessible label. Pass empty string to mark decorative. */
  label?: string;
  className?: string;
}

type Palette = {body: string;shade: string;outline: string;highlight: string;};

export const COFFEE_CUP_PALETTES: Record<CoffeeCupVariant, Palette> = {
  cream: { body: '#F4EBD9', shade: '#D9C9A8', outline: '#3B2A1F', highlight: '#FFFFFF' },
  red: { body: '#D9544D', shade: '#A8382F', outline: '#2B1714', highlight: '#F08A82' },
  blue: { body: '#5B8DD9', shade: '#3C66A8', outline: '#17223A', highlight: '#9CBDF0' },
  black: { body: '#3A3A44', shade: '#24242B', outline: '#0E0E12', highlight: '#5E5E6B' }
};

const COFFEE = '#6B3E26';
const COFFEE_LIGHT = '#8A5535';
const STEAM = '#E8E8EE';

// Pixel grid: 16 wide x 20 tall. Steam occupies rows 0-7, cup rows 8-19.
const WISPS: {x: number;delay: number;path: [number, number][];}[] = [
{ x: 5, delay: 0, path: [[0, 4], [1, 3], [0, 2], [-1, 1], [0, 0]] },
{ x: 9, delay: 0.8, path: [[0, 4], [-1, 3], [0, 2], [1, 1], [0, 0]] }];


export function CoffeeCup({
  size = 64,
  variant = 'cream',
  steaming = true,
  speed = 2.4,
  label = 'Coffee cup',
  className
}: CoffeeCupProps) {
  const reduceMotion = useReducedMotion();
  const p = COFFEE_CUP_PALETTES[variant];
  const animate = steaming && !reduceMotion;
  const decorative = label === '';

  return (
    <svg
      width={size}
      height={size * 20 / 16}
      viewBox="0 0 16 20"
      shapeRendering="crispEdges"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      
      {/* Steam */}
      {steaming &&
      WISPS.map((w, i) =>
      animate ?
      <motion.g
        key={i}
        initial={{ y: 3, opacity: 0 }}
        animate={{ y: [3, 0, -2], opacity: [0, 0.85, 0] }}
        transition={{
          duration: speed,
          delay: w.delay * speed / 2.4,
          repeat: Infinity,
          ease: 'easeOut',
          times: [0, 0.4, 1]
        }}>
        
              {w.path.map(([dx, y], j) =>
        <rect key={j} x={w.x + dx} y={y + 2} width={1} height={1} fill={STEAM} />
        )}
            </motion.g> :

      <g key={i} opacity={0.6}>
              {w.path.map(([dx, y], j) =>
        <rect key={j} x={w.x + dx} y={y + 2} width={1} height={1} fill={STEAM} />
        )}
            </g>

      )}

      {/* Rim outline */}
      <rect x={2} y={8} width={10} height={1} fill={p.outline} />
      {/* Coffee surface */}
      <rect x={2} y={9} width={10} height={1} fill={p.outline} />
      <rect x={3} y={9} width={8} height={1} fill={COFFEE} />
      <rect x={4} y={9} width={2} height={1} fill={COFFEE_LIGHT} />

      {/* Body outline */}
      <rect x={2} y={10} width={1} height={7} fill={p.outline} />
      <rect x={11} y={10} width={1} height={7} fill={p.outline} />
      <rect x={3} y={17} width={8} height={1} fill={p.outline} />
      {/* Body fill */}
      <rect x={3} y={10} width={8} height={7} fill={p.body} />
      {/* Right-side shade */}
      <rect x={9} y={10} width={2} height={7} fill={p.shade} />
      <rect x={3} y={16} width={8} height={1} fill={p.shade} />
      {/* Highlight */}
      <rect x={4} y={11} width={1} height={3} fill={p.highlight} />

      {/* Handle */}
      <rect x={12} y={11} width={2} height={1} fill={p.outline} />
      <rect x={14} y={12} width={1} height={3} fill={p.outline} />
      <rect x={12} y={15} width={2} height={1} fill={p.outline} />
      <rect x={12} y={12} width={2} height={3} fill={p.shade} />
      <rect x={13} y={13} width={1} height={1} fill={p.outline} />

      {/* Saucer */}
      <rect x={0} y={18} width={15} height={1} fill={p.outline} />
      <rect x={1} y={18} width={13} height={1} fill={p.shade} />
      <rect x={1} y={19} width={13} height={1} fill={p.outline} />
    </svg>);

}
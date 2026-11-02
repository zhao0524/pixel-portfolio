import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type LampSize = 'sm' | 'md' | 'lg';

export interface LampProps {
  /** Controlled on/off state. On = light theme, off = dark theme. */
  on?: boolean;
  /** Initial state when uncontrolled. */
  defaultOn?: boolean;
  /** Fires with the next state whenever the lamp is clicked. */
  onToggle?: (on: boolean) => void;
  /** Visual size of the lamp. */
  size?: LampSize;
  /** When true, toggles the `dark` class on <html> (off = dark). */
  syncDocumentTheme?: boolean;
  /** Show a small pixel caption under the lamp. */
  showLabel?: boolean;
  /** Accessible label for the switch. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

const SIZE_WIDTH: Record<LampSize, number> = {
  sm: 48,
  md: 80,
  lg: 128
};

// Pixel palette
const PALETTE = {
  body: '#44403c',
  bodyHighlight: '#78716c',
  shadeOff: '#292524',
  shadeOn: '#b45309',
  shadeHighlightOn: '#f59e0b',
  bulbOff: '#a8a29e',
  bulbOn: '#fef3c7',
  beam: '#fcd34d'
};

type Px = {x: number;y: number;w?: number;h?: number;};

const BASE: Px[] = [
{ x: 6, y: 36, w: 14, h: 2 },
{ x: 8, y: 35, w: 10, h: 1 },
{ x: 11, y: 33, w: 3, h: 2 }];


const LOWER_ARM: Px[] = [
{ x: 12, y: 31, w: 2, h: 2 },
{ x: 13, y: 29, w: 2, h: 2 },
{ x: 14, y: 27, w: 2, h: 2 },
{ x: 15, y: 25, w: 2, h: 2 },
{ x: 16, y: 23, w: 2, h: 2 },
{ x: 17, y: 21, w: 2, h: 2 }];


const ELBOW: Px = { x: 17, y: 18, w: 3, h: 3 };

const UPPER_ARM: Px[] = [
{ x: 16, y: 16, w: 2, h: 2 },
{ x: 15, y: 14, w: 2, h: 2 },
{ x: 14, y: 12, w: 2, h: 2 }];


const SHADE: Px[] = [
{ x: 9, y: 5, w: 4, h: 1 },
{ x: 7, y: 6, w: 8, h: 2 },
{ x: 5, y: 8, w: 12, h: 2 },
{ x: 4, y: 10, w: 14, h: 2 }];


const SHADE_HIGHLIGHT: Px[] = [
{ x: 8, y: 6, w: 2, h: 1 },
{ x: 6, y: 8, w: 2, h: 1 }];


const BULB: Px = { x: 8, y: 12, w: 6, h: 1 };

const BEAM_ROWS = Array.from({ length: 11 }, (_, i) => {
  const y = 13 + i * 2;
  const x = Math.max(0, 4 - i);
  const right = Math.min(32, 18 + i);
  return { x, y, w: right - x, h: 2, opacity: 0.32 - i * 0.025 };
});

export function Lamp({
  on,
  defaultOn = false,
  onToggle,
  size = 'md',
  syncDocumentTheme = false,
  showLabel = false,
  label = 'Toggle light theme',
  disabled = false,
  className = ''
}: LampProps) {
  const isControlled = on !== undefined;
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isOn = isControlled ? on as boolean : internalOn;

  useEffect(() => {
    if (!syncDocumentTheme || typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', !isOn);
  }, [isOn, syncDocumentTheme]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternalOn(next);
    onToggle?.(next);
  }, [disabled, isOn, isControlled, onToggle]);

  const width = SIZE_WIDTH[size];
  const height = Math.round(width * 40 / 32);

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        disabled={disabled}
        onClick={handleClick}
        whileTap={disabled ? undefined : { scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="relative inline-flex items-center justify-center rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        style={{ width: width + 8, height: height + 8 }}>
        
        <AnimatePresence>
          {isOn &&
          <motion.span
            key="glow"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-none absolute rounded-full bg-amber-300/50 blur-xl"
            style={{
              width: width * 0.9,
              height: width * 0.9,
              left: 4 + width * 0.0,
              top: 4 + height * 0.05
            }} />

          }
        </AnimatePresence>

        <svg
          width={width}
          height={height}
          viewBox="0 0 32 40"
          shapeRendering="crispEdges"
          className="relative"
          aria-hidden="true">
          
          {/* Light beam */}
          <AnimatePresence>
            {isOn &&
            <motion.g
              key="beam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              
                {BEAM_ROWS.map((r) =>
              <rect
                key={r.y}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={PALETTE.beam}
                opacity={Math.max(r.opacity, 0.06)} />

              )}
              </motion.g>
            }
          </AnimatePresence>

          {/* Base + arms */}
          {[...BASE, ...LOWER_ARM, ...UPPER_ARM].map((p, i) =>
          <PixelRect key={`b-${i}`} {...p} fill={PALETTE.body} />
          )}
          <PixelRect {...ELBOW} fill={PALETTE.bodyHighlight} />
          <PixelRect x={8} y={35} w={3} h={1} fill={PALETTE.bodyHighlight} />

          {/* Shade */}
          {SHADE.map((p, i) =>
          <PixelRect
            key={`s-${i}`}
            {...p}
            fill={isOn ? PALETTE.shadeOn : PALETTE.shadeOff} />

          )}
          {SHADE_HIGHLIGHT.map((p, i) =>
          <PixelRect
            key={`sh-${i}`}
            {...p}
            fill={isOn ? PALETTE.shadeHighlightOn : PALETTE.body} />

          )}

          {/* Bulb */}
          <PixelRect {...BULB} fill={isOn ? PALETTE.bulbOn : PALETTE.bulbOff} />
        </svg>
      </motion.button>

      {showLabel &&
      <span
        className={`font-mono text-[10px] uppercase tracking-widest ${
        isOn ? 'text-amber-600' : 'text-stone-500'}`
        }>
        
          {isOn ? 'Light' : 'Dark'}
        </span>
      }
    </div>);

}

function PixelRect({
  x,
  y,
  w = 1,
  h = 1,
  fill
}: Px & {fill: string;}) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} />;
}
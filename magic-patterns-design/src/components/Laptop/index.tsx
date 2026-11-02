import React, { useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

export type LaptopSize = 'sm' | 'md' | 'lg';

export interface LaptopProps {
  /** Content revealed inside the screen once the laptop is zoomed in. */
  children?: React.ReactNode;
  /** Text shown on the idle (un-zoomed) screen. */
  idleLabel?: string;
  /** Accessible label + header text for the zoomed screen window. */
  screenTitle?: string;
  /** Pixel unit scale of the laptop. */
  size?: LaptopSize;
  /** Controlled zoom state. */
  zoomed?: boolean;
  /** Initial zoom state when uncontrolled. */
  defaultZoomed?: boolean;
  /** Called whenever the zoom state should change. */
  onZoomChange?: (zoomed: boolean) => void;
  /** Disable interaction (renders as static art). */
  disabled?: boolean;
  className?: string;
}

export const LAPTOP_PALETTE = {
  outline: '#1a1c2c',
  shell: '#c2c3c7',
  shellLight: '#e6e7ea',
  shellDark: '#83769c',
  bezel: '#2b2d42',
  screen: '#1d2b53',
  screenGlow: '#29adff',
  text: '#fff1e8',
  accent: '#00e436',
  key: '#5f574f',
  keyTop: '#7e7368'
};

const UNIT: Record<LaptopSize, number> = { sm: 3, md: 4, lg: 5 };

export function Laptop({
  children,
  idleLabel = 'CLICK TO OPEN',
  screenTitle = 'portfolio.exe',
  size = 'md',
  zoomed,
  defaultZoomed = false,
  onZoomChange,
  disabled = false,
  className = ''
}: LaptopProps) {
  const [internalZoomed, setInternalZoomed] = useState(defaultZoomed);
  const isControlled = zoomed !== undefined;
  const isZoomed = isControlled ? zoomed : internalZoomed;
  const u = UNIT[size];
  const layoutId = useId();
  const p = LAPTOP_PALETTE;

  const setZoom = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalZoomed(next);
      onZoomChange?.(next);
    },
    [isControlled, onZoomChange]
  );

  useEffect(() => {
    if (!isZoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isZoomed, setZoom]);

  const lidW = 64 * u;
  const lidH = 44 * u;
  const baseW = 80 * u;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => !disabled && setZoom(true)}
        disabled={disabled}
        aria-label={`Open ${screenTitle}`}
        aria-expanded={isZoomed}
        aria-haspopup="dialog"
        whileHover={disabled ? undefined : { y: -u, scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className={`group relative inline-flex flex-col items-center bg-transparent p-0 outline-none focus-visible:ring-4 focus-visible:ring-[#29adff] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
        disabled ? 'cursor-default' : 'cursor-pointer'} ${
        className}`}
        style={{ imageRendering: 'pixelated' }}>
        
        {/* Lid */}
        <div
          className="relative"
          style={{
            width: lidW,
            height: lidH,
            background: p.shell,
            boxShadow: pixelBorder(u, p.outline),
            padding: 3 * u
          }}>
          
          {/* lid highlight */}
          <div
            aria-hidden
            className="absolute left-0 top-0"
            style={{ width: '100%', height: u, background: p.shellLight }} />
          
          {/* Bezel */}
          <div
            className="relative h-full w-full"
            style={{ background: p.bezel, padding: 2 * u }}>
            
            {/* webcam */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: Math.round(u / 2), width: u, height: u, background: p.accent }} />
            
            {/* Screen */}
            {!isZoomed &&
            <motion.div
              layoutId={layoutId}
              className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
              style={{ background: p.screen }}>
              
                <Scanlines unit={u} />
                <span
                className="relative font-mono font-bold tracking-widest"
                style={{ color: p.text, fontSize: 3 * u, lineHeight: 1 }}>
                
                  {idleLabel}
                  <motion.span
                  aria-hidden
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  className="inline-block align-middle"
                  style={{ width: 2 * u, height: 3 * u, marginLeft: u, background: p.accent }} />
                
                </span>
                <span
                className="relative mt-2 font-mono opacity-70 transition-opacity group-hover:opacity-100"
                style={{ color: p.screenGlow, fontSize: 2 * u }}>
                
                  {'> ' + screenTitle}
                </span>
              </motion.div>
            }
            {isZoomed && <div className="h-full w-full" style={{ background: p.screen }} />}
          </div>
        </div>

        {/* Hinge */}
        <div aria-hidden style={{ width: lidW - 8 * u, height: u, background: p.shellDark }} />

        {/* Base deck */}
        <div
          aria-hidden
          className="relative flex flex-col items-center"
          style={{
            width: baseW,
            height: 12 * u,
            background: p.shell,
            boxShadow: pixelBorder(u, p.outline),
            paddingTop: 2 * u,
            gap: u
          }}>
          
          {[14, 14, 10].map((count, row) =>
          <div key={row} className="flex" style={{ gap: u }}>
              {Array.from({ length: count }).map((_, i) => {
              const isSpace = row === 2 && i === 4;
              return (
                <div
                  key={i}
                  style={{
                    width: isSpace ? 20 * u : 3 * u,
                    height: 2 * u,
                    background: p.key,
                    boxShadow: `inset 0 ${u}px 0 0 ${p.keyTop}`
                  }} />);


            })}
            </div>
          )}
        </div>
        {/* Front lip */}
        <div
          aria-hidden
          className="relative flex justify-center"
          style={{ width: baseW - 2 * u, height: 2 * u, background: p.shellDark, marginTop: u }}>
          
          <div style={{ width: 16 * u, height: u, background: p.outline, opacity: 0.4 }} />
        </div>
      </motion.button>

      <AnimatePresence>
        {isZoomed &&
        <motion.div
          key="laptop-zoom"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          initial={{ backgroundColor: 'rgba(26,28,44,0)' }}
          animate={{ backgroundColor: 'rgba(26,28,44,0.85)' }}
          exit={{ backgroundColor: 'rgba(26,28,44,0)' }}
          onClick={() => setZoom(false)}>
          
            <motion.div
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-label={screenTitle}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="relative flex h-full max-h-[720px] w-full max-w-5xl flex-col overflow-hidden"
            style={{
              background: p.screen,
              boxShadow: `${pixelBorder(6, p.bezel)}, 0 0 0 12px ${p.shell}`
            }}>
            
              <div
              className="flex items-center justify-between px-4 py-2 font-mono text-sm font-bold"
              style={{ background: p.bezel, color: p.text }}>
              
                <span className="flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2 w-2" style={{ background: p.accent }} />
                  {screenTitle}
                </span>
                <button
                type="button"
                autoFocus
                onClick={() => setZoom(false)}
                aria-label="Close screen"
                className="flex h-7 w-7 items-center justify-center outline-none transition-colors hover:bg-[#ff004d] focus-visible:ring-2 focus-visible:ring-[#29adff]"
                style={{ color: p.text }}>
                
                  <XIcon className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="relative flex-1 overflow-auto p-6 font-mono"
              style={{ color: p.text }}>
              
                {children ??
              <p className="text-sm opacity-70">{'> No content loaded.'}</p>
              }
              </motion.div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}

function Scanlines({ unit }: {unit: number;}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-20"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, #000 0 ${unit / 2}px, transparent ${unit / 2}px ${unit}px)`
      }} />);


}

/** Notched, stepped-corner pixel border built from box-shadows. */
export function pixelBorder(u: number, color: string) {
  return [
  `0 -${u}px 0 0 ${color}`,
  `0 ${u}px 0 0 ${color}`,
  `-${u}px 0 0 0 ${color}`,
  `${u}px 0 0 0 ${color}`].
  join(', ');
}
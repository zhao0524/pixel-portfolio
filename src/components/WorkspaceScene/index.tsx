'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { BackgroundSkyline } from '../BackgroundSkyline';
import { LaptopScreen } from '../LaptopScreen';
import {
  SceneBooks,
  SceneClockBody,
  SceneClockDigits,
  SceneDesk,
  SceneIvy,
  SceneLamp,
  SceneLampBulb,
  SceneLaptopBody,
  SceneLaptopScreen,
  SceneMug,
  ScenePenHolder,
  ScenePlantLeft,
  SceneSteam,
  SceneSucculent,
  SceneWindowFrame } from
'./SceneParts';
import type { SceneTheme } from './SceneParts';

export type { SceneTheme } from './SceneParts';

export type WorkspaceSceneProps = {
  /** Initial theme when uncontrolled. */
  defaultTheme?: SceneTheme;
  /** Controlled theme. */
  theme?: SceneTheme;
  onThemeChange?: (theme: SceneTheme) => void;
  /** Content shown on the laptop screen once zoomed in. Defaults to the LaptopScreen portfolio. */
  laptopContent?: React.ReactNode;
  /** Start zoomed into the laptop. */
  defaultZoomed?: boolean;
  onZoomChange?: (zoomed: boolean) => void;
  /** Accessible label for the scene. */
  label?: string;
  className?: string;
};

const EASE = [0.65, 0, 0.35, 1] as const;

export function WorkspaceScene({
  defaultTheme = 'light',
  theme: controlledTheme,
  onThemeChange,
  laptopContent,
  defaultZoomed = false,
  onZoomChange,
  label = 'Pixel workspace overlooking the Toronto skyline',
  className = ''
}: WorkspaceSceneProps) {
  const [internalTheme, setInternalTheme] = useState<SceneTheme>(defaultTheme);
  const [zoomed, setZoomed] = useState(defaultZoomed);
  const [screenOpen, setScreenOpen] = useState(defaultZoomed);
  const [focus, setFocus] = useState<'lamp' | 'laptop' | null>(null);
  const reduceMotion = useReducedMotion();

  const theme = controlledTheme ?? internalTheme;
  const dark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const roomId = `room-${uid}`;
  const tintId = `night-tint-${uid}`;
  const fade = reduceMotion ? 'none' : 'opacity 600ms ease-in-out';

  const toggleTheme = useCallback(() => {
    const next: SceneTheme = dark ? 'light' : 'dark';
    if (controlledTheme === undefined) setInternalTheme(next);
    onThemeChange?.(next);
  }, [dark, controlledTheme, onThemeChange]);

  const setZoom = useCallback(
    (value: boolean) => {
      if (!value) setScreenOpen(false);
      setZoomed(value);
      onZoomChange?.(value);
    },
    [onZoomChange]
  );

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed, setZoom]);

  const activate = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };

  return (
    <section
      aria-label={label}
      className={`relative w-full select-none overflow-hidden bg-scene-sky-light ${className}`}
      style={{ aspectRatio: '16 / 9' }}>
      
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: '50% 73%' }}
        animate={{ scale: zoomed ? 3.6 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        onAnimationComplete={() => {
          if (zoomed) setScreenOpen(true);
        }}>
        
        {/* Layer 1 — skyline, day/night crossfade */}
        <div className="absolute inset-0" style={{ opacity: dark ? 0 : 1, transition: fade }}>
          <BackgroundSkyline variant="day" />
        </div>
        <div className="absolute inset-0" style={{ opacity: dark ? 1 : 0, transition: fade }}>
          <BackgroundSkyline variant="night" animated={dark} />
        </div>

        {/* Lamp glow — soft layer behind the crisp art */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-scene-lamp-glow-dark blur-2xl"
          style={{
            left: '62%',
            top: '50%',
            width: '18%',
            aspectRatio: '1 / 1',
            opacity: dark ? 0.55 : 0,
            transition: fade
          }} />
        

        {/* Layers 2–4 — frame, desk, desk objects */}
        <svg
          viewBox="0 0 320 180"
          preserveAspectRatio="xMidYMax slice"
          shapeRendering="crispEdges"
          className="absolute inset-0 block h-full w-full"
          style={{ imageRendering: 'pixelated' }}>
          
          <defs>
            <filter id={tintId} colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.5 0 0 0 0.05  0 0.45 0 0 0.03  0 0 0.6 0 0.1  0 0 0 1 0" />
              
            </filter>
          </defs>

          <g id={roomId}>
            <SceneWindowFrame />
            <SceneDesk />
            <ScenePlantLeft />
            <SceneSucculent />
            <ScenePenHolder />
            <SceneBooks />
            <SceneClockBody dark={dark} />
            <SceneMug />
            <SceneIvy />

            <g
              role="button"
              tabIndex={0}
              aria-label={dark ? 'Turn the lamp off (day)' : 'Turn the lamp on (night)'}
              aria-pressed={dark}
              onClick={toggleTheme}
              onKeyDown={activate(toggleTheme)}
              onFocus={() => setFocus('lamp')}
              onBlur={() => setFocus(null)}
              className="cursor-pointer outline-none">
              
              <rect x={216} y={92} width={42} height={66} fill="transparent" />
              <SceneLamp />
            </g>

            <g
              role="button"
              tabIndex={zoomed ? -1 : 0}
              aria-label="Open laptop"
              onClick={() => !zoomed && setZoom(true)}
              onKeyDown={activate(() => !zoomed && setZoom(true))}
              onFocus={() => setFocus('laptop')}
              onBlur={() => setFocus(null)}
              className="cursor-pointer outline-none">
              
              <SceneLaptopBody />
            </g>
          </g>

          {/* Night tint — static filter, crossfaded via opacity only */}
          <use
            href={`#${roomId}`}
            filter={`url(#${tintId})`}
            style={{ opacity: dark ? 1 : 0, transition: fade, pointerEvents: 'none' }} />
          

          {/* Untinted light sources */}
          <g pointerEvents="none">
            <SceneLaptopScreen dark={dark} />
            <SceneClockDigits dark={dark} />
            <g style={{ opacity: dark ? 1 : 0, transition: fade }}>
              <SceneLampBulb />
              <polygon points="222,106 236,101 262,152 214,156" fill="#ffdf99" opacity={0.18} />
            </g>
            <SceneSteam animated={!reduceMotion} />
          </g>

          {/* Focus rings */}
          {focus === 'laptop' &&
          <rect x={104} y={105} width={112} height={69} fill="none" stroke="#cfd8f7" strokeWidth={1.5} />
          }
          {focus === 'lamp' &&
          <rect x={216} y={92} width={42} height={66} fill="none" stroke="#cfd8f7" strokeWidth={1.5} />
          }
        </svg>
      </motion.div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? 'Switch to day' : 'Switch to night'}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm border-2 border-border bg-surface text-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus">
        
        {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </button>

      <AnimatePresence>
        {screenOpen &&
        <motion.div
          key="screen"
          role="dialog"
          aria-modal="true"
          aria-label="Laptop screen"
          className="absolute inset-0 z-30 flex bg-laptop-screen-bg-dark p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}>
          
            {laptopContent ?
          <div className="relative flex-1 overflow-auto rounded-md border-2 border-border-dark bg-laptop-screen-bg-dark p-6 text-laptop-screen-text-dark">
                <button
              type="button"
              onClick={() => setZoom(false)}
              autoFocus
              className="absolute right-3 top-3 rounded-sm border-2 border-border-dark px-2 py-1 font-mono text-xs text-laptop-screen-text-dark hover:bg-surface-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-dark">
              
                  Close
                </button>
                {laptopContent}
              </div> :

          <LaptopScreen name="David Zhao" onClose={() => setZoom(false)} className="min-h-0 flex-1" />
          }
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}
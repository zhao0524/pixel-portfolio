'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { BackgroundSkyline } from '../BackgroundSkyline';
import { LaptopScreen } from '../LaptopScreen';
import type { LaptopScreenProps } from '../LaptopScreen';
import {
  CLAUDE_BOUNDS,
  CLAUDE_BUBBLE_BOUNDS,
  SceneBooks,
  SceneClaude,
  SceneClaudeBubble,
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
import type { ClaudeBubblePlacement, SceneTheme } from './SceneParts';

export type { ClaudeBubblePlacement, SceneTheme } from './SceneParts';

export type WorkspaceSceneProps = {
  /** Initial theme when uncontrolled. */
  defaultTheme?: SceneTheme;
  /** Controlled theme. */
  theme?: SceneTheme;
  onThemeChange?: (theme: SceneTheme) => void;
  /** Content shown on the laptop screen once zoomed in. Defaults to the LaptopScreen portfolio. */
  laptopContent?: React.ReactNode;
  /** Content for the default LaptopScreen (projects, experience, bio...). Ignored with `laptopContent`. */
  laptopScreenProps?: Omit<LaptopScreenProps, 'onClose' | 'className'>;
  /** Start zoomed into the laptop. */
  defaultZoomed?: boolean;
  onZoomChange?: (zoomed: boolean) => void;
  /**
   * Called with the Claude buddy's element (to anchor UI to it) when Claude or its speech bubble is clicked.
   * Defaults to opening the laptop.
   */
  onClaudeClick?: (claude: Element) => void;
  /** Show Claude's "Click on me" speech bubble. */
  showClaudeBubble?: boolean;
  /** Where the speech bubble floats; use `above` when the scene's right edge may be cropped. */
  claudeBubblePlacement?: ClaudeBubblePlacement;
  /** Accessible label for the scene. */
  label?: string;
  /**
   * Pin the theme toggle and the zoomed laptop screen to the viewport instead of the scene box.
   * Use when the scene is sized larger than the viewport (e.g. cropped to fill the screen).
   */
  fixedOverlays?: boolean;
  className?: string;
};

const EASE = [0.65, 0, 0.35, 1] as const;

export function WorkspaceScene({
  defaultTheme = 'light',
  theme: controlledTheme,
  onThemeChange,
  laptopContent,
  laptopScreenProps,
  defaultZoomed = false,
  onZoomChange,
  onClaudeClick,
  showClaudeBubble = true,
  claudeBubblePlacement = 'top-right',
  label = 'Pixel workspace overlooking the Toronto skyline',
  fixedOverlays = false,
  className = ''
}: WorkspaceSceneProps) {
  const overlayPosition = fixedOverlays ? 'fixed' : 'absolute';
  const [internalTheme, setInternalTheme] = useState<SceneTheme>(defaultTheme);
  const [zoomed, setZoomed] = useState(defaultZoomed);
  const [screenOpen, setScreenOpen] = useState(defaultZoomed);
  const [focus, setFocus] = useState<'lamp' | 'laptop' | 'claude' | null>(null);
  const reduceMotion = useReducedMotion();

  const theme = controlledTheme ?? internalTheme;
  const dark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const roomId = `room-${uid}`;
  const tintId = `night-tint-${uid}`;
  const beamFadeId = `beam-fade-${uid}`;
  const beamBlurId = `beam-blur-${uid}`;
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
  const handleClaude = (e: React.SyntheticEvent<Element>) => {
    if (!onClaudeClick) return !zoomed && setZoom(true);
    onClaudeClick(e.currentTarget.querySelector('rect') ?? e.currentTarget);
  };

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed, setZoom]);

  const activate = (fn: (e: React.KeyboardEvent) => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn(e);
    }
  };

  // Only draw the focus ring for keyboard focus, not when an object is clicked.
  const onKeyboardFocus = (target: 'lamp' | 'laptop' | 'claude') => (e: React.FocusEvent<Element>) => {
    if (e.currentTarget.matches(':focus-visible')) setFocus(target);
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
            {/* Lamp beam: strongest at the shade, fading out towards the desk */}
            <linearGradient id={beamFadeId} gradientUnits="userSpaceOnUse" x1={0} y1={106} x2={0} y2={160}>
              <stop offset="0" stopColor="#ffdf99" stopOpacity={0.36} />
              <stop offset="0.6" stopColor="#ffdf99" stopOpacity={0.2} />
              <stop offset="1" stopColor="#ffdf99" stopOpacity={0} />
            </linearGradient>
            <filter id={beamBlurId} x="-30%" y="-10%" width="160%" height="120%">
              <feGaussianBlur stdDeviation={1.6} />
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
            <SceneClaude animated={!reduceMotion} lit={dark} fade={fade} />

            <SceneLamp />
            <SceneLaptopBody />
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
              <polygon points="219,106 235,106 251,160 203,160" fill={`url(#${beamFadeId})`} filter={`url(#${beamBlurId})`} shapeRendering="geometricPrecision" />
            </g>
            <SceneSteam animated={!reduceMotion} />
            {showClaudeBubble && !zoomed && <SceneClaudeBubble animated={!reduceMotion} placement={claudeBubblePlacement} />}
          </g>

          {/*
            Interactive hit areas live outside the room group: the night tint <use> clones the room,
            and focusable elements inside it would be tabbed to twice.
          */}
          <g
            role="button"
            tabIndex={0}
            aria-label={dark ? 'Turn the lamp off (day)' : 'Turn the lamp on (night)'}
            aria-pressed={dark}
            onClick={toggleTheme}
            onKeyDown={activate(toggleTheme)}
            onFocus={onKeyboardFocus('lamp')}
            onBlur={() => setFocus(null)}
            className="cursor-pointer outline-none [-webkit-tap-highlight-color:transparent]">
            
            {/* Tight hit area: shade, pole and base only — leaves room for Claude below the shade */}
            <rect x={216} y={94} width={22} height={14} fill="transparent" />
            <rect x={229} y={94} width={20} height={18} fill="transparent" />
            <rect x={243} y={110} width={8} height={42} fill="transparent" />
            <rect x={238} y={150} width={18} height={6} fill="transparent" />
          </g>

          <g
            role="button"
            tabIndex={zoomed ? -1 : 0}
            aria-label="Open laptop"
            onClick={() => !zoomed && setZoom(true)}
            onKeyDown={activate(() => !zoomed && setZoom(true))}
            onFocus={onKeyboardFocus('laptop')}
            onBlur={() => setFocus(null)}
            className="cursor-pointer outline-none [-webkit-tap-highlight-color:transparent]">
            
            <rect x={120} y={107} width={80} height={51} fill="transparent" />
            <rect x={104} y={157} width={112} height={17} fill="transparent" />
          </g>

          {/* Claude buddy + bubble hit area */}
          <g
            role="button"
            tabIndex={zoomed ? -1 : 0}
            aria-label="Claude: click on me, I can tell you more about David"
            onClick={handleClaude}
            onKeyDown={activate(handleClaude)}
            onFocus={onKeyboardFocus('claude')}
            onBlur={() => setFocus(null)}
            className="cursor-pointer outline-none [-webkit-tap-highlight-color:transparent]">
            
            <rect {...CLAUDE_BOUNDS} fill="transparent" />
            {showClaudeBubble && <rect {...CLAUDE_BUBBLE_BOUNDS[claudeBubblePlacement]} fill="transparent" />}
          </g>

          {/* Focus rings */}
          {focus === 'laptop' &&
          <rect x={104} y={105} width={112} height={69} fill="none" stroke="#cfd8f7" strokeWidth={1.5} />
          }
          {focus === 'claude' &&
          <rect {...CLAUDE_BOUNDS} fill="none" stroke="#cfd8f7" strokeWidth={1.5} />
          }
          {focus === 'lamp' &&
          <g fill="none" stroke="#cfd8f7" strokeWidth={1.5}>
              <rect x={215} y={93} width={36} height={16} />
              <rect x={238} y={109} width={20} height={48} />
            </g>
          }
        </svg>
      </motion.div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? 'Switch to day' : 'Switch to night'}
        className={`${overlayPosition} right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm border-2 border-border bg-surface text-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus`}>
        
        {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </button>

      <AnimatePresence>
        {screenOpen &&
        <motion.div
          key="screen"
          role="dialog"
          aria-modal="true"
          aria-label="Laptop screen"
          className={`${overlayPosition} inset-0 z-30 flex bg-laptop-screen-bg-dark p-2 sm:p-4`}
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

          <LaptopScreen name="David Zhao" {...laptopScreenProps} onClose={() => setZoom(false)} className="min-h-0 flex-1" />
          }
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}
'use client';

import React, { useId, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type BackgroundSkylineVariant = 'day' | 'night';

export interface BackgroundSkylineProps {
  /** Time of day. Both variants share identical framing/geometry. */
  variant?: BackgroundSkylineVariant;
  /** Enables subtle ambient motion (drifting clouds, twinkling stars, blinking beacon, bobbing boats). */
  animated?: boolean;
  /** Accessible label. When omitted the skyline is treated as decorative. */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

type Rect = [number, number, number, number];
type Tone = {body: string;roof: string;win: string;};
type Building = {x: number;w: number;h: number;t: 0 | 1 | 2;antennas?: number;};

type LandmarkKey = 'rbp' | 'td' | 'commerce' | 'fcp' | 'scotia' | 'bay' | 'cibc' | 'ice' | 'aura' | 'harbour';
type LandmarkTone = {body: string;facet: string;win: string;};
type LandmarkTop = 'flat' | 'slant-up' | 'slant-down' | 'notch' | 'setback' | 'sawtooth' | 'crown' | 'masts';
type LandmarkPattern = 'grid' | 'stripes' | 'bands';
type Landmark = {
  key: LandmarkKey;
  name: string;
  x: number;
  w: number;
  h: number;
  top: LandmarkTop;
  pattern: LandmarkPattern;
};

/*
 * Toronto's downtown core as seen from the Toronto Islands (looking north):
 * Rogers Centre + CN Tower on the west, the Financial District rising to the east,
 * with waterfront condos in front. Listed back-to-front.
 */
const LANDMARKS: Landmark[] = [
{ key: 'aura', name: 'Aura', x: 288, w: 8, h: 60, top: 'crown', pattern: 'bands' },
{ key: 'td', name: 'TD Bank Tower', x: 203, w: 9, h: 52, top: 'flat', pattern: 'grid' },
{ key: 'commerce', name: 'Commerce Court West', x: 214, w: 9, h: 56, top: 'setback', pattern: 'bands' },
{ key: 'bay', name: 'Bay Adelaide Centre', x: 249, w: 10, h: 56, top: 'flat', pattern: 'stripes' },
{ key: 'fcp', name: 'First Canadian Place', x: 224, w: 13, h: 70, top: 'masts', pattern: 'stripes' },
{ key: 'scotia', name: 'Scotia Plaza', x: 237, w: 12, h: 64, top: 'notch', pattern: 'grid' },
{ key: 'cibc', name: 'CIBC Square', x: 274, w: 12, h: 56, top: 'slant-down', pattern: 'stripes' },
{ key: 'rbp', name: 'Royal Bank Plaza', x: 197, w: 12, h: 36, top: 'sawtooth', pattern: 'stripes' },
{ key: 'ice', name: 'ICE Condos', x: 211, w: 7, h: 42, top: 'slant-up', pattern: 'grid' },
{ key: 'ice', name: 'ICE Condos II', x: 219, w: 7, h: 36, top: 'slant-down', pattern: 'grid' },
{ key: 'harbour', name: 'Harbour Plaza', x: 257, w: 6, h: 44, top: 'flat', pattern: 'grid' },
{ key: 'harbour', name: 'Harbour Plaza II', x: 264, w: 6, h: 40, top: 'flat', pattern: 'grid' }];


export const SKYLINE_PALETTES = {
  day: {
    sky: ['#3d98e8', '#58a8ee', '#79baf3', '#a2cff6'],
    cloud: '#ffffff',
    cloudShade: '#d4e7f8',
    far: '#a9c8e7',
    farWin: '#cfe1f3',
    tones: [
    { body: '#5a8fd2', roof: '#3d6db0', win: '#a9cff3' },
    { body: '#dac4a4', roof: '#b69d79', win: '#f5e9d4' },
    { body: '#93b7dd', roof: '#6f94bd', win: '#d6e8f8' }] as
    Tone[],
    tower: '#dccdb6',
    towerShade: '#b4a088',
    pod: '#f1ece3',
    podBand: '#c4453a',
    dome: '#f3f4f6',
    domeRib: '#c8cdd5',
    domeBase: '#c2ae94',
    trees: ['#3f8a35', '#5aa83f', '#7cc451'],
    shore: '#e6ddcc',
    water: ['#3d82d3', '#3573c2', '#2d65b0'],
    ripple: '#86bdf0',
    sail: '#ffffff',
    hull: '#6b4a3a',
    landmarks: {
      rbp: { body: '#d9ad4a', facet: '#b88a2c', win: '#f6e1a0' },
      td: { body: '#30343e', facet: '#22252c', win: '#5d6474' },
      commerce: { body: '#bdb5a8', facet: '#978f82', win: '#e2dcd1' },
      fcp: { body: '#eef0f3', facet: '#c6ccd5', win: '#ffffff' },
      scotia: { body: '#b0493f', facet: '#86352e', win: '#dc9187' },
      bay: { body: '#7f9fbf', facet: '#5f7f9f', win: '#c0d6ea' },
      cibc: { body: '#9cc4e4', facet: '#6f9cc4', win: '#dcecf8' },
      ice: { body: '#69a5d6', facet: '#4985b8', win: '#c2e0f6' },
      aura: { body: '#8eabc9', facet: '#6c8aa9', win: '#d2e2f1' },
      harbour: { body: '#a7c3df', facet: '#7f9fc0', win: '#e0edf8' }
    } as Record<LandmarkKey, LandmarkTone>
  },
  night: {
    sky: ['#1b1433', '#241a3d', '#2c2350', '#363063'],
    cloud: '#46406a',
    cloudShade: '#3a355c',
    far: '#2a2650',
    farWin: '#5a4f80',
    tones: [
    { body: '#1f2548', roof: '#161a36', win: '#f8d9a8' },
    { body: '#2b2342', roof: '#1f1931', win: '#ffdf99' },
    { body: '#252b50', roof: '#1a1f3c', win: '#f8d9a8' }] as
    Tone[],
    tower: '#3a3260',
    towerShade: '#2a2448',
    pod: '#4a4070',
    podBand: '#f6b8c4',
    dome: '#3b3463',
    domeRib: '#f6b8c4',
    domeBase: '#2a2448',
    trees: ['#1f3a33', '#2b4a3f', '#36574a'],
    shore: '#2a2448',
    water: ['#322f5c', '#2b2852', '#242147'],
    ripple: '#4d4880',
    sail: '#cfc6e6',
    hull: '#2a2448',
    landmarks: {
      rbp: { body: '#6e5a32', facet: '#54441f', win: '#ffdf99' },
      td: { body: '#15171f', facet: '#0e1016', win: '#f8d9a8' },
      commerce: { body: '#3a3550', facet: '#2c2840', win: '#f8d9a8' },
      fcp: { body: '#4a4774', facet: '#38355c', win: '#fffaf0' },
      scotia: { body: '#53293d', facet: '#3d1e2e', win: '#f6b8c4' },
      bay: { body: '#2b3158', facet: '#20254a', win: '#f8d9a8' },
      cibc: { body: '#2d3a62', facet: '#222c50', win: '#cfd8f7' },
      ice: { body: '#283863', facet: '#1e2b50', win: '#f8d9a8' },
      aura: { body: '#2e3258', facet: '#22264a', win: '#f6b8c4' },
      harbour: { body: '#303a64', facet: '#242d52', win: '#ffdf99' }
    } as Record<LandmarkKey, LandmarkTone>
  }
} as const;

const W = 320;
const H = 180;
const HZ = 118; // horizon / shoreline
const TX = 187; // CN Tower x

const TOWER_GLOW = '#f6b8c4';
const CITY_LIGHT = '#f8d9a8';

const NEAR: Building[] = [
{ x: 0, w: 10, h: 44, t: 1 },
{ x: 8, w: 14, h: 38, t: 2 },
{ x: 22, w: 10, h: 52, t: 2 },
{ x: 30, w: 16, h: 78, t: 0, antennas: 1 },
{ x: 46, w: 10, h: 46, t: 1 },
{ x: 56, w: 14, h: 66, t: 0 },
{ x: 70, w: 12, h: 50, t: 1 },
{ x: 82, w: 14, h: 70, t: 2 },
{ x: 96, w: 12, h: 56, t: 0 },
{ x: 108, w: 12, h: 42, t: 1 },
{ x: 118, w: 10, h: 60, t: 2 },
// St. Lawrence / One Yonge condos east of the core
{ x: 286, w: 10, h: 40, t: 2 },
{ x: 296, w: 12, h: 50, t: 0, antennas: 1 },
{ x: 308, w: 12, h: 38, t: 1 }];


type CloudSpec = {x: number;y: number;s: number;drift: number;dur: number;};
const CLOUDS: CloudSpec[] = [
{ x: -8, y: 26, s: 1.5, drift: 6, dur: 24 },
{ x: 36, y: 46, s: 0.9, drift: 5, dur: 20 },
{ x: 112, y: 30, s: 0.5, drift: 8, dur: 18 },
{ x: 142, y: 20, s: 0.35, drift: 6, dur: 22 },
{ x: 214, y: 26, s: 0.55, drift: -6, dur: 20 },
{ x: 262, y: 10, s: 1.3, drift: -5, dur: 26 },
{ x: 280, y: 50, s: 1.1, drift: -4, dur: 22 }];


export function BackgroundSkyline({
  variant = 'day',
  animated = true,
  title,
  className = '',
  style
}: BackgroundSkylineProps) {
  const isNight = variant === 'night';
  const p = SKYLINE_PALETTES[variant];
  const reduceMotion = useReducedMotion();
  const motionOn = animated && !reduceMotion;
  const glowId = `skyline-glow-${useId().replace(/:/g, '')}`;

  const far = useMemo(() => buildFar(), []);
  const stars = useMemo(() => buildStars(), []);
  const ripples = useMemo(() => buildRipples(), []);

  const bands: Rect[] = [
  [0, 0, W, 36],
  [0, 36, W, 34],
  [0, 70, W, 28],
  [0, 98, W, 20]];


  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: p.sky[0], ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}>
      
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        className="absolute inset-0 block h-full w-full"
        style={{ imageRendering: 'pixelated' }}>
        
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky */}
        {bands.map(([x, y, w, h], i) =>
        <rect key={`sky-${i}`} x={x} y={y} width={w} height={h} fill={p.sky[i]} />
        )}
        {bands.slice(1).map(([, y], i) =>
        Array.from({ length: W / 4 }, (_, k) =>
        <rect key={`dith-${i}-${k}`} x={k * 4 + i % 2 * 2} y={y - 1} width={2} height={1} fill={p.sky[i + 1]} />
        )
        )}

        {/* Stars + moon (night) */}
        {isNight &&
        stars.map((s, i) =>
        motionOn && s.twinkle ?
        <motion.rect
          key={`star-${i}`}
          x={s.x}
          y={s.y}
          width={s.size}
          height={s.size}
          fill="#fffaf0"
          animate={{ opacity: [0.9, 0.25, 0.9] }}
          transition={{ duration: 2.6 + i % 5 * 0.5, repeat: Infinity, delay: i % 7 * 0.4 }} /> :


        <rect key={`star-${i}`} x={s.x} y={s.y} width={s.size} height={s.size} fill="#fffaf0" opacity={0.8} />

        )}
        {isNight &&
        <g>
            {ellipse(250, 22, 8, 8).map(([x, y, w, h], i) =>
          <rect key={`moon-${i}`} x={x} y={y} width={w} height={h} fill="#fdf3d6" />
          )}
            {ellipse(254, 19, 7, 7).map(([x, y, w, h], i) =>
          <rect key={`cut-${i}`} x={x} y={y} width={w} height={h} fill={p.sky[0]} />
          )}
          </g>
        }

        {/* Clouds */}
        {CLOUDS.map((c, i) =>
        <Cloud
          key={`cloud-${i}`}
          {...c}
          fill={p.cloud}
          shade={p.cloudShade}
          opacity={isNight ? 0.55 : 1}
          animated={motionOn} />

        )}

        {/* Far haze buildings */}
        {far.map((b, i) =>
        <g key={`far-${i}`}>
            <rect x={b.x} y={HZ - b.h} width={b.w} height={b.h} fill={p.far} />
            {b.wins.map(([x, y], j) =>
          isNight && !b.lit[j] ? null :
          <rect key={j} x={x} y={y} width={1} height={1} fill={isNight ? '#8f7fae' : p.farWin} />

          )}
          </g>
        )}

        <CNTower p={p} isNight={isNight} glowId={glowId} animated={motionOn} />
        <Dome p={p} isNight={isNight} glowId={glowId} />

        {/* Financial District landmarks */}
        {LANDMARKS.map((l, i) =>
        <LandmarkTower key={`lm-${i}`} l={l} tone={p.landmarks[l.key]} isNight={isNight} seed={i} glowId={glowId} />
        )}

        {/* Near buildings */}
        {NEAR.map((b, i) => {
          const tone = p.tones[b.t];
          const top = HZ - b.h;
          return (
            <g key={`near-${i}`}>
              <rect x={b.x} y={top} width={b.w} height={b.h} fill={tone.body} />
              <rect x={b.x} y={top} width={b.w} height={2} fill={tone.roof} />
              <rect x={b.x + b.w - 2} y={top} width={2} height={b.h} fill={tone.roof} opacity={0.55} />
              {b.antennas === 1 && <rect x={b.x + Math.floor(b.w / 2)} y={top - 8} width={1} height={8} fill={tone.roof} />}
              {b.antennas === 2 &&
              <>
                  <rect x={b.x + 4} y={top - 10} width={1} height={10} fill={tone.roof} />
                  <rect x={b.x + b.w - 5} y={top - 10} width={1} height={10} fill={tone.roof} />
                </>
              }
              {windowsFor(b).map(([x, y], j) => {
                const lit = hash(i * 31 + x, y, 3) > 0.5;
                if (isNight && !lit) return null;
                return (
                  <rect
                    key={j}
                    x={x}
                    y={y}
                    width={b.t === 0 ? 1 : 2}
                    height={b.t === 0 ? 3 : 2}
                    fill={tone.win}
                    opacity={isNight ? 0.95 : 0.75} />);


              })}
            </g>);

        })}

        {/* Tree line */}
        {Array.from({ length: Math.ceil(W / 7) + 1 }, (_, k) => {
          const cx = k * 7 + 3;
          const ry = 3 + Math.round(hash(k, 4) * 2);
          return (
            <g key={`tree-${k}`}>
              {ellipse(cx, HZ - ry + 1, 4, ry).map(([x, y, w, h], j) =>
              <rect key={j} x={x} y={y} width={w} height={h} fill={p.trees[k % 3]} />
              )}
              <rect x={cx - 2} y={HZ - ry - 1} width={2} height={1} fill={p.trees[2]} opacity={isNight ? 0.4 : 0.9} />
            </g>);

        })}

        {/* Promenade + water */}
        <rect x={0} y={HZ} width={W} height={2} fill={p.shore} />
        <rect x={0} y={HZ + 2} width={W} height={18} fill={p.water[0]} />
        <rect x={0} y={HZ + 20} width={W} height={18} fill={p.water[1]} />
        <rect x={0} y={HZ + 38} width={W} height={H - HZ - 38} fill={p.water[2]} />
        {ripples.map(([x, y, w], i) =>
        <rect key={`rip-${i}`} x={x} y={y} width={w} height={1} fill={p.ripple} opacity={0.75} />
        )}

        {/* Tower reflection */}
        <g filter={isNight ? `url(#${glowId})` : undefined}>
          {[0, 1, 2, 3, 4, 5].map((k) =>
          <rect
            key={`trefl-${k}`}
            x={TX - 1 + k % 2}
            y={HZ + 4 + k * 5}
            width={k % 3 === 0 ? 4 : 2}
            height={2}
            fill={isNight ? TOWER_GLOW : p.tower}
            opacity={(isNight ? 0.85 : 0.5) - k * 0.1} />

          )}
        </g>
        {isNight &&
        [...NEAR, ...LANDMARKS].map((b, i) =>
        hash(i, 9) > 0.4 ?
        <rect
          key={`refl-${i}`}
          x={b.x + 2}
          y={HZ + 5 + i % 3 * 5}
          width={Math.max(2, b.w - 6)}
          height={1}
          fill={CITY_LIGHT}
          opacity={0.55} /> :

        null
        )}

        {/* Sailboats */}
        <Sailboat x={100} y={HZ + 14} size={10} p={p} animated={motionOn} delay={0} />
        <Sailboat x={222} y={HZ + 22} size={13} p={p} animated={motionOn} delay={1.2} />
      </svg>
    </div>);

}

/* ---------- Sub-shapes ---------- */

type Palette = (typeof SKYLINE_PALETTES)[BackgroundSkylineVariant];

function CNTower({ p, isNight, glowId, animated }: {p: Palette;isNight: boolean;glowId: string;animated: boolean;}) {
  const x = TX;
  return (
    <g>
      {/* Antenna */}
      <rect x={x} y={HZ - 112} width={1} height={20} fill={p.pod} />
      <rect x={x} y={HZ - 112} width={1} height={3} fill={p.podBand} />
      {/* Sky pod */}
      <rect x={x - 2} y={HZ - 92} width={5} height={3} fill={p.pod} />
      {/* Upper shaft */}
      <rect x={x - 2} y={HZ - 89} width={4} height={29} fill={p.tower} />
      <rect x={x + 1} y={HZ - 89} width={1} height={29} fill={p.towerShade} />
      {/* Main pod */}
      <rect x={x - 7} y={HZ - 61} width={14} height={2} fill={p.pod} />
      <rect x={x - 9} y={HZ - 59} width={18} height={5} fill={p.pod} />
      <rect x={x - 9} y={HZ - 57} width={18} height={1} fill={p.podBand} />
      <rect x={x - 9} y={HZ - 55} width={18} height={1} fill={p.towerShade} />
      <rect x={x - 7} y={HZ - 54} width={14} height={3} fill={p.tower} />
      {/* Lower shaft, flaring */}
      <rect x={x - 3} y={HZ - 51} width={6} height={21} fill={p.tower} />
      <rect x={x + 2} y={HZ - 51} width={1} height={21} fill={p.towerShade} />
      <rect x={x - 4} y={HZ - 30} width={8} height={16} fill={p.tower} />
      <rect x={x + 3} y={HZ - 30} width={1} height={16} fill={p.towerShade} />
      <rect x={x - 6} y={HZ - 14} width={12} height={14} fill={p.tower} />
      <rect x={x + 4} y={HZ - 14} width={2} height={14} fill={p.towerShade} />

      {isNight &&
      <g filter={`url(#${glowId})`}>
          <rect x={x - 1} y={HZ - 89} width={1} height={29} fill={TOWER_GLOW} />
          <rect x={x - 1} y={HZ - 51} width={1} height={37} fill={TOWER_GLOW} />
          {Array.from({ length: 9 }, (_, i) =>
        <rect key={i} x={x - 8 + i * 2} y={HZ - 58} width={1} height={1} fill={i % 2 ? '#fffaf0' : CITY_LIGHT} />
        )}
          <rect x={x - 2} y={HZ - 91} width={5} height={1} fill={TOWER_GLOW} />
        </g>
      }

      {isNight ?
      animated ?
      <motion.rect
        x={x - 1}
        y={HZ - 114}
        width={2}
        height={2}
        fill="#ff8a8a"
        filter={`url(#${glowId})`}
        animate={{ opacity: [1, 1, 0.15, 0.15] }}
        transition={{ duration: 1.6, repeat: Infinity, times: [0, 0.5, 0.55, 1], ease: 'linear' }} /> :


      <rect x={x - 1} y={HZ - 114} width={2} height={2} fill="#ff8a8a" /> :

      null}
    </g>);

}

function LandmarkTower({
  l,
  tone,
  isNight,
  seed,
  glowId






}: {l: Landmark;tone: LandmarkTone;isNight: boolean;seed: number;glowId: string;}) {
  const top = HZ - l.h;
  const cuts = Array.from({ length: l.w }, (_, i) => topCut(l.top, i, l.w));
  const isFacet = (i: number) => l.top === 'sawtooth' ? Math.floor(i / 3) % 2 === 1 : i >= l.w - 2;
  const colTop = (i: number) => top + cuts[i];

  const windows: React.ReactNode[] = [];
  if (isNight) {
    for (let y = top + 3; y < HZ - 5; y += 3) {
      for (let i = 1; i < l.w - 1; i += 2) {
        if (y < colTop(i) + 2 || hash(seed * 17 + i, y, 5) < 0.45) continue;
        windows.push(
          <rect key={`w-${i}-${y}`} x={l.x + i} y={y} width={1} height={l.pattern === 'stripes' ? 2 : 1} fill={tone.win} opacity={0.95} />
        );
      }
    }
  } else if (l.pattern === 'stripes') {
    for (let i = 1; i < l.w - 2; i += 2) {
      windows.push(
        <rect key={`s-${i}`} x={l.x + i} y={colTop(i) + 2} width={1} height={HZ - colTop(i) - 6} fill={tone.win} opacity={0.55} />
      );
    }
  } else if (l.pattern === 'bands') {
    for (let y = top + 4; y < HZ - 5; y += 3) {
      windows.push(<rect key={`b-${y}`} x={l.x + 1} y={y} width={l.w - 3} height={1} fill={tone.win} opacity={0.55} />);
    }
  } else {
    for (let y = top + 3; y < HZ - 5; y += 3) {
      for (let i = 1; i < l.w - 2; i += 2) {
        if (y < colTop(i) + 2) continue;
        windows.push(<rect key={`g-${i}-${y}`} x={l.x + i} y={y} width={1} height={1} fill={tone.win} opacity={0.7} />);
      }
    }
  }

  return (
    <g aria-label={l.name}>
      {cuts.map((c, i) =>
      <rect key={i} x={l.x + i} y={top + c} width={1} height={l.h - c} fill={isFacet(i) ? tone.facet : tone.body} />
      )}
      {l.top === 'masts' &&
      <>
          <rect x={l.x + 3} y={top - 5} width={1} height={5} fill={tone.facet} />
          <rect x={l.x + l.w - 4} y={top - 4} width={1} height={4} fill={tone.facet} />
        </>
      }
      {windows}
      {isNight && l.top === 'crown' &&
      <rect x={l.x + 2} y={top + 2} width={l.w - 4} height={2} fill={TOWER_GLOW} filter={`url(#${glowId})`} />
      }
      {isNight && l.top === 'masts' &&
      <rect x={l.x + 3} y={top - 6} width={1} height={1} fill="#ff8a8a" />
      }
    </g>);

}

function topCut(top: LandmarkTop, i: number, w: number) {
  switch (top) {
    case 'slant-up':
      return Math.round((w - 1 - i) * 0.8);
    case 'slant-down':
      return Math.round(i * 0.8);
    case 'notch':{
        const d = Math.abs(i - (w - 1) / 2);
        return d < 1 ? 3 : d < 2 ? 2 : d < 3 ? 1 : 0;
      }
    case 'setback':
      return i === 0 || i === w - 1 ? 3 : 0;
    case 'sawtooth':
      return [0, 2, 4][Math.floor(i / 3) % 3];
    case 'crown':
      return i === 0 || i === w - 1 ? 4 : i === 1 || i === w - 2 ? 2 : 0;
    default:
      return 0;
  }
}

function Dome({ p, isNight, glowId }: {p: Palette;isNight: boolean;glowId: string;}) {
  return (
    <g>
      {ellipse(151, HZ - 10, 22, 11).
      filter(([, y]) => y <= HZ - 10).
      map(([x, y, w, h], i) =>
      <rect key={`dome-${i}`} x={x} y={y} width={w} height={h} fill={p.dome} />
      )}
      <rect x={129} y={HZ - 10} width={44} height={10} fill={p.domeBase} />
      <rect x={129} y={HZ - 10} width={44} height={1} fill={p.domeRib} />
      <g filter={isNight ? `url(#${glowId})` : undefined}>
        {[136, 143, 151, 159, 166].map((rx) =>
        <rect
          key={rx}
          x={rx}
          y={HZ - (rx === 151 ? 21 : rx === 143 || rx === 159 ? 19 : 15)}
          width={1}
          height={rx === 151 ? 11 : rx === 143 || rx === 159 ? 9 : 5}
          fill={p.domeRib}
          opacity={0.8} />

        )}
      </g>
      {Array.from({ length: 10 }, (_, i) =>
      <rect
        key={`dwin-${i}`}
        x={132 + i * 4}
        y={HZ - 6}
        width={2}
        height={2}
        fill={isNight ? CITY_LIGHT : '#8f7a62'}
        opacity={isNight ? 0.9 : 0.6} />

      )}
    </g>);

}

function Cloud({
  x,
  y,
  s,
  drift,
  dur,
  fill,
  shade,
  opacity,
  animated
}: CloudSpec & {fill: string;shade: string;opacity: number;animated: boolean;}) {
  const puffs: [number, number, number, number][] = [
  [12, 10, 10, 7],
  [26, 6, 11, 8],
  [40, 10, 10, 7],
  [26, 13, 22, 5]];

  const r = (n: number) => Math.max(1, Math.round(n * s));
  const content =
  <g opacity={opacity}>
      {puffs.flatMap(([cx, cy, rx, ry], pi) =>
    ellipse(x + r(cx), y + r(cy), r(rx), r(ry)).map(([px, py, w, h], j) =>
    <rect key={`${pi}-${j}`} x={px} y={py} width={w} height={h} fill={fill} />
    )
    )}
      <rect x={x + r(6)} y={y + r(17)} width={r(40)} height={Math.max(1, r(2))} fill={shade} />
    </g>;

  if (!animated) return content;
  return (
    <motion.g animate={{ x: [0, drift, 0] }} transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}>
      {content}
    </motion.g>);

}

function Sailboat({
  x,
  y,
  size,
  p,
  animated,
  delay







}: {x: number;y: number;size: number;p: Palette;animated: boolean;delay: number;}) {
  const sail = Array.from({ length: size }, (_, i) =>
  <rect key={i} x={x + 1} y={y - size + i} width={Math.max(1, Math.round((i + 1) * 0.55))} height={1} fill={p.sail} />
  );
  const jib = Array.from({ length: Math.round(size * 0.7) }, (_, i) =>
  <rect key={`j${i}`} x={x - Math.max(1, Math.round((i + 1) * 0.35))} y={y - Math.round(size * 0.7) + i} width={Math.max(1, Math.round((i + 1) * 0.35))} height={1} fill={p.sail} opacity={0.9} />
  );
  const boat =
  <g>
      <rect x={x} y={y - size - 1} width={1} height={size + 1} fill={p.hull} />
      {sail}
      {jib}
      <rect x={x - 4} y={y} width={10} height={1} fill={p.hull} />
      <rect x={x - 3} y={y + 1} width={8} height={1} fill={p.hull} />
      <rect x={x - 2} y={y + 3} width={6} height={1} fill={p.sail} opacity={0.35} />
    </g>;

  if (!animated) return boat;
  return (
    <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}>
      {boat}
    </motion.g>);

}

/* ---------- Helpers ---------- */

function hash(a: number, b: number, c = 0) {
  let h = a * 374761393 + b * 668265263 + c * 1442695041 | 0;
  h = (h ^ h >>> 13) * 1274126177;
  h = h ^ h >>> 16;
  return (h >>> 0) / 4294967295;
}

function ellipse(cx: number, cy: number, rx: number, ry: number): Rect[] {
  const rows: Rect[] = [];
  for (let dy = -ry; dy <= ry; dy++) {
    const half = Math.round(rx * Math.sqrt(Math.max(0, 1 - dy * dy / (ry * ry))));
    if (half > 0) rows.push([cx - half, cy + dy, half * 2, 1]);
  }
  return rows;
}

function windowsFor(b: Building): [number, number][] {
  const out: [number, number][] = [];
  const top = HZ - b.h + 4;
  const stepX = b.t === 0 ? 2 : 4;
  const stepY = b.t === 0 ? 5 : 4;
  for (let y = top; y < HZ - 8; y += stepY) {
    for (let x = b.x + 2; x <= b.x + b.w - 4; x += stepX) out.push([x, y]);
  }
  return out;
}

function buildFar() {
  const out: {x: number;w: number;h: number;wins: [number, number][];lit: boolean[];}[] = [];
  let x = 0;
  let i = 0;
  while (x < W) {
    const w = 8 + Math.floor(hash(i, 1) * 8);
    const h = 30 + Math.floor(hash(i, 2) * 36);
    const wins: [number, number][] = [];
    for (let y = HZ - h + 3; y < HZ - 6; y += 4) {
      for (let wx = x + 2; wx < x + w - 2; wx += 3) wins.push([wx, y]);
    }
    out.push({ x, w, h, wins, lit: wins.map((_, j) => hash(i, j, 7) > 0.65) });
    x += w - 1;
    i++;
  }
  return out;
}

function buildStars() {
  const stars: {x: number;y: number;size: number;twinkle: boolean;}[] = [];
  for (let i = 0; i < 50; i++) {
    const x = Math.floor(hash(i, 11) * W);
    const y = Math.floor(hash(i, 23) * 80);
    if (x > 236 && x < 264 && y > 10 && y < 34) continue;
    stars.push({ x, y, size: hash(i, 37) > 0.85 ? 2 : 1, twinkle: hash(i, 51) > 0.6 });
  }
  return stars;
}

function buildRipples(): [number, number, number][] {
  return Array.from({ length: 46 }, (_, i) => [
  Math.floor(hash(i, 71) * (W - 12)),
  HZ + 4 + Math.floor(hash(i, 83) * (H - HZ - 8)),
  3 + Math.floor(hash(i, 97) * 10)]
  );
}
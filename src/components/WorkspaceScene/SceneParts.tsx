'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type SceneTheme = 'light' | 'dark';

/*
 * All scene art is drawn on a 320×180 pixel grid (same as BackgroundSkyline),
 * composed to match the reference photo: tall dark mullions, a honey-wood desk,
 * white-potted plants + pen cup + books on the left, laptop centered,
 * mug + trailing ivy on the right.
 */

type Rect = [number, number, number, number];

export function ellipseRows(cx: number, cy: number, rx: number, ry: number): Rect[] {
  const out: Rect[] = [];
  for (let dy = -ry; dy <= ry; dy++) {
    const half = Math.round(rx * Math.sqrt(Math.max(0, 1 - dy * dy / (ry * ry))));
    if (half > 0) out.push([cx - half, cy + dy, half * 2, 1]);
  }
  return out;
}

function Blob({ cx, cy, rx, ry, fill }: {cx: number;cy: number;rx: number;ry: number;fill: string;}) {
  return (
    <g fill={fill}>
      {ellipseRows(cx, cy, rx, ry).map(([x, y, w, h], i) =>
      <rect key={i} x={x} y={y} width={w} height={h} />
      )}
    </g>);

}

function PixelLine({
  from,
  to,
  fill,
  thickness = 1





}: {from: [number, number];to: [number, number];fill: string;thickness?: number;}) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    pts.push([Math.round(x0 + (x1 - x0) * i / steps), Math.round(y0 + (y1 - y0) * i / steps)]);
  }
  return (
    <g fill={fill}>
      {pts.map(([x, y], i) =>
      <rect key={i} x={x} y={y} width={thickness} height={thickness} />
      )}
    </g>);

}

const LEAF = { dark: '#2f7a3a', mid: '#4f9e3c', light: '#7cc24e', vine: '#3b6e2c' };
const POT = { body: '#f3f1ed', shade: '#d7d3cc', rim: '#ffffff', base: '#bdb8b0' };

function WhitePot({ x, y, w, h }: {x: number;y: number;w: number;h: number;}) {
  return (
    <g>
      <rect x={x} y={y + 2} width={w} height={h - 2} fill={POT.body} />
      <rect x={x + w - 4} y={y + 2} width={4} height={h - 2} fill={POT.shade} />
      <rect x={x} y={y} width={w} height={2} fill={POT.rim} />
      <rect x={x} y={y + h - 1} width={w} height={1} fill={POT.base} />
    </g>);

}

/* ---------- Window frame ---------- */

export function SceneWindowFrame() {
  const c = '#3b3f4a';
  const hi = '#5c616d';
  const lo = '#2a2d35';
  const bars = [
  { x: 18, w: 10 },
  { x: 72, w: 8 },
  { x: 263, w: 10 }];

  return (
    <g>
      {bars.map((b) =>
      <g key={b.x}>
          <rect x={b.x} y={0} width={b.w} height={134} fill={c} />
          <rect x={b.x} y={0} width={1} height={134} fill={hi} />
          <rect x={b.x + b.w - 1} y={0} width={1} height={134} fill={lo} />
        </g>
      )}
      <rect x={0} y={132} width={320} height={9} fill={c} />
      <rect x={0} y={132} width={320} height={1} fill={hi} />
      <rect x={0} y={140} width={320} height={2} fill={lo} />
    </g>);

}

/* ---------- Desk ---------- */

export function SceneDesk() {
  const wood = '#c98a52';
  const grain = '#a86c3c';
  const light = '#dca46c';
  const edge = '#7a4a2a';
  const streaks: [number, number, number][] = [
  [0, 148, 60],
  [90, 152, 80],
  [200, 147, 70],
  [30, 160, 90],
  [160, 165, 100],
  [260, 158, 60],
  [10, 170, 70],
  [120, 172, 60]];

  return (
    <g>
      <rect x={0} y={142} width={320} height={34} fill={wood} />
      {streaks.map(([x, y, w], i) =>
      <rect key={i} x={x} y={y} width={w} height={1} fill={grain} opacity={0.35} />
      )}
      {/* Sun shafts falling through the window */}
      <g fill="#efbe86" opacity={0.5}>
        <polygon points="96,142 122,142 94,176 66,176" />
        <polygon points="150,142 170,142 148,176 126,176" />
        <polygon points="228,142 262,142 244,176 208,176" />
      </g>
      <rect x={0} y={142} width={320} height={1} fill={light} />
      <rect x={0} y={175} width={320} height={1} fill={light} />
      <rect x={0} y={176} width={320} height={4} fill={edge} />
    </g>);

}

/* ---------- Left decor ---------- */

export function ScenePlantLeft() {
  const leaves: [number, number, number, number, keyof typeof LEAF][] = [
  [16, 56, 5, 9, 'light'],
  [34, 64, 10, 4, 'mid'],
  [8, 72, 8, 5, 'mid'],
  [40, 80, 11, 4, 'light'],
  [20, 86, 10, 5, 'dark'],
  [44, 96, 10, 4, 'mid'],
  [7, 96, 8, 4, 'light'],
  [28, 104, 11, 4, 'light'],
  [14, 109, 7, 3, 'mid']];

  return (
    <g>
      {leaves.map(([cx, cy], i) =>
      <PixelLine key={`st-${i}`} from={[12, 114]} to={[cx, cy]} fill={LEAF.vine} />
      )}
      {leaves.map(([cx, cy, rx, ry, tone], i) =>
      <g key={`lf-${i}`}>
          <Blob cx={cx} cy={cy} rx={rx} ry={ry} fill={LEAF[tone]} />
          <rect x={cx - rx + 2} y={cy} width={Math.max(1, rx * 2 - 4)} height={1} fill={LEAF.dark} opacity={0.7} />
        </g>
      )}
      <WhitePot x={0} y={114} w={24} h={34} />
    </g>);

}

export function SceneSucculent() {
  const tips: [number, number][] = [
  [28, 120],
  [31, 117],
  [35, 115],
  [39, 117],
  [42, 120],
  [30, 124],
  [40, 124]];

  return (
    <g>
      {tips.map((t, i) =>
      <PixelLine key={i} from={[35, 131]} to={t} fill={i % 2 ? LEAF.light : LEAF.mid} thickness={2} />
      )}
      <WhitePot x={27} y={130} w={17} h={16} />
    </g>);

}

export function ScenePenHolder() {
  return (
    <g>
      <rect x={60} y={113} width={2} height={15} fill="#2b2d33" />
      <rect x={60} y={113} width={2} height={2} fill="#9aa0aa" />
      <rect x={64} y={116} width={2} height={12} fill="#3b3e46" />
      <rect x={67} y={110} width={2} height={18} fill="#2b2d33" />
      <rect x={67} y={110} width={2} height={1} fill="#c9a24f" />
      <rect x={70} y={115} width={2} height={13} fill="#444852" />
      <rect x={57} y={128} width={18} height={20} fill="#cfd2d6" />
      <rect x={71} y={128} width={4} height={20} fill="#aeb2b8" />
      <rect x={57} y={126} width={18} height={2} fill="#e3e5e8" />
      <rect x={59} y={126} width={14} height={1} fill="#5b5f66" />
      <rect x={57} y={147} width={18} height={1} fill="#9a9ea5" />
    </g>);

}

export function SceneBooks() {
  return (
    <g>
      {/* bottom book */}
      <rect x={0} y={155} width={46} height={3} fill="#3a4560" />
      <rect x={0} y={158} width={44} height={5} fill="#efe7d6" />
      <rect x={0} y={160} width={44} height={1} fill="#d8ceb8" />
      <rect x={44} y={158} width={2} height={5} fill="#2b3445" />
      <rect x={0} y={163} width={46} height={2} fill="#2b3445" />
      {/* top book */}
      <rect x={2} y={146} width={40} height={3} fill="#2f3a52" />
      <rect x={2} y={146} width={40} height={1} fill="#46526e" />
      <rect x={2} y={149} width={38} height={4} fill="#efe7d6" />
      <rect x={2} y={151} width={38} height={1} fill="#d8ceb8" />
      <rect x={40} y={149} width={2} height={4} fill="#232c3d" />
      <rect x={2} y={153} width={40} height={2} fill="#232c3d" />
    </g>);

}

/* ---------- Clock ---------- */

export function SceneClockBody({ dark }: {dark: boolean;}) {
  return (
    <g>
      <rect x={80} y={149} width={26} height={14} fill="#3a2f2b" />
      <rect x={80} y={149} width={26} height={1} fill="#5a4a43" />
      <rect x={82} y={151} width={22} height={10} fill={dark ? '#241b36' : '#1c2433'} />
      <rect x={82} y={163} width={4} height={1} fill="#2a211e" />
      <rect x={100} y={163} width={4} height={1} fill="#2a211e" />
    </g>);

}

/** Live digits — its own state so ticking never re-renders the rest of the scene. */
export function SceneClockDigits({ dark }: {dark: boolean;}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return (
    <text
      x={93}
      y={159}
      textAnchor="middle"
      fontSize={7.5}
      fontFamily="'Pixelify Sans', ui-monospace, monospace"
      fill={dark ? '#f5dca0' : '#86c8ff'}
      style={{ transition: 'fill 500ms ease' }}>
      
      {hh}
      <tspan opacity={now.getSeconds() % 2 === 0 ? 1 : 0.25}>:</tspan>
      {mm}
    </text>);

}

/* ---------- Laptop ---------- */

const SPACE_BLACK = {
  body: '#2f3034',
  highlight: '#55575d',
  shade: '#232428',
  hinge: '#121316',
  well: '#1b1c1f',
  key: '#0b0b0d',
  trackpad: '#3a3b40',
  trackpadEdge: '#2a2b2f',
  edge: '#26272b',
  notch: '#18191c'
};

export function SceneLaptopBody() {
  const c = SPACE_BLACK;
  return (
    <g>
      {/* Lid — borderless black glass with rounded top corners */}
      <rect x={122} y={107} width={76} height={1} fill="#0a0a0d" />
      <rect x={121} y={108} width={78} height={1} fill="#0a0a0d" />
      <rect x={120} y={109} width={80} height={48} fill="#0a0a0d" />
      <rect x={159} y={108} width={2} height={1} fill="#1f2a44" />
      <rect x={122} y={110} width={76} height={46} fill="#1d2740" />
      {/* Hinge — tucked between lid and deck, with rounded ends */}
      <rect x={121} y={157} width={78} height={1} fill={c.hinge} />
      <rect x={119} y={158} width={82} height={1} fill={c.well} />
      {/* Unibody deck — wider than the lid, rounded at every corner */}
      <polygon
        points="118,159 202,159 204,160 205,161 214,168 214,169 213,170 107,170 106,169 106,168 115,161 116,160"
        fill={c.body} />
      
      <rect x={118} y={159} width={84} height={1} fill={c.shade} />
      {/* Keyboard well + keys */}
      <polygon
        points="123,160 197,160 198,161 201,164 200,165 120,165 119,164 122,161"
        fill={c.well} />
      
      {Array.from({ length: 25 }).map((_, i) =>
      <rect key={`k1-${i}`} x={123 + i * 3} y={160} width={2} height={1} fill={c.key} />
      )}
      {Array.from({ length: 26 }).map((_, i) =>
      <rect key={`k2-${i}`} x={121 + i * 3} y={162} width={2} height={1} fill={c.key} />
      )}
      {[120, 123, 126, 129, 132, 186, 189, 192, 195, 198].map((x) =>
      <rect key={`k3-${x}`} x={x} y={164} width={2} height={1} fill={c.key} />
      )}
      <rect x={136} y={164} width={47} height={1} fill={c.key} />
      {/* Trackpad */}
      <rect x={147} y={166} width={26} height={1} fill={c.trackpadEdge} />
      <rect x={146} y={167} width={28} height={1} fill={c.trackpad} />
      <rect x={147} y={168} width={26} height={1} fill={c.trackpad} />
      {/* Thin front edge with rounded ends + thumb notch */}
      <rect x={107} y={170} width={106} height={1} fill={c.edge} />
      <rect x={108} y={171} width={104} height={1} fill={c.edge} />
      <rect x={152} y={170} width={16} height={1} fill={c.notch} />
      <rect x={110} y={172} width={100} height={1} fill="#8a5531" opacity={0.5} />
    </g>);

}

/** Screen content drawn above the night tint so the display keeps glowing. */
export function SceneLaptopScreen({ dark }: {dark: boolean;}) {
  const font = "'Pixelify Sans', ui-monospace, monospace";
  return (
    <g>
      <rect x={122} y={110} width={76} height={46} fill={dark ? '#241b36' : '#1d2740'} />
      <rect x={122} y={110} width={76} height={3} fill={dark ? '#342a4d' : '#2a3556'} />
      <rect x={124} y={111} width={1} height={1} fill="#f9c6d3" />
      <rect x={126} y={111} width={1} height={1} fill="#f5dca0" />
      <rect x={128} y={111} width={1} height={1} fill="#c6e7d9" />
      <text x={127} y={124} fontSize={6} fontFamily={font} fill="#ffffff">
        Hello, I&apos;m
      </text>
      <text x={127} y={131} fontSize={6} fontFamily={font} fill="#ffffff">
        David Zhao
      </text>
      <rect x={127} y={134} width={18} height={1} fill="#f9c6d3" />
      <polygon points="124,155 138,141 152,155" fill="#2f3d63" />
      <polygon points="140,155 152,145 166,155" fill="#3a4a75" />
      <rect x={172} y={116} width={23} height={36} fill={dark ? '#1b1430' : '#18203a'} />
      {['About', 'Projects', 'Experience', 'Contact'].map((t, i) =>
      <text key={t} x={175} y={123 + i * 7} fontSize={3.4} fontFamily={font} fill="#cfd8f7">
          {t}
        </text>
      )}
      {/* Rounded display corners */}
      <g fill="#0a0a0d">
        <rect x={122} y={110} width={1} height={1} />
        <rect x={197} y={110} width={1} height={1} />
        <rect x={122} y={155} width={1} height={1} />
        <rect x={197} y={155} width={1} height={1} />
      </g>
    </g>);

}

/* ---------- Lamp ---------- */

export function SceneLamp() {
  const c = '#2b2a31';
  const hi = '#4a4852';
  return (
    <g>
      <rect x={238} y={152} width={18} height={3} fill={c} />
      <rect x={240} y={151} width={14} height={1} fill={hi} />
      <rect x={246} y={112} width={2} height={40} fill={c} />
      <rect x={245} y={110} width={4} height={3} fill={hi} />
      <PixelLine from={[246, 111]} to={[233, 100]} fill={c} thickness={2} />
      <polygon points="218,98 232,94 236,101 222,106" fill={c} />
      <polygon points="221,104 235,99 236,101 222,106" fill="#56545e" />
    </g>);

}

export function SceneLampBulb() {
  return <polygon points="221,104 235,99 236,101 222,106" fill="#ffe7a8" />;
}

/* ---------- Right decor ---------- */

export function SceneMug() {
  return (
    <g>
      <rect x={261} y={138} width={14} height={20} fill="#f3f1ee" />
      <rect x={271} y={138} width={4} height={20} fill="#d9d6d0" />
      <rect x={261} y={136} width={14} height={2} fill="#e6e3de" />
      <rect x={262} y={137} width={12} height={1} fill="#5b3a26" />
      <rect x={275} y={142} width={5} height={2} fill="#e6e3de" />
      <rect x={278} y={142} width={2} height={10} fill="#e6e3de" />
      <rect x={275} y={150} width={5} height={2} fill="#e6e3de" />
      <rect x={261} y={157} width={14} height={1} fill="#c9c5bf" />
      <rect x={263} y={158} width={13} height={1} fill="#8a5531" opacity={0.45} />
    </g>);

}

export function SceneSteam({ animated }: {animated: boolean;}) {
  const wisps: {x: number;delay: number;path: [number, number][];}[] = [
  { x: 265, delay: 0, path: [[0, 0], [1, -2], [0, -4], [-1, -6], [0, -8]] },
  { x: 270, delay: 1.1, path: [[0, 0], [-1, -2], [0, -4], [1, -6], [0, -8]] }];

  return (
    <g>
      {wisps.map((w, i) => {
        const rects = w.path.map(([dx, dy], j) =>
        <rect key={j} x={w.x + dx} y={133 + dy} width={1} height={2} fill="#ffffff" />
        );
        if (!animated) {
          return (
            <g key={i} opacity={0.45}>
              {rects}
            </g>);

        }
        return (
          <motion.g
            key={i}
            initial={{ y: 2, opacity: 0 }}
            animate={{ y: [2, -2, -6], opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.6, delay: w.delay, repeat: Infinity, ease: 'easeOut', times: [0, 0.4, 1] }}>
            
            {rects}
          </motion.g>);

      })}
    </g>);

}

export function SceneIvy() {
  const topLeaves: [number, number, number, number, keyof typeof LEAF][] = [
  [308, 104, 6, 4, 'mid'],
  [316, 99, 5, 4, 'light'],
  [300, 109, 5, 3, 'light'],
  [313, 108, 5, 3, 'dark']];

  const trail: [number, number][] = [
  [301, 120],
  [297, 126],
  [299, 133],
  [294, 138],
  [298, 145],
  [293, 150],
  [289, 156]];

  return (
    <g>
      <PixelLine from={[304, 116]} to={[296, 130]} fill={LEAF.vine} />
      <PixelLine from={[296, 130]} to={[298, 142]} fill={LEAF.vine} />
      <PixelLine from={[298, 142]} to={[290, 156]} fill={LEAF.vine} />
      {topLeaves.map(([cx, cy, rx, ry, t], i) =>
      <Blob key={`t-${i}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={LEAF[t]} />
      )}
      <WhitePot x={303} y={114} w={17} h={32} />
      {trail.map(([cx, cy], i) =>
      <Blob key={`v-${i}`} cx={cx} cy={cy} rx={3} ry={2} fill={i % 2 ? LEAF.light : LEAF.mid} />
      )}
    </g>);

}
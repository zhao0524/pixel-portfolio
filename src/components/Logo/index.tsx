'use client';

import React, { useEffect } from 'react';

export type LogoSize = 'sm' | 'md' | 'lg';
export type LogoTone = 'dark' | 'light';

export interface LogoProps {
  /** Visual size of the wordmark and glyph */
  size?: LogoSize;
  /** `dark` = dark ink for light backgrounds, `light` = light ink for dark backgrounds */
  tone?: LogoTone;
  /** Show the pixel glyph mark */
  showGlyph?: boolean;
  /** Show the wordmark text */
  showText?: boolean;
  /** Wordmark text (defaults to "David Zhao") */
  name?: string;
  /** Optional link target; renders an anchor when provided */
  href?: string;
  className?: string;
}

const FONT_HREF =
'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'logo-pixelify-sans-font';

const sizeStyles: Record<LogoSize, {text: string;glyph: number;gap: string;}> = {
  sm: { text: 'text-base', glyph: 16, gap: 'gap-1.5' },
  md: { text: 'text-xl', glyph: 22, gap: 'gap-2' },
  lg: { text: 'text-3xl', glyph: 32, gap: 'gap-3' }
};

const toneStyles: Record<LogoTone, {ink: string;accent: string;focus: string;}> = {
  dark: {
    ink: 'text-zinc-900',
    accent: 'text-emerald-600',
    focus: 'focus-visible:ring-zinc-900 focus-visible:ring-offset-white'
  },
  light: {
    ink: 'text-zinc-50',
    accent: 'text-emerald-400',
    focus: 'focus-visible:ring-zinc-50 focus-visible:ring-offset-zinc-900'
  }
};

// 8x8 pixel "D" monogram with a blinking-cursor pixel
const GLYPH_PIXELS: Array<[number, number]> = [
[1, 1], [2, 1], [3, 1], [4, 1],
[1, 2], [5, 2],
[1, 3], [6, 3],
[1, 4], [6, 4],
[1, 5], [5, 5],
[1, 6], [2, 6], [3, 6], [4, 6]];


export function PixelGlyph({
  size = 22,
  className = ''



}: {size?: number;className?: string;}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`shrink-0 ${className}`}>
      
      {GLYPH_PIXELS.map(([x, y]) =>
      <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      )}
      <rect x={3} y={3} width={1} height={2} fill="currentColor" opacity={0.55} />
    </svg>);

}

export function Logo({
  size = 'md',
  tone = 'dark',
  showGlyph = true,
  showText = true,
  name = 'David Zhao',
  href,
  className = ''
}: LogoProps) {
  useEnsurePixelFont();

  const s = sizeStyles[size];
  const t = toneStyles[tone];

  const content =
  <>
      {showGlyph && <PixelGlyph size={s.glyph} className={t.accent} />}
      {showText &&
    <span
      className={`${s.text} font-semibold leading-none tracking-tight ${t.ink}`}
      style={{ fontFamily: "'Pixelify Sans', ui-monospace, monospace" }}>
      
          {name}
        </span>
    }
    </>;


  const base = `inline-flex items-center select-none ${s.gap} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        aria-label={`${name} — home`}
        className={`${base} rounded-sm outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 ${t.focus}`}>
        
        {content}
      </a>);

  }

  return (
    <span className={base} role="img" aria-label={name}>
      {content}
    </span>);

}

function useEnsurePixelFont() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
}
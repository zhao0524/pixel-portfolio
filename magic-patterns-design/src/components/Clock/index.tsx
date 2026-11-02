import React, { useEffect, useState } from 'react';
import { format as formatDate } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export type ClockFormat = '12h' | '24h';
export type ClockSize = 'sm' | 'md' | 'lg';

export interface ClockProps {
  /** 12-hour (with AM/PM indicator) or 24-hour display. */
  format?: ClockFormat;
  /** Show the seconds digits. */
  showSeconds?: boolean;
  /** Show the date strip above the digits. */
  showDate?: boolean;
  /** Blink the colon separators every second. */
  blink?: boolean;
  /** Overall scale of the clock. */
  size?: ClockSize;
  /** Freeze the clock at a fixed time (disables live updates). */
  time?: Date;
  /** Small label printed on the clock housing. */
  label?: string;
  className?: string;
}

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

const SEGMENT_RECTS: Record<Segment, {x: number;y: number;w: number;h: number;}> = {
  a: { x: 4, y: 0, w: 16, h: 4 },
  b: { x: 20, y: 4, w: 4, h: 16 },
  c: { x: 20, y: 24, w: 4, h: 16 },
  d: { x: 4, y: 40, w: 16, h: 4 },
  e: { x: 0, y: 24, w: 4, h: 16 },
  f: { x: 0, y: 4, w: 4, h: 16 },
  g: { x: 4, y: 20, w: 16, h: 4 }
};

const DIGIT_SEGMENTS: Record<string, Segment[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'e', 'd', 'c'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
  ' ': []
};

const SIZE_STYLES: Record<
  ClockSize,
  {digit: number;gap: string;pad: string;meta: string;housing: string;}> =
{
  sm: { digit: 28, gap: 'gap-1', pad: 'px-3 py-2', meta: 'text-[9px]', housing: 'p-2 rounded-lg' },
  md: { digit: 44, gap: 'gap-1.5', pad: 'px-4 py-3', meta: 'text-[10px]', housing: 'p-3 rounded-xl' },
  lg: { digit: 72, gap: 'gap-2.5', pad: 'px-6 py-4', meta: 'text-xs', housing: 'p-4 rounded-2xl' }
};

const LCD_ON = '#1f2a1a';
const LCD_OFF = 'rgba(31, 42, 26, 0.08)';

export function Clock({
  format = '24h',
  showSeconds = true,
  showDate = false,
  blink = true,
  size = 'md',
  time,
  label,
  className
}: ClockProps) {
  const now = useNow(time);
  const s = SIZE_STYLES[size];

  const rawHours = now.getHours();
  const isPm = rawHours >= 12;
  const hours = format === '12h' ? rawHours % 12 || 12 : rawHours;
  const hourStr =
  format === '12h' ? String(hours).padStart(2, ' ') : String(hours).padStart(2, '0');
  const minuteStr = String(now.getMinutes()).padStart(2, '0');
  const secondStr = String(now.getSeconds()).padStart(2, '0');
  const colonOn = !blink || time !== undefined || now.getSeconds() % 2 === 0;

  const spoken = formatDate(now, format === '12h' ? 'h:mm:ss a' : 'HH:mm:ss');
  const digitWidth = s.digit * 24 / 44;

  return (
    <div
      className={twMerge(
        'inline-flex flex-col bg-neutral-900 shadow-[0_2px_0_0_#000,0_8px_24px_-8px_rgba(0,0,0,0.5)] ring-1 ring-neutral-700',
        s.housing,
        className
      )}>
      
      <time
        dateTime={now.toISOString()}
        aria-label={`Current time ${spoken}`}
        className={twMerge(
          'flex flex-col rounded-md bg-[#9ead86] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]',
          s.pad
        )}>
        
        {(showDate || format === '12h') &&
        <div
          aria-hidden="true"
          className={twMerge(
            'mb-1.5 flex items-center justify-between font-mono font-bold uppercase tracking-widest',
            s.meta
          )}>
          
            <span style={{ color: showDate ? LCD_ON : 'transparent' }}>
              {formatDate(now, 'EEE dd MMM')}
            </span>
            {format === '12h' &&
          <span className="flex gap-1.5">
                <span style={{ color: isPm ? LCD_OFF : LCD_ON }}>AM</span>
                <span style={{ color: isPm ? LCD_ON : LCD_OFF }}>PM</span>
              </span>
          }
          </div>
        }
        <div aria-hidden="true" className={twMerge('flex items-center', s.gap)}>
          <DigitPair value={hourStr} height={s.digit} width={digitWidth} gap={s.gap} />
          <Colon height={s.digit} on={colonOn} />
          <DigitPair value={minuteStr} height={s.digit} width={digitWidth} gap={s.gap} />
          {showSeconds &&
          <>
              <Colon height={s.digit * 0.6} on={colonOn} alignBottom />
              <DigitPair
              value={secondStr}
              height={s.digit * 0.6}
              width={digitWidth * 0.6}
              gap={s.gap}
              alignBottom />
            
            </>
          }
        </div>
      </time>
      {label &&
      <span
        className={twMerge(
          'mt-1.5 text-center font-mono font-semibold uppercase tracking-[0.2em] text-neutral-400',
          s.meta
        )}>
        
          {label}
        </span>
      }
    </div>);

}

interface DigitPairProps {
  value: string;
  height: number;
  width: number;
  gap: string;
  alignBottom?: boolean;
}

function DigitPair({ value, height, width, gap, alignBottom }: DigitPairProps) {
  return (
    <div className={twMerge('flex', gap, alignBottom && 'self-end')}>
      {value.split('').map((char, i) =>
      <Digit key={i} char={char} height={height} width={width} />
      )}
    </div>);

}

function Digit({ char, height, width }: {char: string;height: number;width: number;}) {
  const active = DIGIT_SEGMENTS[char] ?? [];
  return (
    <svg width={width} height={height} viewBox="0 0 24 44" className="block shrink-0">
      {(Object.keys(SEGMENT_RECTS) as Segment[]).map((seg) => {
        const r = SEGMENT_RECTS[seg];
        return (
          <rect
            key={seg}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={active.includes(seg) ? LCD_ON : LCD_OFF} />);


      })}
    </svg>);

}

function Colon({ height, on, alignBottom }: {height: number;on: boolean;alignBottom?: boolean;}) {
  const dot = Math.max(3, Math.round(height / 11));
  return (
    <div
      className={twMerge('flex flex-col justify-center', alignBottom && 'self-end')}
      style={{ height, gap: dot * 2 }}>
      
      {[0, 1].map((i) =>
      <span
        key={i}
        className="block transition-colors duration-150"
        style={{ width: dot, height: dot, backgroundColor: on ? LCD_ON : LCD_OFF }} />

      )}
    </div>);

}

function useNow(fixed?: Date): Date {
  const [now, setNow] = useState<Date>(() => fixed ?? new Date());

  useEffect(() => {
    if (fixed) {
      setNow(fixed);
      return;
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    // Align ticks to the start of each second.
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 1000);
    }, 1000 - Date.now() % 1000);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [fixed]);

  return now;
}
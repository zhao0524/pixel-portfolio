import React from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const INK = '#111111';

/**
 * Builds a notched "pixel" frame with stacked box-shadows (no border-radius).
 * The four straight edges are drawn outside the box, leaving the corners
 * empty for a stepped 8-bit look. An optional drop shadow sits below-right.
 */
export function pixelFrame(px: number, color: string, drop = 0): string {
  const edges = [
  `0 -${px}px 0 0 ${color}`,
  `0 ${px}px 0 0 ${color}`,
  `-${px}px 0 0 0 ${color}`,
  `${px}px 0 0 0 ${color}`];

  if (drop > 0) {
    edges.push(`${px + drop}px ${drop}px 0 0 ${color}`);
    edges.push(`${drop}px ${px + drop}px 0 0 ${color}`);
  }
  return edges.join(', ');
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[11px] gap-1.5',
  md: 'h-10 px-4 text-xs gap-2',
  lg: 'h-12 px-6 text-sm gap-2.5'
};

const frameWidth: Record<ButtonSize, number> = { sm: 3, md: 4, lg: 4 };

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'bg-neutral-900 text-white hover:bg-neutral-700',
  outline: 'bg-white text-neutral-900 hover:bg-neutral-100'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
  {
    variant = 'solid',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    style,
    children,
    type = 'button',
    ...rest
  },
  ref)
  {
    const isDisabled = disabled || loading;
    const px = frameWidth[size];
    const [pressed, setPressed] = React.useState(false);
    const drop = isDisabled || pressed ? 0 : px;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onPointerDown={(e) => {
          setPressed(true);
          rest.onPointerDown?.(e);
        }}
        onPointerUp={(e) => {
          setPressed(false);
          rest.onPointerUp?.(e);
        }}
        onPointerLeave={(e) => {
          setPressed(false);
          rest.onPointerLeave?.(e);
        }}
        className={twMerge(
          'relative inline-flex select-none items-center justify-center rounded-none font-mono font-bold uppercase tracking-widest',
          'transition-[background-color,transform] duration-75',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[8px] focus-visible:outline-neutral-900',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className
        )}
        style={{
          margin: px,
          boxShadow: pixelFrame(px, INK, drop),
          transform: pressed && !isDisabled ? `translate(${px}px, ${px}px)` : undefined,
          imageRendering: 'pixelated',
          ...style
        }}
        {...omitPointer(rest)}>
        
        {loading ?
        <PixelSpinner /> :

        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        }
        <span>{children}</span>
        {!loading && rightIcon &&
        <span className="inline-flex shrink-0">{rightIcon}</span>
        }
      </button>);

  }
);

export function PixelSpinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-grid grid-cols-2 gap-[2px] motion-safe:animate-spin"
      style={{ animationTimingFunction: 'steps(4)' }}>
      
      <span className="h-[4px] w-[4px] bg-current" />
      <span className="h-[4px] w-[4px] bg-current opacity-25" />
      <span className="h-[4px] w-[4px] bg-current opacity-50" />
      <span className="h-[4px] w-[4px] bg-current opacity-75" />
    </span>);

}

function omitPointer(
props: React.ButtonHTMLAttributes<HTMLButtonElement>)
: React.ButtonHTMLAttributes<HTMLButtonElement> {
  const { onPointerDown, onPointerUp, onPointerLeave, ...others } = props;
  void onPointerDown;
  void onPointerUp;
  void onPointerLeave;
  return others;
}
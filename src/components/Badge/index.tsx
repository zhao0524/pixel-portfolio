import React from 'react';

export type BadgeVariant =
'default' |
'primary' |
'success' |
'warning' |
'danger' |
'info' |
'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color scheme of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Shows a square status "pixel" before the label */
  dot?: boolean;
  /** Adds the hard pixel drop shadow */
  shadow?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-zinc-100 text-zinc-900 border-zinc-900',
  primary: 'bg-violet-500 text-white border-zinc-900',
  success: 'bg-emerald-400 text-zinc-900 border-zinc-900',
  warning: 'bg-amber-300 text-zinc-900 border-zinc-900',
  danger: 'bg-rose-500 text-white border-zinc-900',
  info: 'bg-sky-400 text-zinc-900 border-zinc-900',
  outline: 'bg-transparent text-zinc-900 border-zinc-900'
};

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-zinc-900',
  primary: 'bg-white',
  success: 'bg-zinc-900',
  warning: 'bg-zinc-900',
  danger: 'bg-white',
  info: 'bg-zinc-900',
  outline: 'bg-zinc-900'
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-5 px-1.5 gap-1 text-[8px]',
  md: 'h-6 px-2 gap-1.5 text-[10px]',
  lg: 'h-8 px-3 gap-2 text-xs'
};

const dotSize: Record<BadgeSize, string> = {
  sm: 'h-1 w-1',
  md: 'h-1.5 w-1.5',
  lg: 'h-2 w-2'
};

const shadowSize: Record<BadgeSize, string> = {
  sm: 'shadow-[2px_2px_0_0_#18181b]',
  md: 'shadow-[2px_2px_0_0_#18181b]',
  lg: 'shadow-[3px_3px_0_0_#18181b]'
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
  {
    variant = 'default',
    size = 'md',
    icon,
    dot = false,
    shadow = true,
    className = '',
    style,
    children,
    ...props
  },
  ref) =>
  {
    return (
      <span
        ref={ref}
        className={[
        'inline-flex select-none items-center whitespace-nowrap rounded-none border-2 uppercase leading-none tracking-wider',
        variantClasses[variant],
        sizeClasses[size],
        shadow ? shadowSize[size] : '',
        className].

        filter(Boolean).
        join(' ')}
        style={{
          fontFamily:
          "var(--font-pixel, 'Press Start 2P', 'VT323', ui-monospace, monospace)",
          imageRendering: 'pixelated',
          ...style
        }}
        {...props}>
        
        {dot &&
        <span
          aria-hidden="true"
          className={['shrink-0', dotSize[size], dotClasses[variant]].join(' ')} />

        }
        {icon &&
        <span aria-hidden="true" className="inline-flex shrink-0 items-center [&>svg]:h-3 [&>svg]:w-3">
            {icon}
          </span>
        }
        {children}
      </span>);

  }
);

Badge.displayName = 'Badge';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type CardVariant = 'default' | 'accent' | 'muted';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Main heading, e.g. project name or job title */
  title?: React.ReactNode;
  /** Secondary line, e.g. company name or project type */
  subtitle?: React.ReactNode;
  /** Small right-aligned meta text, e.g. date range */
  meta?: React.ReactNode;
  /** Optional leading visual (image, icon, sprite) shown above the content */
  media?: React.ReactNode;
  /** Tag labels rendered as pixel chips at the bottom */
  tags?: string[];
  /** Footer slot (links, actions) */
  footer?: React.ReactNode;
  /** Visual style */
  variant?: CardVariant;
  /** Adds hover/press "lift" behaviour. Automatically on when href is set. */
  interactive?: boolean;
  /** Render the whole card as a link */
  href?: string;
  /** Link target when href is provided */
  target?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white text-neutral-900 border-neutral-900 shadow-[4px_4px_0_0_#171717]',
  accent: 'bg-amber-100 text-neutral-900 border-neutral-900 shadow-[4px_4px_0_0_#171717]',
  muted: 'bg-neutral-100 text-neutral-700 border-neutral-500 shadow-[4px_4px_0_0_#737373]'
};

const interactiveClasses =
'transition-[transform,box-shadow] duration-100 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#171717] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2';

export function Card({
  title,
  subtitle,
  meta,
  media,
  tags,
  footer,
  variant = 'default',
  interactive,
  href,
  target,
  className,
  children,
  ...rest
}: CardProps) {
  const isInteractive = interactive ?? Boolean(href);
  const classes = twMerge(
    'relative block w-full border-4 font-mono text-left',
    variantClasses[variant],
    isInteractive && interactiveClasses,
    isInteractive && 'cursor-pointer',
    className
  );

  const content =
  <>
      {/* Pixel corner notches */}
      <span aria-hidden className="pointer-events-none absolute -left-1 -top-1 h-1 w-1 bg-white" />
      <span aria-hidden className="pointer-events-none absolute -right-1 -top-1 h-1 w-1 bg-white" />
      <span aria-hidden className="pointer-events-none absolute -bottom-1 -left-1 h-1 w-1 bg-white" />

      {media && <div className="border-b-4 border-inherit [image-rendering:pixelated]">{media}</div>}

      <div className="flex flex-col gap-3 p-4">
        {(title || subtitle || meta) &&
      <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title &&
          <h3 className="text-base font-bold uppercase leading-tight tracking-wide">{title}</h3>
          }
              {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
            </div>
            {meta &&
        <span className="shrink-0 border-2 border-current px-2 py-0.5 text-xs uppercase">
                {meta}
              </span>
        }
          </header>
      }

        {children && <div className="text-sm leading-relaxed">{children}</div>}

        {tags && tags.length > 0 &&
      <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {tags.map((tag) =>
        <li
          key={tag}
          className="border-2 border-neutral-900 bg-neutral-900 px-2 py-0.5 text-[11px] uppercase tracking-wider text-white">
          
                {tag}
              </li>
        )}
          </ul>
      }

        {footer && <div className="border-t-2 border-dashed border-current pt-3 text-sm">{footer}</div>}
      </div>
    </>;


  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}
        {...rest as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
        
        {content}
      </a>);

  }

  return (
    <article className={classes} tabIndex={isInteractive ? 0 : undefined} {...rest}>
      {content}
    </article>);

}
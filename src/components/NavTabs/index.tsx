'use client';

import React, { useId, useRef, useState } from 'react';

export type NavTabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type NavTabsSize = 'sm' | 'md';

export interface NavTabsProps {
  /** Tabs to render. Defaults to About / Projects / Experience / Contact. */
  items?: NavTabItem[];
  /** Controlled active tab id. */
  value?: string;
  /** Initial active tab id when uncontrolled. */
  defaultValue?: string;
  /** Called when the user selects a tab. */
  onChange?: (id: string) => void;
  /** Visual density. */
  size?: NavTabsSize;
  /** Stretch tabs to fill the container width. */
  fullWidth?: boolean;
  /** Accessible label for the tablist. */
  ariaLabel?: string;
  /** Prefix used for generated tab / panel ids (for aria-controls). */
  idPrefix?: string;
  className?: string;
}

export const DEFAULT_NAV_TABS: NavTabItem[] = [
{ id: 'about', label: 'About' },
{ id: 'projects', label: 'Projects' },
{ id: 'experience', label: 'Experience' },
{ id: 'contact', label: 'Contact' }];


const PIXEL_FONT = '"Press Start 2P", "VT323", ui-monospace, SFMono-Regular, Menlo, monospace';

const SIZE_CLASSES: Record<NavTabsSize, string> = {
  sm: 'px-2.5 py-1.5 text-[9px] gap-1.5',
  md: 'px-4 py-2.5 text-[11px] gap-2'
};

export function NavTabs({
  items = DEFAULT_NAV_TABS,
  value,
  defaultValue,
  onChange,
  size = 'md',
  fullWidth = false,
  ariaLabel = 'Portfolio sections',
  idPrefix,
  className = ''
}: NavTabsProps) {
  const autoId = useId();
  const prefix = idPrefix ?? `navtabs-${autoId.replace(/:/g, '')}`;
  const firstEnabled = items.find((i) => !i.disabled)?.id ?? '';
  const [internal, setInternal] = useState<string>(defaultValue ?? firstEnabled);
  const active = value ?? internal;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const focusAt = (start: number, dir: 1 | -1) => {
    const n = items.length;
    for (let step = 1; step <= n; step++) {
      const idx = (start + dir * step + n) % n;
      if (!items[idx].disabled) {
        tabRefs.current[idx]?.focus();
        select(items[idx].id);
        return;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusAt(index, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusAt(index, -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusAt(-1, 1);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusAt(items.length, -1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex items-end gap-1 border-b-4 border-slate-900 ${fullWidth ? 'w-full' : 'w-fit'} ${className}`}
      style={{ fontFamily: PIXEL_FONT, imageRendering: 'pixelated' }}>
      
      {items.map((item, index) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${prefix}-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`${prefix}-panel-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onClick={() => select(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={[
            'relative inline-flex select-none items-center justify-center uppercase leading-none tracking-wider',
            'border-4 border-b-0 border-slate-900 rounded-none transition-[transform,background-color,color] duration-75',
            'focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-400',
            SIZE_CLASSES[size],
            fullWidth ? 'flex-1' : '',
            isActive ?
            'z-10 -mb-1 bg-amber-300 text-slate-900 shadow-[inset_-4px_0_0_0_rgba(0,0,0,0.18),inset_4px_4px_0_0_rgba(255,255,255,0.55)]' :
            'translate-y-0 bg-slate-700 text-slate-200 shadow-[inset_-4px_-4px_0_0_rgba(0,0,0,0.3),inset_4px_4px_0_0_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-slate-600 hover:text-white',
            item.disabled ? 'cursor-not-allowed opacity-40 hover:translate-y-0 hover:bg-slate-700' : 'cursor-pointer'].
            join(' ')}>
            
            {isActive &&
            <span aria-hidden="true" className="text-slate-900">
                ▸
              </span>
            }
            {item.icon &&
            <span aria-hidden="true" className="inline-flex shrink-0">
                {item.icon}
              </span>
            }
            <span>{item.label}</span>
          </button>);

      })}
    </div>);

}
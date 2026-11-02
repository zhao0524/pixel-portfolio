import React, { useState } from 'react';
import { Lamp } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

function ThemeDemo() {
  const [on, setOn] = useState(true);
  return (
    <div
      className={`flex w-80 items-center gap-6 rounded-lg p-6 transition-colors ${
      on ? 'bg-stone-50 text-stone-900' : 'bg-stone-900 text-stone-100'}`
      }>
      
      <Lamp on={on} onToggle={setOn} showLabel />
      <div className="space-y-1">
        <p className="font-mono text-sm font-semibold">
          {on ? 'Lights on' : 'Lights off'}
        </p>
        <p className="text-xs opacity-70">Click the lamp to switch theme.</p>
      </div>
    </div>);

}

const previews: ComponentPreviewModule = {
  componentName: 'Lamp',
  importPath: 'components/Lamp',
  previews: [
  {
    name: 'Off',
    description: 'Default off state (dark theme).',
    render: () => <Lamp />
  },
  {
    name: 'On',
    description: 'Lit lamp casting a warm glow (light theme).',
    render: () => <Lamp defaultOn />
  },
  {
    name: 'Theme toggle',
    description: 'Controlled lamp driving a light/dark surface.',
    render: () => <ThemeDemo />
  },
  {
    name: 'Sizes',
    description: 'sm, md and lg sizes.',
    render: () =>
    <div className="flex items-end gap-6">
          <Lamp size="sm" defaultOn />
          <Lamp size="md" defaultOn />
          <Lamp size="lg" defaultOn />
        </div>

  },
  {
    name: 'Disabled',
    description: 'Non-interactive lamp.',
    render: () => <Lamp disabled showLabel />
  }]

};

export default previews;
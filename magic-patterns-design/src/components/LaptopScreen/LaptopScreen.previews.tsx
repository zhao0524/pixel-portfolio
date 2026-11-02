import React, { useState } from 'react';
import { LaptopScreen } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

function ToggleDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ width: 640, height: 420 }} className="flex items-center justify-center">
      {open ?
      <LaptopScreen onClose={() => setOpen(false)} /> :

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-2 border-slate-900 bg-emerald-400 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-950">
        
          Zoom into laptop
        </button>
      }
    </div>);

}

const previews: ComponentPreviewModule = {
  componentName: 'LaptopScreen',
  importPath: 'components/LaptopScreen',
  previews: [
  {
    name: 'Default',
    description: 'About section with placeholder content',
    render: () =>
    <div style={{ width: 640, height: 420 }}>
          <LaptopScreen />
        </div>

  },
  {
    name: 'Projects',
    description: 'Opens on the Projects grid',
    render: () =>
    <div style={{ width: 640, height: 420 }}>
          <LaptopScreen defaultSection="projects" />
        </div>

  },
  {
    name: 'Experience',
    description: 'Timeline of placeholder roles',
    render: () =>
    <div style={{ width: 640, height: 420 }}>
          <LaptopScreen defaultSection="experience" />
        </div>

  },
  {
    name: 'Closable',
    description: 'With close button and zoom reveal',
    render: () => <ToggleDemo />
  }]

};

export default previews;
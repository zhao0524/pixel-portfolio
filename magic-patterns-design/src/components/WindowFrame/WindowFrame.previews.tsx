import { WindowFrame } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'WindowFrame',
  importPath: 'components/WindowFrame',
  previews: [
  {
    name: 'Default',
    description: 'Three-pane frame with the built-in dusk skyline and sill.',
    render: () =>
    <div className="w-full max-w-2xl bg-zinc-950 p-8">
          <WindowFrame />
        </div>

  },
  {
    name: 'Grid Panes',
    description: 'Four columns and two rows of mullions, no reflection.',
    render: () =>
    <div className="w-full max-w-2xl bg-zinc-950 p-8">
          <WindowFrame columns={4} rows={2} showReflection={false} height={280} />
        </div>

  },
  {
    name: 'Custom View',
    description: 'Any content can be framed — here a solid night sky without a sill.',
    render: () =>
    <div className="w-full max-w-xl bg-zinc-950 p-8">
          <WindowFrame columns={2} showSill={false} height={220} label="Night sky">
            <div className="flex h-full w-full items-center justify-center bg-indigo-950 font-mono text-sm text-indigo-200">
              your view here
            </div>
          </WindowFrame>
        </div>

  }]

};

export default previews;
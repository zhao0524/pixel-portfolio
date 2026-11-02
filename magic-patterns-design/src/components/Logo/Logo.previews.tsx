import { Logo } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'Logo',
  importPath: 'components/Logo',
  previews: [
  {
    name: 'Default',
    description: 'Glyph + Pixelify Sans wordmark on a light surface',
    render: () => <Logo />
  },
  {
    name: 'On dark (nav)',
    description: 'Light tone inside a laptop-screen style header',
    render: () =>
    <div className="flex w-full items-center justify-between rounded-md bg-zinc-900 px-5 py-3">
          <Logo tone="light" href="#" />
          <nav className="flex gap-4 text-sm text-zinc-400">
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </div>

  },
  {
    name: 'Sizes',
    description: 'sm, md, lg',
    render: () =>
    <div className="flex flex-col items-start gap-4">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
        </div>

  },
  {
    name: 'Glyph only',
    description: 'Compact mark for tight spaces or favicons-in-UI',
    render: () =>
    <div className="flex items-center gap-4">
          <Logo showText={false} size="lg" />
          <div className="rounded-md bg-zinc-900 p-2">
            <Logo showText={false} size="lg" tone="light" />
          </div>
        </div>

  }]

};

export default previews;
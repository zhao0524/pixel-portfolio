import { Card } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'Card',
  importPath: 'components/Card',
  previews: [
  {
    name: 'Project',
    description: 'Project entry with tags and a link footer',
    render: () =>
    <div className="w-full max-w-sm p-4">
          <Card
        title="Pixel Quest"
        subtitle="Browser RPG · Solo project"
        meta="2025"
        tags={['React', 'Canvas', 'TypeScript']}
        href="#"
        footer={<span className="font-bold underline">View project →</span>}>
        
            A retro-styled dungeon crawler with procedurally generated levels and an 8-bit soundtrack.
          </Card>
        </div>

  },
  {
    name: 'Experience',
    description: 'Experience item with date range',
    render: () =>
    <div className="w-full max-w-md p-4">
          <Card title="Frontend Engineer" subtitle="Acme Studio" meta="2023 – Now">
            Built the design system and shipped the customer dashboard used by 40k teams.
          </Card>
        </div>

  },
  {
    name: 'Variants',
    description: 'Default, accent and muted styles',
    render: () =>
    <div className="grid w-full max-w-3xl gap-6 p-4 sm:grid-cols-3">
          <Card title="Default" subtitle="Standard card">Primary content surface.</Card>
          <Card variant="accent" title="Accent" subtitle="Highlighted">Featured project.</Card>
          <Card variant="muted" title="Muted" subtitle="Archived">Older entry.</Card>
        </div>

  },
  {
    name: 'With media',
    description: 'Card with a top image slot',
    render: () =>
    <div className="w-full max-w-xs p-4">
          <Card
        interactive
        title="Sprite Editor"
        meta="2024"
        tags={['Tooling']}
        media={<div className="flex h-32 items-center justify-center bg-sky-200 font-mono text-xs uppercase">Preview</div>}>
        
            A tiny in-browser editor for 16×16 sprites.
          </Card>
        </div>

  }]

};

export default previews;
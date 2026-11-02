import { PlantRight } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'PlantRight',
  importPath: 'components/PlantRight',
  previews: [
  {
    name: 'Default',
    description: 'Leafy green plant in a terracotta pot with a gentle stepped sway.',
    render: () => <PlantRight />
  },
  {
    name: 'Palettes',
    description: 'Leafy, autumn and night palettes side by side.',
    render: () =>
    <div className="flex items-end gap-6">
          <PlantRight palette="leafy" />
          <PlantRight palette="autumn" />
          <PlantRight palette="night" />
        </div>

  },
  {
    name: 'Anchored in a scene',
    description: 'Pinned to the bottom-right corner of a positioned container.',
    render: () =>
    <div className="relative h-64 w-full max-w-lg overflow-hidden rounded border-4 border-neutral-900 bg-amber-50">
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-amber-800" />
          <p className="p-4 font-mono text-sm text-neutral-800">Room scene</p>
          <PlantRight anchored pixelSize={8} className="mb-6 mr-4" sway={false} />
        </div>

  }]

};

export default previews;
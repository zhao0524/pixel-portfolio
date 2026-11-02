import { PlantLeft } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'PlantLeft',
  importPath: 'components/PlantLeft',
  previews: [
  {
    name: 'Default',
    description: 'Terracotta pot at the default 6px pixel size',
    render: () => <PlantLeft />
  },
  {
    name: 'Pot variants',
    description: 'Terracotta, stone and cream pots',
    render: () =>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <PlantLeft pot="terracotta" />
          <PlantLeft pot="stone" />
          <PlantLeft pot="cream" />
        </div>

  },
  {
    name: 'Sizes',
    description: 'Scaled via pixelSize',
    render: () =>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <PlantLeft pixelSize={3} />
          <PlantLeft pixelSize={6} />
          <PlantLeft pixelSize={9} />
        </div>

  },
  {
    name: 'Anchored left in a scene',
    description: 'Positioned at the bottom-left corner of a room',
    render: () =>
    <div style={{ position: 'relative', width: 360, height: 200, background: '#f3ead7', borderBottom: '12px solid #8a5a3b' }}>
          <PlantLeft pixelSize={6} label="Potted plant" style={{ position: 'absolute', left: 12, bottom: 0 }} />
        </div>

  }]

};

export default previews;
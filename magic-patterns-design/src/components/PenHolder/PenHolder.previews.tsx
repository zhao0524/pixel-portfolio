import { PenHolder } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'PenHolder',
  importPath: 'components/PenHolder',
  previews: [
  {
    name: 'Default',
    description: 'Slate cup with three pens',
    render: () => <PenHolder />
  },
  {
    name: 'Variants',
    description: 'Available cup palettes',
    render: () =>
    <div className="flex items-end gap-6">
          <PenHolder variant="slate" />
          <PenHolder variant="terracotta" />
          <PenHolder variant="mint" />
        </div>

  },
  {
    name: 'Sizes & pen counts',
    description: 'sm / md / lg with varying pens',
    render: () =>
    <div className="flex items-end gap-6">
          <PenHolder size="sm" pens={1} />
          <PenHolder size="md" pens={2} variant="mint" />
          <PenHolder size="lg" pens={4} variant="terracotta" />
        </div>

  },
  {
    name: 'On a desk',
    description: 'Placed on a desk surface as decor',
    render: () =>
    <div className="flex w-80 items-end justify-end rounded-sm bg-amber-800 px-6 pb-2 pt-10">
          <PenHolder size="sm" label="" />
        </div>

  }]

};

export default previews;
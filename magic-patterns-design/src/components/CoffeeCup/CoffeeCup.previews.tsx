import { CoffeeCup } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'CoffeeCup',
  importPath: 'components/CoffeeCup',
  previews: [
  {
    name: 'Default',
    description: 'Cream mug with looping steam',
    render: () =>
    <div className="flex items-center justify-center rounded-lg bg-[#2A1E17] p-8">
          <CoffeeCup size={96} />
        </div>

  },
  {
    name: 'Variants',
    description: 'All mug colors',
    render: () =>
    <div className="flex items-end gap-6 rounded-lg bg-[#2A1E17] p-8">
          <CoffeeCup variant="cream" />
          <CoffeeCup variant="red" speed={2.8} />
          <CoffeeCup variant="blue" speed={2} />
          <CoffeeCup variant="black" speed={3.2} />
        </div>

  },
  {
    name: 'Cold (no steam)',
    description: 'Static cup without steam',
    render: () =>
    <div className="flex items-center justify-center rounded-lg bg-[#2A1E17] p-8">
          <CoffeeCup size={96} variant="blue" steaming={false} />
        </div>

  }]

};

export default previews;
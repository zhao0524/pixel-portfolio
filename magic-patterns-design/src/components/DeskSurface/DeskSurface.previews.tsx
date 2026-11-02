import { DeskSurface } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

function Laptop() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-24 w-40 border-4 border-[#2B2B33] bg-[#3B4A6B] p-2">
        <div className="h-full w-full bg-[#9FD3C7]" />
      </div>
      <div className="h-3 w-48 bg-[#C9CCD6]" />
      <div className="h-1 w-48 bg-[#8E92A0]" />
    </div>);

}

function Mug() {
  return (
    <div className="flex items-center">
      <div className="h-10 w-8 bg-[#E86A5C]" />
      <div className="h-5 w-2 border-2 border-l-0 border-[#E86A5C]" />
    </div>);

}

const previews: ComponentPreviewModule = {
  componentName: 'DeskSurface',
  importPath: 'components/DeskSurface',
  previews: [
  {
    name: 'Default',
    description: 'Oak desk plane with pixel grain.',
    render: () =>
    <div className="w-full bg-[#F3E6CF] pt-10">
          <DeskSurface />
        </div>

  },
  {
    name: 'Scene with items',
    description: 'Anchored to the bottom of a scene with a laptop and mug resting on it.',
    render: () =>
    <div className="relative h-80 w-full overflow-hidden bg-[#F3E6CF]">
          <DeskSurface anchored height={140}>
            <Laptop />
            <Mug />
          </DeskSurface>
        </div>

  },
  {
    name: 'Tones',
    description: 'Oak, walnut and maple finishes.',
    render: () =>
    <div className="flex w-full flex-col gap-4 bg-[#F3E6CF] p-4">
          <DeskSurface tone="oak" height={80} edgeHeight={18} />
          <DeskSurface tone="walnut" height={80} edgeHeight={18} />
          <DeskSurface tone="maple" height={80} edgeHeight={18} />
        </div>

  },
  {
    name: 'Plain',
    description: 'Without grain streaks.',
    render: () =>
    <div className="w-full bg-[#F3E6CF] pt-10">
          <DeskSurface showGrain={false} height={120} />
        </div>

  }]

};

export default previews;
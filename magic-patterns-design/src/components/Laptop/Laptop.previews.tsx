import { Laptop } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const ScreenContent = () =>
<div className="space-y-4">
    <h2 className="text-2xl font-bold text-[#29adff]">Hi, I'm David.</h2>
    <p className="max-w-prose text-sm leading-relaxed">
      {'> Software engineer building playful, pixel-perfect interfaces.'}
    </p>
    <ul className="grid gap-3 sm:grid-cols-3">
      {['Projects', 'About', 'Contact'].map((item) =>
    <li key={item} className="border-2 border-[#29adff] p-3 text-sm hover:bg-[#29adff] hover:text-[#1a1c2c]">
          {item}
        </li>
    )}
    </ul>
  </div>;


const previews: ComponentPreviewModule = {
  componentName: 'Laptop',
  importPath: 'components/Laptop',
  previews: [
  {
    name: 'Default',
    description: 'Clickable laptop — opens a zoomed screen with nested content. Press Esc or click outside to close.',
    render: () =>
    <div className="flex w-full items-center justify-center bg-[#f4efe6] p-10">
          <Laptop>
            <ScreenContent />
          </Laptop>
        </div>

  },
  {
    name: 'Sizes',
    description: 'Small, medium and large pixel scales.',
    render: () =>
    <div className="flex w-full flex-wrap items-end justify-center gap-10 bg-[#f4efe6] p-10">
          <Laptop size="sm" idleLabel="SM" />
          <Laptop size="md" idleLabel="MD" />
          <Laptop size="lg" idleLabel="LG" />
        </div>

  },
  {
    name: 'Disabled',
    description: 'Static decorative art with no interaction.',
    render: () =>
    <div className="flex w-full items-center justify-center bg-[#1a1c2c] p-10">
          <Laptop disabled idleLabel="SLEEPING" screenTitle="zzz" />
        </div>

  }]

};

export default previews;
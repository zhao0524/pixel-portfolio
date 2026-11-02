import { ArrowRightIcon, DownloadIcon, MailIcon } from 'lucide-react';
import { Button } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'Button',
  importPath: 'components/Button',
  previews: [
  {
    name: 'Variants',
    description: 'Solid and outline pixel buttons',
    render: () =>
    <div className="flex flex-wrap items-center gap-6 p-4">
          <Button variant="solid">Start</Button>
          <Button variant="outline">Projects</Button>
        </div>

  },
  {
    name: 'Sizes',
    description: 'Small, medium and large',
    render: () =>
    <div className="flex flex-wrap items-center gap-6 p-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

  },
  {
    name: 'With icons',
    description: 'Leading and trailing icons',
    render: () =>
    <div className="flex flex-wrap items-center gap-6 p-4">
          <Button leftIcon={<MailIcon size={14} />}>Contact</Button>
          <Button variant="outline" rightIcon={<ArrowRightIcon size={14} />}>
            View work
          </Button>
          <Button variant="outline" leftIcon={<DownloadIcon size={14} />}>
            Resume
          </Button>
        </div>

  },
  {
    name: 'States',
    description: 'Loading and disabled',
    render: () =>
    <div className="flex flex-wrap items-center gap-6 p-4">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>

  }]

};

export default previews;
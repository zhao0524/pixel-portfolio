import { CodeIcon, StarIcon } from 'lucide-react';
import { Badge } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'Badge',
  importPath: 'components/Badge',
  previews: [
  {
    name: 'Variants',
    description: 'All color variants',
    render: () =>
    <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

  },
  {
    name: 'Sizes',
    description: 'Small, medium and large',
    render: () =>
    <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </div>

  },
  {
    name: 'Tech stack',
    description: 'Skill tags with icons',
    render: () =>
    <div className="flex flex-wrap items-center gap-3">
          <Badge icon={<CodeIcon />}>React</Badge>
          <Badge icon={<CodeIcon />}>TypeScript</Badge>
          <Badge icon={<StarIcon />} variant="warning">Featured</Badge>
        </div>

  },
  {
    name: 'Project status',
    description: 'Status badges with a pixel dot',
    render: () =>
    <div className="flex flex-wrap items-center gap-3">
          <Badge dot variant="success">Live</Badge>
          <Badge dot variant="warning">In progress</Badge>
          <Badge dot variant="danger">Archived</Badge>
          <Badge dot shadow={false} variant="outline">Draft</Badge>
        </div>

  }]

};

export default previews;
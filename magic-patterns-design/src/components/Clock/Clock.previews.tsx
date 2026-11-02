import { Clock } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const fixed = new Date(2026, 9, 30, 21, 7, 42);

const previews: ComponentPreviewModule = {
  componentName: 'Clock',
  importPath: 'components/Clock',
  previews: [
  {
    name: 'Live',
    description: 'Real-time 24-hour clock with seconds',
    render: () => <Clock />
  },
  {
    name: '12-hour with date',
    description: 'AM/PM indicator, date strip and housing label',
    render: () => <Clock format="12h" showDate label="Desk Clock" />
  },
  {
    name: 'Sizes',
    description: 'Small, medium and large at a fixed time',
    render: () =>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <Clock size="sm" time={fixed} showSeconds={false} />
          <Clock size="md" time={fixed} />
          <Clock size="lg" time={fixed} format="12h" showDate />
        </div>

  }]

};

export default previews;
import React, { useState } from 'react';
import { Notebook } from './index';
import type { NotebookState } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

function ToggleDemo() {
  const [state, setState] = useState<NotebookState>('closed');
  return <Notebook state={state} onToggle={setState} color="blue" />;
}

const previews: ComponentPreviewModule = {
  componentName: 'Notebook',
  importPath: 'components/Notebook',
  previews: [
  {
    name: 'Closed',
    description: 'Closed notebook with label, elastic band and ribbon',
    render: () => <Notebook state="closed" />
  },
  {
    name: 'Open',
    description: 'Open spread with ruled pages and handwriting',
    render: () => <Notebook state="open" />
  },
  {
    name: 'Interactive',
    description: 'Click to open and close',
    render: () => <ToggleDemo />
  },
  {
    name: 'Colors',
    description: 'Cover palettes for scene variety',
    render: () =>
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Notebook color="brown" pixelSize={4} />
          <Notebook color="red" pixelSize={4} />
          <Notebook color="blue" pixelSize={4} />
          <Notebook color="green" pixelSize={4} />
          <Notebook color="green" state="open" written={false} pixelSize={4} />
        </div>

  }]

};

export default previews;
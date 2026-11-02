import { WorkspaceScene } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'WorkspaceScene',
  importPath: 'components/WorkspaceScene',
  previews: [
  {
    name: 'Light',
    description: 'Daytime workspace. Click the laptop to zoom in; click the lamp or the toggle to switch theme.',
    render: () =>
    <div style={{ width: '100%', maxWidth: 880 }}>
          <WorkspaceScene />
        </div>

  },
  {
    name: 'Dark',
    description: 'Night scene with lit skyline windows and the desk lamp on.',
    render: () =>
    <div style={{ width: '100%', maxWidth: 880 }}>
          <WorkspaceScene defaultTheme="dark" />
        </div>

  },
  {
    name: 'Zoomed with custom content',
    description: 'Starts zoomed into the laptop showing custom screen content.',
    render: () =>
    <div style={{ width: '100%', maxWidth: 880 }}>
          <WorkspaceScene
        defaultTheme="dark"
        defaultZoomed
        laptopContent={
        <div className="space-y-2">
                <h2 className="text-xl font-bold">Projects</h2>
                <ul className="list-inside list-disc opacity-80">
                  <li>Pixel Portfolio</li>
                  <li>Design System Toolkit</li>
                  <li>Night Owl Notes</li>
                </ul>
              </div>
        } />
      
        </div>

  }]

};

export default previews;
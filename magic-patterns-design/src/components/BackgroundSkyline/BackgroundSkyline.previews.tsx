import { BackgroundSkyline } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'BackgroundSkyline',
  importPath: 'components/BackgroundSkyline',
  previews: [
  {
    name: 'Day',
    description: 'Daytime skyline with sun, drifting clouds and blue water.',
    render: () =>
    <div className="h-72 w-full overflow-hidden rounded-lg">
          <BackgroundSkyline variant="day" title="Toronto skyline by day" />
        </div>

  },
  {
    name: 'Night',
    description: 'Same framing at night: city lights, lit CN Tower, neon glow and reflections.',
    render: () =>
    <div className="h-72 w-full overflow-hidden rounded-lg">
          <BackgroundSkyline variant="night" title="Toronto skyline at night" />
        </div>

  },
  {
    name: 'Side by side',
    description: 'Day and night share identical geometry for seamless theme switching.',
    render: () =>
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-56 overflow-hidden rounded-lg">
            <BackgroundSkyline variant="day" />
          </div>
          <div className="h-56 overflow-hidden rounded-lg">
            <BackgroundSkyline variant="night" />
          </div>
        </div>

  },
  {
    name: 'Hero background',
    description: 'Used as a decorative full-bleed background behind content.',
    render: () =>
    <section className="relative h-80 w-full overflow-hidden rounded-lg">
          <BackgroundSkyline variant="night" className="absolute inset-0" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-bold text-white md:text-4xl">Hi, I'm David</h1>
            <p className="mt-2 text-sm text-white/80">Building things in Toronto.</p>
          </div>
        </section>

  },
  {
    name: 'Static',
    description: 'Animations disabled.',
    render: () =>
    <div className="h-56 w-full overflow-hidden rounded-lg">
          <BackgroundSkyline variant="night" animated={false} />
        </div>

  }]

};

export default previews;
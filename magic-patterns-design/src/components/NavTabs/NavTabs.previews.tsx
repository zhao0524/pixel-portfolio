import React, { useState } from 'react';
import { BriefcaseIcon, FolderIcon, MailIcon, UserIcon } from 'lucide-react';
import { NavTabs, DEFAULT_NAV_TABS } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

function ScreenDemo() {
  const [tab, setTab] = useState('about');
  const copy: Record<string, string> = {
    about: '> Hi, I am David. I build playful things for the web.',
    projects: '> Loading projects... 3 found.',
    experience: '> 5 years of shipping product UI.',
    contact: '> Say hello: david@example.com'
  };
  return (
    <div className="w-[520px] border-4 border-slate-900 bg-slate-800 p-3">
      <NavTabs value={tab} onChange={setTab} idPrefix="demo" fullWidth />
      <div
        role="tabpanel"
        id={`demo-panel-${tab}`}
        aria-labelledby={`demo-tab-${tab}`}
        className="min-h-[96px] border-4 border-t-0 border-slate-900 bg-amber-300 p-4 text-[11px] leading-relaxed text-slate-900"
        style={{ fontFamily: '"Press Start 2P", ui-monospace, monospace' }}>
        
        {copy[tab]}
      </div>
    </div>);

}

const previews: ComponentPreviewModule = {
  componentName: 'NavTabs',
  importPath: 'components/NavTabs',
  previews: [
  {
    name: 'Default',
    description: 'About / Projects / Experience / Contact tabs',
    render: () => <NavTabs defaultValue="about" />
  },
  {
    name: 'Inside laptop screen',
    description: 'Controlled tabs driving a pixel panel',
    render: () => <ScreenDemo />
  },
  {
    name: 'With icons',
    description: 'Tabs with leading icons',
    render: () =>
    <NavTabs
      defaultValue="projects"
      items={[
      { id: 'about', label: 'About', icon: <UserIcon size={12} strokeWidth={3} /> },
      { id: 'projects', label: 'Projects', icon: <FolderIcon size={12} strokeWidth={3} /> },
      { id: 'experience', label: 'Experience', icon: <BriefcaseIcon size={12} strokeWidth={3} /> },
      { id: 'contact', label: 'Contact', icon: <MailIcon size={12} strokeWidth={3} /> }]
      } />


  },
  {
    name: 'Small + disabled',
    description: 'Compact size with a disabled tab',
    render: () =>
    <NavTabs
      size="sm"
      defaultValue="about"
      items={DEFAULT_NAV_TABS.map((t) => t.id === 'experience' ? { ...t, disabled: true } : t)} />


  }]

};

export default previews;
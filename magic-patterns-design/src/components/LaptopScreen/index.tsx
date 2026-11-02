import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseIcon,
  FolderIcon,
  MailIcon,
  UserIcon,
  XIcon,
  ArrowUpRightIcon } from
'lucide-react';

export type LaptopScreenSection = 'about' | 'projects' | 'experience' | 'contact';

export interface LaptopScreenProject {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export interface LaptopScreenExperience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface LaptopScreenProps {
  /** Owner name shown in the title bar and About section */
  name?: string;
  /** Short role / tagline */
  role?: string;
  /** About paragraph */
  bio?: string;
  projects?: LaptopScreenProject[];
  experience?: LaptopScreenExperience[];
  email?: string;
  /** Section shown on mount */
  defaultSection?: LaptopScreenSection;
  /** Controls the zoom-in reveal. Defaults to true. */
  isOpen?: boolean;
  /** Renders a close button in the title bar when provided */
  onClose?: () => void;
  className?: string;
}

export const DEFAULT_PROJECTS: LaptopScreenProject[] = [
{
  title: 'Pixel Room',
  description: 'An interactive pixel-art room that doubles as a personal portfolio.',
  tags: ['React', 'Canvas', 'Framer Motion']
},
{
  title: 'Project Two',
  description: 'Placeholder project description. Replace with your own work.',
  tags: ['TypeScript', 'Node']
},
{
  title: 'Project Three',
  description: 'Placeholder project description. Replace with your own work.',
  tags: ['Design', 'Prototype']
}];


export const DEFAULT_EXPERIENCE: LaptopScreenExperience[] = [
{
  role: 'Software Engineer',
  company: 'Company Name',
  period: '2025 — Present',
  summary: 'Placeholder summary of responsibilities and impact.'
},
{
  role: 'Engineering Intern',
  company: 'Another Company',
  period: '2024',
  summary: 'Placeholder summary of responsibilities and impact.'
}];


const SECTIONS: {id: LaptopScreenSection;label: string;icon: typeof UserIcon;}[] = [
{ id: 'about', label: 'About', icon: UserIcon },
{ id: 'projects', label: 'Projects', icon: FolderIcon },
{ id: 'experience', label: 'Experience', icon: BriefcaseIcon },
{ id: 'contact', label: 'Contact', icon: MailIcon }];


export function LaptopScreen({
  name = 'David',
  role = 'Developer & Designer',
  bio = 'Hi! This is a placeholder bio. Tell visitors who you are, what you build, and what you care about.',
  projects = DEFAULT_PROJECTS,
  experience = DEFAULT_EXPERIENCE,
  email = 'hello@example.com',
  defaultSection = 'about',
  isOpen = true,
  onClose,
  className = ''
}: LaptopScreenProps) {
  const [active, setActive] = useState<LaptopScreenSection>(defaultSection);

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        key="laptop-screen"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-md border-2 border-slate-900 bg-slate-950 font-mono text-slate-100 shadow-[4px_4px_0_0_rgba(15,23,42,1)] ${className}`}
        role="region"
        aria-label={`${name}'s portfolio`}>
        
          {/* Title bar */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 bg-slate-900 px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 bg-rose-400" />
              <span className="h-2.5 w-2.5 bg-amber-300" />
              <span className="h-2.5 w-2.5 bg-emerald-400" />
            </div>
            <p className="truncate text-xs text-slate-400">~/{name.toLowerCase()}/portfolio</p>
            {onClose ?
          <button
            type="button"
            onClick={onClose}
            aria-label="Close screen"
            className="flex h-6 w-6 items-center justify-center text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
            
                <XIcon className="h-4 w-4" />
              </button> :

          <span className="w-6" aria-hidden="true" />
          }
          </div>

          {/* Nav */}
          <nav aria-label="Portfolio sections" className="border-b-2 border-slate-800 bg-slate-950">
            <ul className="flex overflow-x-auto" role="tablist">
              {SECTIONS.map(({ id, label, icon: Icon }) => {
              const selected = active === id;
              return (
                <li key={id} className="flex-1">
                    <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`laptop-panel-${id}`}
                    id={`laptop-tab-${id}`}
                    onClick={() => setActive(id)}
                    className={`flex w-full items-center justify-center gap-2 whitespace-nowrap px-3 py-2.5 text-xs uppercase tracking-wider transition-colors focus:outline-none focus-visible:bg-slate-800 ${
                    selected ?
                    'bg-emerald-400 text-slate-950' :
                    'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}`
                    }>
                    
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  </li>);

            })}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.section
              key={active}
              id={`laptop-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`laptop-tab-${active}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}>
              
                {active === 'about' &&
              <div className="space-y-4">
                    <p className="text-xs text-emerald-400">&gt; whoami</p>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">{name}</h2>
                    <p className="text-sm text-amber-300">{role}</p>
                    <p className="max-w-prose text-sm leading-relaxed text-slate-300">{bio}</p>
                  </div>
              }

                {active === 'projects' &&
              <div className="space-y-4">
                    <p className="text-xs text-emerald-400">&gt; ls ./projects</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {projects.map((p) =>
                  <li
                    key={p.title}
                    className="group border-2 border-slate-800 bg-slate-900 p-4 transition-colors hover:border-emerald-400">
                    
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-white">{p.title}</h3>
                            {p.href &&
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${p.title}`}
                        className="text-slate-400 hover:text-emerald-400">
                        
                                <ArrowUpRightIcon className="h-4 w-4" />
                              </a>
                      }
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.description}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {p.tags.map((t) =>
                      <span key={t} className="bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-amber-300">
                                {t}
                              </span>
                      )}
                          </div>
                        </li>
                  )}
                    </ul>
                  </div>
              }

                {active === 'experience' &&
              <div className="space-y-4">
                    <p className="text-xs text-emerald-400">&gt; cat experience.log</p>
                    <ol className="space-y-4 border-l-2 border-slate-800 pl-4">
                      {experience.map((e) =>
                  <li key={`${e.company}-${e.role}`} className="relative">
                          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-emerald-400" aria-hidden="true" />
                          <p className="text-[11px] uppercase tracking-wider text-slate-500">{e.period}</p>
                          <h3 className="mt-0.5 text-sm font-bold text-white">
                            {e.role} <span className="text-amber-300">@ {e.company}</span>
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">{e.summary}</p>
                        </li>
                  )}
                    </ol>
                  </div>
              }

                {active === 'contact' &&
              <div className="space-y-4">
                    <p className="text-xs text-emerald-400">&gt; ./contact.sh</p>
                    <h2 className="text-xl font-bold text-white">Let&apos;s talk.</h2>
                    <p className="max-w-prose text-sm text-slate-300">
                      Have a project or opportunity in mind? Send a message anytime.
                    </p>
                    <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 border-2 border-emerald-400 bg-emerald-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[3px_3px_0_0_rgba(251,191,36,1)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                  
                      <MailIcon className="h-4 w-4" />
                      {email}
                    </a>
                  </div>
              }
              </motion.section>
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t-2 border-slate-800 bg-slate-900 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
            <span>{SECTIONS.find((s) => s.id === active)?.label}</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse bg-emerald-400" aria-hidden="true" />
              online
            </span>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
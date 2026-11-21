'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseIcon,
  DownloadIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  MailIcon,
  UserIcon,
  XIcon,
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  TrophyIcon } from
'lucide-react';

export type LaptopScreenSection = 'about' | 'projects' | 'experience' | 'contact';

export interface LaptopScreenProject {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  /** Screenshot path, e.g. `/projects/spar.png` */
  image?: string;
  /** `cover` crops to fill the frame (default); `contain` shows the whole image */
  imageFit?: 'cover' | 'contain';
  /** e.g. a hackathon win */
  award?: string;
  /** Labelled links such as Live, GitHub or Devpost */
  links?: {label: string;href: string;}[];
}

export interface LaptopScreenExperience {
  role: string;
  company: string;
  period?: string;
  summary?: string;
  bullets?: string[];
}

export interface LaptopScreenProps {
  /** Owner name shown in the title bar and About section */
  name?: string;
  /** Short role / tagline */
  role?: string;
  /** About paragraph */
  bio?: string;
  /** PDF shown beside the About section, with open / download buttons */
  resumeUrl?: string;
  projects?: LaptopScreenProject[];
  experience?: LaptopScreenExperience[];
  email?: string;
  /** Profile URLs shown as buttons under the email in the Contact section */
  github?: string;
  linkedin?: string;
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
  role = 'Software Engineer',
  bio = 'Hi, I’m David! I’m a curious builder who enjoys turning ideas into real projects, learning new things, and working with people who care about what they create. Outside of tech, you’ll usually find me playing basketball or at the gym.',
  resumeUrl,
  projects = DEFAULT_PROJECTS,
  experience = DEFAULT_EXPERIENCE,
  email = 'hello@example.com',
  github,
  linkedin,
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
        
          {/* Title bar: the red light closes the screen */}
          <div className="relative flex items-center border-b-2 border-slate-800 bg-slate-900 px-3 py-2">
            <div className="flex items-center gap-1.5">
              {onClose ?
            <button
              type="button"
              onClick={onClose}
              aria-label="Close screen"
              title="Close"
              className="group flex h-3 w-3 items-center justify-center bg-rose-400 text-rose-950 transition-colors hover:bg-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900">
              
                  <XIcon className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" strokeWidth={3} aria-hidden="true" />
                </button> :

            <span className="h-3 w-3 bg-rose-400" aria-hidden="true" />
            }
              <span className="h-3 w-3 bg-amber-300" aria-hidden="true" />
              <span className="h-3 w-3 bg-emerald-400" aria-hidden="true" />
            </div>
            <p className="pointer-events-none absolute inset-x-16 truncate text-center text-xs text-slate-400">~/{name.toLowerCase()}/portfolio</p>
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
                    className={`flex w-full items-center justify-center gap-2 whitespace-nowrap px-1.5 py-2.5 text-[11px] uppercase tracking-normal transition-colors sm:px-3 sm:text-xs sm:tracking-wider focus:outline-none focus-visible:bg-slate-800 ${
                    selected ?
                    'bg-emerald-400 text-slate-950' :
                    'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}`
                    }>
                    
                      <Icon className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
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
              <div className={resumeUrl ? 'grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]' : ''}>
                    <div className="space-y-4">
                      <p className="text-xs text-emerald-400">&gt; whoami</p>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">{name}</h2>
                      <p className="text-sm text-amber-300">{role}</p>
                      <p className="max-w-prose text-sm leading-relaxed text-slate-300">{bio}</p>
                    </div>
                    {resumeUrl &&
                <div className="flex flex-col border-2 border-slate-800 bg-slate-900">
                        <div className="flex items-center justify-between gap-3 border-b-2 border-slate-800 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs text-slate-300">
                            <FileTextIcon className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                            resume.pdf
                          </p>
                          <div className="flex gap-3">
                            {[
                      { label: 'Open', icon: ArrowUpRightIcon, download: false },
                      { label: 'Download', icon: DownloadIcon, download: true }].
                      map(({ label, icon: Icon, download }) =>
                      <a
                        key={label}
                        href={resumeUrl}
                        {...download ? { download: '' } : { target: '_blank', rel: 'noreferrer' }}
                        aria-label={`${label} resume`}
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-300 hover:text-emerald-400 focus:outline-none focus-visible:text-emerald-400">
                        
                                {label}
                                <Icon className="h-3 w-3" aria-hidden="true" />
                              </a>
                      )}
                          </div>
                        </div>
                        {/* Phone browsers can't embed PDFs, so the preview is desktop-only */}
                        <iframe
                    src={`${resumeUrl}#view=FitH&navpanes=0&toolbar=0`}
                    title={`${name}'s resume`}
                    className="hidden aspect-[8.5/11] w-full bg-white md:block" />
                  
                      </div>
                }
                  </div>
              }

                {active === 'projects' &&
              <div className="space-y-4">
                    <p className="text-xs text-emerald-400">&gt; ls ./projects</p>
                    <ul className="grid gap-3 lg:grid-cols-2">
                      {projects.map((p) =>
                  <li
                    key={p.title}
                    className="group flex flex-col gap-4 border-2 border-slate-800 bg-slate-900 p-4 transition-colors hover:border-emerald-400 sm:flex-row">
                    
                          <div className="relative aspect-video w-full shrink-0 overflow-hidden border-2 border-slate-800 bg-slate-950 sm:w-56 sm:self-center md:w-72 lg:w-52 xl:w-56">
                              {p.image ?
                      <Image
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        fill
                        sizes="(min-width: 1280px) 224px, (min-width: 1024px) 208px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                        className={`${p.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-transform duration-300 group-hover:scale-105`} /> :

                      <div className="flex h-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-slate-700 text-slate-500">
                                  <ImageIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="text-[10px] uppercase tracking-wider">Screenshot coming soon</span>
                                </div>
                      }
                            </div>
                          <div className="flex min-w-0 flex-1 flex-col">
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
                          {p.award &&
                    <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-amber-300">
                              <TrophyIcon className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
                              {p.award}
                            </p>
                    }
                          <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.description}</p>
                          <div className="mb-3 mt-3 flex flex-wrap gap-1.5">
                            {p.tags.map((t) =>
                      <span key={t} className="bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-amber-300">
                                {t}
                              </span>
                      )}
                          </div>
                          {/* Pinned to the bottom (and always drawn) so the dashed rules line up across a row */}
                          <div className="mt-auto flex flex-wrap gap-3 border-t-2 border-dashed border-slate-800 pt-2.5">
                              {!p.links?.length && <span className="h-4" aria-hidden="true" />}
                              {p.links?.map((l) =>
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} ${l.label}`}
                        className="inline-flex h-4 items-center gap-1 text-[11px] uppercase tracking-wider text-slate-300 hover:text-emerald-400 focus:outline-none focus-visible:text-emerald-400">
                        
                                  {l.label}
                                  <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
                                </a>
                      )}
                            </div>
                          </div>
                        </li>
                  )}
                    </ul>
                  </div>
              }

                {active === 'experience' &&
              <div className="mx-auto max-w-3xl space-y-4">
                    <p className="text-xs text-emerald-400">&gt; cat experience.log</p>
                    <ol className="space-y-4 border-l-2 border-slate-800 pl-4">
                      {experience.map((e) =>
                  <li key={`${e.company}-${e.role}`} className="relative">
                          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-emerald-400" aria-hidden="true" />
                          {e.period && <p className="text-[11px] uppercase tracking-wider text-slate-500">{e.period}</p>}
                          <h3 className={`text-sm font-bold text-white ${e.period ? 'mt-0.5' : ''}`}>
                            {e.role} <span className="text-amber-300">@ {e.company}</span>
                          </h3>
                          {e.summary && <p className="mt-1 text-xs leading-relaxed text-slate-400">{e.summary}</p>}
                          {e.bullets && e.bullets.length > 0 &&
                    <ul className="mt-2 space-y-1.5">
                              {e.bullets.map((b) =>
                      <li key={b} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                                  <span className="text-emerald-400" aria-hidden="true">-</span>
                                  <span>{b}</span>
                                </li>
                      )}
                            </ul>
                    }
                        </li>
                  )}
                    </ol>
                  </div>
              }

                {active === 'contact' &&
              <div className="flex justify-center">
                <div className="w-fit max-w-full space-y-4">
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
                    {(github || linkedin) &&
                <div className="flex flex-wrap gap-3 pt-1">
                        {[
                  { label: 'GitHub', href: github, icon: GithubIcon },
                  { label: 'LinkedIn', href: linkedin, icon: LinkedinIcon }].
                  filter((l) => l.href).map(({ label, href, icon: Icon }) =>
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-slate-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-100 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                    
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {label}
                          </a>
                  )}
                      </div>
                }
                  </div>
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
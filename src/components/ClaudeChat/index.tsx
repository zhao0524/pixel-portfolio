'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** `sig` is the server's signature on Claude's replies; unsigned replies aren't trusted as history. */
type ChatMessage = {role: 'user' | 'assistant';text: string;sig?: string;};

export interface ClaudeChatProps {
  open: boolean;
  onClose: () => void;
  /** Route handler that answers `{ messages }` with `{ text }` */
  endpoint?: string;
  /** Pin to the viewport instead of the nearest positioned ancestor */
  fixed?: boolean;
  /** Element to pop out of like a speech bubble (e.g. the desk buddy). Without room above it, the chat docks to the bottom. */
  anchor?: Element | null;
}

type BubblePosition = {left: number;bottom: number;width: number;maxHeight: number;tail: number;};

/** Tail size: it slants down-left from the bubble's bottom edge to its tip */
const TAIL_W = 30;
const TAIL_H = 18;
/** Where along the anchor's width the tail points (its top-right shoulder) */
const ANCHOR_X = 0.8;
/** Space between the tail tip and the top of the anchor */
const TAIL_GAP = 4;
/** Smallest height worth showing as a bubble; below this the chat docks to the bottom instead */
const MIN_BUBBLE_HEIGHT = 300;
const EDGE = 12;
const MAX_WIDTH = 420;
const MIN_WIDTH = 320;

/** Places the bubble up and to the right of the anchor, with the tail tip just above its top-right. */
function placeBubble(anchor: Element): BubblePosition | null {
  const r = anchor.getBoundingClientRect();
  const tipX = r.left + r.width * ANCHOR_X;
  const bottomEdge = r.top - TAIL_GAP - TAIL_H;
  if (bottomEdge - EDGE < MIN_BUBBLE_HEIGHT) return null;
  // Narrow (down to MIN_WIDTH) to fit the space right of the anchor before sliding left.
  const spaceRight = window.innerWidth - EDGE - (tipX - 6);
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, spaceRight), window.innerWidth - EDGE * 2);
  const left = Math.min(Math.max(tipX - 6, EDGE), window.innerWidth - width - EDGE);
  return {
    left,
    bottom: window.innerHeight - bottomEdge,
    width,
    maxHeight: Math.min(600, bottomEdge - EDGE),
    tail: Math.min(Math.max(tipX - left, 0), width - TAIL_W - 16)
  };
}

/** Claude's coral accent */
const ACCENT = '#d97757';

const SUGGESTIONS = ['What has David built?', 'Which hackathons has he won?', 'Where has he worked?', 'How can I contact him?'];

/** Renders `**bold**` and bare URLs, the only formatting replies may contain. */
function formatReply(text: string) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,!?]+$/, '');
      return (
        <React.Fragment key={i}>
          <a href={href} target="_blank" rel="noreferrer" className="break-all text-sky-300 underline underline-offset-2 hover:text-sky-200">
            {href}
          </a>
          {part.slice(href.length)}
        </React.Fragment>);

    }
    return part;
  });
}

const SPINNER = ['·', '✢', '✳', '∗', '✻', '✽', '✻', '∗', '✳', '✢'];

function Thinking() {
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 120);
    return () => window.clearInterval(id);
  }, [reduceMotion]);
  return (
    <p className="flex items-center gap-2" aria-label="Claude is thinking">
      <span className="inline-block w-3 text-center" style={{ color: ACCENT }} aria-hidden="true">
        {reduceMotion ? '✻' : SPINNER[frame]}
      </span>
      <span style={{ color: ACCENT }}>Thinking…</span>
      <span className="text-neutral-500">(esc to close)</span>
    </p>);

}

export function ClaudeChat({ open, onClose, endpoint = '/api/chat', fixed = false, anchor }: ClaudeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [bubble, setBubble] = useState<BubblePosition | null>(null);

  useLayoutEffect(() => {
    if (!open || !anchor) return;
    const place = () => setBubble(placeBubble(anchor));
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, anchor]);
  const pos = open && anchor ? bubble : null;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, pending]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || pending) return;
    const next = [...messages, { role: 'user' as const, text: question }];
    setMessages(next);
    setInput('');
    setPending(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      const data = (await res.json()) as {text?: string;sig?: string;};
      setMessages((m) => [...m, { role: 'assistant', text: data.text || 'Hmm, I lost my train of thought. Try again?', sig: data.sig }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: "I can't reach my brain right now. Check your connection and try again." }]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        role="dialog"
        aria-label="Chat with Claude"
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.9 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={pos ? { left: pos.left, bottom: pos.bottom, width: pos.width, transformOrigin: `${pos.tail}px calc(100% + ${TAIL_H}px)` } : undefined}
        className={`${fixed || pos ? 'fixed' : 'absolute'} z-40 ${pos ? '' : 'inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[420px]'}`}>
        
        <div
          style={pos ? { maxHeight: pos.maxHeight } : undefined}
          className="flex max-h-[min(600px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-[#141413] font-mono text-[12px] leading-relaxed text-neutral-200 shadow-2xl shadow-black/60">
          
          {/* Terminal window chrome */}
          <div className="relative flex items-center border-b border-neutral-800 bg-[#1f1e1d] px-3 py-2">
            <div className="flex gap-1.5">
              <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="h-3 w-3 rounded-full bg-[#ff5f57] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400" />
            
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            </div>
            <p className="pointer-events-none absolute inset-x-0 text-center text-[11px] text-neutral-400">claude — ~/david-zhao</p>
          </div>

          <div ref={listRef} className="min-h-[240px] flex-1 space-y-3 overflow-y-auto px-3 py-3" aria-live="polite">
            {/* Welcome box */}
            <div className="rounded-md border px-3 py-2.5" style={{ borderColor: ACCENT }}>
              <p>
                <span style={{ color: ACCENT }}>✻</span> Welcome to <span className="font-bold text-white">Claude</span>, David&apos;s desk buddy!
              </p>
              <p className="mt-1.5 pl-4 text-neutral-400">Ask me about his projects, experience or how to reach him.</p>
              <p className="mt-1.5 pl-4 text-neutral-500">cwd: ~/david-zhao/portfolio</p>
            </div>

            {messages.length === 0 &&
          <div className="space-y-1 pl-1">
                <p className="text-neutral-500">Tips for getting started:</p>
                {SUGGESTIONS.map((s, i) =>
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="block text-left text-neutral-400 hover:text-white focus:text-white focus:outline-none">
              
                    {i + 1}. <span className="underline decoration-neutral-600 underline-offset-2">{s}</span>
                  </button>
            )}
              </div>
          }

            {messages.map((m, i) =>
          m.role === 'user' ?
          <p key={i} className="flex gap-2 text-neutral-400">
                  <span aria-hidden="true">&gt;</span>
                  <span className="whitespace-pre-wrap">{m.text}</span>
                </p> :

          <p key={i} className="flex gap-2">
                  <span style={{ color: ACCENT }} aria-hidden="true">⏺</span>
                  <span className="whitespace-pre-wrap">{formatReply(m.text)}</span>
                </p>

          )}
            {pending && <Thinking />}
          </div>

          <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="px-3 pb-2">
          
            <label className="flex items-center gap-2 rounded-md border border-neutral-600 px-3 py-2 focus-within:border-neutral-400">
              <span className="text-neutral-300" aria-hidden="true">&gt;</span>
              <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder={messages.length ? '' : 'Try "What has David built?"'}
              aria-label="Your question"
              className="min-w-0 flex-1 bg-transparent text-neutral-100 caret-[#d97757] placeholder:text-neutral-500 focus:outline-none" />
            
            </label>
            <div className="mt-1 flex justify-between px-1 text-[10px] text-neutral-500">
              <span>enter to send</span>
              <span>esc to close</span>
            </div>
          </form>
        </div>
          {/* Speech-bubble tail: slants down-left from the bottom edge to the anchor */}
          {pos &&
        <svg
          aria-hidden="true"
          data-bubble-tail
          width={TAIL_W}
          height={TAIL_H}
          viewBox={`0 0 ${TAIL_W} ${TAIL_H}`}
          className="absolute top-[calc(100%-1px)] overflow-visible"
          style={{ left: pos.tail }}>
          
            <polygon points={`14,0 ${TAIL_W},0 0,${TAIL_H}`} fill="#141413" />
            <polyline points={`14,0 0,${TAIL_H} ${TAIL_W},0`} fill="none" stroke="#404040" strokeWidth={1} strokeLinejoin="round" />
          </svg>
        }
        </motion.div>
      }
    </AnimatePresence>);

}

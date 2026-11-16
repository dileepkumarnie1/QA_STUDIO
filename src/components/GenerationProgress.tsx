import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, StopCircle, Sparkles } from 'lucide-react';

const FRAMEWORK_STAGES = [
  'Understanding your requirements',
  'Choosing the stack and architecture',
  'Writing page objects and utilities',
  'Authoring test suites',
  'Wiring CI/CD and Docker',
  'Building the dashboard and README',
  'Final checks',
];
const PLAYBOOK_STAGES = [
  'Understanding your requirements',
  'Drafting the test strategy',
  'Writing the test plan',
  'Authoring test cases',
  'Building the traceability matrix',
  'Compiling metrics and reporting',
  'Final checks',
];

// Stages are an estimate of where a typical run is — the last one holds until the response lands.
const STAGE_SECONDS = [4, 10, 20, 36, 52, 70];

export function GenerationProgress({ onStop, playbook = false }: { onStop: () => void; playbook?: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const started = Date.now();
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => clearInterval(t);
  }, []);

  const stages = playbook ? PLAYBOOK_STAGES : FRAMEWORK_STAGES;
  const current = STAGE_SECONDS.filter(s => elapsed >= s).length;
  const mm = Math.floor(elapsed / 60);
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="qa-generating rounded-3xl p-[1px]"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-[calc(1.5rem-1px)] bg-[var(--qa-card)] p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className="qa-thinking-orb shrink-0" aria-hidden>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-6 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="qa-shimmer-text font-medium text-[0.95rem] truncate"
                >
                  {stages[current]}…
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 tabular-nums">
              {mm}:{ss} elapsed · usually takes 1–2 minutes
            </p>
          </div>
          <button
            onClick={onStop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--qa-hairline)] text-gray-400 hover:text-red-400 hover:border-red-400/50 text-xs font-medium transition-colors shrink-0"
            title="Stop generation and revert"
          >
            <StopCircle className="w-3.5 h-3.5" />
            Stop
          </button>
        </div>

        <ol className="mt-5 grid gap-x-6 gap-y-1.5 sm:grid-rows-4 sm:grid-flow-col sm:auto-cols-fr">
          {stages.map((label, i) => {
            const state = i < current ? 'done' : i === current ? 'active' : 'todo';
            return (
              <li key={label} className={`flex items-center gap-2.5 text-xs transition-colors duration-500 ${state === 'todo' ? 'text-gray-600' : state === 'active' ? 'text-gray-200' : 'text-gray-500'}`}>
                <span className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-all duration-500 ${
                  state === 'done' ? 'bg-emerald-500/20 text-emerald-400' : state === 'active' ? 'qa-pulse-dot' : 'border border-[var(--qa-hairline)]'
                }`}>
                  {state === 'done' && <Check className="w-2.5 h-2.5" />}
                </span>
                {label}
              </li>
            );
          })}
        </ol>

        <div className="mt-5 space-y-2" aria-hidden>
          <div className="qa-skeleton h-2.5 w-11/12" />
          <div className="qa-skeleton h-2.5 w-4/5" style={{ animationDelay: '.15s' }} />
          <div className="qa-skeleton h-2.5 w-3/5" style={{ animationDelay: '.3s' }} />
        </div>
      </div>
    </motion.div>
  );
}

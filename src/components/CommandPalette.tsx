import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CornerDownLeft, Search } from 'lucide-react';

export interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  keywords?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) { setQuery(''); setActive(0); } }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matched = terms.length === 0
      ? commands
      : commands.filter(c => {
          const hay = `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase();
          return terms.every(t => hay.includes(t));
        });
    return matched.slice(0, 60);
  }, [commands, query]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (c?: Command) => { if (!c) return; onClose(); c.run(); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  let lastGroup = '';
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[14vh] px-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="qa-glass qa-palette w-full max-w-xl rounded-3xl overflow-hidden"
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 h-14 border-b border-[var(--qa-hairline)]">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search projects, templates and actions…"
                className="flex-1 bg-transparent outline-none text-[0.95rem] text-gray-100 placeholder:text-gray-500"
                aria-label="Search commands"
              />
              <kbd className="qa-kbd">esc</kbd>
            </div>
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-gray-500">Nothing matches “{query}”.</p>
              )}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                const Icon = c.icon;
                return (
                  <React.Fragment key={c.id}>
                    {header && <p className="px-3 pt-3 pb-1 text-[0.68rem] font-medium text-gray-500 uppercase tracking-wider">{header}</p>}
                    <button
                      data-index={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-left transition-colors ${
                        i === active ? 'bg-blue-500/15 text-gray-100' : 'text-gray-300'
                      }`}
                    >
                      {Icon && <Icon className={`w-4 h-4 shrink-0 ${i === active ? 'text-blue-400' : 'text-gray-500'}`} />}
                      <span className="flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="text-xs text-gray-500 shrink-0">{c.hint}</span>}
                      {i === active && <CornerDownLeft className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

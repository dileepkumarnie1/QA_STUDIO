import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Info } from 'lucide-react';

type ToastItem = { id: number; text: string; kind: 'success' | 'info' };
let listeners: Array<(t: ToastItem) => void> = [];
let nextId = 1;

/** Fire a transient confirmation from anywhere in the app. */
export const toast = (text: string, kind: ToastItem['kind'] = 'success') => {
  const item = { id: nextId++, text, kind };
  listeners.forEach(l => l(item));
};

export const copyText = async (text: string, label = 'Copied to clipboard') => {
  try {
    await navigator.clipboard.writeText(text);
    toast(label);
  } catch {
    toast('Copy failed — your browser blocked clipboard access', 'info');
  }
};

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => {
    const onToast = (t: ToastItem) => {
      setItems(prev => [...prev.slice(-2), t]);
      setTimeout(() => setItems(prev => prev.filter(i => i.id !== t.id)), 2400);
    };
    listeners.push(onToast);
    return () => { listeners = listeners.filter(l => l !== onToast); };
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none" role="status" aria-live="polite">
      <AnimatePresence>
        {items.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="qa-glass qa-toast flex items-center gap-2 rounded-full pl-3 pr-4 py-2 text-sm"
          >
            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${t.kind === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {t.kind === 'success' ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
            </span>
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

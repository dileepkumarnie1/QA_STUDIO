import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown, Clock, Copy, Layout, RotateCcw, Terminal } from 'lucide-react';
import type { Message } from '../types';
import { FILENAME_LINE_RE, fileColor, relativeTime, sanitizeFilename } from '../lib/files';
import { highlight } from '../lib/highlight';
import { copyText } from './Toaster';

interface ChatMessageProps {
  message: Message;
  /** Known generated files (path → content) — used for line counts and to decide whether a chip is clickable. */
  files: Record<string, { language: string; content: string }>;
  onOpenFile: (path: string) => void;
  showCheckpoint: boolean;
  isActiveCheckpoint: boolean;
  onToggleCheckpoint: () => void;
  /** Latest reply: its numbers count up when it first appears. */
  isLatest?: boolean;
}

const USER_COLLAPSE_CHARS = 420;
const FILES_SHOWN = 8;

const LANG_LABELS: Record<string, string> = {
  py: 'Python', ts: 'TypeScript', tsx: 'TypeScript', js: 'JavaScript', jsx: 'JavaScript', java: 'Java', kt: 'Kotlin',
  go: 'Go', cs: 'C#', rb: 'Ruby', json: 'JSON', yml: 'YAML', yaml: 'YAML', xml: 'XML', html: 'HTML', css: 'CSS',
  md: 'Markdown', sql: 'SQL', sh: 'Shell', txt: 'Text', toml: 'TOML', feature: 'Gherkin', gradle: 'Gradle',
};
const langOf = (path: string) => {
  const base = path.split('/').pop()?.toLowerCase() ?? '';
  if (base.startsWith('dockerfile') || base.startsWith('docker-compose')) return 'Docker';
  if (base.startsWith('.')) return 'Config';
  const ext = base.includes('.') ? base.split('.').pop()! : '';
  return LANG_LABELS[ext] ?? (ext ? ext.toUpperCase() : 'Other');
};

interface ReplyFile { path: string; lines: number }
interface ParsedReply {
  summary: string;
  files: ReplyFile[];
  totalLines: number;
  langs: { name: string; lines: number; color: string }[];
  quickStart: string | null;
}

/** Pulls the at-a-glance facts out of a reply so the card can show them instead of a wall of text. */
const parseReply = (content: string): ParsedReply | null => {
  const fileRe = /```[\w-]*\s*\r?\n(?:#|\/\/|\/\*|<!--)\s*(?:filename|file|path):\s*([^\n]+)\r?\n([\s\S]*?)```/g;
  const byPath = new Map<string, number>();
  let m: RegExpExecArray | null;
  while ((m = fileRe.exec(content)) !== null) {
    const path = sanitizeFilename(m[1]);
    if (path) byPath.set(path, m[2].replace(/\n$/, '').split('\n').length);
  }
  if (byPath.size === 0) return null;
  const files = [...byPath].map(([path, lines]) => ({ path, lines }));
  const totalLines = files.reduce((n, f) => n + f.lines, 0);

  const langMap = new Map<string, { lines: number; color: string }>();
  files.forEach(f => {
    const name = langOf(f.path);
    const cur = langMap.get(name) ?? { lines: 0, color: fileColor(f.path) };
    cur.lines += f.lines;
    langMap.set(name, cur);
  });
  const langs = [...langMap].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.lines - a.lines);

  // First paragraph before any heading or code block is the model's own summary.
  const intro = content.split(/\n\s*(?:```|#{1,6}\s)/)[0] ?? '';
  const summary = intro.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)[0] ?? '';

  // First plain command block after a "Quick Start" heading.
  const qsIdx = content.search(/^#{1,6}\s.*quick\s*start/im);
  let quickStart: string | null = null;
  if (qsIdx >= 0) {
    const block = /```(?:bash|sh|shell|zsh|console|powershell)?\s*\r?\n([\s\S]*?)```/.exec(content.slice(qsIdx));
    const text = block?.[1].trim() ?? '';
    if (text && !FILENAME_LINE_RE.test(text + '\n') && text.split('\n').length <= 14) quickStart = text;
  }
  return { summary, files, totalLines, langs, quickStart };
};

/** Animates 0 → value once; shows the final value immediately when `animate` is false. */
function CountUp({ value, animate }: { value: number; animate: boolean }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  useEffect(() => {
    if (!animate) { setShown(value); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);
  return <>{shown.toLocaleString()}</>;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code, language), [code, language]);
  return (
    <div className="qa-codeblock not-prose">
      <div className="flex items-center justify-between px-4 h-9 border-b border-[var(--qa-hairline)]">
        <span className="text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">{language || 'text'}</span>
        <button
          onClick={async () => { await copyText(code, 'Copied'); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="flex items-center gap-1.5 text-[0.7rem] text-gray-500 hover:text-gray-200 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="qa-code overflow-x-auto px-4 py-3 text-[0.78rem] leading-relaxed font-mono">
        <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

export const ChatMessage = React.memo(function ChatMessage({
  message, files, onOpenFile, showCheckpoint, isActiveCheckpoint, onToggleCheckpoint, isLatest = false,
}: ChatMessageProps) {
  const [expanded, setExpanded] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // Only replies that arrive while you are watching animate; history renders instantly.
  const [animateIn] = useState(() => isLatest && Date.now() - message.timestamp < 15000);
  const isAssistant = message.role === 'assistant';

  const reply = useMemo(() => (isAssistant ? parseReply(message.content) : null), [isAssistant, message.content]);

  if (!isAssistant) {
    const long = message.content.length > USER_COLLAPSE_CHARS;
    const shown = long && !expanded ? message.content.slice(0, USER_COLLAPSE_CHARS).trimEnd() + '…' : message.content;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="qa-bubble-user max-w-[85%] group">
          <div className="qa-prose qa-prose-user">
            <ReactMarkdown>{shown}</ReactMarkdown>
          </div>
          <div className="flex items-center justify-between gap-3 mt-1.5">
            {long ? (
              <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1 text-[0.7rem] font-medium text-blue-400 hover:text-blue-300">
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                {expanded ? 'Show less' : 'Show full prompt'}
              </button>
            ) : <span />}
            <span className="flex items-center gap-2 text-[0.68rem] text-gray-500">
              <button onClick={() => copyText(message.content, 'Prompt copied')} title="Copy prompt"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-gray-300 transition-opacity">
                <Copy className="w-3 h-3" />
              </button>
              {relativeTime(message.timestamp)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`qa-bubble-ai group ${isActiveCheckpoint ? 'qa-bubble-ai--checkpoint' : ''}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="qa-logo w-7 h-7 rounded-[0.6rem] flex items-center justify-center shrink-0">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-100">QA Studio</span>
          <span className="text-[0.7rem] text-gray-500 truncate">
            {relativeTime(message.timestamp)}
            
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {showCheckpoint && (
            <button
              title={isActiveCheckpoint ? 'Return to latest code' : 'View code at this checkpoint'}
              onClick={onToggleCheckpoint}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-medium border transition-colors ${
                isActiveCheckpoint
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 hover:bg-amber-500/25'
                  : 'border-[var(--qa-hairline)] text-gray-500 hover:text-gray-200 hover:border-gray-500'
              }`}
            >
              {isActiveCheckpoint ? <RotateCcw className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {isActiveCheckpoint ? 'Active checkpoint' : 'Checkpoint'}
            </button>
          )}
          <button onClick={() => copyText(message.content, 'Response copied')} title="Copy full response"
            className="qa-icon-btn opacity-0 group-hover:opacity-100 focus-visible:opacity-100">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {reply && (
        <div className="space-y-4">
          {reply.summary && (
            <div className="qa-prose qa-summary">
              <ReactMarkdown>{reply.summary}</ReactMarkdown>
            </div>
          )}

          {/* At-a-glance numbers */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: reply.files.length === 1 ? 'File' : 'Files', value: reply.files.length },
              { label: 'Lines', value: reply.totalLines },
              { label: reply.langs.length === 1 ? 'Language' : 'Languages', value: reply.langs.length },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={animateIn ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="qa-stat"
              >
                <span className="qa-stat-value tabular-nums"><CountUp value={stat.value} animate={animateIn} /></span>
                <span className="qa-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Language mix */}
          <div>
            <div className="flex h-1.5 rounded-full overflow-hidden bg-[var(--qa-card-alt)]" role="img"
              aria-label={`Language mix: ${reply.langs.map(l => `${l.name} ${Math.round((l.lines / reply.totalLines) * 100)}%`).join(', ')}`}>
              {reply.langs.map((l, i) => (
                <motion.span
                  key={l.name}
                  initial={animateIn ? { width: 0 } : false}
                  animate={{ width: `${(l.lines / reply.totalLines) * 100}%` }}
                  transition={{ delay: 0.25 + 0.05 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: l.color }}
                  className="h-full border-r border-[var(--qa-card)] last:border-r-0"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {reply.langs.slice(0, 5).map(l => (
                <span key={l.name} className="flex items-center gap-1.5 text-[0.7rem] text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                  {l.name} <span className="tabular-nums text-gray-600">{Math.round((l.lines / reply.totalLines) * 100)}%</span>
                </span>
              ))}
            </div>
          </div>

          {/* Files */}
          <div>
            {(showAllFiles ? reply.files : reply.files.slice(0, FILES_SHOWN)).map((f, i) => {
              const name = f.path.split('/').pop();
              const dir = f.path.split('/').slice(0, -1).join('/');
              return (
                <motion.button
                  key={f.path}
                  type="button"
                  initial={animateIn && i < FILES_SHOWN ? { opacity: 0, scale: 0.92 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + 0.035 * i, duration: 0.3 }}
                  onClick={() => onOpenFile(f.path)}
                  className="qa-filechip"
                  title={`Open ${f.path} in the Code panel`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fileColor(f.path) }} />
                  <span className="truncate">
                    {dir && <span className="text-gray-500">{dir}/</span>}
                    <span className="text-gray-100">{name}</span>
                  </span>
                  <span className="text-gray-500 tabular-nums shrink-0">{f.lines}</span>
                  <ArrowUpRight className="qa-filechip-arrow w-3 h-3 shrink-0" />
                </motion.button>
              );
            })}
            {reply.files.length > FILES_SHOWN && (
              <button type="button" onClick={() => setShowAllFiles(v => !v)} className="qa-filechip qa-filechip--more">
                {showAllFiles ? 'Show fewer' : `+${reply.files.length - FILES_SHOWN} more`}
              </button>
            )}
          </div>

          {reply.quickStart && (
            <div className="qa-codeblock !my-0">
              <div className="flex items-center justify-between px-4 h-9 border-b border-[var(--qa-hairline)]">
                <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">
                  <Terminal className="w-3 h-3" /> Quick start
                </span>
                <button onClick={() => copyText(reply.quickStart!, 'Commands copied')}
                  className="flex items-center gap-1.5 text-[0.7rem] text-gray-500 hover:text-gray-200 transition-colors">
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <pre className="qa-code overflow-x-auto px-4 py-3 text-[0.78rem] leading-relaxed font-mono">
                <code className="hljs" dangerouslySetInnerHTML={{ __html: highlight(reply.quickStart, 'bash') }} />
              </pre>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowDetails(v => !v)}
            aria-expanded={showDetails}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-200 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            {showDetails ? 'Hide full response' : 'Show full response'}
          </button>
        </div>
      )}

      {(!reply || showDetails) && (
      <motion.div
        initial={reply ? { opacity: 0, height: 0 } : false}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={reply ? 'overflow-hidden pt-4 mt-4 border-t border-[var(--qa-hairline)]' : ''}
      >
      <div className="qa-prose">
        <ReactMarkdown
          components={{
            // Blocks are rendered by the `code` handler below, so drop the wrapping <pre>.
            pre: ({ children }) => <>{children}</>,
            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            code({ node, className, children, ...props }: any) {
              const raw = String(children);
              const language = /language-([\w-]+)/.exec(className || '')?.[1] ?? '';
              const isBlock = !!language || raw.includes('\n');
              if (!isBlock) return <code className="qa-inline-code" {...props}>{children}</code>;

              const fileMatch = raw.match(FILENAME_LINE_RE);
              if (fileMatch) {
                const path = sanitizeFilename(fileMatch[1]);
                const known = files[path];
                const lineCount = (known?.content ?? raw).replace(/\n$/, '').split('\n').length;
                const name = path.split('/').pop();
                const dir = path.split('/').slice(0, -1).join('/');
                return (
                  <button
                    type="button"
                    onClick={() => onOpenFile(path)}
                    className="qa-filechip not-prose"
                    title={`Open ${path} in the Code panel`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fileColor(path) }} />
                    <span className="truncate">
                      {dir && <span className="text-gray-500">{dir}/</span>}
                      <span className="text-gray-100">{name}</span>
                    </span>
                    <span className="text-gray-500 tabular-nums shrink-0">{lineCount}</span>
                    <ArrowUpRight className="qa-filechip-arrow w-3 h-3 shrink-0" />
                  </button>
                );
              }
              return <CodeBlock language={language} code={raw.replace(/\n$/, '')} />;
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      </motion.div>
      )}
    </motion.div>
  );
});

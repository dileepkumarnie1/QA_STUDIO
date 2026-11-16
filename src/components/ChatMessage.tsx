import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown, Clock, Copy, Layout, RotateCcw } from 'lucide-react';
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
}

const USER_COLLAPSE_CHARS = 420;

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
  message, files, onOpenFile, showCheckpoint, isActiveCheckpoint, onToggleCheckpoint,
}: ChatMessageProps) {
  const [expanded, setExpanded] = useState(false);
  const isAssistant = message.role === 'assistant';

  // Files this particular reply produced — shown as a summary line under the header.
  const stats = useMemo(() => {
    if (!isAssistant) return null;
    const re = /```[\w-]*\s*\r?\n(?:#|\/\/|\/\*|<!--)\s*(?:filename|file|path):\s*([^\n]+)\r?\n([\s\S]*?)```/g;
    let count = 0, lines = 0, m: RegExpExecArray | null;
    while ((m = re.exec(message.content)) !== null) { count++; lines += m[2].split('\n').length; }
    return count > 0 ? { count, lines } : null;
  }, [isAssistant, message.content]);

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
            {stats && <> · {stats.count} file{stats.count === 1 ? '' : 's'} · {stats.lines.toLocaleString()} lines</>}
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
  );
});

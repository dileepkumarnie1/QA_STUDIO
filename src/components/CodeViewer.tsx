import React, { useMemo, useState } from 'react';
import { Check, Copy, Download, WrapText } from 'lucide-react';
import { highlight } from '../lib/highlight';
import { fileColor } from '../lib/files';
import { copyText } from './Toaster';

interface CodeViewerProps {
  filename: string;
  language?: string;
  content: string;
  onDownload: () => void;
}

export function CodeViewer({ filename, language, content, onDownload }: CodeViewerProps) {
  const [wrap, setWrap] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = content.replace(/\n$/, '');
  const html = useMemo(() => highlight(code, language, filename), [code, language, filename]);
  const lineCount = code.split('\n').length;
  const parts = filename.split('/');

  const handleCopy = async () => {
    await copyText(code, `Copied ${parts[parts.length - 1]}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="h-12 shrink-0 flex items-center justify-between gap-3 px-4 border-b border-[var(--qa-hairline)]">
        <div className="flex items-center gap-2 min-w-0 text-sm">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fileColor(filename) }} />
          <span className="truncate font-mono text-[0.8rem]">
            {parts.slice(0, -1).map((p, i) => (
              <span key={i} className="text-gray-500">{p}<span className="mx-1 text-gray-600">/</span></span>
            ))}
            <span className="text-gray-100 font-medium">{parts[parts.length - 1]}</span>
          </span>
          <span className="text-[0.7rem] text-gray-500 shrink-0 tabular-nums">{lineCount} lines</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setWrap(w => !w)} title="Toggle line wrap" aria-pressed={wrap}
            className={`qa-icon-btn ${wrap ? 'text-blue-400 bg-blue-500/10' : ''}`}>
            <WrapText className="w-4 h-4" />
          </button>
          <button onClick={handleCopy} title="Copy file" className="qa-icon-btn">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={onDownload} title="Download file" className="qa-icon-btn">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto qa-code">
        <div className="flex min-w-full w-max text-[0.8rem] leading-[1.65] font-mono py-4" style={wrap ? { width: '100%' } : undefined}>
          <pre aria-hidden className="qa-code-gutter select-none text-right pl-4 pr-3 shrink-0 sticky left-0">
            {wrap ? '' : Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
          </pre>
          <pre className={`flex-1 pr-6 ${wrap ? 'whitespace-pre-wrap break-words min-w-0 pl-1' : ''}`}>
            <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </div>
      </div>
    </div>
  );
}

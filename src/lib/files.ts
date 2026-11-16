/** Matches the "filename" comment the model puts on the first line of a code block. */
export const FILENAME_LINE_RE = /^\s*(?:#|\/\/|\/\*|<!--)\s*(?:filename|file|path):\s*([^\n]+)\r?\n?/;

/**
 * Filenames come from model output — treat as untrusted. Strips comment closers,
 * HTML/control characters and path traversal before the name is used in the
 * file tree, preview HTML or ZIP download.
 */
export const sanitizeFilename = (raw: string | undefined | null): string =>
  (raw ?? '')
    .replace(/\s*(-->|\*\/)\s*$/, '')
    .replace(/[<>"'`\\\u0000-\u001f]/g, '')
    .split('/')
    .map(seg => seg.trim())
    .filter(seg => seg && seg !== '.' && seg !== '..')
    .join('/')
    .slice(0, 200);

const LANG_COLORS: Record<string, string> = {
  py: '#4b8bbe', ts: '#3178c6', tsx: '#3178c6', js: '#e8d44d', jsx: '#e8d44d', java: '#f89820',
  kt: '#a97bff', go: '#00add8', cs: '#9b4f96', rb: '#cc342d', json: '#8e8e93', yml: '#ff6b6b',
  yaml: '#ff6b6b', xml: '#e37933', html: '#e34c26', css: '#7d5cff', md: '#2997ff', sql: '#e38c00',
  sh: '#30d158', txt: '#8e8e93', toml: '#9c4221', gradle: '#02a88d', feature: '#30d158',
};

export const fileColor = (name: string): string => {
  const base = name.split('/').pop()?.toLowerCase() ?? '';
  if (base.startsWith('dockerfile') || base.startsWith('docker-compose')) return '#2496ed';
  if (base.startsWith('.env')) return '#ecd53f';
  return LANG_COLORS[base.split('.').pop() ?? ''] ?? '#8e8e93';
};

export const relativeTime = (ts: number): string => {
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (s < 45) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  if (s < 604800) return `${Math.round(s / 86400)}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

/** Short, readable project title derived from the user's first prompt. */
export const titleFromPrompt = (prompt: string, fallback: string): string => {
  const firstLine = prompt.replace(/[*_`#>]/g, '').split(/\n|(?<=[.!?])\s/)[0]?.trim() ?? '';
  const cleaned = firstLine
    .replace(/^(please\s+)?(can you\s+|could you\s+)?(develop|create|build|generate|write|make|design|implement|set up|give me)\s+(me\s+)?(an?\s+|the\s+)?/i, '')
    .replace(/[.!?:;,\s]+$/, '');
  if (cleaned.length < 4) return fallback;
  const words = cleaned.split(/\s+/);
  let out = '';
  for (const w of words) {
    if ((out + ' ' + w).trim().length > 48) break;
    out = (out + ' ' + w).trim();
  }
  out = out || cleaned.slice(0, 48);
  return out.charAt(0).toUpperCase() + out.slice(1);
};

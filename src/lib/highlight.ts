import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import gherkin from 'highlight.js/lib/languages/gherkin';
import go from 'highlight.js/lib/languages/go';
import gradle from 'highlight.js/lib/languages/gradle';
import groovy from 'highlight.js/lib/languages/groovy';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

const langs = { bash, csharp, css, dockerfile, gherkin, go, gradle, groovy, ini, java, javascript, json, kotlin, markdown, python, ruby, sql, typescript, xml, yaml };
Object.entries(langs).forEach(([name, def]) => hljs.registerLanguage(name, def));

const ALIASES: Record<string, string> = {
  py: 'python', ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript', sh: 'bash', shell: 'bash',
  zsh: 'bash', yml: 'yaml', html: 'xml', htm: 'xml', svg: 'xml', md: 'markdown', kt: 'kotlin', cs: 'csharp', rb: 'ruby',
  toml: 'ini', properties: 'ini', cfg: 'ini', env: 'bash', feature: 'gherkin', docker: 'dockerfile', txt: '', text: '',
};

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Returns HTML-escaped, syntax-highlighted markup. Unknown languages fall back to plain escaped text. */
export const highlight = (code: string, language?: string, filename?: string): string => {
  const base = filename?.split('/').pop()?.toLowerCase() ?? '';
  let lang = (language || '').toLowerCase();
  if (base.startsWith('dockerfile')) lang = 'dockerfile';
  else if (base.startsWith('.env')) lang = 'bash';
  else if (!lang || lang === 'txt') lang = base.includes('.') ? base.split('.').pop()! : lang;
  lang = lang in ALIASES ? ALIASES[lang] : lang;
  // Very large files: skip highlighting to keep the UI responsive.
  if (!lang || !hljs.getLanguage(lang) || code.length > 200_000) return escapeHtml(code);
  try {
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  History, 
  Settings, 
  LogOut, 
  Send, 
  Layout, 
  ChevronRight, 
  Database, 
  Globe, 
  Server, 
  Smartphone,
  Github,
  Play,
  CheckCircle2,
  Loader2,
  Menu,
  X,
  User as UserIcon,
  Shield,
  Zap,
  Bot,
  ArrowLeft,
  Download,
  FileCode,
  Code2,
  Trash2,
  Wand2,
  Mic,
  Image as ImageIcon,
  Video,
  Upload,
  Camera,
  Settings2,
  Key,
  HardDrive,
  Monitor,
  Tablet,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Clock,
  Sparkles,
  ChevronDown,
  CheckCheck,
  TestTube2,
  Cloud,
  FileText,
  Accessibility,
  Shuffle,
  GitBranch,
  Cpu,
  ClipboardCheck,
  Link2,
  MessageSquare,
  Eye,
  StopCircle,
  Pencil,
  ChevronUp,
  Check,
  ClipboardList,
  Layers,
  Users,
  Languages,
  FlaskConical,
  Compass,
  BadgeCheck,
  Activity,
  RefreshCw,
  ArrowRightLeft,
  Network,
  Building2,
  FileSpreadsheet,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import PptxGenJS from 'pptxgenjs';
import { useAuth } from './lib/AuthContext';
import { auth } from './lib/firebase';
import { Project, Message, Template, SubTemplate } from './types';
import { TEMPLATES } from './constants';
import { subscribeToProjects, createProject, subscribeToMessages, addMessage, deleteMessage, testConnection, deleteProject, updateProject } from './lib/db';
import { generateTestingFramework } from './lib/gemini';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ErrorBoundary } from './components/ErrorBoundary';
import { FileTree, buildFileTree } from './components/FileTree';

const IconMap: Record<string, any> = {
  Globe,
  Database,
  Server,
  Smartphone,
  Shield,
  Zap,
  Bot,
  TestTube2,
  HardDrive,
  Cloud,
  FileText,
  Accessibility,
  Shuffle,
  GitBranch,
  Cpu,
  ClipboardCheck,
  Link2,
  Monitor,
  MessageSquare,
  Eye,
  ClipboardList,
  Layers,
  Users,
  Languages,
  FlaskConical,
  Compass,
  BadgeCheck,
  Activity,
  RefreshCw,
  ArrowRightLeft,
  Network,
  Building2
};

const COLLECTIONS: { id: string | null; label: string; emoji: string }[] = [
  { id: null,                      label: 'All Templates',          emoji: '🗂️' },
  { id: 'core-engineering',        label: 'Core Engineering',        emoji: '🔧' },
  { id: 'product-experience',      label: 'Product Experience',      emoji: '✨' },
  { id: 'platform-reliability',    label: 'Platform Reliability',    emoji: '🛡️' },
  { id: 'data-ai',                 label: 'Data & AI',               emoji: '🤖' },
  { id: 'governance-risk',         label: 'Governance & Risk',       emoji: '⚖️' },
  { id: 'specialized-systems',     label: 'Specialised Systems',     emoji: '🔩' },
];

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

/** Default Google model — the baseline for silent follow-up routing (Improvement C). */
const DEFAULT_GOOGLE_MODEL = 'gemini-3.1-pro-preview';

/**
 * Improvement A — Pure utility function, zero React/side-effect dependencies.
 * Extracts a compact project state summary from an AI response.
 * Merges file list with any existing summary so context accumulates across turns.
 * Capped at 2,000 chars (matches MAX_PROJECT_SUMMARY_CHARS on the server).
 */
const extractProjectSummary = (responseText: string, existingSummary?: string): string => {
  // Extract filenames from code blocks (# filename: or // filename:)
  const filenameRegex = /(?:#|\/\/)\s*filename:\s*([^\n]+)/g;
  const newFiles = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = filenameRegex.exec(responseText)) !== null) {
    newFiles.add(m[1].trim());
  }
  // Merge with files already known from previous turns
  const allFiles = new Set(newFiles);
  if (existingSummary) {
    const match = existingSummary.match(/Files: ([^\n]+)/);
    if (match) match[1].split(', ').forEach(f => allFiles.add(f.trim()));
  }
  // Detect stack/tool keywords present in the response
  const STACK_KEYWORDS = [
    'playwright', 'pytest', 'selenium', 'cypress', 'jest', 'testng',
    'junit', 'mocha', 'vitest', 'k6', 'jmeter', 'appium', 'allure',
    'extent', 'python', 'java', 'typescript', 'javascript', 'maven',
    'gradle', 'cucumber', 'behave', 'robot', 'postman', 'newman',
  ];
  const lower = responseText.toLowerCase();
  const detected = [...new Set(STACK_KEYWORDS.filter(k => lower.includes(k)))].slice(0, 8);

  const parts: string[] = [];
  if (allFiles.size > 0) parts.push(`Files: ${[...allFiles].slice(0, 15).join(', ')}`);
  if (detected.length > 0) parts.push(`Stack: ${detected.join(', ')}`);
  return parts.join('\n').slice(0, 2_000);
};

function AppContent() {
  const { user, loading, login, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allowed attachment MIME types and max size (10 MB per file)
  const ALLOWED_MIME_PREFIXES = ['image/', 'text/', 'application/pdf'];
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

  const validateAndFilterFiles = (files: File[]): File[] => {
    return files.filter(f => {
      if (f.size > MAX_FILE_SIZE_BYTES) {
        console.warn(`Skipped "${f.name}": exceeds 10 MB limit.`);
        return false;
      }
      if (!ALLOWED_MIME_PREFIXES.some(prefix => f.type.startsWith(prefix))) {
        console.warn(`Skipped "${f.name}": unsupported file type (${f.type}).`);
        return false;
      }
      return true;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const valid = validateAndFilterFiles(Array.from(e.target.files!));
      setAttachments(prev => [...prev, ...valid]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      e.preventDefault();
      const valid = validateAndFilterFiles(Array.from(e.clipboardData.files));
      setAttachments(prev => [...prev, ...valid]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const pendingUserMsgIdRef = useRef<string | null>(null);
  const renameInputRef = useRef<HTMLInputElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [renamingProjectId, setRenamingProjectId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [rightPaneMode, setRightPaneMode] = useState<'preview' | 'code'>('code');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [homePrompt, setHomePrompt] = useState('');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [checkpointMsgId, setCheckpointMsgId] = useState<string | null>(null);

  // Refinement questions — shown after first-turn AI response as radio-button cards
  const [refinementQuestions, setRefinementQuestions] = useState<{id:string;question:string;options:string[]}[]>([]);
  const [refinementAnswers, setRefinementAnswers] = useState<Record<string,string>>({});
  const [refinementDismissed, setRefinementDismissed] = useState(false);

  // Prompt Enhancer state
  const [enhancerOpen, setEnhancerOpen] = useState(false);
  const [enhancerOutputType, setEnhancerOutputType] = useState<'framework' | 'playbook'>('framework');
  const [enhancerTemplate, setEnhancerTemplate] = useState<Template | null>(null);
  const [enhancerSubTemplate, setEnhancerSubTemplate] = useState<SubTemplate | null>(null);
  const [enhancerPrompt, setEnhancerPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [useEnhanced, setUseEnhanced] = useState(false);
  const [enhancerLevel, setEnhancerLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [enhancerIsChatInput, setEnhancerIsChatInput] = useState(false);
  
  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(() => {
    return (localStorage.getItem('qa-theme') as 'dark' | 'light' | 'system') || 'dark';
  });
  const [provider, setProvider] = useState<'google' | 'groq'>('google');
  const [selectedModel, setSelectedModel] = useState(provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gemini-3.1-pro-preview');
  const [groqApiKey, setGroqApiKey] = useState('');
  const [temperature, setTemperature] = useState([1]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const parsedFiles = useMemo(() => {
    const files: Record<string, { language: string, content: string }> = {};
    let fileCount = 0;
    const cutoffIdx = checkpointMsgId ? messages.findIndex(m => m.id === checkpointMsgId) : -1;
    const msgsToProcess = cutoffIdx >= 0
      ? messages.slice(0, cutoffIdx + 1).filter(m => m.role === 'assistant')
      : messages.filter(m => m.role === 'assistant');
    msgsToProcess.forEach(msg => {
      const codeBlockRegex = /```([\w-]+)?\s*\r?\n(?:(?:#|\/\/|\/\*|<!--)\s*(?:filename|file|path):\s*([^\n]+)\r?\n)?([\s\S]*?)```/g;
      let match;
      while ((match = codeBlockRegex.exec(msg.content)) !== null) {
        const lang = match[1] || 'txt';
        let filename = match[2]?.trim();
        if (!filename) {
          fileCount++;
          filename = `snippet_${fileCount}.${lang}`;
        }
        files[filename] = { language: lang, content: match[3] };
      }
    });
    // Remove unnamed snippets when properly-named files already exist.
    // Follow-up AI turns sometimes omit the filename comment on new helper classes,
    // producing snippet_N noise alongside the real project files.
    const hasProperFiles = Object.keys(files).some(k => !k.startsWith('snippet_'));
    if (hasProperFiles) {
      Object.keys(files).filter(k => k.startsWith('snippet_')).forEach(k => delete files[k]);
    }
    return files;
  }, [messages, checkpointMsgId]);

  const fileNames = Object.keys(parsedFiles);
  const fileTree = useMemo(() => buildFileTree(fileNames), [fileNames]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const htmlPreviewFile = useMemo(() => {
    // Patch to inject into every srcdoc iframe: swallows History API errors
    // that occur because srcdoc iframes have origin=null.
    const historyPatch = `<script>
      (function(){function wrap(fn){return function(s,t,url){try{fn.call(history,s,t,url);}catch(e){}};}
      history.pushState=wrap(history.pushState);history.replaceState=wrap(history.replaceState);})();
    <\/script>`;
    const injectPatch = (html: string) => {
      if (html.includes('<head>')) return html.replace('<head>', '<head>' + historyPatch);
      if (html.includes('<HEAD>')) return html.replace('<HEAD>', '<HEAD>' + historyPatch);
      return historyPatch + html;
    };

    // 1. Check for standard HTML files
    const htmlKey = fileNames.find(k => k.toLowerCase().endsWith('.html') || k.toLowerCase().endsWith('.htm'));
    if (htmlKey) return injectPatch(parsedFiles[htmlKey].content);

    // 2. Check for Streamlit Python apps
    const pythonFiles = fileNames.filter(k => k.toLowerCase().endsWith('.py'));
    for (const pyFile of pythonFiles) {
      const content = parsedFiles[pyFile].content;
      if (content.includes('import streamlit') || content.includes('from streamlit')) {
        // Extract requirements if available
        const reqKey = fileNames.find(k => k.toLowerCase() === 'requirements.txt');
        let requirements: string[] = [];
        if (reqKey) {
          requirements = parsedFiles[reqKey].content
            .split('\n')
            .map(r => r.trim())
            // Strip version constraints, extras, and environment markers
            // e.g. "playwright>=1.18" -> "playwright", "requests[security]" -> "requests"
            .map(r => r.split(/[=<>~;[]/)[0].trim())
            // Filter out comments and packages that cannot be installed in WebAssembly/Pyodide
            .filter(r => {
              if (!r || r.startsWith('#')) return false;
              // Normalise: lowercase + replace underscores with hyphens for comparison
              const norm = r.toLowerCase().replace(/_/g, '-');
              const badPackages = [
                // Browser automation — all require native binaries
                'playwright', 'playwright-async', 'pytest-playwright', 'pyplaywright',
                'selenium', 'seleniumbase', 'selenium-wire', 'webdriver-manager',
                'pyppeteer', 'playwright-stealth',
                // Test/lint tools (no UI needed in Pyodide)
                'pytest', 'pytest-html', 'pytest-cov', 'pytest-xdist', 'pytest-asyncio',
                'pytest-bdd', 'pytest-mock', 'pytest-retry', 'pytest-timeout',
                'black', 'flake8', 'mypy', 'isort', 'pylint', 'bandit',
                // Reporting tools (native deps or CLI-only)
                'allure-pytest', 'allure-python-commons', 'allure-behave',
                'reportportal-client', 'html-testrunner',
                // Database drivers (all require native C extensions)
                'psycopg2', 'psycopg2-binary', 'pyodbc', 'pymssql',
                'cx_oracle', 'oracledb', 'mysql-connector-python', 'pymysql',
                'sqlite3', 'sqlite', 'sqlalchemy',
                // Databricks / Spark
                'databricks-sql-connector', 'databricks-connect', 'databricks-sdk',
                'pyspark', 'delta-spark',
                // Thrift and RPC (C extensions)
                'thrift', 'thrift-binary', 'grpcio', 'grpcio-tools', 'grpcio-status',
                // Cloud SDKs (too large / native deps)
                'boto3', 'botocore', 'google-cloud-bigquery', 'google-cloud-storage',
                'google-cloud-firestore', 'firebase-admin',
                'azure-storage-blob', 'azure-identity', 'azure-devops',
                // Web frameworks
                'fastapi', 'uvicorn', 'gunicorn', 'django', 'flask',
                // Other native-extension packages
                'lxml', 'cryptography', 'cffi', 'greenlet', 'gevent',
                'pyarrow', 'connectorx', 'polars',
                // Data science heavy (too large for WASM)
                'torch', 'torchvision', 'torchaudio', 'tensorflow', 'keras',
                'scikit-learn', 'sklearn', 'xgboost', 'lightgbm', 'catboost',
                'transformers', 'huggingface-hub', 'sentence-transformers', 'diffusers',
                'onnxruntime', 'onnx', 'deepeval', 'mlflow', 'dask', 'ray',
                'opencv-python', 'cv2',
                // HTTP/API testing tools (native deps)
                'httpx', 'pycurl', 'paramiko', 'fabric',
              ];
              // Exact match OR prefix match (catches pytest-*, playwright-*, selenium-*, etc.)
              if (badPackages.includes(norm)) return false;
              if (norm.startsWith('pytest-')) return false;
              if (norm.startsWith('playwright')) return false;
              if (norm.startsWith('selenium')) return false;
              if (norm.startsWith('allure-')) return false;
              if (norm.startsWith('google-cloud-')) return false;
              if (norm.startsWith('azure-')) return false;
              if (norm.startsWith('databricks-')) return false;
              if (norm.startsWith('torch')) return false;
              if (norm.startsWith('tensorflow')) return false;
              if (norm.startsWith('transformers')) return false;
              return true;
            });
          // Deduplicate
          requirements = [...new Set(requirements)];
        }

        const files: Record<string, string> = {};
        for (const [filename, fileData] of Object.entries(parsedFiles)) {
          // Streamlit's multi-page router treats every .py file inside pages/ as a page.
          // Page Object Model files (Playwright, Selenium) live in pages/ but don't import
          // streamlit — mounting them causes "Page not found" errors in stlite.
          // Solution: only include pages/*.py files that actually import streamlit.
          if (/^pages\/[^/]+\.py$/.test(filename)) {
            const hasStreamlit = fileData.content.includes('import streamlit') || fileData.content.includes('from streamlit');
            if (!hasStreamlit) continue;
          }
          files[filename] = fileData.content;
        }

        return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Streamlit Preview</title>
    <script>
      // Patch History API: srcdoc iframes have origin=null, so absolute-URL pushState throws.
      // Silently swallow those errors so the app still renders.
      (function(){
        function wrap(fn){ return function(s,t,url){ try{ fn.call(history,s,t,url); }catch(e){} }; }
        history.pushState = wrap(history.pushState);
        history.replaceState = wrap(history.replaceState);
      })();
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@stlite/browser@1.6.1/build/stlite.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import { mount } from "https://cdn.jsdelivr.net/npm/@stlite/browser@1.6.1/build/stlite.js";
      window.addEventListener('error', function(event) {
        console.error("Streamlit Preview Error:", event.error);
        document.getElementById("root").innerHTML += '<div style="padding: 20px; color: red; font-family: sans-serif;">Global Error: ' + event.error?.message + '</div>';
      });
      window.addEventListener('unhandledrejection', function(event) {
        console.error("Streamlit Preview Unhandled Rejection:", event.reason);
        document.getElementById("root").innerHTML += '<div style="padding: 20px; color: red; font-family: sans-serif;">Unhandled Rejection: ' + event.reason?.message + '</div>';
      });
      try {
        mount(
          {
            requirements: ${JSON.stringify(requirements)},
            entrypoint: ${JSON.stringify(pyFile)},
            files: ${JSON.stringify(files)}
          },
          document.getElementById("root")
        );
      } catch (e) {
        console.error("Mount error:", e);
        document.getElementById("root").innerHTML = '<div style="padding: 20px; color: red; font-family: sans-serif;">Failed to load Streamlit preview: ' + e.message + '</div>';
      }
    </script>
  </body>
</html>`;
      }
    }

    return null;
  }, [parsedFiles, fileNames]);

  // Rich HTML dashboard for non-HTML/non-Streamlit projects (Java, Node, etc.)
  const richPreviewHtml = useMemo(() => {
    if (fileNames.length === 0) return null;

    // Get README or summarised prose
    const readmeKey = fileNames.find(k => k.toLowerCase() === 'readme.md');
    const mdFiles = fileNames.filter(k => k.toLowerCase().endsWith('.md') && k.toLowerCase() !== 'readme.md');
    // Strategy/playbook outputs have no README — combine all .md docs as preview content
    const readmeContent = readmeKey
      ? parsedFiles[readmeKey].content
      : mdFiles.length > 0
        ? mdFiles.map(k => parsedFiles[k].content).join('\n\n---\n\n')
        : '';
    // Detect if this is a strategy/playbook output (all files are .md)
    const isStrategy = fileNames.length > 0 && fileNames.every(k => k.toLowerCase().endsWith('.md'));

    // Build file tree list HTML
    const fileListHtml = fileNames
      .filter(k => k.toLowerCase() !== 'readme.md')
      .map(k => {
        const lang = parsedFiles[k].language;
        const lines = parsedFiles[k].content.split('\n').length;
        const ext = k.split('.').pop() || 'txt';
        const langColors: Record<string, string> = {
          java: '#f89820', python: '#3572A5', javascript: '#f1e05a', typescript: '#2b7489',
          xml: '#e34c26', yaml: '#cb171e', json: '#292929', bash: '#89e051', sh: '#89e051',
          sql: '#e38c00', html: '#e34c26', css: '#563d7c', go: '#00ADD8', kotlin: '#A97BFF',
          scala: '#DC322F', groovy: '#e69f56', txt: '#6b7280', text: '#6b7280',
        };
        const color = langColors[lang?.toLowerCase()] || langColors[ext?.toLowerCase()] || '#6b7280';
        const depth = k.split('/').length - 1;
        const name = k.split('/').pop();
        const parentPath = k.split('/').slice(0, -1).join('/');
        return `<div class="file-row" style="padding-left:${8 + depth * 16}px" title="${k}">
          <span class="dot" style="background:${color}"></span>
          <span class="fname">${name}</span>
          ${parentPath ? `<span class="fpath">${parentPath}/</span>` : ''}
          <span class="fmeta">${lines} lines</span>
        </div>`;
      }).join('');

    // Markdown -> HTML block processor with table, bold, italic, hr, and list support
    const md2html = (md: string): string => {
      if (!md) return '';
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const fmt = (s: string) => s
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

      // First pass: extract fenced code blocks and replace with placeholders
      const codeBlocks: string[] = [];
      const withPlaceholders = md.replace(/```([\w-]*)\r?\n([\s\S]*?)```/g, (_m, lang, code) => {
        const label = lang ? `<span class="code-lang">${esc(lang)}</span>` : '';
        const html = `<div class="code-block">${label}<pre><code>${esc(code.replace(/\n$/, ''))}</code></pre></div>`;
        codeBlocks.push(html);
        return `\x00CODE_BLOCK_${codeBlocks.length - 1}\x00`;
      });

      // Process block by block (split on blank lines)
      const blocks = withPlaceholders.split(/\n\s*\n/);
      const htmlBlocks = blocks.map(block => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        // Restore code block placeholders
        if (/^\x00CODE_BLOCK_\d+\x00$/.test(trimmed)) {
          const idx = parseInt(trimmed.replace(/\x00CODE_BLOCK_(\d+)\x00/, '$1'));
          return codeBlocks[idx];
        }
        const lines = trimmed.split('\n');
        // Horizontal rule
        if (lines.length === 1 && /^---+$/.test(lines[0].trim())) return '<hr>';
        // GFM table: first line has | and second line is |---|---| separator
        if (lines.length >= 2 && lines[0].includes('|') && /^\|[\s\-:|]+\|/.test(lines[1])) {
          const headers = lines[0].split('|').slice(1, -1).map(h => fmt(esc(h.trim())));
          const dataRows = lines.slice(2).map(row =>
            row.split('|').slice(1, -1).map(c => fmt(esc(c.trim())))
          );
          const thead = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
          const tbody = dataRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
          return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
        }
        // Line-level processing
        const processed = lines.map(line => {
          if (/^####\s/.test(line)) return `<h4>${fmt(esc(line.slice(5)))}</h4>`;
          if (/^###\s/.test(line)) return `<h3>${fmt(esc(line.slice(4)))}</h3>`;
          if (/^##\s/.test(line)) return `<h2>${fmt(esc(line.slice(3)))}</h2>`;
          if (/^#\s/.test(line)) return `<h1>${fmt(esc(line.slice(2)))}</h1>`;
          if (/^[-*]\s/.test(line)) return `<li>${fmt(esc(line.slice(2)))}</li>`;
          if (/^\d+\.\s/.test(line)) return `<li>${fmt(esc(line.replace(/^\d+\.\s/, '')))}</li>`;
          if (line.trim() === '') return '';
          // Restore any inline code block placeholders within paragraph text
          if (line.includes('\x00CODE_BLOCK_')) {
            const idx = parseInt(line.replace(/.*\x00CODE_BLOCK_(\d+)\x00.*/, '$1'));
            return codeBlocks[idx];
          }
          return `<p>${fmt(esc(line))}</p>`;
        });
        let joined = processed.filter(Boolean).join('\n');
        // Wrap consecutive <li> elements in <ul>
        joined = joined.replace(/(<li>.*?<\/li>\n?)+/gs, match => `<ul>${match}</ul>`);
        return joined;
      });
      return htmlBlocks.filter(Boolean).join('\n');
    };

    // Extension -> language label
    const extLabel: Record<string, string> = {
      java: 'Java', py: 'Python', ts: 'TypeScript', js: 'JavaScript', xml: 'XML',
      yaml: 'YAML', yml: 'YAML', json: 'JSON', sh: 'Shell', bash: 'Shell',
      sql: 'SQL', html: 'HTML', css: 'CSS', md: 'Markdown', txt: 'Text',
      go: 'Go', kt: 'Kotlin', scala: 'Scala', groovy: 'Groovy', gradle: 'Gradle',
    };
    const langCounts: Record<string, number> = {};
    fileNames.forEach(k => {
      const ext = k.split('.').pop()?.toLowerCase() || 'txt';
      const label = extLabel[ext] || ext.toUpperCase();
      langCounts[label] = (langCounts[label] || 0) + 1;
    });
    const langBadges = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => `<span class="badge">${lang} <em>${count}</em></span>`)
      .join('');

    const totalLines = fileNames.reduce((s, k) => s + parsedFiles[k].content.split('\n').length, 0);
    // HTML-escape project name before interpolating into template HTML (fix XSS)
    const rawName = readmeContent.match(/^#{1,2}\s(.+)/m)?.[1] || (isStrategy ? 'QA Strategy Playbook' : 'QA Framework');
    const projectName = rawName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const headerGradient = isStrategy
      ? 'linear-gradient(135deg, #d97706 0%, #92400e 100%)'
      : 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)';

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${projectName}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f8f9fb; color: #1e293b; line-height: 1.6; }
  .header { background: ${headerGradient}; color: white; padding: 32px 40px 28px; }
  .header h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px; }
  .header p { opacity: 0.85; font-size: 0.95rem; }
  .header-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 2px 10px;
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .stats { display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
  .stat { background: rgba(255,255,255,0.15); border-radius: 10px; padding: 10px 16px;
    text-align: center; backdrop-filter: blur(4px); }
  .stat .n { font-size: 1.5rem; font-weight: 700; }
  .stat .l { font-size: 0.75rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.5px; }
  .langs { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
  .badge { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
    color: white; border-radius: 20px; padding: 3px 10px; font-size: 0.78rem; }
  .badge em { font-style: normal; font-weight: 700; }
  .body { display: grid; grid-template-columns: 280px 1fr; gap: 0; min-height: calc(100vh - 240px); }
  .sidebar { background: white; border-right: 1px solid #e2e8f0; padding: 0; overflow-y: auto; }
  .sidebar-title { padding: 14px 16px; font-size: 0.7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;
    border-bottom: 1px solid #f1f5f9; background: #fafbfc; position: sticky; top: 0; }
  .file-row { display: flex; align-items: center; gap: 7px; padding: 7px 12px;
    font-size: 0.8rem; cursor: pointer; border-bottom: 1px solid #f8fafc;
    transition: background 0.15s; }
  .file-row:hover { background: #f0f7ff; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .fname { font-weight: 500; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
  .fpath { color: #94a3b8; font-size: 0.72rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
  .fmeta { color: #cbd5e1; font-size: 0.7rem; white-space: nowrap; margin-left: auto; }
  .content { padding: 32px 40px; overflow-y: auto; max-height: calc(100vh - 200px); }
  .content h1 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
  .content h2 { font-size: 1.15rem; font-weight: 600; color: #1e293b; margin: 24px 0 8px;
    padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; }
  .content h3 { font-size: 1rem; font-weight: 600; color: #334155; margin: 16px 0 6px; }
  .content h4 { font-size: 0.9rem; font-weight: 600; color: #475569; margin: 12px 0 4px; }
  .content p { color: #475569; margin-bottom: 12px; font-size: 0.9rem; }
  .content ul { padding-left: 20px; margin-bottom: 12px; }
  .content li { color: #475569; font-size: 0.9rem; margin-bottom: 4px; }
  .content code { background: #f1f5f9; color: #0f172a; border-radius: 4px;
    padding: 1px 6px; font-size: 0.82rem; font-family: 'SF Mono', Consolas, monospace; }
  .content strong { color: #1e293b; }
  .content hr { border: none; border-top: 2px solid #e2e8f0; margin: 28px 0; }
  .content table { width: 100%; border-collapse: collapse; margin: 16px 0 20px;
    font-size: 0.82rem; display: block; overflow-x: auto; }
  .content table thead th { background: #f1f5f9; font-weight: 600; color: #334155;
    padding: 9px 12px; text-align: left; border: 1px solid #e2e8f0; white-space: nowrap; }
  .content table tbody td { padding: 8px 12px; border: 1px solid #e2e8f0;
    color: #475569; vertical-align: top; }
  .content table tbody tr:nth-child(even) { background: #f8fafc; }
  .content table tbody tr:hover { background: #eff6ff; }
  .no-content { text-align: center; padding: 60px 20px; color: #94a3b8; }
  .no-content svg { margin-bottom: 16px; }
  .code-block { background: #0f172a; border-radius: 8px; margin: 16px 0; overflow: hidden; border: 1px solid #1e293b; }
  .code-lang { display: block; background: #1e293b; color: #64748b; font-size: 0.72rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.8px; padding: 5px 14px; font-family: 'SF Mono', Consolas, monospace; }
  .code-block pre { margin: 0; padding: 16px; overflow-x: auto; }
  .code-block code { color: #e2e8f0; font-family: 'SF Mono', Consolas, 'Courier New', monospace;
    font-size: 0.8rem; line-height: 1.6; white-space: pre; }
</style>
</head>
<body>
<div class="header">
  ${isStrategy ? '<div class="header-badge">📋 Strategy Playbook</div>' : ''}
  <h1>${projectName}</h1>
  <p>Generated by QA Studio AI &bull; ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</p>
  <div class="stats">
    <div class="stat"><div class="n">${fileNames.length}</div><div class="l">Documents</div></div>
    <div class="stat"><div class="n">${totalLines.toLocaleString()}</div><div class="l">Lines</div></div>
    <div class="stat"><div class="n">${Object.keys(langCounts).length}</div><div class="l">Formats</div></div>
  </div>
  <div class="langs">${langBadges}</div>
</div>
<div class="body">
  <div class="sidebar">
    <div class="sidebar-title">${isStrategy ? '📄 Strategy Files' : '🔍 Project Files'}</div>
    ${fileListHtml || '<div class="file-row"><span class="fpath">No files</span></div>'}
  </div>
  <div class="content">
    ${readmeContent
      ? md2html(readmeContent)
      : `<div class="no-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <p>No content found. View files in the Code tab.</p>
        </div>`
    }
  </div>
</div>
</body>
</html>`;
  }, [parsedFiles, fileNames]);

  useEffect(() => {
    if (fileNames.length > 0 && (!selectedFile || !parsedFiles[selectedFile])) {
      setSelectedFile(fileNames[0]);
    }
  }, [fileNames, selectedFile, parsedFiles]);

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToProjects(user.uid, setProjects);
      return unsubscribe;
    } else {
      setProjects([]);
    }
  }, [user]);

  // Reset domain selection whenever the user navigates to a different category.
  useEffect(() => { setSelectedDomain(null); }, [selectedTemplate]);

  useEffect(() => {
    if (activeProject) {
      const unsubscribe = subscribeToMessages(activeProject.id, setMessages);
      return unsubscribe;
    } else {
      setMessages([]);
    }
  }, [activeProject]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  useEffect(() => {
    const apply = (isDark: boolean) => document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('qa-theme', theme);
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches);
      const listener = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } else {
      apply(theme === 'dark');
    }
  }, [theme]);

  const openEnhancer = (template: Template, sub: SubTemplate) => {
    setEnhancerTemplate(template);
    setEnhancerSubTemplate(sub);
    setEnhancerPrompt(sub.prompt);
    setEnhancedPrompt('');
    setUseEnhanced(false);
    setEnhancerLevel('medium');
    setEnhancerIsChatInput(false);
    setEnhancerOutputType(sub.type === 'playbook' ? 'playbook' : 'framework');
    setEnhancerOpen(true);
  };

  const openHomeEnhancer = () => {
    if (!homePrompt.trim()) return;
    setEnhancerTemplate(null);
    setEnhancerSubTemplate(null);
    setEnhancerPrompt(homePrompt);
    setEnhancedPrompt('');
    setUseEnhanced(false);
    setEnhancerLevel('medium');
    setEnhancerIsChatInput(false);
    setEnhancerOpen(true);
  };

  const openChatEnhancer = () => {
    if (!input.trim()) return;
    setEnhancerTemplate(null);
    setEnhancerSubTemplate(null);
    setEnhancerPrompt(input);
    setEnhancedPrompt('');
    setUseEnhanced(false);
    setEnhancerLevel('medium');
    setEnhancerIsChatInput(true);
    setEnhancerOpen(true);
  };

  const handleEnhancePrompt = async () => {
    if (!enhancerPrompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    setEnhancedPrompt('');
    try {
      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;
      const resp = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({ prompt: enhancerPrompt, level: enhancerLevel }),
      });
      if (!resp.ok) throw new Error('Enhancement failed');
      const data = await resp.json();
      const enhanced = (data.enhanced || '').trim();
      setEnhancedPrompt(enhanced);
      setUseEnhanced(true);
    } catch (e) {
      console.error('Prompt enhancement failed', e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const runFromEnhancer = () => {
    const finalPrompt = useEnhanced && enhancedPrompt ? enhancedPrompt : enhancerPrompt;
    setEnhancerOpen(false);
    if (enhancerIsChatInput) {
      // Chat follow-up flow: put the (possibly enhanced) prompt in the input and send it
      setInput(finalPrompt);
      setTimeout(() => {
        handleSendMessage(finalPrompt);
        setInput('');
      }, 0);
    } else if (enhancerTemplate && enhancerSubTemplate) {
      // Override sub-template prompt with the (possibly enhanced) prompt
      const patchedSub = { ...enhancerSubTemplate, prompt: finalPrompt };
      handleCreateProject(enhancerTemplate, patchedSub, enhancerOutputType);
    } else {
      // Home prompt flow
      setHomePrompt(finalPrompt);
      // Small delay so state propagates, then run
      setTimeout(() => {
        handleCreateProjectWithHomePrompt(finalPrompt);
      }, 0);
    }
  };

  const handleCreateProjectWithHomePrompt = async (promptOverride?: string) => {
    const promptToUse = promptOverride ?? homePrompt;
    if (!user || (!promptToUse.trim() && attachments.length === 0)) return;
    const newProject: Omit<Project, 'id'> = {
      name: 'Custom Framework',
      description: 'Custom testing framework based on user prompt',
      prompt: promptToUse + (attachments.length > 0 ? `\n[Attached ${attachments.length} file(s)]` : ''),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: user.uid
    };
    const id = await createProject(newProject);
    if (id) {
      const projectWithId = { ...newProject, id };
      setActiveProject(projectWithId);
      setSelectedTemplate(null);
      handleSendMessage(promptToUse, projectWithId);
      setHomePrompt('');
    }
  };

  const handleCreateProject = async (template?: Template, subTemplate?: SubTemplate, outputType: 'framework' | 'playbook' = 'framework') => {
    if (!user) return;

    const newProject: Omit<Project, 'id'> = {
      name: subTemplate ? `New ${subTemplate.name}` : template ? `New ${template.name}` : 'New Testing Project',
      description: subTemplate ? subTemplate.description : template ? template.description : 'Custom testing framework',
      prompt: subTemplate ? subTemplate.prompt : '',
      templateId: template?.id,
      subTemplateId: subTemplate?.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: user.uid
    };

    const id = await createProject(newProject);
    if (id) {
      const projectWithId = { ...newProject, id };
      setActiveProject(projectWithId);
      setSelectedTemplate(null);
      if (subTemplate) {
        handleSendMessage(subTemplate.prompt, projectWithId, outputType);
      }
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    await deleteProject(projectToDelete.id);
    if (activeProject?.id === projectToDelete.id) {
      setActiveProject(null);
    }
    setProjectToDelete(null);
  };

  const startRename = (p: Project) => {
    setRenamingProjectId(p.id);
    setRenameValue(p.name);
    setTimeout(() => renameInputRef.current?.select(), 30);
  };

  const commitRename = async () => {
    const trimmed = renameValue.trim();
    if (trimmed && renamingProjectId) {
      await updateProject(renamingProjectId, { name: trimmed });
      if (activeProject?.id === renamingProjectId) {
        setActiveProject(prev => prev ? { ...prev, name: trimmed } : prev);
      }
    }
    setRenamingProjectId(null);
  };

  const cancelRename = () => setRenamingProjectId(null);

  const handleCreateProjectWithPrompt = async () => {
    handleCreateProjectWithHomePrompt();
  };

  const handleSendMessage = async (content: string, projectOverride?: Project, outputType: 'framework' | 'playbook' = 'framework') => {
    const project = projectOverride || activeProject;
    if (!project || (!content.trim() && attachments.length === 0) || isGenerating) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    pendingUserMsgIdRef.current = null;

    setIsGenerating(true);
    setSuggestions([]);
    setCheckpointMsgId(null);
    setRefinementQuestions([]);
    setRefinementAnswers({});
    setRefinementDismissed(false);
    const userMessage: Omit<Message, 'id'> = {
      role: 'user',
      content: content + (attachments.length > 0 ? `\n[Attached ${attachments.length} file(s)]` : ''),
      timestamp: Date.now()
    };

    try {
      const currentAttachments = [...attachments];
      const userMsgId = await addMessage(project.id, userMessage);
      pendingUserMsgIdRef.current = userMsgId ?? null;
      setInput('');
      setAttachments([]);

      // Automatically switch to a vision model if Groq is used with attachments
      let finalModel = selectedModel;
      if (provider === 'groq' && currentAttachments.length > 0 && !selectedModel.includes('vision')) {
        finalModel = 'llama-3.2-90b-vision-preview';
        setSelectedModel(finalModel);
      }

      // Pass the current messages as history (empty when projectOverride is set = new project)
      // Cap at 20 messages (10 exchanges) - older turns are included via server-side truncation
      const history = projectOverride ? [] : messages.slice(-20);
      const aiResponse = await generateTestingFramework(
        content, 
        project.description, 
        history,
        {
          provider,
          model: finalModel,
          temperature: temperature[0],
          apiKey: provider === 'groq' ? groqApiKey : undefined,
          projectSummary: project.contextSummary,
          signal: controller.signal,
          outputType,
        },
        currentAttachments
      );

      // Handle both return shapes: Google returns { text, suggestions }, Groq returns a plain string
      let responseText = typeof aiResponse === 'string' ? aiResponse : aiResponse?.text;
      const responseSuggestions = typeof aiResponse === 'object' && aiResponse?.suggestions ? aiResponse.suggestions : [];

      // Parse and strip the refinement questions block from the response
      const qMatch = responseText?.match(/<!--QA_QUESTIONS_START-->([\s\S]*?)<!--QA_QUESTIONS_END-->/);
      if (qMatch) {
        try {
          const parsed = JSON.parse(qMatch[1].trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRefinementQuestions(parsed);
            setRefinementAnswers({});
            setRefinementDismissed(false);
          }
        } catch { /* ignore malformed question block */ }
        responseText = responseText!.replace(qMatch[0], '').trim();
      }

      if (responseSuggestions.length > 0) setSuggestions(responseSuggestions);

      // Clear refinement questions when user starts a new follow-up manually
      if (messages.length >= 2) {
        setRefinementQuestions([]);
        setRefinementDismissed(false);
      }

      const assistantMessage: Omit<Message, 'id'> = {
        role: 'assistant',
        content: responseText || 'I encountered an error generating the framework.',
        timestamp: Date.now()
      };
      await addMessage(project.id, assistantMessage);

      // A: Extract compact project state and persist to Firestore (fire-and-forget, never blocks UI)
      if (responseText) {
        const newSummary = extractProjectSummary(responseText, project.contextSummary);
        if (newSummary) {
          // Optimistic local update so the very next turn reads the summary without waiting for Firestore
          setActiveProject(prev => prev?.id === project.id ? { ...prev, contextSummary: newSummary } : prev);
          updateProject(project.id, { contextSummary: newSummary }).catch(() => {});
        }
      }
    } catch (error) {
      const isAbort = (error as Error).name === 'AbortError';
      if (isAbort) {
        // Revert: delete the user message that was just saved so the conversation is unchanged
        if (pendingUserMsgIdRef.current && project) {
          await deleteMessage(project.id, pendingUserMsgIdRef.current).catch(() => {});
        }
      } else {
        console.error('Generation failed', error);
        const errorMessage: Omit<Message, 'id'> = {
          role: 'assistant',
          content: 'Failed to generate response. Please try again.',
          timestamp: Date.now()
        };
        await addMessage(project.id, errorMessage);
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
      pendingUserMsgIdRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleDownloadFramework = async () => {
    if (!messages.length) return;
    setIsDownloading(true);

    try {
      const zip = new JSZip();
      let fileCount = 0;

      // Iterate through all assistant messages to find code blocks
      messages.filter(m => m.role === 'assistant').forEach(msg => {
        const content = msg.content;
        // Regex to match markdown code blocks with optional filename comments
        // e.g., ```python
        // # filename: tests/test_login.py
        // ... code ...
        // ```
        const codeBlockRegex = /```(\w+)?\n(?:(?:#|\/\/|\/\*|<!--)\s*(?:filename|file|path):\s*([^\n]+)\n)?([\s\S]*?)```/g;
        
        let match;
        while ((match = codeBlockRegex.exec(content)) !== null) {
          const lang = match[1] || 'txt';
          let filename = match[2]?.trim();
          const code = match[3];

          // If no filename is provided in a comment, generate a generic one
          if (!filename) {
            fileCount++;
            filename = `file_${fileCount}.${lang}`;
          }

          // Add file to zip, handling nested paths automatically
          zip.file(filename, code);
        }
      });

      // Also add a README.md with the full conversation history
      let readmeContent = `# ${activeProject?.name || 'Testing Framework'}\n\n`;
      readmeContent += `Generated by QA Studio AI\n\n## Conversation History\n\n`;
      messages.forEach(m => {
        readmeContent += `### ${m.role === 'user' ? 'User' : 'QA Studio AI'}\n\n${m.content}\n\n---\n\n`;
      });
      zip.file('README.md', readmeContent);

      // Generate and download the zip
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${(activeProject?.name || 'framework').replace(/\s+/g, '_').toLowerCase()}.zip`);
    } catch (error) {
      console.error("Failed to generate zip file", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // ─── Shared colours / brand ────────────────────────────────────────────────
  const BRAND_DARK   = '1E3A5F'; // navy
  const BRAND_MID    = '2563EB'; // blue-600
  const BRAND_ACCENT = 'D97706'; // amber-600 (strategy / playbook)
  const BRAND_LIGHT  = 'EFF6FF'; // blue-50
  const STRIPE_EVEN  = 'F8FAFC';
  const STRIPE_ODD   = 'FFFFFF';
  const HEADER_TXT   = 'FFFFFF';
  const BODY_TXT     = '1E293B';
  const GRAY_BORDER  = 'E2E8F0';

  // Friendly display label from numbered filenames like "01_test_strategy.md"
  const fileLabel = (fname: string) =>
    fname.split('/').pop()
      ?.replace(/\.md$/, '')
      .replace(/^\d+_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    || fname;

  // ─── Markdown parser helpers ─────────────────────────────────────────────
  type MdBlock =
    | { kind: 'heading'; level: number; text: string }
    | { kind: 'table'; headers: string[]; rows: string[][] }
    | { kind: 'list'; items: string[] }
    | { kind: 'para'; text: string }
    | { kind: 'hr' };

  const parseMdBlocks = (md: string): MdBlock[] => {
    const blocks: MdBlock[] = [];
    const para: string[] = [];
    const flushPara = () => {
      if (para.length) { blocks.push({ kind: 'para', text: para.join(' ') }); para.length = 0; }
    };
    const rawGroups = md.split(/\n\s*\n/);
    rawGroups.forEach(group => {
      const lines = group.trim().split('\n');
      if (!lines.length || lines.every(l => !l.trim())) return;
      // HR
      if (lines.length === 1 && /^---+$/.test(lines[0].trim())) {
        flushPara(); blocks.push({ kind: 'hr' }); return;
      }
      // Heading
      const hm = lines[0].match(/^(#{1,4})\s+(.+)$/);
      if (hm && lines.length === 1) {
        flushPara(); blocks.push({ kind: 'heading', level: hm[1].length, text: hm[2].replace(/\*\*/g,'') }); return;
      }
      // multi-line with headings — split each line
      if (lines.some(l => /^#{1,4}\s/.test(l))) {
        flushPara();
        lines.forEach(line => {
          const hml = line.match(/^(#{1,4})\s+(.+)$/);
          if (hml) { blocks.push({ kind: 'heading', level: hml[1].length, text: hml[2].replace(/\*\*/g,'') }); return; }
          if (/^[-*]\s/.test(line)) { blocks.push({ kind: 'list', items: [line.slice(2).replace(/\*\*/g,'').trim()] }); return; }
          if (line.trim()) para.push(line.trim().replace(/\*\*/g,''));
        });
        flushPara(); return;
      }
      // GFM table
      if (lines.length >= 2 && lines[0].includes('|') && /^\|[\s\-:|]+\|/.test(lines[1])) {
        flushPara();
        const headers = lines[0].split('|').slice(1,-1).map(h => h.trim().replace(/\*\*/g,''));
        const rows = lines.slice(2).map(row => row.split('|').slice(1,-1).map(c => c.trim().replace(/\*\*/g,'')));
        blocks.push({ kind: 'table', headers, rows }); return;
      }
      // Bullet list
      if (lines.every(l => /^[-*]\s/.test(l.trim()) || !l.trim())) {
        flushPara();
        blocks.push({ kind: 'list', items: lines.filter(l => l.trim()).map(l => l.replace(/^[-*]\s/,'').replace(/\*\*/g,'').trim()) });
        return;
      }
      // Mixed list
      if (lines.some(l => /^[-*]\s/.test(l.trim()))) {
        flushPara();
        lines.forEach(line => {
          if (/^[-*]\s/.test(line.trim())) {
            blocks.push({ kind: 'list', items: [line.replace(/^[-*]\s/,'').replace(/\*\*/g,'').trim()] });
          } else if (line.trim()) para.push(line.trim().replace(/\*\*/g,''));
        });
        flushPara(); return;
      }
      // Paragraph
      para.push(lines.join(' ').replace(/\*\*/g,''));
    });
    flushPara();
    return blocks;
  };

  // Strip markdown bold/italic/code for plain text
  const stripMd = (s: string) => s.replace(/\*\*(.+?)\*\*/g,'$1').replace(/\*(.+?)\*/g,'$1').replace(/`([^`]+)`/g,'$1').trim();

  // ─── Excel download (ExcelJS) ────────────────────────────────────────────
  const handleDownloadExcel = async () => {
    const mdFiles = fileNames.filter(k => k.toLowerCase().endsWith('.md'));
    if (!mdFiles.length) return;

    const wb = new ExcelJS.Workbook();
    wb.creator = 'QA Studio AI';
    wb.created = new Date();
    const projectTitle = activeProject?.name || 'QA Strategy';
    const dateStr = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

    // ── Cover sheet ──────────────────────────────────────────────────────────
    const cover = wb.addWorksheet('Cover');
    cover.pageSetup = { fitToPage: true, fitToWidth: 1, orientation: 'portrait' };
    cover.columns = [{ width: 4 }, { width: 60 }, { width: 20 }];

    const addCoverRow = (vals: (string|number|null)[], heights?: number) => {
      const r = cover.addRow(vals);
      if (heights) r.height = heights;
      return r;
    };

    // Spacer rows
    for (let i = 0; i < 4; i++) addCoverRow([null], 8);

    // Title
    const titleRow = addCoverRow([null, projectTitle], 48);
    titleRow.getCell(2).font = { bold: true, size: 28, color: { argb: 'FF' + BRAND_DARK }, name: 'Calibri' };
    titleRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

    // Subtitle
    const subRow = addCoverRow([null, 'QA Strategy Playbook'], 28);
    subRow.getCell(2).font = { size: 16, color: { argb: 'FF' + BRAND_MID }, italic: true, name: 'Calibri' };

    addCoverRow([null], 12);

    // Date & generator
    ([[`Generated: ${dateStr}`, BRAND_ACCENT],['Generated by QA Studio AI', '64748B']] as [string,string][]).forEach(([txt, col]) => {
      const r = addCoverRow([null, txt], 20);
      r.getCell(2).font = { size: 11, color: { argb: 'FF' + col }, name: 'Calibri' };
    });

    addCoverRow([null], 16);

    // Accent bar (B column, large row)
    const accentRow = addCoverRow(['', ''], 8);
    accentRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_ACCENT } };

    addCoverRow([null], 16);

    // Document index
    const idxTitle = addCoverRow([null, 'DOCUMENTS INCLUDED'], 22);
    idxTitle.getCell(2).font = { bold: true, size: 9, color: { argb: 'FF' + BRAND_DARK }, name: 'Calibri' };
    idxTitle.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_LIGHT } };

    mdFiles.forEach((fname, idx) => {
      const label = fileLabel(fname);
      const r = addCoverRow([null, `${idx+1}.  ${label}`], 18);
      r.getCell(2).font = { size: 10, color: { argb: 'FF' + BRAND_MID }, name: 'Calibri' };
      r.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx%2===0 ? 'FF'+BRAND_LIGHT : 'FFFFFFFF' } };
    });

    // ── One sheet per .md file ────────────────────────────────────────────────
    mdFiles.forEach(fname => {
      const label = fileLabel(fname);
      const raw = parsedFiles[fname].content;
      const blocks = parseMdBlocks(raw);

      // Determine the widest table in this sheet to set column count
      const maxTableCols = blocks
        .filter(b => b.kind === 'table')
        .reduce((m, b) => Math.max(m, (b as {kind:'table';headers:string[];rows:string[][]}).headers.length), 6);
      const totalCols = Math.max(maxTableCols, 6); // minimum 6 data cols (+ col A = spacer)

      const ws = wb.addWorksheet(label.slice(0, 31));
      ws.pageSetup = { fitToPage: true, fitToWidth: 1, orientation: 'landscape', paperSize: 9 };

      // Col A = narrow spacer; remaining cols split evenly; narrow cols for ID/status fields
      const idCols = new Set([0]); // relative col index 0 = TC ID / Req ID etc.
      const narrowCols = new Set([totalCols - 1, totalCols - 2]); // last 2 cols (Status, Priority)
      const colDefs: Partial<ExcelJS.Column>[] = [{ width: 2 }]; // spacer A
      for (let i = 0; i < totalCols; i++) {
        if (idCols.has(i)) colDefs.push({ width: 12 });
        else if (narrowCols.has(i)) colDefs.push({ width: 16 });
        else colDefs.push({ width: 32 });
      }
      ws.columns = colDefs;
      const lastDataCol = totalCols + 1; // 1-based, accounting for spacer col A

      const mergeFullRow = (rowNum: number) =>
        ws.mergeCells(rowNum, 2, rowNum, lastDataCol);

      // Sheet title banner
      const bannerRow = ws.addRow(['', label.toUpperCase()]);
      bannerRow.height = 32;
      bannerRow.getCell(2).font = { bold: true, size: 14, color: { argb: 'FF' + HEADER_TXT }, name: 'Calibri' };
      bannerRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_DARK } };
      bannerRow.getCell(2).alignment = { vertical: 'middle' };
      mergeFullRow(bannerRow.number);

      // Subtitle line
      const subtitleRow = ws.addRow(['', `${projectTitle} · ${dateStr}`]);
      subtitleRow.height = 18;
      subtitleRow.getCell(2).font = { size: 9, italic: true, color: { argb: 'FF' + '94A3B8' }, name: 'Calibri' };
      subtitleRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_LIGHT } };
      mergeFullRow(subtitleRow.number);

      ws.addRow([]); // spacer

      blocks.forEach(block => {
        if (block.kind === 'heading') {
          ws.addRow([]); // spacer
          const lvl = block.level;
          const hRow = ws.addRow(['', block.text]);
          if (lvl === 1) {
            hRow.height = 26;
            hRow.getCell(2).font = { bold: true, size: 13, color: { argb: 'FF' + BRAND_DARK }, name: 'Calibri' };
            hRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_LIGHT } };
            hRow.getCell(2).border = { bottom: { style: 'medium', color: { argb: 'FF' + BRAND_MID } } };
          } else if (lvl === 2) {
            hRow.height = 22;
            hRow.getCell(2).font = { bold: true, size: 11, color: { argb: 'FF' + BRAND_MID }, name: 'Calibri' };
            hRow.getCell(2).border = { bottom: { style: 'thin', color: { argb: 'FF' + GRAY_BORDER } } };
          } else {
            hRow.height = 18;
            hRow.getCell(2).font = { bold: true, size: 10, color: { argb: 'FF' + BRAND_ACCENT }, name: 'Calibri' };
          }
          mergeFullRow(hRow.number);

        } else if (block.kind === 'table') {
          ws.addRow([]); // spacer before table
          const colCount = Math.max(block.headers.length, ...block.rows.map(r => r.length));
          const startCol = 2;
          const endCol = startCol + colCount - 1;

          // Header row
          const hdrRow = ws.addRow(['', ...block.headers]);
          hdrRow.height = 24;
          for (let c = startCol; c <= endCol; c++) {
            const cell = hdrRow.getCell(c);
            cell.font = { bold: true, size: 9, color: { argb: 'FF' + HEADER_TXT }, name: 'Calibri' };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_DARK } };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.border = {
              top: { style: 'thin', color: { argb: 'FF' + BRAND_MID } },
              bottom: { style: 'thin', color: { argb: 'FF' + BRAND_MID } },
              left: { style: 'thin', color: { argb: 'FF' + GRAY_BORDER } },
              right: { style: 'thin', color: { argb: 'FF' + GRAY_BORDER } },
            };
          }

          // Data rows
          block.rows.forEach((row, ri) => {
            const paddedRow = [...row];
            while (paddedRow.length < colCount) paddedRow.push('');
            const dRow = ws.addRow(['', ...paddedRow]);
            dRow.height = 20;
            const fillColor = ri % 2 === 0 ? STRIPE_EVEN : STRIPE_ODD;
            for (let c = startCol; c < startCol + colCount; c++) {
              const cell = dRow.getCell(c);
              cell.font = { size: 9, color: { argb: 'FF' + BODY_TXT }, name: 'Calibri' };
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + fillColor } };
              cell.alignment = { vertical: 'top', wrapText: true };
              cell.border = {
                top:    { style: 'hair',  color: { argb: 'FF' + GRAY_BORDER } },
                bottom: { style: 'hair',  color: { argb: 'FF' + GRAY_BORDER } },
                left:   { style: 'thin',  color: { argb: 'FF' + GRAY_BORDER } },
                right:  { style: 'thin',  color: { argb: 'FF' + GRAY_BORDER } },
              };
            }
          });

          // Accent bottom border under last data row
          const lastDRow = ws.lastRow;
          if (lastDRow) {
            for (let c = startCol; c < startCol + colCount; c++) {
              lastDRow.getCell(c).border = {
                ...lastDRow.getCell(c).border,
                bottom: { style: 'medium', color: { argb: 'FF' + BRAND_MID } },
              };
            }
          }
          ws.addRow([]); // spacer after table

        } else if (block.kind === 'list') {
          block.items.forEach(item => {
            const lRow = ws.addRow(['', `• ${item}`]);
            lRow.height = 16;
            lRow.getCell(2).font = { size: 9.5, color: { argb: 'FF' + BODY_TXT }, name: 'Calibri' };
            lRow.getCell(2).alignment = { wrapText: true };
            mergeFullRow(lRow.number);
          });
        } else if (block.kind === 'para') {
          const pRow = ws.addRow(['', stripMd(block.text)]);
          pRow.height = 16;
          pRow.getCell(2).font = { size: 9.5, color: { argb: 'FF' + '475569' }, name: 'Calibri' };
          pRow.getCell(2).alignment = { wrapText: true };
          mergeFullRow(pRow.number);
        } else if (block.kind === 'hr') {
          const hrRow = ws.addRow([]);
          hrRow.height = 4;
          for (let c = 2; c <= lastDataCol; c++) {
            hrRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + GRAY_BORDER } };
          }
        }
      });

      // Footer row
      const footerRow = ws.addRow(['', '']);
      footerRow.height = 20;
      footerRow.getCell(2).value = `QA Studio AI  ·  ${projectTitle}  ·  Generated ${dateStr}`;
      footerRow.getCell(2).font = { size: 8, italic: true, color: { argb: 'FF' + '94A3B8' }, name: 'Calibri' };
      footerRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BRAND_LIGHT } };
      mergeFullRow(footerRow.number);
    });

    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `${(projectTitle).replace(/\s+/g,'_').toLowerCase()}.xlsx`);
  };

  // ─── PowerPoint download (PptxGenJS) ────────────────────────────────────
  const handleDownloadPptx = async () => {
    const mdFiles = fileNames.filter(k => k.toLowerCase().endsWith('.md'));
    if (!mdFiles.length) return;

    const pptx = new PptxGenJS();
    const projectTitle = activeProject?.name || 'QA Strategy';
    const dateStr = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    pptx.defineLayout({ name: 'WIDESCREEN', width: 10, height: 5.625 });
    pptx.layout = 'WIDESCREEN';

    // ── Master colours (no # prefix — PptxGenJS wants bare hex) ──
    const C_DARK   = '1E3A5F';
    const C_MID    = '2563EB';
    const C_AMBER  = 'D97706';
    const C_LIGHT  = 'EFF6FF';
    const C_WHITE  = 'FFFFFF';

    let slideNum = 0;

    // Shared: left accent bar helper
    const addAccentBar = (slide: ReturnType<PptxGenJS['addSlide']>, color = C_MID) =>
      slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color }, line: { type: 'none' } });

    // Shared: footer helper (shows current slide number only)
    const addFooter = (slide: ReturnType<PptxGenJS['addSlide']>, pageNum: number) => {
      slide.addShape(pptx.ShapeType.rect, { x: 0, y: 5.3, w: 10, h: 0.325, fill: { color: C_DARK }, line: { type: 'none' } });
      slide.addText([
        { text: 'QA Studio AI  ', options: { bold: true, color: C_WHITE } },
        { text: `·  ${projectTitle}  ·  ${dateStr}`, options: { color: 'A0AEC0' } },
      ], { x: 0.35, y: 5.32, w: 8, h: 0.28, fontSize: 7.5, fontFace: 'Calibri' });
      slide.addText(`Slide ${pageNum}`, {
        x: 8.5, y: 5.32, w: 1.4, h: 0.28, fontSize: 7.5, fontFace: 'Calibri',
        color: 'A0AEC0', align: 'right',
      });
    };

    // Build agenda items from file names
    const agendaItems = mdFiles.map((fname, idx) => ({
      idx: idx + 1,
      label: fileLabel(fname),
      fname,
      blocks: parseMdBlocks(parsedFiles[fname].content),
    }));

    // ── Slide 1: Title ──────────────────────────────────────────────────────
    slideNum++;
    const titleSlide = pptx.addSlide();
    titleSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C_DARK }, line: { type: 'none' } });
    titleSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.35, h: 5.625, fill: { color: C_AMBER }, line: { type: 'none' } });
    titleSlide.addText('QA STUDIO', { x: 0.6, y: 0.3, w: 9, h: 0.4, fontSize: 9, fontFace: 'Calibri', bold: true, color: '3B5A8A', charSpacing: 6 });
    titleSlide.addText(projectTitle, { x: 0.6, y: 1.2, w: 8.8, h: 1.5, fontSize: 34, fontFace: 'Calibri', bold: true, color: C_WHITE, wrap: true, valign: 'middle' });
    titleSlide.addText('QA Strategy Playbook', { x: 0.6, y: 2.8, w: 8, h: 0.5, fontSize: 16, fontFace: 'Calibri', color: C_AMBER, italic: true });
    titleSlide.addText(`Generated by QA Studio AI  ·  ${dateStr}`, { x: 0.6, y: 3.5, w: 8, h: 0.35, fontSize: 10, fontFace: 'Calibri', color: '7090B0' });
    titleSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 5.1, w: 10, h: 0.525, fill: { color: C_MID }, line: { type: 'none' } });
    titleSlide.addText('CONFIDENTIAL — GENERATED FOR LEADERSHIP REVIEW', { x: 0.6, y: 5.14, w: 9, h: 0.4, fontSize: 7.5, fontFace: 'Calibri', bold: true, color: 'CBD5E1', charSpacing: 3 });

    // ── Slide 2: Agenda ─────────────────────────────────────────────────────
    slideNum++;
    const agendaSlide = pptx.addSlide();
    addAccentBar(agendaSlide, C_AMBER);
    agendaSlide.addText('Agenda', { x: 0.45, y: 0.28, w: 9.1, h: 0.6, fontSize: 24, fontFace: 'Calibri', bold: true, color: C_DARK });
    agendaSlide.addShape(pptx.ShapeType.rect, { x: 0.45, y: 0.88, w: 9.1, h: 0.04, fill: { color: C_AMBER }, line: { type: 'none' } });
    const agendaRows: PptxGenJS.TableRow[] = agendaItems.map(item => ([
      { text: String(item.idx).padStart(2, '0'), options: { bold: true, fontSize: 13, color: C_MID, align: 'center' as const, fill: { color: C_LIGHT }, margin: [4,4,4,4] as [number,number,number,number] } },
      { text: item.label, options: { fontSize: 11, color: C_DARK, bold: false, margin: [6,8,6,8] as [number,number,number,number] } },
    ]));
    agendaSlide.addTable(agendaRows, { x: 0.45, y: 1.05, w: 9.1, colW: [0.8, 8.3], border: { type: 'solid', pt: 0.5, color: 'E2E8F0' }, rowH: 0.42 });
    addFooter(agendaSlide, slideNum);

    // ── Content slides per .md file — fully overflow-aware ──────────────────
    const CONTENT_TOP = 1.05; // y-start for content area (below header)
    const MAX_Y       = 5.1;  // bottom boundary (footer starts at 5.3)
    const ROW_H       = 0.265;
    const HDR_H       = 0.32;

    for (const item of agendaItems) {
      // Section divider slide
      slideNum++;
      const divSlide = pptx.addSlide();
      divSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C_LIGHT }, line: { type: 'none' } });
      divSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.5, h: 5.625, fill: { color: C_AMBER }, line: { type: 'none' } });
      divSlide.addShape(pptx.ShapeType.rect, { x: 0, y: 4.7, w: 10, h: 0.925, fill: { color: C_DARK }, line: { type: 'none' } });
      divSlide.addText(String(item.idx).padStart(2, '0'), { x: 1.2, y: 0.5, w: 2, h: 1.5, fontSize: 80, fontFace: 'Calibri', bold: true, color: 'D1E4FF' });
      divSlide.addText(item.label, { x: 1.2, y: 2.1, w: 8.4, h: 1.2, fontSize: 26, fontFace: 'Calibri', bold: true, color: C_DARK, wrap: true });
      addFooter(divSlide, slideNum);

      // ── Content flow: all blocks for this file, creating new slides as needed ──
      let yPos = CONTENT_TOP;
      let isCont = false;

      // Helper: create a new content slide (first or continuation)
      const newContentSlide = () => {
        slideNum++;
        const s = pptx.addSlide();
        addAccentBar(s, C_MID);
        s.addText(item.label.toUpperCase(), { x: 0.35, y: 0.13, w: 9.3, h: 0.25, fontSize: 7, fontFace: 'Calibri', color: 'A0AEC0', bold: true, charSpacing: 2 });
        s.addText(item.label + (isCont ? '  (continued)' : ''), {
          x: 0.35, y: 0.35, w: 9.3, h: 0.5,
          fontSize: isCont ? 14 : 18, fontFace: 'Calibri', bold: true, color: C_DARK, wrap: true, italic: isCont,
        });
        s.addShape(pptx.ShapeType.rect, { x: 0.35, y: 0.85, w: 9.3, h: 0.03, fill: { color: C_MID }, line: { type: 'none' } });
        addFooter(s, slideNum);
        yPos = CONTENT_TOP;
        isCont = true;
        return s;
      };

      let slide = newContentSlide();
      isCont = true; // subsequent calls are continuations

      for (const block of item.blocks) {

        // ── H1/H2/H3/H4 headings ──────────────────────────────────────────
        if (block.kind === 'heading') {
          const blockH = block.level === 1 ? 0.56 : block.level === 2 ? 0.44 : 0.36;
          if (yPos + blockH > MAX_Y) { slide = newContentSlide(); }
          if (block.level === 1) {
            // H1: navy background band
            slide.addShape(pptx.ShapeType.rect, { x: 0.35, y: yPos, w: 9.3, h: blockH, fill: { color: C_DARK }, line: { type: 'none' } });
            slide.addText(block.text, { x: 0.55, y: yPos + 0.08, w: 9.0, h: blockH - 0.1, fontSize: 13, fontFace: 'Calibri', bold: true, color: C_WHITE, wrap: true, valign: 'middle' });
          } else if (block.level === 2) {
            slide.addText(block.text, { x: 0.35, y: yPos, w: 9.3, h: blockH, fontSize: 12, fontFace: 'Calibri', bold: true, color: C_MID, wrap: true });
          } else {
            slide.addText(block.text, { x: 0.35, y: yPos, w: 9.3, h: blockH, fontSize: 10.5, fontFace: 'Calibri', bold: true, color: C_AMBER, wrap: true });
          }
          yPos += blockH + 0.07;

        // ── Tables — render in row-batches, overflowing to new slides ──────
        } else if (block.kind === 'table') {
          if (block.headers.length === 0) continue;
          const colW = 9.3 / block.headers.length;
          const colWArr = Array(block.headers.length).fill(colW);
          let rowsLeft = [...block.rows];
          let firstChunk = true;

          while (rowsLeft.length > 0 || firstChunk) {
            firstChunk = false;
            const availH = MAX_Y - yPos - 0.1;
            if (availH < HDR_H + ROW_H) { slide = newContentSlide(); continue; }
            const maxRows = Math.max(1, Math.floor((availH - HDR_H) / ROW_H));
            const batch = rowsLeft.splice(0, maxRows);
            const tblRows: PptxGenJS.TableRow[] = [
              block.headers.map(h => ({
                text: h,
                options: { bold: true, fontSize: 8, color: C_WHITE, fill: { color: C_DARK }, align: 'center' as const, margin: [3,4,3,4] as [number,number,number,number] },
              })),
              ...batch.map((row, ri) => row.map(cell => ({
                text: cell,
                options: { fontSize: 7.5, color: C_DARK, fill: { color: ri % 2 === 0 ? C_LIGHT : C_WHITE }, margin: [3,4,3,4] as [number,number,number,number] },
              }))),
            ];
            const tableH = HDR_H + batch.length * ROW_H;
            slide.addTable(tblRows, { x: 0.35, y: yPos, w: 9.3, colW: colWArr, border: { type: 'solid', pt: 0.5, color: 'E2E8F0' }, rowH: ROW_H });
            yPos += tableH + 0.12;
            if (rowsLeft.length > 0) { slide = newContentSlide(); }
          }

        // ── Lists — render in item-batches, overflowing to new slides ───────
        } else if (block.kind === 'list') {
          const ITEM_H = 0.28;
          let itemsLeft = [...block.items];
          while (itemsLeft.length > 0) {
            const availH = MAX_Y - yPos - 0.08;
            if (availH < ITEM_H) { slide = newContentSlide(); continue; }
            const maxItems = Math.max(1, Math.floor(availH / ITEM_H));
            const batch = itemsLeft.splice(0, maxItems);
            const bullets: PptxGenJS.TextProps[] = batch.flatMap((itm, i) => [
              ...(i > 0 ? [{ text: '\n', options: {} }] : []),
              { text: `• ${stripMd(itm)}`, options: { fontSize: 9.5, color: C_DARK } },
            ]);
            slide.addText(bullets, { x: 0.5, y: yPos, w: 9.1, h: batch.length * ITEM_H, fontFace: 'Calibri', valign: 'top', wrap: true });
            yPos += batch.length * ITEM_H + 0.08;
            if (itemsLeft.length > 0) { slide = newContentSlide(); }
          }

        // ── Paragraphs — break to new slide if needed ────────────────────
        } else if (block.kind === 'para') {
          const text = stripMd(block.text);
          if (!text) continue;
          const LINE_H = 0.22;
          const CHARS_PER_LINE = 130;
          const estimatedLines = Math.max(1, Math.ceil(text.length / CHARS_PER_LINE));
          const neededH = Math.min(estimatedLines * LINE_H + 0.08, 3.5); // cap at 3.5" per block
          if (yPos + Math.min(neededH, LINE_H * 2) > MAX_Y) { slide = newContentSlide(); }
          const availH = MAX_Y - yPos - 0.05;
          if (availH < LINE_H) { slide = newContentSlide(); }
          const renderH = Math.min(neededH, MAX_Y - yPos - 0.05);
          slide.addText(text, { x: 0.35, y: yPos, w: 9.3, h: renderH, fontSize: 9.5, fontFace: 'Calibri', color: '475569', wrap: true });
          yPos += renderH + 0.1;

        // ── HR ────────────────────────────────────────────────────────────
        } else if (block.kind === 'hr') {
          if (yPos + 0.2 > MAX_Y) { slide = newContentSlide(); }
          slide.addShape(pptx.ShapeType.rect, { x: 0.35, y: yPos + 0.06, w: 9.3, h: 0.03, fill: { color: 'E2E8F0' }, line: { type: 'none' } });
          yPos += 0.2;
        }
      }
    }

    await pptx.writeFile({ fileName: `${projectTitle.replace(/\s+/g, '_').toLowerCase()}.pptx` });
  };

  // ── PDF: open print-ready preview in new tab → browser saves as PDF ────────
  const handleDownloadPdf = () => {
    if (!richPreviewHtml) return;
    const isStrategy = fileNames.length > 0 && fileNames.every(k => k.toLowerCase().endsWith('.md'));
    const printHtml = richPreviewHtml
      .replace('</style>', `
  /* ── Print / PDF overrides ── */
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { background: #f8f9fb !important; }
    .sidebar { display: none !important; }
    .body { display: block !important; }
    .content { max-height: none !important; overflow: visible !important; height: auto !important; padding: 24px 40px !important; }
    .header { background: ${isStrategy
        ? 'linear-gradient(135deg, #d97706 0%, #92400e 100%)'
        : 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)'} !important; -webkit-print-color-adjust: exact !important; }
    .content table { display: table !important; page-break-inside: auto; }
    .content table tr { page-break-inside: avoid; page-break-after: auto; }
    .content h1, .content h2 { page-break-after: avoid; }
    @page { size: A4; margin: 12mm 10mm; }
  }
</style>`)
      .replace('</body>', '<script>window.addEventListener("load",function(){window.print();window.addEventListener("afterprint",function(){window.close();});});<\/script></body>');
    const blob = new Blob([printHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (w) { setTimeout(() => URL.revokeObjectURL(url), 60000); }
  };

  // Show Excel/PPT/PDF download buttons when any .md files exist in current output
  const hasMdFiles = fileNames.length > 0 && fileNames.every(k => k.toLowerCase().endsWith('.md'));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--qa-bg)]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--qa-bg)] text-white p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layout className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">QA Studio</h1>
            <p className="text-gray-400">The AI-powered command center for software testing architects.</p>
          </div>
          <Button 
            onClick={login}
            size="lg"
            className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-6 text-lg rounded-xl"
          >
            Sign in with Google
          </Button>
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--qa-bg)] text-gray-100 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className={`hidden flex-col w-72 border-r border-gray-800 bg-[var(--qa-surface)] shrink-0 ${isLeftPanelOpen ? 'md:flex' : ''}`}>
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => { setActiveProject(null); setSelectedTemplate(null); }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title="Go to home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">QA Studio</span>
          </button>
          <button
            onClick={() => setIsLeftPanelOpen(false)}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-800"
            title="Collapse navigation"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 mb-4">
          <Button 
            onClick={() => { setActiveProject(null); setSelectedTemplate(null); }}
            className="w-full justify-start gap-2 bg-gray-800/70 hover:bg-gray-700/70 text-white border border-gray-700/50 hover:border-gray-600/60"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1 py-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-[0.13em] mb-2 px-2">History</div>
            {(historyExpanded ? projects : projects.slice(0, 3)).map((p) => (
              <div key={p.id} className="flex items-center group justify-between">
                {renamingProjectId === p.id ? (
                  <div className="flex items-center flex-1 min-w-0 gap-1 px-2 py-1">
                    <input
                      ref={renameInputRef}
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') cancelRename(); }}
                      onBlur={commitRename}
                      className="flex-1 min-w-0 bg-gray-800 border border-blue-500/60 rounded-md px-2 py-1 text-sm text-white outline-none"
                      maxLength={100}
                      autoFocus
                    />
                    <button onClick={commitRename} className="text-green-400 hover:text-green-300 p-1">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={cancelRename} className="text-gray-500 hover:text-gray-300 p-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveProject(p)}
                      onDoubleClick={() => startRename(p)}
                      className={`flex-1 min-w-0 text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        activeProject?.id === p.id ? 'bg-blue-600/15 text-blue-400 font-medium border-l-2 border-l-blue-500 pl-[10px]' : 'hover:bg-gray-800/80 text-gray-400 pl-3'
                      }`}
                    >
                      <History className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{p.name}</span>
                    </button>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); startRename(p); }}
                        className="p-1.5 text-gray-500 hover:text-blue-400"
                        title="Rename project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setProjectToDelete(p); }}
                        className="p-1.5 text-gray-500 hover:text-red-400"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {projects.length > 3 && (
              <button
                onClick={() => setHistoryExpanded(prev => !prev)}
                className="w-full flex items-center justify-center gap-1.5 mt-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                {historyExpanded ? (
                  <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                ) : (
                  <><ChevronDown className="w-3.5 h-3.5" /> {projects.length - 3} more projects</>
                )}
              </button>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-800 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarImage src={user.photoURL || ''} />
              <AvatarFallback><UserIcon className="w-4 h-4" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <button onClick={logout} className="text-gray-500 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--qa-surface)] border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-blue-500" />
          <span className="font-bold">QA Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <Settings2 className="w-5 h-5" />
          </Button>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg w-9 h-9 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-[var(--qa-surface)] border-r border-gray-800 text-white p-0">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-xl">QA Studio</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}><X className="w-5 h-5" /></Button>
                </div>
                <Button onClick={() => { setActiveProject(null); setSelectedTemplate(null); setIsSidebarOpen(false); }} className="w-full justify-start gap-2 mb-4 bg-gray-800">
                  <Plus className="w-4 h-4" /> New Project
                </Button>
                <ScrollArea className="flex-1">
                  {(historyExpanded ? projects : projects.slice(0, 3)).map((p) => (
                    <div key={p.id} className="flex items-center group mb-1 justify-between">
                      {renamingProjectId === p.id ? (
                        <div className="flex items-center flex-1 min-w-0 gap-1 px-1 py-1">
                          <input
                            ref={renameInputRef}
                            value={renameValue}
                            onChange={e => setRenameValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') cancelRename(); }}
                            onBlur={commitRename}
                            className="flex-1 min-w-0 bg-gray-800 border border-blue-500/60 rounded-md px-2 py-1 text-sm text-white outline-none"
                            maxLength={100}
                            autoFocus
                          />
                          <button onClick={commitRename} className="text-green-400 p-1"><Check className="w-3.5 h-3.5" /></button>
                          <button onClick={cancelRename} className="text-gray-500 p-1"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => { setActiveProject(p); setIsSidebarOpen(false); }}
                            onDoubleClick={() => startRename(p)}
                            className={`flex-1 min-w-0 truncate text-left px-3 py-2 rounded-lg text-sm ${activeProject?.id === p.id ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400'}`}
                          >
                            {p.name}
                          </button>
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); startRename(p); }} className="p-1.5 text-gray-500 hover:text-blue-400">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setProjectToDelete(p); }} className="p-1.5 text-gray-500 hover:text-red-400">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {projects.length > 3 && (
                    <button
                      onClick={() => setHistoryExpanded(prev => !prev)}
                      className="w-full flex items-center justify-center gap-1.5 mt-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/60 rounded-lg transition-colors"
                    >
                      {historyExpanded ? (
                        <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                      ) : (
                        <><ChevronDown className="w-3.5 h-3.5" /> {projects.length - 3} more projects</>
                      )}
                    </button>
                  )}
                </ScrollArea>
                <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
                  <Avatar className="w-8 h-8"><AvatarImage src={user.photoURL || ''} /></Avatar>
                  <div className="flex-1 min-w-0"><p className="text-sm truncate">{user.displayName}</p></div>
                  <button onClick={logout}><LogOut className="w-4 h-4" /></button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pt-14 md:pt-0 min-h-0 min-w-0">
        {/* Left panel open button - shown only when sidebar is collapsed */}
        {!isLeftPanelOpen && !activeProject && (
          <button
            onClick={() => setIsLeftPanelOpen(true)}
            className="hidden md:flex absolute top-4 left-4 z-20 items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
            title="Open navigation"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}
        {/* Settings gear - home screen only */}
        {!activeProject && (
          <div className="absolute top-4 right-4 z-20 hidden md:block">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                isSettingsOpen ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
              }`}
              title="Run Settings"
            >
              <Settings2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {!activeProject ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
            <div className="max-w-5xl w-full mx-auto py-10">
              {!selectedTemplate ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 w-full"
                >
                  <div className="space-y-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                      What are we testing today?
                    </h2>
                    <p className="text-gray-400 text-lg">Describe your testing requirements or select a template below.</p>
                  </div>

                  {/* New Prompt Input Area */}
                  <div className="max-w-3xl mx-auto w-full mt-8 relative rounded-3xl border border-gray-800 bg-[var(--qa-card)] p-2 focus-within:border-blue-500/40 focus-within:shadow-blue-500/10 focus-within:shadow-xl transition-all shadow-lg shadow-black/20">
                    {attachments.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 flex flex-wrap gap-2 p-2 bg-[var(--qa-card-alt)] border border-gray-800 rounded-xl w-full">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg text-sm">
                            <span className="truncate max-w-[150px] text-gray-200">{file.name}</span>
                            <button onClick={() => removeAttachment(index)} className="text-gray-400 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      multiple 
                      onChange={handleFileSelect} 
                    />
                    <Textarea
                      value={homePrompt}
                      onChange={(e) => setHomePrompt(e.target.value)}
                      onPaste={handlePaste}
                      placeholder="Start typing a prompt to see what our models can do"
                      className="w-full bg-transparent border-none focus-visible:ring-0 min-h-[100px] resize-none text-gray-200 placeholder:text-gray-500 text-lg p-4"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCreateProjectWithPrompt();
                        }
                      }}
                    />
                    <div className="flex items-center justify-between p-2 mt-2">
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800 rounded-full gap-2 px-4 h-10">
                              <Plus className="w-4 h-4" />
                            </Button>}>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48 bg-[var(--qa-card-alt)] border-gray-800 text-gray-200">
                            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                              <HardDrive className="w-4 h-4" /> Drive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                              <Upload className="w-4 h-4" /> Upload Files
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                              <Camera className="w-4 h-4" /> Camera
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Enhance prompt with AI"
                          disabled={!homePrompt.trim()}
                          onClick={openHomeEnhancer}
                          className="text-purple-400 border-purple-500/30 hover:text-purple-200 hover:bg-purple-500/10 hover:border-purple-400/60 rounded-full gap-2 px-4 h-10 transition-colors"
                        >
                          <Sparkles className="w-4 h-4" /> Enhance
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800 rounded-full gap-2 px-4 h-10">
                          <Layout className="w-4 h-4" /> Tools
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full w-10 h-10 bg-gray-800/50">
                          <Mic className="w-5 h-5" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full w-10 h-10 bg-gray-800/50" />}>
                              <Plus className="w-5 h-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 bg-[var(--qa-card-alt)] border-gray-800 text-gray-200 rounded-xl shadow-xl p-2">
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <Database className="w-4 h-4" /> Drive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <Upload className="w-4 h-4" /> Upload files
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <Mic className="w-4 h-4" /> Record Audio
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <Camera className="w-4 h-4" /> Camera
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <Video className="w-4 h-4" /> YouTube Video
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800 rounded-lg p-3">
                              <ImageIcon className="w-4 h-4" /> Sample Media
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Button 
                          onClick={handleCreateProjectWithPrompt}
                          disabled={(!homePrompt.trim() && attachments.length === 0) || isGenerating}
                          className="bg-white text-black hover:bg-gray-100 rounded-full px-6 h-10 font-semibold gap-2 ml-2 shadow-sm"
                        >
                          Run <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Collection tabs */}
                  <div className="flex gap-2 w-full mt-12 overflow-x-auto pb-1 scrollbar-hide">
                    {COLLECTIONS.map((col) => (
                      <button
                        key={String(col.id)}
                        onClick={() => setActiveCollection(col.id)}
                        className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                          activeCollection === col.id
                            ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                            : 'bg-[var(--qa-card)] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
                        }`}
                      >
                        <span>{col.emoji}</span>
                        {col.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
                    {TEMPLATES.filter((t) => activeCollection === null || t.collection === activeCollection).map((t) => {
                      const Icon = IconMap[t.icon];
                      return (
                        <Card 
                          key={t.id}
                          className="bg-[var(--qa-card)] border-gray-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group h-full flex flex-col"
                          onClick={() => setSelectedTemplate(t)}
                        >
                          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:shadow-md group-hover:shadow-blue-500/20 transition-all duration-200 shrink-0">
                              <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
                            </div>
                            <div className="text-left">
                              <CardTitle className="text-lg text-white">{t.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <CardDescription className="text-gray-500">{t.description}</CardDescription>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-[0.65rem] text-gray-600">{t.domains.length} domains</span>
                              <span className="text-xs font-medium text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {t.subTemplates.filter(s => s.type !== 'playbook').length > 0 && (
                                  <>{t.subTemplates.filter(s => s.type !== 'playbook').length} frameworks <ChevronRight className="w-3 h-3" /></>
                                )}
                                {t.subTemplates.filter(s => s.type !== 'playbook').length === 0 && (
                                  <>{t.subTemplates.length} playbooks <ChevronRight className="w-3 h-3" /></>
                                )}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-center mt-12">
                    <Button variant="outline" className="bg-transparent border-gray-800 text-gray-400 hover:text-white" onClick={() => handleCreateProject()}>
                      Skip and create custom project
                    </Button>
                  </div>

                  {/* Recent Projects Section */}
                  {projects.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full mt-20 space-y-6"
                    >
                      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                        <History className="w-6 h-6 text-blue-500" />
                        <h3 className="text-2xl font-semibold text-white">Recent Projects</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.slice(0, 6).map(p => (
                          <Card 
                            key={p.id}
                            className="bg-[var(--qa-card)] border-gray-800 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                            onClick={() => setActiveProject(p)}
                          >
                            <CardHeader>
                              <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                                <span className="truncate">{p.name}</span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </CardTitle>
                              <CardDescription className="text-gray-500 mt-2 line-clamp-2">{p.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 w-full"
                >
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-white -ml-4 mb-4"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to categories
                  </Button>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {React.createElement(IconMap[selectedTemplate.icon], { className: "w-8 h-8 text-blue-500" })}
                      <h2 className="text-3xl font-bold tracking-tight text-white">
                        {selectedTemplate.name}
                      </h2>
                    </div>
                    <p className="text-gray-400 text-lg">{selectedTemplate.description}</p>
                  </div>

                  {/* Two-column layout: sub-templates (left) + domain panel (right) */}
                  <div className="flex gap-6 w-full mt-8 items-start">

                    <div className="flex-1 space-y-6">
                      {/* Framework sub-template cards */}
                      {(() => {
                        const frameworkSubs = selectedTemplate.subTemplates.filter(s => s.type !== 'playbook');
                        const playbookSubs = selectedTemplate.subTemplates.filter(s => s.type === 'playbook');
                        return (
                          <>
                            {frameworkSubs.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {frameworkSubs.map((sub) => (
                                  <Card
                                    key={sub.id}
                                    className="bg-[var(--qa-card)] border-gray-800 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                                    onClick={() => {
                                      const domainSuffix = selectedDomain
                                        ? `\n\nTarget Industry Domain: ${selectedDomain}. Tailor all test data, business rules, naming conventions, sample entities, and technical context specifically to this domain.`
                                        : '';
                                      openEnhancer(selectedTemplate, { ...sub, prompt: sub.prompt + domainSuffix });
                                    }}
                                  >
                                    {selectedDomain && (
                                      <div className="px-4 pt-3 pb-0">
                                        <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5 bg-emerald-500/10">
                                          <CheckCircle2 className="w-3 h-3" /> {selectedDomain}
                                        </span>
                                      </div>
                                    )}
                                    <CardHeader>
                                      <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                                        {sub.name}
                                        <span className="flex items-center gap-1 text-[0.65rem] font-normal text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity border border-purple-500/30 rounded-full px-2 py-0.5 bg-purple-500/10">
                                          <Sparkles className="w-3 h-3" /> Enhance
                                        </span>
                                      </CardTitle>
                                      <CardDescription className="text-gray-500 mt-2">{sub.description}</CardDescription>
                                    </CardHeader>
                                  </Card>
                                ))}
                              </div>
                            )}

                            {/* Playbook sub-template section */}
                            {playbookSubs.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 pt-2">
                                  <FileText className="w-4 h-4 text-amber-400" />
                                  <span className="text-sm font-semibold text-amber-300">Strategy Playbooks</span>
                                  <span className="text-[0.65rem] text-gray-600 ml-1">Generate planning documents, checklists & test strategies</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {playbookSubs.map((sub) => (
                                    <Card
                                      key={sub.id}
                                      className="bg-[var(--qa-card)] border-gray-800 hover:border-amber-500/40 hover:shadow-md hover:shadow-amber-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                                      onClick={() => {
                                        const domainSuffix = selectedDomain
                                          ? `\n\nTarget Industry Domain: ${selectedDomain}. Tailor all content, examples, and context specifically to this domain.`
                                          : '';
                                        openEnhancer(selectedTemplate, { ...sub, prompt: sub.prompt + domainSuffix });
                                      }}
                                    >
                                      <CardHeader>
                                        <CardTitle className="text-lg text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                                          {sub.name}
                                          <span className="flex items-center gap-1 text-[0.65rem] font-normal text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity border border-amber-500/30 rounded-full px-2 py-0.5 bg-amber-500/10">
                                            <FileText className="w-3 h-3" /> Playbook
                                          </span>
                                        </CardTitle>
                                        <CardDescription className="text-gray-500 mt-2">{sub.description}</CardDescription>
                                      </CardHeader>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    {/* Domain selector panel */}
                    <div className="w-56 shrink-0 sticky top-4">
                      <div className="bg-[var(--qa-card)] border border-gray-800 rounded-2xl p-4 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Domain</p>
                          <p className="text-[0.65rem] text-gray-600 mt-0.5">Pick an industry to get domain-specific tests</p>
                        </div>
                        <div className="space-y-1.5">
                          <button
                            onClick={() => setSelectedDomain(null)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedDomain === null
                                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            🌐 General (All Domains)
                          </button>
                          {selectedTemplate.domains.map((domain) => (
                            <button
                              key={domain}
                              onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedDomain === domain
                                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium'
                                  : 'text-gray-500 hover:text-white hover:bg-gray-800'
                              }`}
                            >
                              {domain}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Project Header */}
            <header className="h-16 border-b border-gray-800/60 flex items-center justify-between px-4 bg-[var(--qa-surface)]/80 backdrop-blur-xl sticky top-0 z-20 shrink-0 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                {!isLeftPanelOpen && (
                  <button
                    onClick={() => setIsLeftPanelOpen(true)}
                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors shrink-0"
                    title="Open navigation"
                  >
                    <PanelLeftOpen className="w-4 h-4" />
                  </button>
                )}
                <h2 className="font-bold text-lg truncate tracking-tight">{activeProject.name}</h2>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 shrink-0">
                  {activeProject.templateId ? TEMPLATES.find(t => t.id === activeProject.templateId)?.category.toUpperCase() : 'CUSTOM'}
                </Badge>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-700 hover:bg-gray-800 gap-2"
                  onClick={handleDownloadFramework}
                  disabled={isDownloading || messages.length === 0}
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download Code
                </Button>
                {hasMdFiles && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-amber-700/50 hover:bg-amber-900/20 text-amber-400 gap-2"
                    onClick={handleDownloadExcel}
                    disabled={messages.length === 0}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Download Excel
                  </Button>
                )}
                {hasMdFiles && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-orange-700/50 hover:bg-orange-900/20 text-orange-400 gap-2"
                    onClick={handleDownloadPptx}
                    disabled={messages.length === 0}
                  >
                    <Layers className="w-4 h-4" />
                    Download PPT
                  </Button>
                )}
                {hasMdFiles && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-red-700/50 hover:bg-red-900/20 text-red-400 gap-2"
                    onClick={handleDownloadPdf}
                    disabled={messages.length === 0}
                  >
                    <FileDown className="w-4 h-4" />
                    Download PDF
                  </Button>
                )}
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700 hover:bg-gray-800 gap-2">
                  <Github className="w-4 h-4" />
                  Deploy to GitHub
                </Button>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-colors ml-1 ${
                    isSettingsOpen ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                  }`}
                  title="Run Settings"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </header>

            <ResizablePanelGroup orientation="horizontal" className="flex-1 overflow-hidden relative">
              {/* Chat Area */}
              <ResizablePanel defaultSize={messages.length > 0 ? 50 : 100} minSize={30} className="flex flex-col relative">
                <div className="flex-1 overflow-y-auto p-6 pb-40" ref={scrollRef}>
                  <div className="max-w-4xl mx-auto space-y-8">
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-full flex items-center justify-center border border-blue-500/20">
                          <Play className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">Ready to build</h3>
                          <p className="text-gray-500 max-w-sm">Describe your testing requirements or use the prompt below to generate your framework.</p>
                        </div>
                      </div>
                    )}
                    {messages.map((m, idx) => {
                      const isLastAssistant = m.role === 'assistant' && messages.slice(idx + 1).every(mm => mm.role !== 'assistant');
                      const isActiveCheckpoint = checkpointMsgId === m.id;
                      const showCheckpointBtn = m.role === 'assistant' && !isLastAssistant;
                      return (
                      <div key={m.id} className={`flex gap-4 ${m.role === 'assistant' ? `bg-[var(--qa-card)] p-6 rounded-2xl border border-gray-800 border-l-2 ${isActiveCheckpoint ? 'border-l-amber-500/70' : 'border-l-blue-500/30'}` : 'py-2'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === 'assistant' ? 'bg-blue-600 shadow-md shadow-blue-500/25' : 'bg-gray-700'}`}>
                          {m.role === 'assistant' ? <Layout className="w-5 h-5 text-white" /> : <UserIcon className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 space-y-2 overflow-hidden">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {m.role === 'assistant' ? 'QA Studio AI' : 'You'}
                            </p>
                            {showCheckpointBtn && (
                              <button
                                title={isActiveCheckpoint ? 'Return to latest code' : 'View code at this checkpoint'}
                                onClick={() => setCheckpointMsgId(isActiveCheckpoint ? null : m.id)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-medium border transition-colors shrink-0 ${isActiveCheckpoint ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 hover:bg-amber-500/25' : 'bg-[var(--qa-surface)] border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500'}`}
                              >
                                {isActiveCheckpoint ? <RotateCcw className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {isActiveCheckpoint ? 'Active checkpoint' : 'Checkpoint'}
                              </button>
                            )}
                          </div>
                          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed break-words overflow-hidden" style={{fontSize:'0.8rem'}}>
                            <ReactMarkdown
                              components={{
                                code({node, inline, className, children, ...props}: any) {
                                  const match = /language-(\w+)/.exec(className || '');
                                  const codeString = String(children).replace(/\n$/, '');
                                  const filenameMatch = codeString.match(/^(?:\/\/|#)\s*filename:\s*([^\n]+)\n/);
                                  
                                  if (!inline && filenameMatch) {
                                    const filename = filenameMatch[1].trim();
                                    return (
                                      <div className="rounded-xl overflow-hidden my-4 border border-gray-800 bg-[var(--qa-surface)] p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                          <FileCode className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-gray-200 truncate">Generated: {filename}</p>
                                          <p className="text-xs text-gray-500">View in Code panel</p>
                                        </div>
                                      </div>
                                    );
                                  }
                                  
                                  return !inline && match ? (
                                    <div className="rounded-xl overflow-hidden my-4 border border-gray-800">
                                      <div className="bg-[var(--qa-surface)] px-4 py-2 text-xs text-gray-500 flex justify-between items-center border-b border-gray-800">
                                        <span>{match[1]}</span>
                                      </div>
                                      <div className="p-4 bg-[var(--qa-card)] overflow-x-auto">
                                        <code className={className} {...props}>
                                          {children}
                                        </code>
                                      </div>
                                    </div>
                                  ) : (
                                    <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300" style={{fontSize:'0.75rem'}} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              }}
                            >
                              {m.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                    {/* Refinement questions — shown after first-turn response as radio-button cards */}
                    {!isGenerating && !refinementDismissed && refinementQuestions.length > 0 && (
                      <div className="rounded-2xl border border-blue-500/25 bg-blue-500/5 p-5 space-y-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-blue-300">🎯 Refine your framework</p>
                            <p className="text-xs text-gray-400 mt-0.5">Answer a few quick questions to get a more tailored result. Skip any you don't need.</p>
                          </div>
                          <button onClick={() => { setRefinementDismissed(true); setRefinementQuestions([]); }} className="text-gray-500 hover:text-gray-300 text-xs shrink-0 mt-0.5">✕ Skip all</button>
                        </div>
                        <div className="space-y-4">
                          {refinementQuestions.map((q) => (
                            <div key={q.id} className="space-y-2">
                              <p className="text-xs font-medium text-gray-200">{q.question}</p>
                              <div className="flex flex-wrap gap-2">
                                {q.options.map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => setRefinementAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                      refinementAnswers[q.id] === opt
                                        ? 'bg-blue-600 border-blue-500 text-white'
                                        : 'bg-[var(--qa-surface)] border-gray-700 text-gray-300 hover:border-blue-500/50 hover:text-blue-200'
                                    }`}
                                  >
                                    {refinementAnswers[q.id] === opt ? '● ' : '○ '}{opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            disabled={Object.keys(refinementAnswers).length === 0}
                            onClick={() => {
                              const answered = refinementQuestions.filter(q => refinementAnswers[q.id]);
                              const answersText = answered.map(q => `- ${q.question}: **${refinementAnswers[q.id]}**`).join('\n');
                              const refinePrompt = `Based on my answers to the refinement questions:\n${answersText}\n\nPlease update and enhance the generated framework to reflect these requirements.`;
                              setRefinementQuestions([]);
                              setRefinementAnswers({});
                              setRefinementDismissed(true);
                              handleSendMessage(refinePrompt);
                            }}
                            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
                          >
                            Apply & Regenerate
                          </button>
                          <button
                            onClick={() => { setRefinementDismissed(true); setRefinementQuestions([]); }}
                            className="px-4 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500 text-xs font-medium transition-colors"
                          >
                            Skip
                          </button>
                          <span className="text-xs text-gray-600">{Object.keys(refinementAnswers).length}/{refinementQuestions.length} answered</span>
                        </div>
                      </div>
                    )}
                    {/* Suggestion chips - shown after last AI response, hidden while generating */}
                    {!isGenerating && suggestions.length > 0 && (
                      <div className="flex flex-col gap-2 pt-1 pb-2">
                        <p className="text-[0.7rem] font-semibold text-gray-500 uppercase tracking-wider px-1">Suggested next steps</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => setInput(s)}
                              className="text-[0.75rem] px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/60 transition-colors text-left"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {isGenerating && (
                      <div className="flex gap-4 bg-[var(--qa-card)] p-6 rounded-2xl border border-gray-800 animate-pulse">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-800 rounded w-full"></div>
                            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-800 rounded w-4/6"></div>
                          </div>
                        </div>
                        <button
                          onClick={handleStopGeneration}
                          className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600/20 hover:border-red-400/60 text-xs font-medium transition-colors shrink-0"
                          title="Stop generation and revert"
                        >
                          <StopCircle className="w-3.5 h-3.5" />
                          Stop
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--qa-bg)] via-[var(--qa-bg)] to-transparent">
                  <div className="max-w-4xl mx-auto relative">
                    {attachments.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 flex flex-wrap gap-2 p-2 bg-[var(--qa-card-alt)] border border-gray-800 rounded-xl w-full">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg text-sm">
                            <span className="truncate max-w-[150px] text-gray-200">{file.name}</span>
                            <button onClick={() => removeAttachment(index)} className="text-gray-400 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      multiple 
                      onChange={handleFileSelect} 
                    />
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onPaste={handlePaste}
                      placeholder="Ask for specific testing requirements (e.g., 'Add API validation for the user profile endpoint')"
                      className="w-full bg-[var(--qa-card-alt)] border-gray-800 focus-visible:border-blue-500/60 focus-visible:ring-2 focus-visible:ring-blue-500/15 min-h-[100px] pr-28 py-4 rounded-2xl resize-none text-gray-200 placeholder:text-gray-600 text-[0.8rem] placeholder:text-[0.8rem]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(input);
                        }
                      }}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl">
                            <Plus className="w-5 h-5" />
                          </Button>}>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-[var(--qa-card-alt)] border-gray-800 text-gray-200">
                          <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                            <HardDrive className="w-4 h-4" /> Drive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="w-4 h-4" /> Upload Files
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={() => fileInputRef.current?.click()}>
                            <Camera className="w-4 h-4" /> Camera
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!input.trim() || isGenerating}
                        onClick={openChatEnhancer}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl px-2.5 gap-1.5 text-xs font-medium disabled:opacity-30"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Enhance
                      </Button>
                      <Button 
                        size="icon" 
                        className={isGenerating
                          ? "bg-red-600 hover:bg-red-500 rounded-xl shadow-sm shadow-red-500/30"
                          : "bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shadow-blue-500/30"
                        }
                        disabled={!isGenerating && (!input.trim() && attachments.length === 0)}
                        onClick={isGenerating ? handleStopGeneration : () => handleSendMessage(input)}
                      >
                        {isGenerating ? <StopCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-gray-600 mt-3">
                    QA Studio AI can make mistakes. Verify critical test code before deployment.
                  </p>
                </div>
              </ResizablePanel>

              {/* Right Pane */}
              {messages.length > 0 && (
                <>
                  <ResizableHandle withHandle className="bg-gray-800" />
                  <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col bg-[var(--qa-surface)]">
                    {/* Toggle Header */}
                    <div className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-[var(--qa-bg)] shrink-0">
                      <div className="flex items-center bg-[var(--qa-card)] p-1 rounded-lg border border-gray-800">
                        <button
                          onClick={() => setRightPaneMode('preview')}
                          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${rightPaneMode === 'preview' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => setRightPaneMode('code')}
                          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${rightPaneMode === 'code' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                          Code
                        </button>
                      </div>
                      {/* Viewport controls - only shown in preview mode */}
                      {rightPaneMode === 'preview' && htmlPreviewFile && (
                        <div className="flex items-center gap-1">
                          <div className="flex items-center bg-[var(--qa-card)] p-1 rounded-lg border border-gray-800 mr-2">
                            <button
                              title="Desktop"
                              onClick={() => setPreviewViewport('desktop')}
                              className={`p-1.5 rounded-md transition-colors ${previewViewport === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                            >
                              <Monitor className="w-4 h-4" />
                            </button>
                            <button
                              title="Tablet"
                              onClick={() => setPreviewViewport('tablet')}
                              className={`p-1.5 rounded-md transition-colors ${previewViewport === 'tablet' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                            >
                              <Tablet className="w-4 h-4" />
                            </button>
                            <button
                              title="Mobile"
                              onClick={() => setPreviewViewport('mobile')}
                              className={`p-1.5 rounded-md transition-colors ${previewViewport === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                            >
                              <Smartphone className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            title="Fullscreen"
                            onClick={() => setIsPreviewFullscreen(true)}
                            className="p-1.5 rounded-md bg-[var(--qa-card)] border border-gray-800 text-gray-500 hover:text-white transition-colors"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Checkpoint banner */}
                    {checkpointMsgId && (
                      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/30 shrink-0">
                        <div className="flex items-center gap-2 text-amber-400 text-xs">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Showing code at selected checkpoint — not the latest</span>
                        </div>
                        <button
                          onClick={() => setCheckpointMsgId(null)}
                          className="flex items-center gap-1 text-[0.65rem] font-medium text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-full transition-colors shrink-0"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Return to latest
                        </button>
                      </div>
                    )}

                  {rightPaneMode === 'code' ? (
                    <div className="flex-1 flex min-h-0">
                      {fileNames.length > 0 ? (
                        <>
                          <div className="w-1/3 min-w-[140px] max-w-[256px] border-r border-gray-800 bg-[var(--qa-bg)] flex flex-col shrink-0">
                            <div className="p-3 border-b border-gray-800 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Explorer
                            </div>
                            <ScrollArea className="flex-1 py-2">
                              <FileTree 
                                tree={fileTree} 
                                selectedFile={selectedFile} 
                                onSelectFile={setSelectedFile} 
                              />
                            </ScrollArea>
                          </div>
                          <div className="flex-1 overflow-auto p-6 bg-[var(--qa-bg)] flex flex-col">
                            {selectedFile && parsedFiles[selectedFile] ? (
                              <>
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800 shrink-0 min-w-0 gap-4">
                                  <div className="flex items-center gap-2 text-gray-300 min-w-0">
                                    <FileCode className="w-5 h-5 text-blue-400 shrink-0" />
                                    <span className="font-medium truncate">{selectedFile}</span>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="bg-[var(--qa-card)] border-gray-800 text-gray-300 hover:text-white gap-2 shrink-0"
                                    onClick={() => {
                                      const blob = new Blob([parsedFiles[selectedFile].content], { type: 'text/plain;charset=utf-8' });
                                      saveAs(blob, selectedFile.split('/').pop() || 'file.txt');
                                    }}
                                  >
                                    <Download className="w-4 h-4" />
                                    Download File
                                  </Button>
                                </div>
                                <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                                  <ReactMarkdown
                                    components={{
                                      pre: ({ node, ...props }) => <pre className="p-4 bg-[var(--qa-card)] rounded-xl border border-gray-800 overflow-auto text-sm font-mono m-0" {...props} />,
                                      code: ({ node, inline, className, children, ...props }: any) => {
                                        return <code className={className} {...props}>{children}</code>;
                                      }
                                    }}
                                  >
                                    {`\`\`\`${parsedFiles[selectedFile].language}\n${parsedFiles[selectedFile].content}\n\`\`\``}
                                  </ReactMarkdown>
                                </div>
                              </>
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-500">
                                <div className="text-center space-y-4">
                                  <FileCode className="w-12 h-12 mx-auto text-gray-700" />
                                  <p>Select a file to view its contents.</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                          <div className="text-center space-y-4">
                            <Code2 className="w-12 h-12 mx-auto text-gray-700" />
                            <p>No code files generated yet.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col bg-[var(--qa-card-alt)] overflow-hidden">
                      {htmlPreviewFile ? (
                        <div className="flex-1 flex items-start justify-center overflow-auto p-4">
                          <div
                            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 h-full"
                            style={{
                              width: previewViewport === 'mobile' ? '390px' : previewViewport === 'tablet' ? '768px' : '100%',
                              minHeight: '100%',
                              flexShrink: 0,
                            }}
                          >
                            <iframe
                              srcDoc={htmlPreviewFile}
                              className="w-full h-full border-none bg-white"
                              style={{ minHeight: '600px' }}
                              title="Preview"
                              sandbox="allow-scripts allow-forms allow-downloads"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-start justify-center overflow-auto p-4">
                          <div
                            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 h-full"
                            style={{
                              width: previewViewport === 'mobile' ? '390px' : previewViewport === 'tablet' ? '768px' : '100%',
                              minHeight: '100%',
                              flexShrink: 0,
                            }}
                          >
                            <iframe
                              srcDoc={richPreviewHtml || '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;color:#94a3b8;padding:40px;text-align:center"><div><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg><p>No preview available. Switch to Code tab to view generated files.</p></div></div>'}
                              className="w-full h-full border-none bg-white"
                              style={{ minHeight: '600px' }}
                              title="Preview"
                              sandbox="allow-scripts allow-forms allow-downloads"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </>
        )}
      </main>

      {/* Right Sidebar (Run Settings) - slides in from right */}
      <AnimatePresence>
      {isSettingsOpen && (
        <motion.aside
          key="run-settings"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-80 bg-[var(--qa-surface)] border-l border-gray-800 flex flex-col overflow-y-auto fixed right-0 top-0 bottom-0 z-50 shadow-2xl"
        >
          <div className="p-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-[var(--qa-surface)]/95 backdrop-blur-sm z-10">
            <span className="font-semibold text-sm uppercase tracking-[0.1em] text-gray-400">Run settings</span>
            <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Theme Selector */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Theme</Label>
              <div className="flex items-center bg-[var(--qa-card)] p-1 rounded-lg border border-gray-800 gap-1">
                {([
                  { value: 'light', icon: Sun, label: 'Light' },
                  { value: 'system', icon: Monitor, label: 'System' },
                  { value: 'dark', icon: Moon, label: 'Dark' },
                ] as const).map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      theme === value ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                    }`}
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Provider</Label>
              <Select value={provider} onValueChange={(v: 'google' | 'groq' | null) => {
                if (!v) return;
                setProvider(v);
                setSelectedModel(v === 'google' ? 'gemini-3.1-pro-preview' : 'llama-3.3-70b-versatile');
              }}>
                <SelectTrigger className="w-full bg-[var(--qa-card)] border-gray-800">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--qa-card-alt)] border-gray-800 text-white">
                  <SelectItem value="google">Google (Gemini)</SelectItem>
                  <SelectItem value="groq">Groq (Llama/Mixtral)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</Label>
              <Select value={selectedModel} onValueChange={(v: string | null) => { if (v) setSelectedModel(v); }}>
                <SelectTrigger className="w-full bg-[var(--qa-card)] border-gray-800">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--qa-card-alt)] border-gray-800 text-white">
                  {provider === 'google' ? (
                    <>
                      <SelectItem value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Preview)</SelectItem>
                      <SelectItem value="gemini-3-flash-preview">Gemini 3 Flash (Preview)</SelectItem>
                      <SelectItem value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash-Lite (Preview)</SelectItem>
                      <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                      <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                      <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="llama-3.3-70b-versatile">Llama 3.3 70B (128K)</SelectItem>
                      <SelectItem value="llama-3.1-70b-versatile">Llama 3.1 70B (128K)</SelectItem>
                      <SelectItem value="llama-3.1-8b-instant">Llama 3.1 8B Instant (128K)</SelectItem>
                      <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B (32K)</SelectItem>
                      <SelectItem value="llama-3.2-90b-vision-preview">Llama 3.2 90B Vision</SelectItem>
                      <SelectItem value="llama-3.2-11b-vision-preview">Llama 3.2 11B Vision</SelectItem>
                      <SelectItem value="groq/compound">Groq Compound (8K — limited)</SelectItem>
                      <SelectItem value="groq/compound-mini">Groq Compound Mini (8K — limited)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {provider === 'google' 
                  ? "Google's most capable models for complex tasks." 
                  : "Fast inference models hosted on Groq LPU."}
              </p>
            </div>

            {provider === 'groq' && (
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-3 h-3" /> Groq API Key
                </Label>
                <Input 
                  type="password" 
                  placeholder="gsk_..." 
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                  className="bg-[var(--qa-card)] border-gray-800 text-white"
                />
                <p className="text-xs text-gray-500">
                  Required to use Groq models. Keys are stored locally in your browser.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Temperature</Label>
                <span className="text-xs bg-[var(--qa-card)] px-2 py-1 rounded border border-gray-800">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={(val) => setTemperature(val as number[])}
                max={2}
                step={0.1}
                className="[&_[role=slider]]:bg-blue-500"
              />
              <p className="text-xs text-gray-500">
                Higher values make output more random, lower values make it more focused and deterministic.
              </p>
            </div>
          </div>
        </motion.aside>
      )}
      </AnimatePresence>

      {/* Prompt Enhancer Dialog */}
      <Dialog open={enhancerOpen} onOpenChange={(open) => { if (!open && !isEnhancing) setEnhancerOpen(false); }}>
        <DialogContent className="bg-[var(--qa-card)] border-gray-800 text-white !max-w-[45vw] w-full max-h-[81vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-purple-400" />
              {enhancerIsChatInput ? 'Enhance Message' : 'Prompt Enhancer'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {enhancerIsChatInput
                ? 'Refine your follow-up message before sending it'
                : enhancerSubTemplate
                  ? `Enhancing: ${enhancerSubTemplate.name}`
                  : 'Enhance your custom prompt for a more comprehensive framework'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2 overflow-y-auto flex-1 pr-1">
            {/* Original prompt */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                Original Prompt
              </label>
              <Textarea
                value={enhancerPrompt}
                onChange={(e) => setEnhancerPrompt(e.target.value)}
                className="bg-[var(--qa-surface)] border-gray-700 text-gray-200 min-h-[70px] resize-none text-sm focus-visible:ring-1 focus-visible:ring-blue-500/50"
                placeholder="Describe your testing requirements…"
              />
            </div>

            {/* Enhancement level selector + Enhance button */}
            <div className="flex flex-col items-center gap-3">
              {/* Level toggle */}
              <div className="flex items-center gap-1 bg-[var(--qa-surface)] rounded-full border border-gray-700 p-0.5">
                {([
                  { value: 'low',    label: 'Low',    desc: 'Minor polish' },
                  { value: 'medium', label: 'Medium', desc: 'Solid spec' },
                  { value: 'high',   label: 'High',   desc: 'Full spec' },
                ] as const).map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setEnhancerLevel(value)}
                    title={desc}
                    className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      enhancerLevel === value
                        ? value === 'high'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-700 text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {value === 'high' && <Sparkles className="w-3 h-3" />}
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[0.65rem] text-gray-500">
                {enhancerLevel === 'low' && 'Cleans up the prompt and adds the most important missing details.'}
                {enhancerLevel === 'medium' && 'Adds patterns, CI/CD, reporting, and test data strategy.'}
                {enhancerLevel === 'high' && 'Full production spec — tools, versions, Docker, code quality, and more.'}
              </p>

              {/* Output type toggle */}
              <div className="flex flex-col items-center gap-1.5 w-full">
                <span className="text-[0.65rem] text-gray-500 uppercase tracking-wider font-semibold">Generate As</span>
                <div className="flex items-center gap-1 bg-[var(--qa-surface)] rounded-full border border-gray-700 p-0.5">
                  <button
                    onClick={() => setEnhancerOutputType('framework')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      enhancerOutputType === 'framework' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <Code2 className="w-3 h-3" /> Framework Code
                  </button>
                  <button
                    onClick={() => setEnhancerOutputType('playbook')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      enhancerOutputType === 'playbook' ? 'bg-amber-600 text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <FileText className="w-3 h-3" /> Strategy Playbook
                  </button>
                </div>
                <p className="text-[0.62rem] text-gray-600">
                  {enhancerOutputType === 'framework'
                    ? 'Generates runnable test code, configs, and CI/CD setup.'
                    : 'Generates structured strategy docs — plans, checklists, matrices.'}
                </p>
              </div>

              <button
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !enhancerPrompt.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-purple-500/20 transition-all"
              >
                {isEnhancing
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Enhancing…</>
                  : <><Sparkles className="w-4 h-4" /> Enhance with AI</>}
              </button>
            </div>

            {/* Enhanced prompt result */}
            {enhancedPrompt && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Enhanced Prompt
                </label>
                <div className="relative">
                  <Textarea
                    value={enhancedPrompt}
                    onChange={(e) => setEnhancedPrompt(e.target.value)}
                    className="bg-purple-500/5 border-purple-500/30 text-gray-100 h-36 resize-none text-sm focus-visible:ring-1 focus-visible:ring-purple-500/50 overflow-y-auto"
                  />
                </div>
                {/* Switch toggle */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-gray-500">Which prompt will be used to run?</span>
                  <div className="flex items-center bg-[var(--qa-surface)] rounded-full border border-gray-700 p-0.5 gap-0.5">
                    <button
                      onClick={() => setUseEnhanced(false)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${!useEnhanced ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => setUseEnhanced(true)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${useEnhanced ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      <Sparkles className="w-3 h-3" /> Enhanced
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setEnhancerOpen(false)}
              disabled={isEnhancing}
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={runFromEnhancer}
              disabled={isEnhancing || !enhancerPrompt.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              {enhancerIsChatInput
                ? (useEnhanced && enhancedPrompt ? 'Send Enhanced' : 'Send Original')
                : (useEnhanced && enhancedPrompt ? 'Run Enhanced Prompt' : 'Run Original Prompt')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <DialogContent className="bg-[var(--qa-card)] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{projectToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setProjectToDelete(null)} className="bg-transparent border-gray-700 hover:bg-gray-800 text-white">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Preview Modal */}
      {isPreviewFullscreen && htmlPreviewFile && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Fullscreen toolbar */}
          <div className="h-12 bg-[var(--qa-bg)] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 font-medium">{activeProject?.name} - Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[var(--qa-card)] p-1 rounded-lg border border-gray-800">
                <button
                  title="Desktop"
                  onClick={() => setPreviewViewport('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${previewViewport === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  title="Tablet"
                  onClick={() => setPreviewViewport('tablet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${previewViewport === 'tablet' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                >
                  <Tablet className="w-3.5 h-3.5" /> Tablet
                </button>
                <button
                  title="Mobile"
                  onClick={() => setPreviewViewport('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${previewViewport === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-200'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
              <button
                title="Exit fullscreen"
                onClick={() => setIsPreviewFullscreen(false)}
                className="p-1.5 rounded-md bg-[var(--qa-card)] border border-gray-800 text-gray-500 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Fullscreen content */}
          <div className="flex-1 flex items-start justify-center overflow-auto bg-[var(--qa-card-alt)] p-6">
            <div
              className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: previewViewport === 'mobile' ? '390px' : previewViewport === 'tablet' ? '768px' : '100%',
                height: '100%',
                minHeight: '600px',
              }}
            >
              <iframe
                srcDoc={htmlPreviewFile}
                className="w-full h-full border-none bg-white"
                style={{ minHeight: '600px' }}
                title="Preview Fullscreen"
                sandbox="allow-scripts allow-forms allow-downloads"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


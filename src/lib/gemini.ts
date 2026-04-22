import { Message } from "../types";
import { auth } from './firebase';

export interface GenerateOptions {
  model?: string;
  temperature?: number;
  provider?: 'google' | 'groq';
  apiKey?: string;
  projectSummary?: string;
  signal?: AbortSignal;
  outputType?: 'framework' | 'playbook';
}

interface ProxyAttachment {
  name: string;
  mimeType: string;
  data: string;
}

// Full-quality system instruction for Groq 128K-context models (llama-3.3-70b-versatile etc.)
const buildGroqSystemInstruction = (templateContext?: string, projectSummary?: string) => `
You are a world-class Software Testing Architect. Generate COMPLETE, PRODUCTION-READY, ENTERPRISE-GRADE test frameworks immediately — never ask clarifying questions, always make opinionated technology choices and state them briefly.

FILENAME RULE (zero tolerance): Every code block MUST start with a filename comment as the VERY FIRST LINE:
  # filename: path/to/file.py        (Python / YAML / Shell)
  // filename: path/to/File.ts       (JS / TS / Java / Kotlin)
Files without a filename are permanently lost on download. No exceptions.

ENTERPRISE QUALITY BAR — every framework must include ALL of:
1. COMPLETE FILE SET: all test files, config, requirements/package.json with pinned versions, .env.example, Dockerfile, docker-compose.yml, README.md with ASCII architecture diagram and quickstart commands
2. ADVANCED PATTERNS: Page Object Model or equivalent, data-driven tests with external fixtures, test data factories (Faker/@faker-js), retry logic, parallel execution config, MINIMUM 15 test cases spanning happy path / negative / boundary / edge cases
3. CI/CD: GitHub Actions workflow with matrix strategy (multi-browser or multi-version), artifact upload for reports, dependency caching
4. REPORTING: Allure Report integration with screenshots/videos on failure; Slack webhook notification script
5. DASHBOARD: For Python → Streamlit app.py with tabs (Results | Coverage | Metrics | Config), Plotly charts (bar/pie/gauge), KPI cards (pass rate, total, failed, flaky), realistic 50-row mock data inline. For JS/TS → index.html with Chart.js dark-themed dashboard.

app.py ONLY uses: pandas, numpy, plotly, altair, matplotlib
NEVER use in app.py: sqlite3, psycopg2, boto3, pyspark, flask, django, lxml, pyarrow, polars, any cloud SDK

On follow-up turns: re-emit ALL files complete — never snippets. Build on top, never restart.
${projectSummary ? `\nExisting project context:\n${projectSummary.slice(0, 1500)}\n` : ''}Context: ${templateContext || 'General software testing'}
`;

const buildSystemInstruction = (templateContext?: string, projectSummary?: string) => `
    You are an expert Software Testing Architect. Generate COMPLETE, production-ready test frameworks.
    NEVER ask clarifying questions — always generate immediately with opinionated defaults.

    FILENAME RULE (zero tolerance): Every code block MUST start with a filename comment on line 1:
      # filename: path/to/file.py   or   // filename: path/to/File.ts
    Files without a filename are permanently lost on download.

    FOR EVERY FRAMEWORK: Include tests, config, CI/CD (GitHub Actions), Dockerfile, README.md.
    For Python→ Streamlit app.py dashboard. For JS/TS→ index.html dashboard.
    app.py ONLY uses: pandas, numpy, plotly, altair, matplotlib (no DB drivers, no cloud SDKs).

    On follow-up turns: re-emit ALL files complete, never snippets. Build on top, never restart.
    ${projectSummary ? `Project state: ${projectSummary}` : ''}
    Context: ${templateContext || 'General software testing'}
  `;

const fileToBase64 = async (file: File) => {
  const result = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileResult = reader.result as string;
      resolve(fileResult.split(',')[1] || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    data: result,
  } satisfies ProxyAttachment;
};

export const generateTestingFramework = async (prompt: string, templateContext?: string, previousMessages: Message[] = [], options: GenerateOptions = {}, attachments: File[] = []) => {
  const provider = options.provider || 'google';
  const model = options.model || "gemini-2.5-pro";
  const temperature = options.temperature ?? 1;
  const systemInstruction = provider === 'groq'
    ? buildGroqSystemInstruction(templateContext, options.projectSummary)
    : buildSystemInstruction(templateContext, options.projectSummary);

  if (provider === 'groq') {
    if (!options.apiKey) {
      throw new Error("Groq API key is required.");
    }
    
    let userContent: any = prompt;
    
    if (attachments.length > 0) {
      userContent = [
        { type: "text", text: prompt }
      ];
      
      for (const file of attachments) {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string); // This includes the data:image/...;base64, prefix
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        userContent.push({
          type: "image_url",
          image_url: {
            url: base64Data
          }
        });
      }
    }
    
    // Groq free tier: 12K TPM limit. Groq counts max_tokens + input toward TPM.
    // Budget: 12000 - 6000 (max_tokens) = 6000 tokens left for system + history + prompt.
    const GROQ_MAX_HISTORY = 3;
    const GROQ_MAX_MSG_CHARS = 2_000;
    const truncatedHistory = previousMessages
      .slice(-GROQ_MAX_HISTORY)
      .map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user' as const,
        content: m.content.length > GROQ_MAX_MSG_CHARS
          ? m.content.slice(0, GROQ_MAX_MSG_CHARS) + '\n[...truncated for context length...]'
          : m.content
      }));

    // Truncate the prompt itself for Groq to keep total input tokens in budget
    const groqPrompt = typeof userContent === 'string' && userContent.length > 3_000
      ? userContent.slice(0, 3_000) + '\n[prompt truncated to fit Groq token budget]'
      : userContent;

    const messages = [
      { role: "system", content: systemInstruction },
      ...truncatedHistory,
      { role: "user", content: groqPrompt }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      signal: options.signal,
      headers: {
        "Authorization": `Bearer ${options.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: 6000,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  const serializedAttachments = await Promise.all(attachments.map(fileToBase64));

  // Attach Firebase ID token so the server can verify the request is authenticated
  const idToken = await auth.currentUser?.getIdToken().catch(() => null);

  const response = await fetch('/api/generate', {
    method: 'POST',
    signal: options.signal,
    headers: {
      'Content-Type': 'application/json',
      ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {}),
    },
    body: JSON.stringify({
      prompt,
      templateContext,
      previousMessages,
      projectSummary: options.projectSummary,
      options: {
        model,
        temperature,
        outputType: options.outputType,
      },
      attachments: serializedAttachments,
      // systemInstruction is now built server-side only
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Gemini proxy request failed.');
  }

  const data = await response.json();

  return { text: data.text as string, suggestions: (data.suggestions as string[]) || [] };
};

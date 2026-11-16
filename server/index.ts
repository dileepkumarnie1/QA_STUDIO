import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import type { Message } from '../src/types';

// ── Allowed Gemini models ───────────────────────────────────────────────────
const ALLOWED_MODELS = new Set([
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-3.1-pro-preview',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite-preview',
]);

// ── Input size limits ───────────────────────────────────────────────────────
const MAX_PROMPT_CHARS           = 50_000;
const MAX_PREVIOUS_MESSAGES      = 50;
const MAX_TEMPLATE_CONTEXT       = 500;
const MAX_ATTACHMENTS            = 5;
const MAX_PROJECT_SUMMARY_CHARS  = 2_000;
const MAX_MESSAGE_CHARS          = 500_000;       // mirrors the Firestore rule
const MAX_ATTACHMENT_B64_CHARS   = 14_000_000;    // ≈10 MB binary, base64-encoded

// Mirrors the client-side attachment allowlist (validateAndFilterFiles in App.tsx)
const isAllowedAttachmentMime = (mime: string) =>
  /^(image\/|text\/|application\/pdf)/i.test(mime) && mime.length <= 100;

interface ProxyAttachment {
  name: string;
  mimeType: string;
  data: string;
}

interface GenerateRequestBody {
  prompt: string;
  templateContext?: string;
  previousMessages?: Message[];
  options?: {
    model?: string;
    temperature?: number;
    outputType?: 'framework' | 'playbook';
  };
  attachments?: ProxyAttachment[];
  projectSummary?: string;
}

dotenv.config({ path: '.env.local', override: true });
dotenv.config({ override: false });

const port = Number(process.env.PORT || 3001);
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is required for the backend Gemini proxy.');
}

// ── Firebase Admin (ID-token verification) ──────────────────────────────────
// verifyIdToken() only needs the Firebase project ID — it validates the token
// signature against Google's public certificates — so authentication is ALWAYS
// enforced, with or without a service-account key. A service account (via
// GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON) is optional.
const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'qa-studio-37f60';
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER;

if (!getApps().length) {
  let credential: ReturnType<typeof cert> | undefined;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
    } catch {
      console.warn('[server] FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON — ignoring it.');
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    credential = applicationDefault();
  }
  initializeApp(credential ? { credential, projectId } : { projectId });
}
const firebaseAuth = getAuth();

// Explicit, local-only escape hatch. Never honoured in production.
const authDisabled = !isProduction && process.env.DISABLE_AUTH === 'true';
if (authDisabled) {
  console.warn('[server] DISABLE_AUTH=true — API authentication is OFF (local development only).');
} else {
  console.log('[server] Firebase ID-token verification enabled.');
}

// Optional server-side email allowlist (comma-separated). Falls back to the
// same VITE_ALLOWED_EMAILS value the client uses so one setting covers both.
const allowedEmails = new Set(
  (process.env.ALLOWED_EMAILS || process.env.VITE_ALLOWED_EMAILS || '')
    .split(',').map((e) => e.trim().toLowerCase()).filter(Boolean),
);

interface AuthedRequest extends Request {
  uid?: string;
}

// Auth middleware — fails closed: no valid Firebase ID token, no access.
const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction): Promise<void> => {
  if (authDisabled) {
    next();
    return;
  }
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }
  try {
    const decoded = await firebaseAuth.verifyIdToken(authHeader.slice(7));
    if (allowedEmails.size > 0) {
      const email = (decoded.email || '').toLowerCase();
      if (!decoded.email_verified || !allowedEmails.has(email)) {
        res.status(403).json({ error: 'This account is not authorised to use this app.' });
        return;
      }
    }
    req.uid = decoded.uid;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' });
  }
};

const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: 'v1beta' } });
const app = express();

// Render (and most PaaS hosts) sit behind one reverse proxy. Trust exactly one
// hop so req.ip is the real client address and rate limits are per-client.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ── Security headers ────────────────────────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Required so the Firebase Google sign-in popup can report back to the app.
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  if (isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// ── CORS ────────────────────────────────────────────────────────────────────
// The frontend is served from this same origin (and through the Vite proxy in
// dev), so cross-origin access is denied by default. To allow another origin,
// list it in ALLOWED_ORIGINS (comma-separated).
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean),
);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

// ── Rate limiting ───────────────────────────────────────────────────────────
// 1) Coarse per-IP limit on every /api call, applied BEFORE auth so floods of
//    unauthenticated requests are cheap to reject.
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment before trying again.' },
});
app.use('/api', apiLimiter);

// 2) Per-user limit on the expensive AI endpoints: 30 requests per minute,
//    keyed by the verified Firebase UID (applied after requireAuth).
const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => (req as AuthedRequest).uid || ipKeyGenerator(req.ip || ''),
  message: { error: 'Too many requests. Please wait a moment before trying again.' },
});

app.use(express.json({ limit: '25mb' }));

const buildPlaybookSystemInstruction = (templateContext?: string, projectSummary?: string) => `
  You are a senior QA Architect producing a COMPLETE, enterprise-grade test documentation suite.
  The user has selected Strategy Playbook mode — generate structured Markdown artefacts ONLY (no source code, no scripts).

  ══════════════════════════════════════════════════════════════════════════════
  MANDATORY ARTEFACT SET — generate ALL files listed below in EVERY response.
  If a section is not applicable, include it with a "N/A — <reason>" note.
  ══════════════════════════════════════════════════════════════════════════════

  FILE 1 — Test Strategy  →  filename: strategy/01_test_strategy.md
  ─────────────────────────────────────────────────────────────────
  Sections (H2):
  ## 1. Executive Summary        — 3–5 sentence overview, business context
  ## 2. Scope                    — In-scope / Out-of-scope table (2 cols)
  ## 3. Test Objectives          — numbered list, SMART goals
  ## 4. Testing Types & Approach — table: | Testing Type | Approach | Tools | Coverage Goal |
  ## 5. Test Environment Strategy — table: | Environment | Purpose | Owner | Access |
  ## 6. Risk Register            — table: | Risk ID | Description | Likelihood | Impact | Mitigation |
  ## 7. Standards & Compliance   — list ISTQB / ISO 29119 / OWASP references as applicable
  ## 8. Assumptions & Dependencies — bullet list

  FILE 2 — Test Plan  →  filename: strategy/02_test_plan.md
  ────────────────────────────────────────────────────────
  Sections (H2):
  ## 1. Document Control         — table: | Version | Date | Author | Changes |
  ## 2. Test Objectives & Goals  — numbered list
  ## 3. Test Scope               — 2-column table (In Scope | Out of Scope)
  ## 4. Test Schedule            — table: | Phase | Activity | Start | End | Owner |
  ## 5. Resource Plan            — table: | Role | Responsibilities | Skills Required | Count |
  ## 6. Entry & Exit Criteria    — two sub-tables (Entry | Exit), each: | Criterion | Verification Method |
  ## 7. Test Deliverables        — table: | Artefact | Owner | Due Date | Status |
  ## 8. Defect Management Process — numbered process steps + severity/priority table
  ## 9. Communication Plan       — table: | Report | Frequency | Audience | Owner |
  ## 10. Approval Sign-Off       — table: | Stakeholder | Role | Signature | Date |

  FILE 3 — Test Cases  →  filename: strategy/03_test_cases.md
  ────────────────────────────────────────────────────────────
  Generate a MINIMUM of 20 test cases covering happy path, negative, boundary, and edge cases.
  Use this EXACT table schema (every row populated):

  | TC ID | Test Suite | Test Case Name | Preconditions | Test Steps | Expected Result | Priority | Type | Status |
  |-------|------------|----------------|---------------|------------|-----------------|----------|------|--------|

  - TC ID format: TC-001, TC-002, …
  - Priority: P1-Critical / P2-High / P3-Medium / P4-Low
  - Type: Functional / Negative / Boundary / Regression / Smoke / Integration / E2E
  - Status: Not Executed (default)
  - Group test cases by Test Suite using H3 headings
  - After the table, add: ## Test Coverage Summary — table: | Suite | Total Cases | P1 | P2 | P3 | P4 |

  FILE 4 — Defect Tracking  →  filename: strategy/04_defect_tracking.md
  ──────────────────────────────────────────────────────────────────────
  Sections (H2):
  ## 1. Defect Lifecycle         — describe the lifecycle stages as a numbered list
  ## 2. Severity & Priority Matrix — 4×4 table (Severity rows × Priority columns) with action guidance
  ## 3. Defect Log Template      — table with EXACT schema:
     | Defect ID | Title | Severity | Priority | Status | Found In | Assigned To | Root Cause Category | Resolution | Retest Status |
  - Include 8–12 representative pre-filled sample defects based on the test context
  - Defect ID format: DEF-001, DEF-002, …
  ## 4. Root Cause Categories    — table: | Category | Description | Example |
  ## 5. Defect Metrics Template  — table: | Metric | Formula | Target | Actual |
     Include: Defect Density, Defect Removal Efficiency, Mean Time to Resolve, Escaped Defects

  FILE 5 — Traceability Matrix  →  filename: strategy/05_traceability_matrix.md
  ──────────────────────────────────────────────────────────────────────────────
  ## 1. Requirements Traceability Matrix — table:
     | Req ID | Requirement Description | Test Suite | TC IDs | Priority | Status |
  Generate 10–15 realistic requirement entries derived from the user's prompt context.
  ## 2. Coverage Analysis        — table: | Requirement Area | Total Reqs | Covered | % Coverage |
  ## 3. Gap Analysis             — table: | Gap Area | Risk | Recommended Action |

  FILE 6 — Domain-Specific Artefact  →  filename: strategy/06_<domain>_artefact.md
  ───────────────────────────────────────────────────────────────────────────────────
  Based on the testing domain, generate ONE of the following (choose the most relevant):
  - Integration Testing   → API/Interface Contract Matrix: | Interface | Producer | Consumer | Protocol | Test Type | Status |
  - Security Testing      → OWASP Test Checklist: | OWASP ID | Category | Test Case | Severity | Status |
  - Performance Testing   → Load Profile: | Scenario | Users | Ramp-Up | Duration | SLA (p95) | Tool |
  - UAT / Release         → UAT Sign-Off Checklist: | Business Process | Tester | Date | Pass/Fail | Notes |
  - Migration / Upgrade   → Data Validation Matrix: | Table/Entity | Row Count Check | Schema Check | Sample Query | Expected | Actual |
  - Exploratory Testing   → Session-Based Charter Log: | Charter ID | Mission | Tester | Duration | Area | Findings | Bugs |
  - Observability/SLO     → SLO Compliance Tracker: | Service | SLI | SLO Target | Current Value | Status | Action |
  - DR / Failover         → Recovery Runbook Checklist: | Step | Action | Owner | Expected Time | Actual Time | Pass/Fail |
  - General               → Test Data Requirements: | Data Entity | Attributes | Volume | Generation Method | Masking Required |
  Name the file descriptively (e.g., strategy/06_api_contract_matrix.md).

  FILE 7 — Test Metrics & Reporting  →  filename: strategy/07_metrics_and_reporting.md
  ──────────────────────────────────────────────────────────────────────────────────────
  ## 1. KPI Dashboard             — table: | KPI | Formula | Target | Measurement Frequency |
  ## 2. Progress Reporting Template — table: | Date | Planned Cases | Executed | Pass | Fail | Blocked | % Pass |
  ## 3. Test Completion Criteria  — checklist table: | Criterion | Target | Actual | Met? |
  ## 4. Stakeholder Report Summary — template section for exec summary report

  ══════════════════════════════════════════════════════════════════════════════
  FORMAT RULES (STRICT):
  ══════════════════════════════════════════════════════════════════════════════
  1. EVERY file MUST be wrapped in a markdown code block with filename on line 1:
     \`\`\`markdown
     # filename: strategy/01_test_strategy.md
     # <Document Title>
     ...content...
     \`\`\`
  2. Do NOT emit any prose or explanations OUTSIDE the code blocks.
  3. All tables MUST use GFM pipe syntax with a separator row.
  4. Every table cell must be populated — write "TBD" if context is insufficient.
  5. Headings inside documents use ## for H2 and ### for H3 (H1 is the document title).
  6. Be SPECIFIC and ACTIONABLE — use real tool names, realistic timelines, concrete metrics.
  7. Reference industry standards inline: ISTQB, ISO 29119, IEEE 829, OWASP, DORA as appropriate.
  8. Total output should be rich enough to serve as a real project's test documentation.

  ── MULTI-TURN CONTINUITY ────────────────────────────────────────────────────
  On follow-up requests: re-emit ALL 7 files with the requested changes merged in.
  Preserve filenames and structure. Build on top — never start from scratch.
  ─────────────────────────────────────────────────────────────────────────────

  ${
    projectSummary
      ? `── PROJECT STATE ─────────────────────────────────────────────────────────\n  ${projectSummary}\n  ──────────────────────────────────────────────────────────────────────────\n  `
      : ''
  }
  Context: ${templateContext || 'General software testing strategy'}
`;

const buildSystemInstruction = (templateContext?: string, projectSummary?: string) => `
You are a world-class Software Testing Architect at a top-tier enterprise with 20+ years of experience.
Your sole purpose is to generate COMPLETE, PRODUCTION-READY, ENTERPRISE-GRADE test frameworks that would
impress a senior QA Engineer or Engineering Manager at a Fortune 500 company.

══════════════════════════════════════════════════════════════════════════════════════════
GOLDEN RULE — GENERATE IMMEDIATELY, NEVER ASK QUESTIONS
══════════════════════════════════════════════════════════════════════════════════════════
NEVER ask the user for more information. NEVER say "could you clarify" or "what framework
do you prefer". ALWAYS make intelligent, opinionated technology choices and generate the
full framework immediately. If any detail is missing, pick the most modern, widely-adopted
enterprise default and state your choice briefly. The user is here to be impressed, not
interviewed. Asking clarifying questions is FORBIDDEN.

══════════════════════════════════════════════════════════════════════════════════════════
ENTERPRISE QUALITY BAR — EVERY GENERATED FRAMEWORK MUST INCLUDE ALL OF THE FOLLOWING
══════════════════════════════════════════════════════════════════════════════════════════

1. COMPLETE FILE SET — Generate EVERY file needed to clone and run immediately:
   - All source/test files with real, working implementation (zero placeholders, zero TODOs)
   - package.json / pom.xml / build.gradle / requirements.txt with exact pinned versions
   - README.md with architecture diagram (ASCII), prerequisites, quickstart, and CI/CD setup
   - .env.example with all environment variables documented
   - Dockerfile + docker-compose.yml for containerised test execution
   - .gitignore appropriate for the tech stack

2. ADVANCED TEST PATTERNS — Go far beyond basic happy-path tests:
   - Page Object Model / App Actions / Screenplay Pattern (choose the most modern for the stack)
   - Data-driven tests with parameterisation from external CSV/JSON/YAML fixtures
   - Test data factories/builders (Builder pattern, factory_boy, Faker, @faker-js/faker)
   - Retry logic and flaky-test mitigation (retry decorators, test.describe.configure)
   - Parallel execution (pytest-xdist / TestNG parallel / Jest workers / Playwright shards)
   - Soft assertions where appropriate
   - Comprehensive negative tests, boundary values, and edge cases
   - Minimum 20 meaningful test cases spread across core user journeys
   - Custom reporters / hooks that produce rich contextual failure output

3. CI/CD PIPELINE — Complete, copy-paste-ready config:
   - GitHub Actions with matrix strategy (multi-browser / multi-OS / multi-version)
   - Artifact upload for Allure reports and screenshots on failure
   - Dependency caching (pip, npm, Maven, Gradle)
   - Environment-specific configuration (dev / staging / prod secrets via env vars)
   - Allure Report deployment to GitHub Pages or artifact storage

4. REPORTING & OBSERVABILITY:
   - Allure Report with rich step logging, screenshots, and environment info
   - Slack/Teams webhook notification script on failure
   - Test execution metrics: pass rate, duration trend, flakiness index

5. MODERN TOOLING — Latest stable versions and current best practices:
   - TypeScript (never plain JavaScript) for JS/TS frameworks
   - Latest Playwright / pytest / Cypress / JUnit 5 / TestNG versions
   - ESLint + Prettier / Black + isort / Google Java Format for code quality
   - Pre-commit hooks for lint/format enforcement
   - Type-safe config (TypeScript config files, Pydantic BaseSettings)

6. DOMAIN-SPECIFIC ADVANCED FEATURES:
   Web:         Visual regression (Playwright snapshots/Percy), accessibility (axe-core),
                network interception mocks, auth helpers (cookie/token injection)
   API:         Contract testing (Pact/Schemathesis), schema validation, OAuth2/JWT flows,
                chaos injection (timeout/500 scenarios), response-time SLA assertions
   Mobile:      Device farm config (BrowserStack App Automate), gesture helpers,
                deep-link tests, push notification mocks, biometric bypass
   ETL/Data:    Row-count assertions, schema drift detection, data quality rules,
                reconciliation reports, column-level lineage validation
   Performance: Ramp-up profiles, SLA assertions at p50/p95/p99, distributed load gen,
                real-time Grafana dashboard config, baseline comparison
   Security:    OWASP Top 10 coverage checklist, SAST config (Semgrep/Bandit/SpotBugs),
                dependency audit, auth bypass tests, XSS/SQLi payloads in fixtures
   AI/ML:       Prompt injection tests, hallucination detection metrics, latency SLOs,
                golden dataset regression, cost per inference tracking

══════════════════════════════════════════════════════════════════════════════════════════
FILENAME RULE — ZERO TOLERANCE, NO EXCEPTIONS
══════════════════════════════════════════════════════════════════════════════════════════
EVERY single code block — in EVERY turn — MUST have a filename comment as the
ABSOLUTE FIRST LINE inside the fenced block (before any imports or code):

  \`\`\`python
  # filename: tests/conftest.py
  \`\`\`

  \`\`\`typescript
  // filename: src/pages/LoginPage.ts
  \`\`\`

  \`\`\`yaml
  # filename: .github/workflows/ci.yml
  \`\`\`

  \`\`\`xml
  <!-- filename: pom.xml -->
  \`\`\`

Files without a filename comment are PERMANENTLY LOST when the user downloads.
This applies to ALL files: tests, configs, fixtures, utilities, Dockerfiles, Makefiles.

══════════════════════════════════════════════════════════════════════════════════════════
INTERACTIVE DASHBOARD — MANDATORY AND HIGH QUALITY
══════════════════════════════════════════════════════════════════════════════════════════
For every Python-based framework, include a polished Streamlit app (app.py) that serves
as a professional test management dashboard. Requirements:
  - Multiple tabs: Test Results | Test Cases | Coverage | Metrics & Trends | Configuration
  - Rich Plotly visualisations: bar charts (pass/fail trends), pie charts (coverage breakdown),
    gauge charts (SLA compliance %), heatmaps (test execution grids by suite & date)
  - Sidebar with filters: environment, date range, test suite, status, assignee
  - KPI cards at the top: Total Tests, Pass Rate %, Failed, Blocked, Avg Duration
  - Realistic mock data inline with pandas — mimic a real CI run with 50-100 test records
  - Colour-coded status badges (green=pass, red=fail, amber=flaky, grey=skipped)
  - Expandable "Defect Summary" panel with sample defect records
  - Professional styling via st.markdown custom CSS: dark header bar, card containers,
    monospace font for test IDs, smooth colour transitions

For JS/TS frameworks, generate index.html with Chart.js/D3.js dark-themed dashboard,
KPI cards, animated charts, and inline mock data.

STREAMLIT COMPATIBILITY — FORBIDDEN packages in app.py (Pyodide/WASM environment):
  sqlite3, psycopg2, pyodbc, pymssql, cx_Oracle, oracledb, mysql-connector-python,
  pymysql, databricks-*, pyspark, delta-spark, thrift, grpcio, boto3, botocore,
  google-cloud-*, azure-*, fastapi, uvicorn, gunicorn, django, flask,
  lxml, cryptography, cffi, greenlet, gevent, pyarrow, connectorx, polars,
  torch, torchvision, torchaudio, tensorflow, keras, transformers, huggingface-hub,
  sentence-transformers, diffusers, xgboost, lightgbm, catboost, onnxruntime,
  scikit-learn, opencv-python, cv2, dask, ray, mlflow, deepeval

ALLOWED in app.py: pandas, numpy, plotly, altair, matplotlib, scipy, statsmodels

ALL data in app.py must be inline mock data — never connect to databases or external services.

══════════════════════════════════════════════════════════════════════════════════════════
MULTI-TURN CONTINUITY
══════════════════════════════════════════════════════════════════════════════════════════
Full chat history is provided. When user asks to modify or extend code:
1. Identify every file from previous turns by their filename comment.
2. Output the COMPLETE updated version of every affected file — never snippets.
3. Re-emit every unchanged file so the user always gets a full download-ready set.
4. Preserve exact folder structure, class names, and conventions.
5. Build on top — never start fresh unless explicitly instructed.
6. Skip intros on follow-up turns — go straight to updated code.

══════════════════════════════════════════════════════════════════════════════════════════
FOLLOW-UP REFINEMENT QUESTIONS — FIRST TURN ONLY
══════════════════════════════════════════════════════════════════════════════════════════
After every FIRST-TURN response (when there are no previous messages), append a block of
3–5 clarifying questions that would help the user refine the generated framework further.
These are shown to the user as interactive radio buttons in the UI — not as chat text.

Rules:
- Only on the FIRST turn (no chat history). Never repeat on follow-up turns.
- Maximum 5 questions, minimum 3. Each question must have 3-5 answer options.
- Questions should be specific to the domain/technology chosen, not generic.
- Cover: tech stack variant, deployment target, data volume/scale, team size/skill level, 
  specific feature priority (e.g., "which validation type matters most to you?")
- Append the block AFTER all code and the Quick Start section, as the very last thing.

EXACT FORMAT — append this block verbatim at the very end of the response:
<!--QA_QUESTIONS_START-->
[
  {"id":"q1","question":"<question text>","options":["<opt1>","<opt2>","<opt3>"]},
  {"id":"q2","question":"<question text>","options":["<opt1>","<opt2>","<opt3>","<opt4>"]},
  {"id":"q3","question":"<question text>","options":["<opt1>","<opt2>","<opt3>"]}
]
<!--QA_QUESTIONS_END-->

The JSON must be valid. Do not put any text between <!--QA_QUESTIONS_START--> and the JSON array,
or between the JSON array and <!--QA_QUESTIONS_END-->.
On ALL follow-up turns: do NOT include this block.

══════════════════════════════════════════════════════════════════════════════════════════
RESPONSE STRUCTURE
══════════════════════════════════════════════════════════════════════════════════════════
Start with 2-3 sentences: what you're building + key technology choices (bold framework names).
Then emit ALL files in this order: config → core utilities → page objects/helpers →
test files → CI/CD → Docker → README.md → app.py or index.html (dashboard last).
End with a "## Quick Start" section with exact shell commands to install, configure, and run.
Then (first turn only) append the <!--QA_QUESTIONS_START--> block as described above.

${projectSummary ? `══════════════════════════════════════════════════════════════════════════════════════════
PROJECT STATE — BUILD ON TOP, DO NOT RESTART
══════════════════════════════════════════════════════════════════════════════════════════
${projectSummary}
══════════════════════════════════════════════════════════════════════════════════════════
` : ''}Context: ${templateContext || 'General software testing'}
`;

const formatGeminiContents = (prompt: string, previousMessages: Message[], attachments: ProxyAttachment[]) => {
  const formattedHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> }> = [];
  let lastRole = '';

  // Keep the most recent 10 messages (5 exchanges) at full fidelity.
  // For older messages truncate long content so they don't overwhelm the context
  // window and push recent, critical exchanges out of effective attention range.
  const FULL_FIDELITY_COUNT = 10;   // recent N messages stay full
  const MAX_OLD_MSG_CHARS   = 6_000; // older messages capped at this many chars

  const totalMsgs = previousMessages.length;

  for (let i = 0; i < totalMsgs; i++) {
    const msg = previousMessages[i];
    const role = msg.role === 'assistant' ? 'model' : 'user';
    const isOld = i < totalMsgs - FULL_FIDELITY_COUNT;

    let content = msg.content;
    if (isOld && content.length > MAX_OLD_MSG_CHARS) {
      content = content.slice(0, MAX_OLD_MSG_CHARS) +
        `\n\n[... content truncated for context efficiency — ${content.length - MAX_OLD_MSG_CHARS} chars omitted ...]`;
    }

    if (role !== lastRole) {
      formattedHistory.push({
        role,
        parts: [{ text: content }],
      });
      lastRole = role;
      continue;
    }

    const lastPart = formattedHistory[formattedHistory.length - 1]?.parts[0];
    if (lastPart?.text) {
      lastPart.text += `\n\n${content}`;
    }
  }

  if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === 'user') {
    const lastPart = formattedHistory[formattedHistory.length - 1].parts[0];
    if (lastPart.text) {
      lastPart.text += `\n\n${prompt}`;
    }
  } else {
    formattedHistory.push({ role: 'user', parts: [{ text: prompt }] });
  }

  if (attachments.length > 0) {
    const lastUserMessage = formattedHistory[formattedHistory.length - 1];
    for (const attachment of attachments) {
      lastUserMessage.parts.push({
        inlineData: {
          data: attachment.data,
          mimeType: attachment.mimeType,
        },
      });
    }
  }

  return formattedHistory;
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/generate', requireAuth, generateLimiter, async (req, res) => {
  const body = req.body as GenerateRequestBody;

  // ── Input validation ────────────────────────────────────────────────────
  if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }
  if (body.prompt.length > MAX_PROMPT_CHARS) {
    res.status(400).json({ error: `Prompt exceeds maximum length of ${MAX_PROMPT_CHARS} characters.` });
    return;
  }

  // Sanitise and truncate templateContext before use in system instruction
  const templateContext = typeof body.templateContext === 'string'
    ? body.templateContext.trim().slice(0, MAX_TEMPLATE_CONTEXT)
    : undefined;

  // Sanitise projectSummary — plain text only, hard size cap
  const projectSummary = typeof body.projectSummary === 'string'
    ? body.projectSummary.trim().slice(0, MAX_PROJECT_SUMMARY_CHARS)
    : undefined;

  // Validate model against allowlist
  const requestedModel = typeof body.options?.model === 'string' ? body.options.model : 'gemini-2.5-pro';
  const model = ALLOWED_MODELS.has(requestedModel) ? requestedModel : 'gemini-2.5-pro';

  // Clamp temperature to [0, 2]
  const rawTemperature = Number(body.options?.temperature ?? 1);
  const temperature = Number.isFinite(rawTemperature) ? Math.min(2, Math.max(0, rawTemperature)) : 1;

  // Validate shape + size of history and attachments — never trust client JSON
  const previousMessages: Message[] = (Array.isArray(body.previousMessages) ? body.previousMessages : [])
    .filter((m): m is Message => !!m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .slice(-MAX_PREVIOUS_MESSAGES)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

  const attachments: ProxyAttachment[] = (Array.isArray(body.attachments) ? body.attachments : [])
    .filter((a): a is ProxyAttachment =>
      !!a && typeof a.data === 'string' && typeof a.mimeType === 'string' &&
      a.data.length <= MAX_ATTACHMENT_B64_CHARS && isAllowedAttachmentMime(a.mimeType))
    .slice(0, MAX_ATTACHMENTS);

  try {
    const contents = formatGeminiContents(body.prompt, previousMessages, attachments);

    // Always build system instruction server-side — never trust client-supplied value
    const outputType = body.options?.outputType === 'playbook' ? 'playbook' : 'framework';
    const systemInstruction = outputType === 'playbook'
      ? buildPlaybookSystemInstruction(templateContext, projectSummary)
      : buildSystemInstruction(templateContext, projectSummary);

    // Run main generation and suggestions in parallel
    const [mainResponse, suggestionsResponse] = await Promise.all([
      ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction, temperature },
      }),
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: `Based on this user request and the context below, suggest exactly 5 short actionable next steps (max 10 words each) that the user might want to do next in this QA/testing project. Return ONLY a JSON array of 5 strings. No explanation, no markdown, just the raw JSON array.\n\nUser request: ${body.prompt.slice(0, 500)}\nContext: ${templateContext || 'Testing framework'}` }] }],
        config: { temperature: 0.5 },
      }),
    ]);

    // Parse suggestions — expect a raw JSON array from the dedicated call
    let suggestions: string[] = [];
    try {
      const raw = (suggestionsResponse.text || '').trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) suggestions = parsed.slice(0, 5).map(String);
    } catch { /* if parsing fails, suggestions stay empty */ }

    res.json({ text: mainResponse.text, suggestions });
  } catch (error) {
    // Log full error server-side, return generic message to client
    console.error('[/api/generate] Gemini error:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

const ENHANCE_SYSTEM_INSTRUCTION = `You are a world-class QA architect and test automation expert. Your ONLY job is to rewrite a given testing prompt into a comprehensive, production-ready requirement specification. Do NOT generate code — enhance the prompt text only. Return ONLY the enhanced prompt, no preamble, no markdown fencing.`;

const ENHANCE_META_PROMPTS: Record<string, (prompt: string) => string> = {
  low: (prompt) => `Lightly polish the following testing prompt. Fix clarity, remove ambiguity, and add the most obvious missing details (primary tool name, language, one or two key patterns). Keep it concise — no more than 50% longer than the original.

ORIGINAL PROMPT:
${prompt}

Return ONLY the improved prompt text.`,

  medium: (prompt) => `Expand the following testing prompt into a clear, well-structured specification. Add:
- Primary tool/language with version
- Key design pattern (e.g. Page Object Model, data-driven)
- Basic folder structure hint
- Test data approach
- One CI/CD mention (e.g. GitHub Actions)
- Reporting (e.g. Allure or HTML report)
- README requirement

Do NOT over-spec. Aim for roughly 2x the original length — useful but not overwhelming.

ORIGINAL PROMPT:
${prompt}

Return ONLY the enhanced prompt text.`,

  high: (prompt) => `Rewrite the following testing framework prompt into a comprehensive, production-ready specification covering:
- Exact tool names and versions (e.g., Playwright v1.50, pytest 8.x, TestNG 7.10)
- Design patterns: Page Object Model, Builder, Factory, Facade, Strategy where relevant
- Full folder/project structure conventions
- Multi-environment config (dev/staging/prod, .env, properties files)
- Parallel & cross-browser/cross-device execution strategy
- Comprehensive assertion and validation approach
- Reusable utilities: smart waits, auto-retry, screenshot-on-failure, structured logging
- Test data strategy: fixtures, data-driven, factory helpers
- CI/CD integration (GitHub Actions) with caching and fail-fast config
- Reporting: Allure or Extent Reports with screenshots, timeline, trends
- Docker/containerisation for reproducible headless runs
- Code quality gates: linting, static analysis, coverage thresholds
- Clear README: prerequisites, installation, run commands, environment setup

ORIGINAL PROMPT:
${prompt}

Return ONLY the enhanced prompt text.`,
};

app.post('/api/enhance-prompt', requireAuth, generateLimiter, async (req, res) => {
  const { prompt, level } = req.body as { prompt?: string; level?: string };
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 10000) {
    res.status(400).json({ error: 'Prompt is required and must be under 10000 characters.' });
    return;
  }
  const safeLevel = ['low', 'medium', 'high'].includes(level || '') ? (level as string) : 'medium';
  try {
    const metaPrompt = ENHANCE_META_PROMPTS[safeLevel](prompt);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: metaPrompt }] }],
      config: { systemInstruction: ENHANCE_SYSTEM_INSTRUCTION, temperature: 0.7 },
    });
    res.json({ enhanced: response.text || '' });
  } catch (error) {
    console.error('[/api/enhance-prompt] error:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Enhancement failed. Please try again.' });
  }
});

// ── Static file serving (production) ────────────────────────────────────────
// Serves the Vite build. In dev, Vite handles the frontend directly.
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Unknown API routes get a JSON 404 rather than the SPA shell.
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// SPA fallback — non-API routes return index.html so React Router works.
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`QA Studio server listening on http://localhost:${port}`);
});

// Graceful shutdown on SIGTERM (containers / PaaS)
process.on('SIGTERM', () => {
  console.log('[server] SIGTERM received — shutting down gracefully.');
  server.close(() => process.exit(0));
});

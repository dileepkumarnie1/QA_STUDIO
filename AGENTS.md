# QA Studio — AI Agent Context File

This file is read automatically by AI coding assistants (GitHub Copilot, Claude, Cursor, etc.)
to quickly understand the project state, architecture, and history before starting any task.

---

## Project Overview

**QA Studio** is a web app that generates production-ready QA/testing frameworks using Google Gemini AI.
Users sign in with Google, create projects (with a template + prompt), and Gemini generates full test
frameworks with code files, a Streamlit/HTML preview, and downloadable ZIP. Projects and chat history
are stored per-user in Firebase Firestore.

- **URL (local):** `http://localhost:3004` *(Vite picks the next free port — check terminal output)*
- **Backend (local):** `http://localhost:3001`
- **Firebase project:** `qa-studio-37f60`
- **Authenticated user:** `dileepkumarnie1@gmail.com`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vite 6 + React 19 + TypeScript 5.8 |
| UI components | shadcn/ui (in `components/ui/`) + `@base-ui/react` Button/Select/Dialog |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (`motion/react`) |
| Markdown | `react-markdown` |
| Backend proxy | Express 4 (`server/index.ts`), port 3001, `tsx watch` |
| AI — Google | `@google/genai` v1.49, server-side only, `gemini-3.1-pro-preview` default |
| AI — Groq | Client-side direct fetch to `api.groq.com`, user-supplied key |
| Auth | Firebase Auth — Google Sign-in (`signInWithPopup`) |
| Database | Cloud Firestore (project: `qa-studio-37f60`, default DB) |
| Process manager | `concurrently` — `npm run dev` starts both server + client |
| Security | `firebase-admin` (token verification in prod), `express-rate-limit` (30 req/min) |

---

## Running the App

```bash
npm run dev          # Starts both Express proxy (3001) + Vite client (3000+)
npm run dev:client   # Vite only
npm run dev:server   # Express proxy only (tsx watch)
npm run build        # Production build
npm run lint         # TypeScript type-check (tsc --noEmit)

# Deploy Firestore rules
npx firebase-tools deploy --only firestore:rules
```

> **Port note:** Vite tries 3000 first and increments if occupied. Express backend always uses 3001.
> If 3001 is stuck: `Get-NetTCPConnection -LocalPort 3001 | % { Stop-Process -Id $_.OwningProcess -Force }`

### Environment Variables (`.env.local` — never committed)

```env
GEMINI_API_KEY="..."                         # Server-side only
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="qa-studio-37f60.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="qa-studio-37f60"
VITE_FIREBASE_STORAGE_BUCKET="qa-studio-37f60.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="840945337999"
VITE_FIREBASE_APP_ID="1:840945337999:web:68232403bc8128de81d2fa"
VITE_FIREBASE_MEASUREMENT_ID="G-MSX381ZX0H"
VITE_FIREBASE_DATABASE_ID=""
# Optional: comma-separated list to restrict logins
# VITE_ALLOWED_EMAILS="user@example.com,admin@example.com"
```

> **IMPORTANT:** An old `GEMINI_API_KEY` is set as a Windows User environment variable (free-tier key
> ending `tyjLJc`). `server/index.ts` uses `dotenv.config({ path: '.env.local', override: true })`
> to ensure `.env.local` always wins.

---

## File Structure

```
qa-studio/
├── server/
│   └── index.ts          # Express proxy — GEMINI_API_KEY, Gemini calls, auth, rate-limit
├── src/
│   ├── App.tsx            # Entire app UI + state machine (~1900 lines)
│   ├── main.tsx           # Entry point, wraps with AuthProvider
│   ├── constants.ts       # TEMPLATES array with all test templates
│   ├── index.css          # Global styles (Tailwind, theme vars, slim scrollbar)
│   ├── vite-env.d.ts      # ImportMetaEnv typings for VITE_FIREBASE_* vars
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   └── FileTree.tsx   # Recursive file tree for code explorer panel
│   ├── lib/
│   │   ├── AuthContext.tsx # Firebase Auth provider + saveUserProfile + email allowlist
│   │   ├── db.ts          # All Firestore operations (no PII in thrown errors)
│   │   ├── firebase.ts    # Firebase app init, exports `auth` + `db`
│   │   └── gemini.ts      # Client AI interface — proxies Google to /api/generate
│   └── types/
│       └── index.ts       # Project, Message, Template, SubTemplate interfaces
├── components/ui/         # shadcn/ui components (button, card, dialog, sheet, etc.)
├── firestore.rules        # Deployed Firestore security rules (rules_version = '2')
├── firebase.json          # { "firestore": { "rules": "firestore.rules" } }
├── .firebaserc            # { "projects": { "default": "qa-studio-37f60" } }
├── .env.local             # Local secrets (gitignored)
├── .env.example           # Template for env vars
└── AGENTS.md              # This file
```

---

## Architecture: Key Data Flows

### Authentication
```
main.tsx → <AuthProvider> → onAuthStateChanged → setUser
                                               → saveUserProfile() → Firestore users/{uid}
                                               → check VITE_ALLOWED_EMAILS (if set) → sign out if not allowed
```

### Project Creation (template flow)
```
User clicks sub-template card
  → openEnhancer(template, sub) → Prompt Enhancer Dialog
      → optional: POST /api/enhance-prompt → gemini-2.5-flash → enhanced text
      → user picks Original or Enhanced, clicks Run
  → handleCreateProject(template, patchedSub) → createProject() → Firestore
  → handleSendMessage(prompt, projectOverride) → /api/generate → Gemini
  → addMessage() → Firestore projects/{id}/messages/{id}
```

### Project Creation (home prompt flow)
```
User types in home textarea → "Enhance" button → openHomeEnhancer()
  → same Prompt Enhancer Dialog flow
  → runFromEnhancer() → handleCreateProjectWithHomePrompt(finalPrompt)
  OR
User presses Enter / Run → handleCreateProjectWithPrompt() → handleCreateProjectWithHomePrompt()
```

### Message Generation
```
handleSendMessage()
  → generateTestingFramework() in gemini.ts
      (Google) → POST /api/generate (Vite proxy → Express:3001)
                → requireAuth middleware (no-op in dev, verifyIdToken in prod)
                → generateLimiter (30 req/min/IP)
                → server builds systemInstruction server-side (client cannot override)
                → model validated against ALLOWED_MODELS set
                → temperature clamped to [0, 2]
                → Promise.all([mainGeneration, suggestionsCall])
                → returns { text: string, suggestions: string[] }
      (Groq)   → direct fetch to api.groq.com/openai/v1/chat/completions
                → returns plain string (no suggestions)
  → setSuggestions([...]) → shown as clickable chips
  → setCheckpointMsgId(null) — clears any active checkpoint
  → addMessage() saves to Firestore
```

### Preview Rendering
```
parsedFiles (useMemo, sliced to checkpoint if active)
  → if .html/.htm found → render directly in sandbox iframe
  → if .py with streamlit import → build stlite HTML (Pyodide WASM)
  → else → render richPreviewHtml (README.md + code stats prose view)
```

### Checkpoint System
```
Each non-latest assistant message shows a "Checkpoint" pill button
  → click → setCheckpointMsgId(msg.id)
  → parsedFiles useMemo slices messages array up to that point
  → right panel shows amber banner: "Showing code at selected checkpoint"
  → click "Return to latest" OR send new message → clears checkpoint
```

### Prompt Enhancer Flow
```
openEnhancer(template, sub) OR openHomeEnhancer()
  → sets enhancerPrompt, resets enhancerLevel='medium', clears enhancedPrompt
  → Dialog opens (max-w-3xl, max-h-90vh, scrollable body)
      ├── Editable original prompt textarea
      ├── Low / Medium / High level toggle (pill segmented control)
      ├── Level description text
      ├── "Enhance with AI" button → POST /api/enhance-prompt { prompt, level }
      │     → server builds level-specific meta-prompt
      │     → gemini-2.5-flash returns { enhanced: string }
      ├── Enhanced prompt textarea (h-56, overflow-y-auto)
      └── Original / Enhanced selector → "Run" button
runFromEnhancer()
  → uses enhancedPrompt if useEnhanced=true, else enhancerPrompt
  → if template flow: handleCreateProject(template, { ...sub, prompt: finalPrompt })
  → if home flow: handleCreateProjectWithHomePrompt(finalPrompt)
```

---

## Server API Endpoints

### `GET /api/health`
Returns `{ ok: true }`. Liveness check, no auth required.

### `POST /api/generate`
```
Body: {
  prompt: string,                    // required, max 50,000 chars
  templateContext?: string,          // optional, truncated to 500 chars server-side
  previousMessages?: Message[],      // optional, last 50 used (rest truncated)
  options?: { model?: string, temperature?: number },
  attachments?: ProxyAttachment[],   // optional, max 5
}
Response: { text: string, suggestions: string[] }
Errors:  { error: string }  (generic — details logged server-side only)
```
- Auth: `requireAuth` — passes in dev (no `GOOGLE_APPLICATION_CREDENTIALS`), `verifyIdToken` in prod
- Rate limit: 30 req/min per IP (`generateLimiter`)
- Model allowlist: `ALLOWED_MODELS` Set; unknown model → `gemini-2.5-pro`
- Temperature clamped to `[0, 2]`
- `systemInstruction` always server-built; any client-supplied value is ignored
- Parallel `gemini-2.5-flash` call for 5 suggestion chips (zero latency overhead)

### `POST /api/enhance-prompt`
```
Body: { prompt: string, level?: 'low' | 'medium' | 'high' }
Response: { enhanced: string }
```
- Same auth + rate-limit as `/api/generate`
- `level` defaults to `'medium'` if invalid/missing
- Three distinct meta-prompts per level:
  - **low** — Polish clarity, fix ambiguity, add most obvious missing detail (~50% longer)
  - **medium** — Add design pattern, CI/CD, reporting, test data strategy (~2x)
  - **high** — Full spec: tool versions, Docker, multi-env, code quality gates, README

---

## Firestore Schema

```
users/{uid}
  uid, email, displayName, photoURL, lastLoginAt, createdAt

projects/{projectId}
  id, name, description, prompt (≤50,000 chars), templateId?, subTemplateId?,
  createdAt, updatedAt, userId (immutable after create)

projects/{projectId}/messages/{messageId}
  id, role ('user'|'assistant'), content (≤500,000 chars), timestamp
```

**Security rules (`rules_version = '2'`, deployed):**
- `users/{uid}`: CRUD only by matching auth UID (no delete)
- `projects`: read/create/update/delete only by owner (`userId == request.auth.uid`)
- `projects/messages`: read/create/delete by project owner; update = denied (immutable)
- `isValidProject` validates: required fields, name ≤100 chars, prompt ≤50,000 chars
- `isValidMessage` validates: required fields, role ∈ ['user','assistant'], content ≤500,000 chars

---

## UI Architecture (`src/App.tsx`)

### Key State
| State | Type | Purpose |
|---|---|---|
| `activeProject` | `Project\|null` | Currently open project |
| `messages` | `Message[]` | Live-subscribed from Firestore |
| `selectedTemplate` | `Template\|null` | Home page template drill-down view |
| `checkpointMsgId` | `string\|null` | ID of message to freeze code view at |
| `enhancerOpen` | `boolean` | Prompt enhancer dialog visibility |
| `enhancerLevel` | `'low'\|'medium'\|'high'` | Enhancement depth; resets to 'medium' on open |
| `suggestions` | `string[]` | AI suggestion chips (local state only, not persisted) |
| `isSettingsOpen` | `boolean` | Settings slide-over panel |
| `isLeftPanelOpen` | `boolean` | Collapsible sidebar |
| `theme` | `'dark'\|'light'\|'system'` | Persisted in `localStorage('qa-theme')` |
| `provider` | `'google'\|'groq'` | Active AI provider |
| `selectedModel` | `string` | Active model name |
| `rightPaneMode` | `'preview'\|'code'` | Right panel active tab |
| `previewViewport` | `'desktop'\|'tablet'\|'mobile'` | Preview iframe width |
| `isPreviewFullscreen` | `boolean` | Fullscreen preview modal |

### Key useMemo
| Memo | Depends on | Purpose |
|---|---|---|
| `parsedFiles` | `messages`, `checkpointMsgId` | Extracts code blocks; slices to checkpoint when active |
| `fileTree` | `parsedFiles` | Recursive tree structure for file explorer |
| `htmlPreviewFile` | `parsedFiles`, `fileNames` | Picks HTML / stlite / null for preview |
| `richPreviewHtml` | `parsedFiles`, `activeProject` | README prose + stats view |

### Key Functions
| Function | Purpose |
|---|---|
| `handleCreateProject(template?, sub?)` | Create Firestore project + optionally fire first message |
| `handleCreateProjectWithHomePrompt(override?)` | Create from home textarea prompt |
| `handleCreateProjectWithPrompt()` | Thin wrapper → delegates to above |
| `openEnhancer(template, sub)` | Open enhancer for sub-template (resets state) |
| `openHomeEnhancer()` | Open enhancer for home prompt |
| `handleEnhancePrompt()` | POST `/api/enhance-prompt` with current level |
| `runFromEnhancer()` | Run original or enhanced prompt; closes dialog |
| `handleSendMessage(content, projectOverride?)` | Core message send + AI call |
| `handleDownloadFramework()` | ZIP all parsed code files + README |
| `validateAndFilterFiles(files)` | Enforce 10 MB + MIME allowlist on attachments |

---

## UI Features Reference

### Theme System
- Three modes: Dark / Light / System (follows OS)
- Persisted in `localStorage('qa-theme')`
- Inline script in `index.html` applies theme class before React hydrates (no flash)
- CSS vars: `--qa-bg`, `--qa-surface`, `--qa-card`, `--qa-card-alt`, `--qa-border`

### Layout
- **Left panel**: collapsible sidebar — project list, search, New Project button
- **Mobile header**: Sheet (slide-over) triggered by Menu icon, no nested `<button>` issue
- **Settings panel**: Framer Motion slide-in from right — provider, model, Groq key, temperature, theme

### Chat Panel
- User messages: simple row, gray avatar
- Assistant messages: card with blue left border, `0.8rem` font
- Code blocks with `// filename:` or `# filename:` → rendered as file cards
- **Suggestion chips**: 5 clickable next-step chips after each Google response
- **Checkpoint buttons**: Clock icon pill on each non-latest assistant message
  - Active checkpoint: amber border + `RotateCcw` "Active checkpoint" pill
  - Amber banner in right panel with "Return to latest" button
- Generating state: animated skeleton pulse placeholder

### Right Panel
- `ResizablePanelGroup` — draggable split between chat and code/preview
- **Preview tab**: iframe, viewport toggle (Desktop 100% / Tablet 768px / Mobile 390px), fullscreen modal
  - Iframe sandbox: `allow-scripts allow-same-origin` removed → `allow-scripts allow-forms allow-popups`
- **Code tab**: file tree (left 1/3) + syntax-highlighted viewer (right 2/3) with per-file download
- **Checkpoint banner**: shown when `checkpointMsgId` is set

### Prompt Enhancer Dialog
- Two entry points: sub-template card click, home "✨ Enhance" button
- Dialog: `max-w-3xl`, `max-h-[90vh]`, body `overflow-y-auto`
- Level toggle: Low (polish) / Medium (solid spec, default) / High (full production spec)
- Enhanced textarea: `h-56`, `overflow-y-auto` — fixed height, scrollable
- Original/Enhanced toggle → Run button label updates dynamically

---

## Changelog

### Sessions 1–9 (Previous work — see full details in original AGENTS.md)
- Sessions 1–3: Project setup, Firebase linking, Gemini backend proxy
- Session 4: Model names, quota fix (`apiVersion: 'v1beta'`), dotenv override
- Session 5: Firestore UserProfile, cascade delete, client-side sort
- Session 6: Viewport toolbar, fullscreen preview
- Session 7: Pyodide/stlite bad-packages filter
- Session 8: Suggestion chips, smaller chat font
- Session 9: TypeScript null-guard for `@base-ui/react` Select

### Session 10 — UI Modernization
- Sliding settings panel (Framer Motion AnimatePresence)
- Collapsible sidebar with `PanelLeftOpen`/`PanelLeftClose` toggle
- Light/System/Dark theme with localStorage persistence and flash prevention
- Rich README preview for non-HTML/non-Python projects
- Visual polish throughout

### Session 11 — Security Hardening (14 issues fixed)
- `firebase-admin` + `express-rate-limit` installed
- `server/index.ts`: auth middleware, model allowlist, input validation, server-side system instruction, generic client error messages
- `gemini.ts`: sends `Authorization: Bearer <idToken>` with every request
- `App.tsx`: attachment validation (MIME + 10 MB), history-leak fix (empty array on new project), iframe sandbox tightened, XSS-safe project name in preview HTML
- `db.ts`: removed PII from thrown errors
- `AuthContext.tsx`: `VITE_ALLOWED_EMAILS` email allowlist
- `firestore.rules`: `rules_version = '2'`, redeployed

### Session 12 — Server Crash & Nested Button Fixes
- Fixed `server/index.ts` duplicate block (old code appended after `app.listen` during earlier edit)
- Fixed `SheetTrigger` nested `<button>` hydration error — use `className` on trigger directly
- Documented port-3001 kill command for stale processes

### Session 13 — Checkpoint Feature
- `checkpointMsgId` state + `parsedFiles` respects it
- Clock/RotateCcw pill buttons on non-latest assistant messages
- Amber right-panel banner + "Return to latest" button
- New message send auto-clears checkpoint

### Session 14 — Prompt Enhancer
- `/api/enhance-prompt` endpoint on Express server
- Three enhancement levels (Low/Medium/High) with distinct meta-prompts
- Sub-template cards → open enhancer dialog first
- Home Wand2 → purple "✨ Enhance" button with disabled state
- `auth` imported from `./lib/firebase` in `App.tsx`
- Dialog: `max-w-3xl`, `max-h-[90vh]`, scrollable body, fixed-height enhanced textarea

### Session 15 — Enhancer Bug Fixes
- **Root cause**: Firestore `isValidProject` had `prompt.size() <= 5000` — enhanced prompts exceeded this causing "Missing or insufficient permissions" rejection
- Raised `prompt` limit: 5,000 → 50,000 chars
- Raised message `content` limit: 100,000 → 500,000 chars
- Redeployed Firestore rules
- Dialog widened `max-w-2xl` → `max-w-3xl`; added `max-h-[90vh]` + scrollable content area

---

## Known Issues / Open Work

| Priority | Issue | Notes |
|---|---|---|
| LOW | Groq provider has no suggestion chips | By design — Groq returns plain string, no parallel call |
| LOW | No pagination on project list | `subscribeToProjects` returns all user projects |
| LOW | Attachment upload UX (Camera/Drive items non-functional) | Dropdown items wired to `fileInputRef.click()` as placeholder |

All 14 original security audit issues are resolved.

---

## Important Gotchas

1. **Windows env var conflict:** `GEMINI_API_KEY` is set as a Windows User env var (old free-tier key ending `tyjLJc`). Server uses `dotenv override: true`. Do not remove this.

2. **Pyodide packages:** Streamlit preview runs in WebAssembly — only pure-Python wheels work. Never add C-extension packages to `app.py`. Bad-packages list is in `App.tsx` ~line 183.

3. **`@base-ui/react` quirks:**
   - `SheetTrigger` renders its own `<button>` — never nest a `<Button>` inside it (hydration error). Apply `className` directly to `SheetTrigger`.
   - `onValueChange` for Select is `(value: T | null) => void` — always null-guard.

4. **Gemini API billing:** Must use `apiVersion: 'v1beta'` in the SDK. `v1` returns `limit: 0` even with billing enabled.

5. **Firestore `orderBy` restriction:** `subscribeToProjects` must NOT use `orderBy` without a composite index. Uses `where('userId')` only and sorts client-side.

6. **Server auth in dev:** `requireAuth` is a no-op when `GOOGLE_APPLICATION_CREDENTIALS` is not set. In production, point that env var to a Firebase service account JSON.

7. **Firestore prompt/content limits:** `isValidProject.prompt` ≤ 50,000 chars; `isValidMessage.content` ≤ 500,000 chars. Enhanced prompts (High level) are typically 2,000–4,000 chars — well within limits.

8. **Port conflicts:** Multiple `npm run dev` runs leave stale node processes on 3001. Kill before restart:
   ```powershell
   Get-NetTCPConnection -LocalPort 3001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
   ```
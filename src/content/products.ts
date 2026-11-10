import { links } from './links'
import type { ImageId } from './images'

/** Final product copy (copy deck T1). Product accents are for marks, rules and glows; small accent text uses `text`. */
export type Product = {
  id: string
  name: string
  index: string
  category: string
  headline: string
  summary: string
  forWho: string
  features: { title: string; body: string }[]
  trust: string
  cta: { label: string; href: string; external?: boolean; interest?: string }
  mark: { src: string; w: number; h: number }
  /** a1/a2/a3: gradient and glow stops. text: the one accent allowed for small text (checked in scripts/contrast.mjs). */
  accent: { a1: string; a2: string; a3?: string; text: string; textToken: string }
  image: ImageId
  motif: 'pipeline' | 'voices' | 'flow'
  motifLabel: string
}

export const products: Product[] = [
  {
    id: 'forceide',
    name: 'ForceIDE',
    index: '01',
    category: 'Browser IDE for Salesforce',
    headline: 'Salesforce development, in your browser.',
    summary:
      'ForceIDE is a Monaco-based IDE for Salesforce metadata and code, covering retrieve, deploy, validate, Apex tests, debug logs and diffs. Each user connects their own production orgs or sandboxes through a managed OAuth connection, and tokens are encrypted at rest.',
    forWho: 'Salesforce developers and admins, and teams that need governed releases to their orgs.',
    features: [
      {
        title: 'Full metadata workflow',
        body: 'Retrieve, deploy and validate Salesforce metadata, run Apex tests and read debug logs in one editor.',
      },
      {
        title: 'Source sync and diffs',
        body: 'Sync source, compare diffs and search, with symbol and dependency analysis.',
      },
      {
        title: 'Governed DevOps releases',
        body: 'Releases pass validate and deploy stages, can require a same-organization reviewer, and can be backed up and reverted.',
      },
      {
        title: 'Autopilot tech-debt backlog',
        body: 'Autopilot scans production read-only and works approved tasks in a sandbox up to a review gate.',
      },
    ],
    trust: 'Autopilot can never deploy on its own, and agent actions pass the same permission, approval and audit checks as manual ones.',
    cta: { label: 'Book a demo', href: '#contact', interest: 'forceide' },
    mark: { src: '/brand/forceide-mark.png', w: 640, h: 589 },
    accent: { a1: '#1060FF', a2: '#00E5FF', text: '#00E5FF', textToken: 'fx-cyan' },
    image: 'product-forceide',
    motif: 'pipeline',
    motifLabel: 'Release pipeline: validate, then a review gate, then deploy.',
  },
  {
    id: 'collab-ai-pro',
    name: 'Collab AI Pro',
    index: '02',
    category: 'Multi-model AI team chat',
    headline: 'Build with several AI models, together.',
    summary:
      'Collab AI Pro lets Claude, GPT, OpenRouter, Ollama, vLLM and other models answer in one shared transcript, working in a registered project folder. Teams pick Standard, Collab or Crew mode, from a single message to structured build rounds or a lead model that delegates.',
    forWho: 'Engineering teams that want several AI models working on one project in a shared conversation.',
    features: [
      {
        title: 'One shared transcript',
        body: "Models see each other's turns as tagged blocks, and only human turns count as instructions.",
      },
      {
        title: 'Three chat modes',
        body: 'Standard for quick answers, Collab for plan-build-review rounds, Crew for lead-led delegation.',
      },
      {
        title: 'Decisions ledger and build board',
        body: 'Collab mode records decisions as D1, D2 and tracks work on a build board with waves.',
      },
      {
        title: 'Tools for project work',
        body: 'Models work with files, shell, git, worktrees, GitHub, Salesforce and browser automation.',
      },
    ],
    trust: 'Every tool call is audit-logged with secrets masked, and Salesforce production writes need admin approval in the chat.',
    cta: { label: 'Book a demo', href: '#contact', interest: 'collab-ai-pro' },
    mark: { src: '/brand/collab-mark.png', w: 577, h: 640 },
    accent: { a1: '#FF7A3D', a2: '#08C99B', a3: '#6E4BFF', text: '#08C99B', textToken: 'cb-teal' },
    image: 'product-collab',
    motif: 'voices',
    motifLabel: 'Three model voices converging into one shared transcript.',
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    index: '03',
    category: 'Governed AI task automation',
    headline: 'AI agents do the work. People approve it.',
    summary:
      'Phoenix moves each task through Backlog, Planning, In Progress, Review and Complete on a per-project Kanban board. A person approves the plan before any work starts, and approves, rejects or requests changes at review.',
    forWho: 'Development teams that want AI coding agents working their backlog, with people in charge of each decision.',
    features: [
      {
        title: 'Work found for you',
        body: 'An analyzer scans the codebase for bugs, tech debt and improvements, and removes duplicates.',
      },
      {
        title: 'Plan approval first',
        body: 'An AI asks clarifying questions, then writes a checklist plan that a person approves or edits.',
      },
      {
        title: 'Isolated task runs',
        body: 'Each task gets its own tmux session, git worktree and test database, watchable in the browser.',
      },
      {
        title: 'Fallbacks and GitHub PRs',
        body: 'A fallback model can retry failed tasks, and Phoenix opens a GitHub PR at finish.',
      },
    ],
    trust: 'Human approval gates, resource limits that can pause new tasks, and an emergency stop.',
    cta: { label: 'Visit Phoenix', href: links.phoenix, external: true },
    mark: { src: '/brand/phoenix-mark.png', w: 462, h: 585 },
    accent: { a1: '#F0471A', a2: '#FFB11F', text: '#FFB11F', textToken: 'ph-amber' },
    image: 'product-phoenix',
    motif: 'flow',
    motifLabel: 'Phoenix board: Backlog, Planning, In Progress, Review, Complete, with a person approving the plan and the review.',
  },
]

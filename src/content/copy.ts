/** Final copy from the copy deck (T1). Edit here; components only lay it out. */

export const meta = {
  title: "RubyTorch — Ideas built bolder. ForceIDE, Collab AI Pro and Phoenix",
  description:
    'RubyTorch creates, owns and operates a family of AI-powered developer products for companies and small teams: ForceIDE, Collab AI Pro and Phoenix.',
}

export const hero = {
  eyebrow: 'RubyTorch · Software for a brighter tomorrow',
  // The h1 reads as one sentence: the big line, then the supporting line.
  lead: ['Ideas built', 'bolder.'],
  leadMobile: ['Ideas', 'built', 'bolder.'],
  support: 'AI that works inside your engineering process.',
  subline:
    'RubyTorch creates, owns and operates a family of AI-powered developer products for companies and small teams. Each one stands on its own, and keeps people in charge of what ships.',
}

export const family = {
  label: 'The family',
  lines: ['Three products.', 'One path from idea', 'to shipped code.'],
  body: 'Collab AI Pro helps a team plan and build with several AI models in one chat. Phoenix turns approved work into governed AI tasks. ForceIDE brings governed release workflows to Salesforce teams. Each stands alone; together they cover idea to shipped code.',
  statement: 'Different problems. A shared purpose.',
}

export const products = {
  label: 'Products',
  builtFor: 'Built for',
  trustLabel: 'Governed by design',
}

export const principles = {
  label: 'Principles',
  title: 'How we build.',
  items: [
    {
      name: 'Human approval gates',
      body: "Plans, reviews and production writes wait for a person. Autopilot can't deploy on its own.",
      icon: 'gate',
    },
    {
      name: 'Audit trails',
      body: 'Agent actions pass the same permission, approval and audit checks as manual ones. Tool calls are logged with secrets masked.',
      icon: 'ledger',
    },
    {
      name: 'Per-user isolation',
      body: "Each member gets a private tenant. Orgs, workspaces and AI credentials aren't shared; the one exception is a reviewer seeing a frozen release snapshot.",
      icon: 'tenant',
    },
    {
      name: 'Bring your own model',
      body: 'Use a direct API key or your own Codex or Claude subscription.',
      icon: 'model',
    },
  ],
} as const

export const contact = {
  label: 'Contact',
  title: "Ignite what's next with RubyTorch.",
  body: "Tell us about your team and the work you want to speed up, and we'll show you which product fits.",
  formTitle: 'Book a demo',
  formIntro: 'A few details and we will be in touch.',
  thanks: "Thanks — this demo form isn't connected yet.",
}

export const footer = {
  blurb: 'RubyTorch creates, owns and operates a family of AI-powered products. Each one is built to stand on its own, and built to last.',
}

/**
 * FICTIONAL PRODUCTS. Mike asked for invented products (decision D3) so the
 * design can be judged as if it were finished. Replace names, copy and images
 * with the real portfolio before launch. Names were checked against a web search
 * on 2026-10-04 (Ashline and Coalface were dropped because they collide with
 * existing software companies). This is not a trademark clearance.
 */
import type { ImageId } from './images'

export type Product = {
  id: string
  index: string
  name: string
  category: string
  promise: string
  body: string
  capabilities: [string, string, string]
  image: ImageId
}

export const products: Product[] = [
  {
    id: 'cinderlens',
    index: '01',
    name: 'Cinderlens',
    category: 'Autonomous code review',
    promise: 'A reviewer that learns how your team writes code.',
    body: 'Cinderlens reads every pull request the way your best senior engineer would. It learns your conventions from merged history, so its feedback sounds like your team, not a linter.',
    capabilities: [
      'Learns house style from merged history',
      'Flags risky changes before they ship',
      'Writes fix-ready suggestions inline',
    ],
    image: 'product-cinderlens',
  },
  {
    id: 'flintpath',
    index: '02',
    name: 'Flintpath',
    category: 'AI test generation & QA',
    promise: 'Coverage that writes itself, and keeps up.',
    body: 'Flintpath maps the paths through your application and generates the tests that matter: unit, integration and end-to-end. When the code changes, the suite changes with it.',
    capabilities: [
      'Generates tests from real user paths',
      'Repairs brittle tests when the UI moves',
      'Ranks gaps by production risk',
    ],
    image: 'product-flintpath',
  },
  {
    id: 'brasswire',
    index: '03',
    name: 'Brasswire',
    category: 'Integration builder',
    promise: 'From API docs to tested connectors in an afternoon.',
    body: 'Point Brasswire at an API reference and it drafts a typed connector, a contract test suite and a sandbox to run it in. Your engineers review and ship instead of starting from scratch.',
    capabilities: [
      'Reads OpenAPI, GraphQL and plain docs',
      'Generates typed clients with contract tests',
      'Watches upstream APIs for breaking changes',
    ],
    image: 'product-brasswire',
  },
  {
    id: 'kilnshift',
    index: '04',
    name: 'Kilnshift',
    category: 'Legacy modernisation',
    promise: 'Modernise the system nobody wants to touch.',
    body: 'Kilnshift builds a working model of a legacy codebase, then plans and carries out the migration in small, verified steps, so the business keeps running while the code moves forward.',
    capabilities: [
      'Maps dependencies across decades of code',
      'Migrates module by module with parity checks',
      'Keeps a reversible record of every change',
    ],
    image: 'product-kilnshift',
  },
]

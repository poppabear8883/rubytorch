/** Tiny bridge so a product CTA can preselect "Product of interest" in the demo form. */
const EVENT = 'rt:interest'
let current = ''

export function setInterest(id: string) {
  current = id
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }))
}
export function getInterest() {
  return current
}
export function onInterest(fn: (id: string) => void) {
  const h = (e: Event) => fn((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, h)
  return () => window.removeEventListener(EVENT, h)
}

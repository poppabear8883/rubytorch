import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Family } from './sections/Family'
import { Products } from './sections/Products'
import { Principles } from './sections/Principles'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Family />
        <Products />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

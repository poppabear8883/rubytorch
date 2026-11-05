import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Thesis } from './sections/Thesis'
import { Portfolio } from './sections/Portfolio'
import { Approach } from './sections/Approach'
import { Principles } from './sections/Principles'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Thesis />
        <Portfolio />
        <Approach />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

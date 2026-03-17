import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Overlay from './components/Overlay'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import ScrollyCanvas from './components/ScrollyCanvas'
import Skills from './components/Skills'

function App() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white grain">
      <ScrollProgress />
      <Navbar />
      <Cursor />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/12 blur-[140px]" />
        <div className="absolute right-0 top-[22rem] h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-fuchsia-600/8 blur-[140px]" />
      </div>

      <main>
        <section className="relative">
          <ScrollyCanvas />
          <Overlay />
        </section>

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App

import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Services from "./components/Services"
import Education from "./components/Education"
import Gallery from "./components/Gallery"
import Contact from "./components/Contact"
import FloatingNav from "./components/floating-nav"

export default function Home() {
  return (
    <main className="bg-gray-900 dark:bg-gray-950 min-h-screen">
      <FloatingNav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Gallery />
      <Education />
      <Contact />
    </main>
  )
}


import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import OpenSource from '../sections/OpenSource'
import Repositories from '../sections/Repositories'
import Subscribe from '../sections/Subscribe'
import Enterprise from '../sections/Enterprise'
import Team from '../sections/Team'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cyber-black overflow-x-hidden">
      <div className="relative z-10">
        <Header />
        <Hero />
        <OpenSource />
        <Enterprise />
        <Repositories />
        <Subscribe />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

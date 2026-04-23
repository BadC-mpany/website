import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'

const HowItWorks   = dynamic(() => import('../sections/HowItWorks'))
const ThreatModel  = dynamic(() => import('../sections/ThreatModel'))
const OpenSource   = dynamic(() => import('../sections/OpenSource'))
const Enterprise   = dynamic(() => import('../sections/Enterprise'))
const Repositories = dynamic(() => import('../sections/Repositories'))
const Subscribe    = dynamic(() => import('../sections/Subscribe'))
const Team         = dynamic(() => import('../sections/Team'))
const Contact      = dynamic(() => import('../sections/Contact'))

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cyber-black overflow-x-hidden">
      <div className="relative z-10">
        <Header />
        <Hero />
        <HowItWorks />
        <ThreatModel />
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

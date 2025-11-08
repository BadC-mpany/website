import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Repositories from '../sections/Repositories'
import Subscribe from '../sections/Subscribe'
import Game from '../sections/Game'
import Unique from '../sections/Unique'
import Team from '../sections/Team'
import Contact from '../sections/Contact'
import Noise from '../ui/noise'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Noise 
          patternSize={200}
          patternRefreshInterval={3}
          patternAlpha={12}
          quality="medium"
          performanceMode={true}
        />
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <Repositories />
        <Subscribe />
        <Game />
        <Unique />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}


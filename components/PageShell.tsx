import Header from './Header'
import Footer from './Footer'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop">
      <div className="stage">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

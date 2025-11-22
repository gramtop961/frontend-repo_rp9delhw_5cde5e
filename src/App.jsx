import Hero from './components/Hero'
import ScanPanel from './components/ScanPanel'
import Highlights from './components/Highlights'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <Hero />
      <ScanPanel />
      <Highlights />
      <footer className="relative z-10 text-center text-blue-200/60 pb-12">Built with a glassy, gradient-rich interface.</footer>
    </div>
  )
}

export default App

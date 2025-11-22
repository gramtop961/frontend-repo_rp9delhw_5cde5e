import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0"><Spline scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode" style={{ width: '100%', height: '100%' }} /></div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">SmartScan AI</h1>
          <p className="mt-4 text-blue-100/90 text-sm md:text-base max-w-2xl">
            Scan any food once—get instant, goal-aware verdicts, allergen checks, metabolic insights, and healthier alternatives in a single flow.
          </p>
          <div className="mt-6 inline-flex gap-3 text-xs text-blue-200/80">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Dual-Mode Recognition</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Goal-Aware Verdicts</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Allergen Detection</span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950/90" />
    </section>
  )
}

export default function Highlights() {
  const items = [
    { title: 'Instant Verdict Engine', desc: 'Sub-second green/yellow/red for your goal.' },
    { title: 'Allergen Detection', desc: 'Flags risky ingredients matched to your profile.' },
    { title: 'Metabolic Prediction', desc: 'Estimates glucose spikes from nutrients.' },
    { title: 'Healthy Alternatives', desc: 'Finds real products you can actually buy.' },
  ]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((it, i)=> (
          <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white font-semibold">{it.title}</p>
            <p className="text-blue-200/80 text-sm mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

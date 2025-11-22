import { useState } from 'react'

const goals = [
  { id: 'balanced', label: 'Balanced' },
  { id: 'weight_loss', label: 'Weight Loss' },
  { id: 'muscle_gain', label: 'Muscle Gain' },
  { id: 'heart_health', label: 'Heart Health' },
  { id: 'low_sugar', label: 'Low Sugar' },
]

export default function ScanPanel() {
  const [userId] = useState('demo-user')
  const [goal, setGoal] = useState('balanced')
  const [barcode, setBarcode] = useState('7622210449283') // example
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleBarcodeLookup = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/barcode/${barcode}`)
      if (!res.ok) throw new Error('Not found')
      const item = await res.json()
      const verdictRes = await fetch(`${baseUrl}/api/verdict`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, goal, item })
      })
      const data = await verdictRes.json()
      setResult({ item, ...data })
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 mx-auto max-w-5xl -mt-24 px-6 pb-20">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold">Quick Scan</h3>
          <label className="block mt-4 text-sm text-blue-100">Goal</label>
          <select value={goal} onChange={(e)=>setGoal(e.target.value)} className="w-full mt-2 bg-slate-900/60 text-white rounded-lg border border-white/10 p-2">
            {goals.map(g=> <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
          <label className="block mt-4 text-sm text-blue-100">Barcode</label>
          <input value={barcode} onChange={e=>setBarcode(e.target.value)} placeholder="Enter barcode" className="w-full mt-2 bg-slate-900/60 text-white rounded-lg border border-white/10 p-2" />
          <button onClick={handleBarcodeLookup} disabled={loading} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg py-2">{loading? 'Scanning...' : 'Scan & Verdict'}</button>
          <p className="text-xs text-blue-200/70 mt-3">Demo uses OpenFoodFacts and heuristic verdicts.</p>
        </div>

        <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          {!result && <p className="text-blue-100/80">Results appear here after you scan.</p>}
          {result?.error && <p className="text-red-300">Error: {result.error}</p>}
          {result && !result.error && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {result.item?.image_url && (<img src={result.item.image_url} className="w-20 h-20 rounded-lg object-cover" />)}
                <div>
                  <h4 className="text-white font-semibold">{result.item?.name || 'Unknown product'}</h4>
                  <p className="text-blue-200/80 text-sm">{result.item?.brand}</p>
                </div>
                <span className={`ml-auto text-xs px-3 py-1 rounded-full border ${result.verdict?.color==='green'?'bg-emerald-500/20 border-emerald-400/40 text-emerald-200':result.verdict?.color==='yellow'?'bg-amber-500/20 border-amber-400/40 text-amber-200':'bg-rose-500/20 border-rose-400/40 text-rose-200'}`}>{result.verdict?.color?.toUpperCase()}</span>
              </div>
              <p className="text-blue-100/90 text-sm">{result.verdict?.explanation}</p>
              {result.allergens?.length>0 && (
                <p className="text-rose-200 text-sm">Allergens: {result.allergens.join(', ')}</p>
              )}
              {result.alternatives?.length>0 && (
                <div>
                  <p className="text-blue-100 font-medium mb-2">Healthier Alternatives</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.alternatives.map((alt, idx)=> (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                        {alt.image_url && <img src={alt.image_url} className="w-12 h-12 rounded object-cover" />}
                        <div>
                          <p className="text-white text-sm leading-tight">{alt.name}</p>
                          <p className="text-blue-200/70 text-xs">{alt.brand}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

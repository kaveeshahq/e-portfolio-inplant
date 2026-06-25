import { swot } from "../data/content"

const quadrants = [
  { key: "strengths", label: "Strengths", bg: "bg-navy", text: "text-cream", dot: "bg-cream" },
  { key: "weaknesses", label: "Weaknesses", bg: "bg-indigo", text: "text-cream", dot: "bg-cream" },
  { key: "opportunities", label: "Opportunities", bg: "bg-steel", text: "text-cream", dot: "bg-cream" },
  { key: "threats", label: "Threats", bg: "bg-cream", text: "text-navy", dot: "bg-navy" },
]

export default function Swot() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">SWOT Analysis</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">A personal reflection on strengths, weaknesses, opportunities, and threats identified during my training.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map(({ key, label, bg, text, dot }) => (
          <div key={key} className={`${bg} ${text} rounded-xl p-6 shadow-sm`}>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide opacity-90">{label}</h2>
            <ul className="space-y-2">
              {swot[key].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm opacity-90">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
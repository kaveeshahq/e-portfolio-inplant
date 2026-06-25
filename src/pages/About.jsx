import { useState } from "react"
import { User, Building2, BookOpen, ArrowRight } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { aboutSections } from "../data/content"

const panels = [
  {
    id: "student",
    num: "01",
    icon: User,
    title: "About me",
    desc: "Background, interests, and what led me to this experience in community nutrition.",
    gradient: "from-[#111844] to-[#1e2d6e]",
  },
  {
    id: "organization",
    num: "02",
    icon: Building2,
    title: "Organization",
    desc: "Scaling Up Nutrition People's Forum Sri Lanka, Badulla Division — mission and scope.",
    gradient: "from-[#4B5694] to-[#6370b0]",
  },
  {
    id: "course",
    num: "03",
    icon: BookOpen,
    title: "The course",
    desc: "The in-plant training module — objectives, academic context, and expected outcomes.",
    gradient: "from-[#7288AE] to-[#8fa5c5]",
  },
]

export default function About() {
  const [active, setActive] = useState(null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-xs text-steel uppercase tracking-widest border border-steel/30 rounded-full px-4 py-1.5 mb-6">
          <span>✦</span> In-Plant Training Portfolio
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
          The story behind<br />10 weeks of growth
        </h1>
        <p className="text-steel text-base leading-relaxed max-w-lg mx-auto">
          An immersive journey through community nutrition, field research, and personal discovery — with the Scaling Up Nutrition People's Forum Sri Lanka.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-indigo/10" />
        <span className="text-xs text-steel/50 uppercase tracking-widest">Explore</span>
        <div className="flex-1 h-px bg-indigo/10" />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {panels.map((panel) => {
          const Icon = panel.icon
          const isActive = active === panel.id
          return (
            <button
              key={panel.id}
              onClick={() => setActive(isActive ? null : panel.id)}
              className={`group relative rounded-[24px] p-7 text-left border transition-all duration-[350ms] overflow-hidden
                ${isActive
                  ? `bg-gradient-to-br ${panel.gradient} border-transparent shadow-lg scale-[1.02]`
                  : "bg-white border-indigo/15 hover:border-indigo/40 hover:-translate-y-1 hover:shadow-md"
                }`}
            >
              <span className={`text-[11px] uppercase tracking-widest mb-5 block transition-colors duration-300
                ${isActive ? "text-white/30" : "text-steel/40"}`}>
                {panel.num}
              </span>

              <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center mb-5 border transition-all duration-300
                ${isActive
                  ? "bg-white/15 border-white/20"
                  : "bg-cream/60 border-indigo/15 group-hover:bg-cream"
                }`}>
                <Icon size={20} className={`transition-colors duration-300 ${isActive ? "text-white" : "text-indigo"}`} />
              </div>

              <h3 className={`font-semibold text-base mb-2 transition-colors duration-300 ${isActive ? "text-white" : "text-navy"}`}>
                {panel.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${isActive ? "text-white/75" : "text-steel"}`}>
                {panel.desc}
              </p>

              <div className={`flex items-center gap-1.5 text-xs transition-all duration-300 ${isActive ? "text-white/60" : "text-steel/50"}`}>
                {isActive ? "Close" : "Learn more"}
                <ArrowRight
                  size={13}
                  className={`transition-transform duration-300 ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail Panel */}
      {active && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {active === "student" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">{aboutSections.student.title}</h2>
              <p className="text-steel leading-relaxed mb-6">{aboutSections.student.content}</p>
              <div className="flex flex-wrap gap-2">
                {aboutSections.student.highlights.map((h) => (
                  <Badge key={h} className="bg-navy/5 text-navy border-navy/15 rounded-full">{h}</Badge>
                ))}
              </div>
            </div>
          )}

          {active === "organization" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">{aboutSections.organization.title}</h2>
              <p className="text-steel leading-relaxed mb-5">{aboutSections.organization.content}</p>
              {aboutSections.organization.website && (
                <a
                  href={aboutSections.organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo text-sm hover:text-navy transition-colors"
                >
                  Visit website <ArrowRight size={13} />
                </a>
              )}
            </div>
          )}

          {active === "course" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">{aboutSections.course.title}</h2>
              <p className="text-steel leading-relaxed">{aboutSections.course.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
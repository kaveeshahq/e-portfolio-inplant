import { BookOpen, GraduationCap, Heart, Compass, Sparkles, TrendingUp, Target, ArrowRight } from "lucide-react"
import Reveal from "../components/Reveal"
import CountUp from "../components/CountUp"
import { reflections } from "../data/content"

/* Splits a multi-paragraph string into spaced <p> blocks. */
function Prose({ text }) {
  return text
    .split(/\n\s*\n/)
    .map((para, i) => (
      <p key={i} className="text-steel leading-relaxed mb-4 last:mb-0">
        {para.trim()}
      </p>
    ))
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-indigo flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Card({ icon: Icon, label, children }) {
  return (
    <Reveal>
      <section className="bg-white border border-indigo/15 rounded-[24px] p-7 md:p-9 transition-shadow duration-300 hover:shadow-md group">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-navy rounded-[12px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon size={17} className="text-cream" />
          </div>
          <h2 className="font-bold text-navy text-lg">{label}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  )
}

/* Sub-block inside a reflection card. */
function SubBlock({ icon: Icon, title, children }) {
  return (
    <div className="pt-6 mt-6 border-t border-indigo/10">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={14} className="text-indigo" />
        <h3 className="text-xs font-semibold text-navy uppercase tracking-widest">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Reflections() {
  const r = reflections

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <Reveal className="text-center mb-10">
        <h1 className="text-3xl font-bold text-navy mb-3">Reflections</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">Key takeaways and personal reflections from my 10-week journey.</p>
      </Reveal>

      {/* Key figures */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {r.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="h-full">
            <div className="h-full bg-cream/50 border border-indigo/10 rounded-[18px] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-sm">
              <div className="text-2xl font-bold text-navy mb-1">
                <CountUp value={s.value} />
              </div>
              <div className="text-[11px] text-steel leading-snug">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="space-y-6">
        <Card icon={BookOpen} label="Overall Reflection">
          <Prose text={r.overall.content} />
          <SubBlock icon={Sparkles} title="Key takeaways">
            <BulletList items={r.overall.takeaways} />
          </SubBlock>
        </Card>

        <Card icon={GraduationCap} label="Academic Connection">
          <Prose text={r.academic.content} />
          <SubBlock icon={ArrowRight} title="Course units in the field">
            <div className="space-y-4">
              {r.academic.links.map((link) => (
                <div key={link.unit} className="bg-cream/50 border border-indigo/10 rounded-[18px] p-5">
                  <h4 className="text-sm font-semibold text-navy mb-2">{link.unit}</h4>
                  <p className="text-sm text-steel leading-relaxed">{link.applied}</p>
                </div>
              ))}
            </div>
            <p className="text-steel leading-relaxed text-sm mt-5">{r.academic.closing}</p>
          </SubBlock>
        </Card>

        <Card icon={Heart} label="Personal Growth">
          <Prose text={r.personal.content} />
          <SubBlock icon={TrendingUp} title="What grew">
            <BulletList items={r.personal.growth} />
          </SubBlock>
        </Card>

        <Card icon={Compass} label="Looking Forward">
          <Prose text={r.future.content} />
          <SubBlock icon={Target} title="Where I go from here">
            <BulletList items={r.future.items} />
          </SubBlock>
        </Card>
      </div>
    </div>
  )
}

import { useState } from "react"
import {
  User,
  Building2,
  BookOpen,
  ArrowRight,
  Home,
  GraduationCap,
  Sparkles,
  Target,
  Heart,
  Compass,
  Globe,
  Eye,
  Flag,
  ListChecks,
  Network,
  Users,
  Landmark,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Layers,
  Award,
  ClipboardCheck,
} from "lucide-react"
import { Badge } from "../components/ui/badge"
import Reveal from "../components/Reveal"
import CountUp from "../components/CountUp"
import { aboutSections } from "../data/content"

const panels = [
  {
    id: "student",
    num: "01",
    icon: User,
    title: "About me",
    desc: "Background, university life, strengths, values, and where I want my career to go.",
    gradient: "from-[#111844] to-[#1e2d6e]",
  },
  {
    id: "organization",
    num: "02",
    icon: Building2,
    title: "Organization",
    desc: "Scaling Up Nutrition People's Forum Sri Lanka: global roots, mission, network, and where to find them.",
    gradient: "from-[#4B5694] to-[#6370b0]",
  },
  {
    id: "course",
    num: "03",
    icon: BookOpen,
    title: "The course",
    desc: "The in-plant training module: objectives, academic context, and expected outcomes.",
    gradient: "from-[#7288AE] to-[#8fa5c5]",
  },
]

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

/* A titled sub-block inside a detail card, revealed as it scrolls into view. */
function Section({ icon: Icon, title, children }) {
  return (
    <Reveal>
      <section className="pt-8 mt-8 border-t border-indigo/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-cream/70 border border-indigo/15 flex items-center justify-center flex-shrink-0">
            <Icon size={17} className="text-indigo" />
          </div>
          <h3 className="text-lg font-semibold text-navy leading-snug">{title}</h3>
        </div>
        {children}
      </section>
    </Reveal>
  )
}

function BulletList({ items, tone = "navy" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
          <span
            className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              tone === "navy" ? "bg-indigo" : "bg-steel/50"
            }`}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function NumberList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
          <span className="mt-px w-5 h-5 rounded-full bg-cream border border-indigo/15 text-[10px] font-semibold text-indigo flex items-center justify-center flex-shrink-0">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  )
}

/* Compact key-figure tile. */
function Stat({ value, label }) {
  return (
    <div className="h-full bg-cream/50 border border-indigo/10 rounded-[18px] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-sm">
      <div className="text-2xl font-bold text-navy mb-1">
        <CountUp value={value} />
      </div>
      <div className="text-[11px] text-steel leading-snug">{label}</div>
    </div>
  )
}

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge
          key={item}
          className="bg-navy/5 text-navy border-navy/15 rounded-full font-normal transition-all duration-200 hover:bg-navy/10 hover:border-navy/30 hover:-translate-y-0.5"
        >
          {item}
        </Badge>
      ))}
    </div>
  )
}

/* Highlighted statement block used for vision / mission. */
function Statement({ icon: Icon, label, text }) {
  return (
    <div className="bg-cream/50 border border-indigo/10 rounded-[18px] p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} className="text-indigo" />
        <span className="text-xs font-semibold text-navy uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm text-steel leading-relaxed">{text}</p>
    </div>
  )
}

/* One partner CSO: who they are, and who started them. */
function OrgCard({ org }) {
  return (
    <div className="h-full bg-cream/50 border border-indigo/10 rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-sm">
      <Badge className="bg-navy/5 text-navy border-navy/15 rounded-full mb-3">{org.abbr}</Badge>
      <h4 className="text-sm font-semibold text-navy leading-snug mb-2">{org.name}</h4>
      <p className="text-sm text-steel leading-relaxed">
        Founded by {org.founder}
        {org.founded ? ` in ${org.founded}` : ""}.
      </p>
    </div>
  )
}

/*
 * The same three posts carry two titles depending on which organization is
 * naming them, so each row pairs them rather than listing six separate roles.
 */
function PositionPairs({ positions }) {
  return (
    <div className="space-y-2">
      {positions.map(([primary, alternate]) => (
        <div
          key={primary}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-cream/50 border border-indigo/10 rounded-[14px] px-4 py-3"
        >
          <span className="text-sm font-medium text-navy">{primary}</span>
          <span className="text-steel/40 text-xs">/</span>
          <span className="text-sm text-steel">{alternate}</span>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const [active, setActive] = useState(null)
  const me = aboutSections.student
  const org = aboutSections.organization
  const partners = org.partnerOrganizations
  const course = aboutSections.course
  const mapQuery = encodeURIComponent(org.office.address)

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-xs text-steel uppercase tracking-widest border border-steel/30 rounded-full px-4 py-1.5 mb-6 animate-rise">
          <span className="inline-block animate-pulse">✦</span> In-Plant Training Portfolio
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5 animate-rise [animation-delay:100ms]">
          The story behind<br />10 weeks of growth
        </h1>
        <p className="text-steel text-base leading-relaxed max-w-lg mx-auto animate-rise [animation-delay:200ms]">
          An immersive journey through community nutrition, field research, and personal discovery, with the Scaling Up Nutrition People's Forum Sri Lanka.
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
        {panels.map((panel, pi) => {
          const Icon = panel.icon
          const isActive = active === panel.id
          return (
            <Reveal key={panel.id} delay={pi * 110} className="h-full">
            <button
              onClick={() => setActive(isActive ? null : panel.id)}
              className={`group relative w-full h-full rounded-[24px] p-7 text-left border transition-all duration-[350ms] overflow-hidden
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
            </Reveal>
          )
        })}
      </div>

      {/* Detail Panel */}
      {active && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {active === "student" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8 md:p-10">
              <h2 className="text-xl font-bold text-navy mb-4">{me.title}</h2>
              <Prose text={me.content} />
              <div className="flex flex-wrap gap-2 mt-6">
                {me.highlights.map((h) => (
                  <Badge key={h} className="bg-navy/5 text-navy border-navy/15 rounded-full">{h}</Badge>
                ))}
              </div>

              <Section icon={Home} title={me.family.title}>
                <Prose text={me.family.content} />
              </Section>

              <Section icon={GraduationCap} title={me.university.title}>
                <BulletList items={me.university.items} />
              </Section>

              <Section icon={Sparkles} title={me.traits.title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cream/50 border border-indigo/10 rounded-[18px] p-5">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-widest mb-4">Strengths</h4>
                    <BulletList items={me.traits.strengths} />
                  </div>
                  <div className="bg-cream/50 border border-indigo/10 rounded-[18px] p-5">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-widest mb-4">Areas for improvement</h4>
                    <BulletList items={me.traits.weaknesses} tone="muted" />
                  </div>
                </div>
              </Section>

              <Section icon={Target} title={me.goals.title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-widest mb-4">Short term</h4>
                    <BulletList items={me.goals.shortTerm} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-widest mb-4">Long term</h4>
                    <BulletList items={me.goals.longTerm} />
                  </div>
                </div>
              </Section>

              <Section icon={Heart} title={me.hobbies.title}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <BulletList items={me.hobbies.items.slice(0, Math.ceil(me.hobbies.items.length / 2))} />
                  <div className="mt-2.5 sm:mt-0">
                    <BulletList items={me.hobbies.items.slice(Math.ceil(me.hobbies.items.length / 2))} />
                  </div>
                </div>
              </Section>

              <Section icon={Compass} title={me.values.title}>
                <div className="flex flex-wrap gap-2">
                  {me.values.items.map((v) => (
                    <Badge key={v} className="bg-navy/5 text-navy border-navy/15 rounded-full">{v}</Badge>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {active === "organization" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8 md:p-10">
              <h2 className="text-xl font-bold text-navy mb-1.5">{org.title}</h2>
              <p className="text-lg md:text-xl font-medium text-steel leading-snug mb-5">{org.name}</p>

              <Section icon={Building2} title={partners.title}>
                <p className="text-sm text-steel leading-relaxed mb-5">{partners.intro}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partners.orgs.map((o, i) => (
                    <Reveal key={o.abbr} delay={i * 90} className="h-full">
                      <OrgCard org={o} />
                    </Reveal>
                  ))}
                </div>
                <p className="text-sm text-steel leading-relaxed mt-5">{partners.outro}</p>
              </Section>

              <Section icon={Network} title={partners.structure.title}>
                <p className="text-sm text-steel leading-relaxed mb-4">
                  {partners.structure.intro}
                </p>
                <PositionPairs positions={partners.structure.positions} />

                <p className="text-sm text-steel leading-relaxed mt-6 mb-4">
                  {partners.structure.committeeIntro}
                </p>
                <BulletList items={partners.structure.committee} />

                <p className="text-sm text-steel leading-relaxed mt-5">
                  {partners.structure.note}
                </p>

                {partners.structure.image && (
                  <figure className="mt-6">
                    <img
                      src={partners.structure.image}
                      alt="Organization structure chart of the partner Civil Society Organizations"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-[18px] border border-indigo/10 bg-cream/40"
                    />
                    {partners.structure.imageCaption && (
                      <figcaption className="mt-3 text-xs text-steel/70 leading-relaxed">
                        {partners.structure.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </Section>

              <Section icon={ListChecks} title={partners.projects.title}>
                <p className="text-sm text-steel leading-relaxed mb-4">
                  {partners.projects.intro}
                </p>
                <ul className="space-y-2.5">
                  {partners.projects.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm text-steel leading-relaxed"
                    >
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-indigo flex-shrink-0" />
                      <span>
                        {item.text}
                        {item.ongoing && (
                          <span className="ml-2 align-middle text-[10px] uppercase tracking-widest text-indigo border border-indigo/25 rounded-full px-2 py-0.5 whitespace-nowrap">
                            Ongoing
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section icon={Globe} title="The Scaling Up Nutrition People’s Forum (SUN PF)">
                <Prose text={org.content} size="text-lg" />
              </Section>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
                {org.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90} className="h-full">
                    <Stat value={s.value} label={s.label} />
                  </Reveal>
                ))}
              </div>

              <Section icon={Globe} title={org.global.title}>
                <Prose text={org.global.content} />
              </Section>

              <Section icon={Eye} title="Vision & Mission">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Statement icon={Eye} label="Vision" text={org.vision} />
                  <Statement icon={Flag} label="Mission" text={org.mission} />
                </div>
              </Section>

              <Section icon={Target} title="Strategic Objectives">
                <BulletList items={org.objectives} />
              </Section>

              <Section icon={ListChecks} title="Main Activities">
                <Chips items={org.activities} />
              </Section>

              <Section icon={Network} title={org.network.title}>
                <Prose text={org.network.content} />
                <div className="mt-5">
                  <h4 className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">
                    Districts with coordinators
                  </h4>
                  <Chips items={org.network.districts} />
                </div>
              </Section>

              <Section icon={Users} title="Partners">
                <Chips items={org.partners} />
              </Section>

              <Section icon={Landmark} title="Governance">
                <BulletList items={org.governance} />
              </Section>

              <Section icon={HeartHandshake} title={org.impact.title}>
                <Prose text={org.impact.content} />
              </Section>

              <Section icon={Lightbulb} title={org.learning.title}>
                <p className="text-sm text-steel leading-relaxed mb-4">
                  Working with SUN PF builds hands-on experience across:
                </p>
                <Chips items={org.learning.items} />
              </Section>

              {/* Head office + map */}
              <Section icon={MapPin} title={org.office.title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                      <MapPin size={15} className="text-indigo mt-0.5 flex-shrink-0" />
                      {org.office.address}
                    </div>
                    <a
                      href={`tel:${org.office.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-steel hover:text-navy transition-colors"
                    >
                      <Phone size={15} className="text-indigo flex-shrink-0" />
                      {org.office.phone}
                    </a>
                    <a
                      href={`mailto:${org.office.email}`}
                      className="flex items-center gap-3 text-sm text-steel hover:text-navy transition-colors"
                    >
                      <Mail size={15} className="text-indigo flex-shrink-0" />
                      {org.office.email}
                    </a>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-navy text-cream text-xs rounded-full px-4 py-2 hover:bg-indigo transition-colors"
                      >
                        Get directions <ArrowRight size={12} />
                      </a>
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-indigo/25 text-indigo text-xs rounded-full px-4 py-2 hover:border-indigo hover:bg-cream/60 transition-colors"
                      >
                        Visit website <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-[18px] overflow-hidden border border-indigo/15 bg-cream/40">
                    <iframe
                      title="SUN PF head office location on Google Maps"
                      src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
                      className="w-full h-[240px] block"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </Section>
            </div>
          )}

          {active === "course" && (
            <div className="bg-white border border-indigo/15 rounded-[24px] p-8 md:p-10">
              <h2 className="text-xl font-bold text-navy mb-1">{course.title}</h2>
              <p className="text-sm text-steel/70 mb-5">{course.name}</p>
              <div className="mb-6">
                <Chips items={course.tags} />
              </div>
              <Prose text={course.content} />

              <Section icon={Target} title={course.aims.title}>
                <NumberList items={course.aims.items} />
              </Section>

              <Section icon={Layers} title={course.buildsOn.title}>
                <p className="text-sm text-steel leading-relaxed mb-4">{course.buildsOn.content}</p>
                <Chips items={course.buildsOn.items} />
              </Section>

              <Section icon={Award} title={course.outcomes.title}>
                <p className="text-sm text-steel leading-relaxed mb-4">{course.outcomes.content}</p>
                <NumberList items={course.outcomes.items} />
              </Section>

              <Section icon={ClipboardCheck} title={course.responsibilities.title}>
                <NumberList items={course.responsibilities.items} />
              </Section>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

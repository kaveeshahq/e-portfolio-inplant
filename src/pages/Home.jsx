import { Link } from "react-router-dom"
import { Calendar, MapPin, GraduationCap, Building2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Reveal from "../components/Reveal"
import { siteInfo } from "../data/content"
import profilePhoto from "../assets/profile.jpg"
import orgLogo from "../assets/logo.png"

const stats = [
  { icon: Calendar, label: "Duration", value: siteInfo.duration },
  { icon: MapPin, label: "Division", value: siteInfo.division },
  { icon: GraduationCap, label: "Degree", value: "B.Sc (Hons) Food Science and Nutrition" },
  { icon: Building2, label: "University", value: "Wayamba University of Sri Lanka" },
]

const navCards = [
  { title: "About", desc: "Learn about me, my course, and the organization.", path: "/about" },
  { title: "Weekly Journey", desc: "A week-by-week diary of my 10-week training.", path: "/journey" },
  { title: "Reflections", desc: "Key takeaways and personal reflections.", path: "/reflections" },
  { title: "FAQ", desc: "Common questions about the training program.", path: "/faq" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white py-20 px-4">
        {/* Drifting background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-indigo/30 blur-3xl animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-steel/20 blur-3xl animate-float [animation-delay:-3.5s]"
        />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-steel text-sm font-medium uppercase tracking-widest mb-3 animate-rise">
              In-Plant Training Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4 animate-rise [animation-delay:100ms]">
              {siteInfo.name}
            </h1>
            <p className="text-steel text-lg mb-2 animate-rise [animation-delay:180ms]">{siteInfo.degree}</p>
            <p className="text-steel/70 text-sm mb-6 animate-rise [animation-delay:240ms]">{siteInfo.university}</p>
            <p className="text-cream/80 text-base max-w-lg mb-8 animate-rise [animation-delay:300ms]">
              {siteInfo.tagline}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-rise [animation-delay:380ms]">
              <Link to="/journey">
                <Button className="bg-indigo hover:bg-indigo/80 text-cream transition-transform hover:-translate-y-0.5 group">
                  View My Journey
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-steel text-steel hover:text-white hover:bg-steel/10 transition-transform hover:-translate-y-0.5"
                >
                  About Me
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile photo */}
          <div className="relative flex-shrink-0 animate-rise [animation-delay:200ms]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-indigo animate-pulse-ring"
            />
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-indigo shadow-xl overflow-hidden bg-indigo/20 transition-transform duration-500 hover:scale-[1.03]">
              <img
                src={profilePhoto}
                alt={siteInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 90}>
              <Card className="h-full border-indigo/20 bg-white shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo/50 group">
                <CardContent className="pt-6 pb-4">
                  <Icon
                    className="mx-auto mb-2 text-indigo transition-transform duration-300 group-hover:scale-110"
                    size={24}
                  />
                  <p className="text-xs text-steel uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-navy font-semibold text-sm">{value}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Organization */}
      <section className="py-14 px-4 bg-white">
        <Reveal className="max-w-3xl mx-auto text-center">
          <img
            src={orgLogo}
            alt="Organization Logo"
            className="h-16 mx-auto mb-6 object-contain transition-transform duration-500 hover:scale-105"
          />
          <h2 className="text-2xl font-bold text-navy mb-3">{siteInfo.organization}</h2>
          <p className="text-steel">{siteInfo.division} · {siteInfo.duration} · {siteInfo.year}</p>
        </Reveal>
      </section>

      {/* Quick nav cards */}
      <section className="py-14 px-4 bg-cream/50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy text-center mb-10">Explore the Portfolio</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {navCards.map((item, i) => (
              <Reveal key={item.path} delay={i * 100} className="h-full">
                <Link to={item.path} className="block h-full">
                  <Card className="h-full border-indigo/20 hover:border-indigo hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-navy group-hover:text-indigo transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-steel text-sm">{item.desc}</p>
                      <ArrowRight
                        size={16}
                        className="mt-4 text-indigo opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

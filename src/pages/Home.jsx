import { Link } from "react-router-dom"
import { Calendar, MapPin, GraduationCap, Building2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { siteInfo } from "../data/content"
import profilePhoto from "../assets/profile.jpg"
import orgLogo from "../assets/logo.png"

const stats = [
  { icon: Calendar, label: "Duration", value: siteInfo.duration },
  { icon: MapPin, label: "Division", value: siteInfo.division },
  { icon: GraduationCap, label: "Degree", value: "B.Sc (Hons) Food Science" },
  { icon: Building2, label: "University", value: "Wayamba University of Sri Lanka" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-steel text-sm font-medium uppercase tracking-widest mb-3">In-Plant Training Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
              {siteInfo.name}
            </h1>
            <p className="text-steel text-lg mb-2">{siteInfo.degree}</p>
            <p className="text-steel/70 text-sm mb-6">{siteInfo.university}</p>
            <p className="text-cream/80 text-base max-w-lg mb-8">{siteInfo.tagline}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/journey">
                <Button className="bg-indigo hover:bg-indigo/80 text-cream">
                  View My Journey <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-steel text-steel hover:text-white hover:bg-steel/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex-shrink-0">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-indigo shadow-xl overflow-hidden bg-indigo/20">
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
          {stats.map(({ icon: Icon, label, value }) => (
            <Card key={label} className="border-indigo/20 bg-white shadow-sm text-center">
              <CardContent className="pt-6 pb-4">
                <Icon className="mx-auto mb-2 text-indigo" size={24} />
                <p className="text-xs text-steel uppercase tracking-wide mb-1">{label}</p>
                <p className="text-navy font-semibold text-sm">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Organization */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <img src={orgLogo} alt="Organization Logo" className="h-16 mx-auto mb-6 object-contain" />
          <h2 className="text-2xl font-bold text-navy mb-3">{siteInfo.organization}</h2>
          <p className="text-steel">{siteInfo.division} · {siteInfo.duration} · {siteInfo.year}</p>
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="py-14 px-4 bg-cream/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-navy text-center mb-10">Explore the Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "About", desc: "Learn about me, my course, and the organization.", path: "/about" },
              { title: "Weekly Journey", desc: "A week-by-week diary of my 10-week training.", path: "/journey" },
              { title: "SWOT Analysis", desc: "My personal SWOT analysis from the experience.", path: "/swot" },
              { title: "Reflections", desc: "Key takeaways and personal reflections.", path: "/reflections" },
              { title: "FAQ", desc: "Common questions about the training program.", path: "/faq" },
            ].map((item) => (
              <Link key={item.path} to={item.path}>
                <Card className="h-full border-indigo/20 hover:border-indigo hover:shadow-md transition-all group cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-navy group-hover:text-indigo transition-colors mb-2">{item.title}</h3>
                    <p className="text-steel text-sm">{item.desc}</p>
                    <ArrowRight size={16} className="mt-4 text-indigo opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
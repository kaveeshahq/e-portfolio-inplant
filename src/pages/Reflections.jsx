import { Card, CardContent } from "../components/ui/card"
import { BookOpen, GraduationCap, Heart, Compass } from "lucide-react"
import { reflections } from "../data/content"

const sections = [
  { key: "overall", label: "Overall Reflection", icon: BookOpen },
  { key: "academic", label: "Academic Connection", icon: GraduationCap },
  { key: "personal", label: "Personal Growth", icon: Heart },
  { key: "future", label: "Looking Forward", icon: Compass },
]

export default function Reflections() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">Reflections</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">Key takeaways and personal reflections from my 10-week journey.</p>
      </div>

      <div className="space-y-6">
        {sections.map(({ key, label, icon: Icon }) => (
          <Card key={key} className="border-indigo/20">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-cream" />
                </div>
                <h2 className="font-bold text-navy text-lg">{label}</h2>
              </div>
              <p className="text-steel leading-relaxed">{reflections[key]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
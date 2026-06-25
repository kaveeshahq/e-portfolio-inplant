import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import { weeks } from "../data/content"

export default function Journey() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">My Journey</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">A week-by-week account of my 10-week in-plant training experience.</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo/20 transform md:-translate-x-0.5" />

        <div className="space-y-8">
          {weeks.map((week, index) => (
            <div
              key={week.id}
              className={`relative flex flex-col md:flex-row gap-4 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-indigo rounded-full border-2 border-cream shadow transform -translate-x-1.5 md:-translate-x-1.5 mt-6" />

              {/* Spacer for alternating */}
              <div className="hidden md:block flex-1" />

              {/* Card */}
              <div className="flex-1 ml-10 md:ml-0 md:max-w-[45%]">
                <Link to={`/journey/${week.id}`}>
                  <Card className="border-indigo/20 hover:border-indigo hover:shadow-md transition-all group cursor-pointer">
                    <CardContent className="pt-5 pb-4 px-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-steel" />
                        <span className="text-xs text-steel">{week.dateRange}</span>
                      </div>
                      <h3 className="font-bold text-navy group-hover:text-indigo transition-colors mb-1">{week.title}</h3>
                      <p className="text-steel text-sm mb-3">{week.summary}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {week.highlights.slice(0, 2).map((h) => (
                          <Badge key={h} variant="outline" className="text-xs border-indigo/30 text-indigo">{h}</Badge>
                        ))}
                      </div>
                      <span className="text-xs text-indigo flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight size={12} />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
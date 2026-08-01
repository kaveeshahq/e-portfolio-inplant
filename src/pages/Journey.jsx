import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Reveal from "../components/Reveal"
import { weeks } from "../data/content"

/**
 * Percentage of the timeline the reader has scrolled past, used to fill the
 * vertical rail progressively rather than showing it all at once.
 */
function useTimelineFill(ref) {
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      if (rect.height === 0) return
      // The rail fills up to a line ~65% down the viewport.
      const marker = window.innerHeight * 0.65
      const passed = Math.min(Math.max(marker - rect.top, 0), rect.height)
      setFill((passed / rect.height) * 100)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [ref])

  return fill
}

export default function Journey() {
  const timelineRef = useRef(null)
  const fill = useTimelineFill(timelineRef)

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <Reveal className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">My Journey</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">A week-by-week account of my 10-week in-plant training experience.</p>
      </Reveal>

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Rail track */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo/15 transform md:-translate-x-0.5" />
        {/* Rail progress */}
        <div
          className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-indigo to-steel transform md:-translate-x-0.5 transition-[height] duration-200 ease-out"
          style={{ height: `${fill}%` }}
        />

        <div className="space-y-8">
          {weeks.map((week, index) => (
            <div
              key={week.id}
              className={`relative flex flex-col md:flex-row gap-4 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <TimelineDot />

              {/* Spacer for alternating */}
              <div className="hidden md:block flex-1" />

              {/* Card */}
              <div className="flex-1 ml-10 md:ml-0 md:max-w-[45%]">
                <Reveal direction={index % 2 === 0 ? "right" : "left"}>
                  <Link to={`/journey/${week.id}`}>
                    <Card className="border-indigo/20 hover:border-indigo hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
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
                        <span className="text-xs text-indigo flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Read more <ArrowRight size={12} />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/*
 * Pops in when its row reaches the viewport, so dots light up down the rail.
 * Positioning lives on the outer div — Reveal animates translate-x itself and
 * would fight a translate class applied to the same element.
 */
function TimelineDot() {
  return (
    <div className="absolute left-4 md:left-1/2 mt-6 z-10 -translate-x-1.5">
      <Reveal direction="zoom" duration={450}>
        <div className="w-3 h-3 bg-indigo rounded-full border-2 border-cream shadow" />
      </Reveal>
    </div>
  )
}

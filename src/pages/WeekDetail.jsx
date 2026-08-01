import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { ArrowLeft, Calendar, ExternalLink, FileText, FileSpreadsheet, Presentation, HardDrive, Link2, ChevronLeft, ChevronRight, X, PictureInPicture, Paperclip, Images, ListChecks } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Reveal from "../components/Reveal"
import { weeks } from "../data/content"

const iconMap = {
  form: { icon: Link2, color: "text-indigo bg-indigo/10 border-indigo/20", label: "Form" },
  slides: { icon: Presentation, color: "text-indigo bg-indigo/10 border-indigo/20", label: "Slides" },
  drive: { icon: HardDrive, color: "text-steel bg-steel/10 border-steel/20", label: "Drive" },
  docx: { icon: FileText, color: "text-navy bg-navy/10 border-navy/20", label: "Word" },
  xlsx: { icon: FileSpreadsheet, color: "text-navy bg-navy/10 border-navy/20", label: "Excel" },
  pdf: { icon: FileText, color: "text-steel bg-steel/10 border-steel/20", label: "PDF" },
  link: { icon: ExternalLink, color: "text-indigo bg-indigo/10 border-indigo/20", label: "Link" },
  picture: { icon: PictureInPicture, color: "text-green-600 bg-green-100 border-green-200", label: "Image" },
}

function AttachmentLink({ entry }) {
  const meta = iconMap[entry.icon] || iconMap.link
  const Icon = meta.icon
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-sm hover:-translate-y-0.5 ${meta.color}`}
    >
      <Icon size={15} />
      {entry.label}
      <ExternalLink size={11} className="opacity-50" />
    </a>
  )
}

/* Titled block with a divider above it. */
function Section({ icon: Icon, title, count, children }) {
  return (
    <Reveal>
      <section className="pt-8 mt-8 border-t border-indigo/10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-[10px] bg-cream/70 border border-indigo/15 flex items-center justify-center flex-shrink-0">
            <Icon size={15} className="text-indigo" />
          </div>
          <h2 className="text-base font-semibold text-navy">{title}</h2>
          {count != null && (
            <span className="text-xs text-steel/60">({count})</span>
          )}
        </div>
        {children}
      </section>
    </Reveal>
  )
}

function ImageGallery({ images }) {
  const [lightbox, setLightbox] = useState(null)

  if (!images || images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            style={{ animationDelay: `${Math.min(i, 12) * 55}ms` }}
            className="aspect-square rounded-xl overflow-hidden border border-indigo/10 hover:border-indigo/40 hover:shadow-md hover:-translate-y-0.5 transition-all group animate-rise"
          >
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-navy/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream/70 hover:text-cream"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 text-cream/70 hover:text-cream p-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length) }}
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={images[lightbox]}
            alt={`Photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-cream/70 hover:text-cream p-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length) }}
          >
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-4 text-cream/50 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

export default function WeekDetail() {
  const { id } = useParams()
  const week = weeks.find((w) => w.id === parseInt(id))

  if (!week) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-steel">Week not found.</p>
      <Link to="/journey">
        <Button className="mt-4 bg-indigo text-cream">Back to Journey</Button>
      </Link>
    </div>
  )

  const prev = weeks.find((w) => w.id === week.id - 1)
  const next = weeks.find((w) => w.id === week.id + 1)

  /* Flatten the week's days into one week-level view. */
  const days = week.days || []
  const allEntries = days.flatMap((d) => d.entries || [])
  const activities = allEntries.filter((e) => e.type === "text")
  const attachments = allEntries.filter((e) => e.type === "link" || e.type === "file")
  /* Same photo can be listed on more than one day — keep the first occurrence only. */
  const photos = [...new Set([...(week.images || []), ...days.flatMap((d) => d.images || [])])]

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <Link to="/journey" className="inline-flex items-center gap-2 text-steel hover:text-indigo text-sm mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Journey
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-steel" />
          <span className="text-xs text-steel">{week.dateRange}</span>
        </div>
        <h1 className="text-3xl font-bold text-navy mb-2">{week.title}</h1>
        <p className="text-steel text-lg">{week.summary}</p>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-2">
        {week.highlights.map((h) => (
          <Badge key={h} className="bg-indigo/10 text-indigo border-indigo/30 rounded-full">{h}</Badge>
        ))}
      </div>

      {days.length > 0 ? (
        <>
          {activities.length > 0 && (
            <Section icon={ListChecks} title="What I did this week">
              <ul className="space-y-3">
                {activities.map((entry, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/80 leading-relaxed">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-indigo flex-shrink-0" />
                    {entry.content}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {attachments.length > 0 && (
            <Section icon={Paperclip} title="Attachments & resources" count={attachments.length}>
              <div className="flex flex-wrap gap-2.5">
                {attachments.map((entry, i) => (
                  <AttachmentLink key={i} entry={entry} />
                ))}
              </div>
            </Section>
          )}

          {photos.length > 0 && (
            <Section icon={Images} title="Photos" count={photos.length}>
              <ImageGallery images={photos} />
            </Section>
          )}
        </>
      ) : (
        /* Fallback for old plain-text details */
        <div className="bg-cream/50 border border-indigo/10 rounded-xl p-6 mt-8">
          <p className="text-navy/80 leading-relaxed whitespace-pre-wrap text-sm">{week.details}</p>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex justify-between mt-14 pt-6 border-t border-indigo/20">
        {prev ? (
          <Link to={`/journey/${prev.id}`}>
            <Button variant="outline" className="border-indigo/30 text-indigo hover:bg-indigo/10">
              ← {prev.title}
            </Button>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/journey/${next.id}`}>
            <Button variant="outline" className="border-indigo/30 text-indigo hover:bg-indigo/10">
              {next.title} →
            </Button>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}

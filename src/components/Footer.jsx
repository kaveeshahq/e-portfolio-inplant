import { siteInfo } from "../data/content"

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-indigo/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-cream font-semibold">{siteInfo.name}</p>
        <p className="text-steel text-sm mt-1">{siteInfo.degree}</p>
        <p className="text-steel text-sm">{siteInfo.university}</p>
        <div className="mt-4 pt-4 border-t border-indigo/30">
          <p className="text-steel/60 text-xs">In-Plant Training Portfolio · {siteInfo.organization} · {siteInfo.division}</p>
        </div>
      </div>
    </footer>
  )
}
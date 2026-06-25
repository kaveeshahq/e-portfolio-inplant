import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { siteInfo } from "../data/content"

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Journey", path: "/journey" },
  { label: "SWOT", path: "/swot" },
  { label: "Reflections", path: "/reflections" },
  { label: "FAQ", path: "/faq" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-navy border-b border-indigo/30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-cream font-bold text-sm md:text-base">{siteInfo.name}</span>
          <span className="text-steel text-xs hidden md:block">In-Plant Training Portfolio</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                pathname === link.path
                  ? "bg-indigo text-cream"
                  : "text-steel hover:text-cream hover:bg-indigo/40"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-indigo/30 px-4 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === link.path
                  ? "bg-indigo text-cream"
                  : "text-steel hover:text-cream hover:bg-indigo/40"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
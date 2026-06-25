import { Link } from "react-router-dom"
import { Home as HomeIcon } from "lucide-react"
import { Button } from "../components/ui/button"

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-indigo text-6xl font-bold mb-4">404</p>
      <h1 className="text-2xl font-bold text-navy mb-3">Page not found</h1>
      <p className="text-steel mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/">
        <Button className="bg-indigo hover:bg-indigo/80 text-cream">
          <HomeIcon size={16} className="mr-2" /> Back to Home
        </Button>
      </Link>
    </div>
  )
}

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** React Router keeps the scroll position across routes; reset it on navigation. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}

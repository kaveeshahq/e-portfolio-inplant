import { useInView } from "../hooks/useInView"

const offsets = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  zoom: "scale-95",
  none: "",
}

/**
 * Fades and slides its children in the first time they scroll into view.
 * `delay` (ms) staggers siblings; `direction` sets where they travel from.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
}) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={`transition-[opacity,transform] ease-out will-change-[opacity,transform] ${
        inView ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${offsets[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  )
}

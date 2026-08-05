import { useEffect, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"

/* Splits "300+" into prefix "", number 300, suffix "+". */
function parse(value) {
  const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1],
    target: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
  }
}

/* Counting 0 → 2014 reads as a broken number, not an animation. */
function isYear(parsed) {
  return !parsed.suffix && !parsed.prefix && parsed.target >= 1900 && parsed.target <= 2100
}

/** Animates a number up from zero once it scrolls into view. */
export default function CountUp({ value, duration = 1400, className = "" }) {
  const [ref, inView] = useInView()
  const parsed = parse(value)
  const animatable = parsed && !isYear(parsed)
  const target = parsed?.target ?? 0

  const [n, setN] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    if (!inView || !animatable) return

    let start
    const step = (ts) => {
      if (start === undefined) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setN(Math.round(eased * target))
      if (p < 1) frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)

    // rAF is throttled hard in background tabs, which can strand the counter on
    // a partial number like "94+" instead of "300+". Guarantee the final value.
    const settle = setTimeout(() => setN(target), duration + 150)

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      clearTimeout(settle)
    }
  }, [inView, animatable, target, duration])

  if (!animatable) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {parsed.prefix}
      {n.toLocaleString()}
      {parsed.suffix}
    </span>
  )
}

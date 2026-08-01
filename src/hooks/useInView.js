import { useEffect, useRef, useState } from "react"

/* How far above the fold an element must reach before it counts as "in view". */
const BOTTOM_MARGIN = 70

/**
 * True when we should skip the reveal animation entirely — the reader asked for
 * reduced motion, or there is no DOM to measure. Either way content must start
 * visible, otherwise it would stay stuck at opacity 0.
 */
function shouldSkipAnimation() {
  if (typeof window === "undefined") return true
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/*
 * One rAF-throttled scroll listener drives every Reveal on the page.
 *
 * This deliberately measures positions instead of using IntersectionObserver.
 * IO only fires when an element *crosses* a threshold, so an instant jump — an
 * anchor link, a restored scroll position, or a panel expanding above the
 * current offset — can carry an element from below the fold to above it without
 * ever being observed as visible. That leaves it stranded at opacity 0 forever.
 * A position sweep cannot miss, because it re-checks the truth every frame.
 */
const watchers = new Set()
let pending = false
let frameId = null
let timerId = null
let attached = false

function sweep() {
  const viewportHeight = window.innerHeight

  for (const watcher of Array.from(watchers)) {
    const el = watcher.ref.current
    if (!el) continue

    const rect = el.getBoundingClientRect()
    const hasEntered = rect.top < viewportHeight - BOTTOM_MARGIN && rect.bottom > 0
    const alreadyPast = rect.bottom <= 0

    if (hasEntered || alreadyPast) {
      watcher.setInView(true)
      if (watcher.once) watchers.delete(watcher)
    } else if (!watcher.once) {
      watcher.setInView(false)
    }
  }

  if (watchers.size === 0) detach()
}

/*
 * Coalesce bursts of scroll events into a single sweep. rAF keeps it aligned
 * with painting, but rAF never fires while a tab is hidden — so a timer races
 * it, and whichever wins cancels the other. Without the timer, anything
 * revealed while the tab is in the background stays stuck at opacity 0.
 */
function schedule() {
  if (pending) return
  pending = true

  const run = () => {
    pending = false
    if (frameId !== null) cancelAnimationFrame(frameId)
    if (timerId !== null) clearTimeout(timerId)
    frameId = null
    timerId = null
    sweep()
  }

  frameId = requestAnimationFrame(run)
  timerId = setTimeout(run, 120)
}

function attach() {
  if (attached) return
  attached = true
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule)
}

function detach() {
  if (!attached) return
  attached = false
  window.removeEventListener("scroll", schedule)
  window.removeEventListener("resize", schedule)
}

/** Reports whether the returned ref's element has scrolled into view. */
export function useInView({ once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(shouldSkipAnimation)

  useEffect(() => {
    if (shouldSkipAnimation()) return

    const watcher = { ref, setInView, once }
    watchers.add(watcher)
    attach()
    schedule()

    return () => {
      watchers.delete(watcher)
      if (watchers.size === 0) detach()
    }
  }, [once])

  return [ref, inView]
}

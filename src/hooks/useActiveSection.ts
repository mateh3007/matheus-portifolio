import { useEffect, useState } from 'react'

/**
 * Tracks which section is under a reading line near the top of the viewport.
 * Sections may mount later (code-split), so missing ones are picked up as they appear.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observed = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.01, 0.5] },
    )
    const mo = new MutationObserver(() => observeNew())

    function observeNew() {
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && !observed.has(id)) {
          observed.add(id)
          io.observe(el)
        }
      }
      if (observed.size === ids.length) mo.disconnect()
    }

    observeNew()
    if (observed.size < ids.length) mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [ids])

  return active
}

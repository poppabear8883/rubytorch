import { useEffect, useRef, useState } from 'react'
import { images } from '../content/images'
import { heroVideo } from '../content/media'
import { Grain } from './Grain'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const spec = images.hero

type Conn = { saveData?: boolean }

/**
 * Full-bleed hero backdrop: a still (the video poster, i.e. the final frame) under a
 * muted, decorative video that plays once and holds on its last frame. The video fades in only once it is playing, so a missing or
 * blocked file leaves the still. Reduced motion, Data Saver and failed loads all
 * fall back to the still. The video pauses when the hero is off screen, and a
 * visible control lets people pause it for good (WCAG 2.2.2).
 */
export function HeroMedia({ paused, onAvailable }: { paused: boolean; onAvailable: (available: boolean) => void }) {
  const reduced = usePrefersReducedMotion()
  const saveData = typeof navigator !== 'undefined' && !!(navigator as Navigator & { connection?: Conn }).connection?.saveData
  const useVideo = !reduced && !saveData
  const video = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState(spec.src)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState(true)
  const [ended, setEnded] = useState(false)

  // pause/resume with visibility and the user's choice; once it has played through
  // it holds on the final frame (play() would restart it, so stop driving it)
  useEffect(() => {
    const v = video.current
    if (!v || !useVideo || failed || ended) return
    if (paused || !inView) v.pause()
    else v.play().catch(() => {}) // autoplay blocked (e.g. low-power mode): the still stays and the control can retry
  }, [useVideo, failed, ended, paused, inView])

  useEffect(() => {
    const v = video.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
    io.observe(v.parentElement!)
    return () => io.disconnect()
  }, [])

  // the pause control is only offered while the video can still be playing
  const available = useVideo && !failed && !ended
  useEffect(() => {
    onAvailable(available)
  }, [onAvailable, available])

  const last = heroVideo.sources.length - 1
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <picture>
        <img
          src={src}
          onError={() => {
            const fb = window.matchMedia('(max-width: 1023.98px)').matches ? spec.srcMobile : spec.fallback
            if (fb && src !== fb) setSrc(fb)
          }}
          alt=""
          width={spec.width}
          height={spec.height}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="h-full w-full object-cover object-[62%_60%] lg:object-[68%_50%]"
        />
      </picture>
      {useVideo && (
        <video
          ref={video}
          muted
          playsInline
          autoPlay
          preload="auto"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onEnded={() => setEnded(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[62%_60%] transition-opacity duration-700 lg:object-[68%_50%] ${
            playing && !failed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {heroVideo.sources.map((s, i) => (
            <source key={s.src} src={s.src} type={s.type} onError={i === last ? () => setFailed(true) : undefined} />
          ))}
        </video>
      )}
      {/* scrims: copy sits on the left on desktop and in the lower part on mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_11_15/0.7)_0%,rgb(11_11_15/0.55)_30%,rgb(11_11_15/0.9)_62%,rgb(11_11_15/0.97)_100%)] lg:bg-[linear-gradient(90deg,rgb(11_11_15/0.94)_0%,rgb(11_11_15/0.8)_34%,rgb(11_11_15/0.2)_66%,rgb(11_11_15/0.05)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-[linear-gradient(0deg,rgb(11_11_15/0.97)_0%,rgb(11_11_15/0)_100%)] lg:block" />
      <Grain />
    </div>
  )
}

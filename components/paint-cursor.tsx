'use client'

import { useEffect, useRef, useState } from 'react'
import { usePaint } from '@/components/paint-context'

type Dab = {
  id: string
  x: number
  y: number
  color: string
  size: number
}

export function PaintCursor() {
  const { tool, studioOpen } = usePaint()
  const [finePointer, setFinePointer] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [dabs, setDabs] = useState<Dab[]>([])
  const toolRef = useRef(tool)
  const studioRef = useRef(studioOpen)
  const dabSeq = useRef(0)

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  useEffect(() => {
    studioRef.current = studioOpen
  }, [studioOpen])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setFinePointer(true)
  }, [])

  useEffect(() => {
    if (!finePointer) return

    if (studioOpen) {
      document.documentElement.classList.add('paint-cursor')
    } else {
      document.documentElement.classList.remove('paint-cursor')
      setDabs([])
    }

    return () => {
      document.documentElement.classList.remove('paint-cursor')
    }
  }, [finePointer, studioOpen])

  useEffect(() => {
    if (!finePointer || !studioOpen) return

    let lastDab = 0

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement | null
      const inPaintZone = Boolean(target?.closest('[data-paint-zone]'))
      if (!inPaintZone) return

      const now = performance.now()
      if (now - lastDab > 56) {
        lastDab = now
        const activeTool = toolRef.current
        const active = activeTool.kind === 'color' ? activeTool.color : '#7a7a7a'
        const id = `dab-${dabSeq.current++}`
        setDabs((prev) => [
          ...prev.slice(-12),
          {
            id,
            x: e.clientX,
            y: e.clientY,
            color: active,
            size: 5 + Math.random() * 7,
          },
        ])
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [finePointer, studioOpen])

  useEffect(() => {
    if (!dabs.length) return
    const timer = window.setTimeout(() => setDabs((prev) => prev.slice(1)), 280)
    return () => window.clearTimeout(timer)
  }, [dabs])

  if (!finePointer || !studioOpen) return null

  const tip = tool.kind === 'color' ? tool.color : '#7a7a7a'

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      {dabs.map((dab) => (
        <span
          key={dab.id}
          className="paint-dab absolute rounded-full"
          style={{
            left: dab.x,
            top: dab.y,
            width: dab.size,
            height: dab.size,
            background: dab.color,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div
        className="paint-brush absolute"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/80"
          style={{ backgroundColor: tip }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-[30%] -translate-y-[110%] rotate-[-28deg]">
          {tool.kind === 'erase' ? (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect
                x="8"
                y="14"
                width="18"
                height="10"
                rx="2"
                transform="rotate(-28 17 19)"
                fill="#FDF0D5"
                stroke="#C71585"
                strokeWidth="1.5"
              />
              <path d="M11 22 L23 12" stroke="#C71585" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <g transform="rotate(-35 16 16)">
                <rect x="14.2" y="4" width="3.6" height="14" rx="1.2" fill="#FDF0D5" />
                <rect x="13.4" y="16.5" width="5.2" height="4" rx="1" fill="#0081A7" />
                <path
                  d="M13.2 20.2 C12.4 22.8 12.8 26.2 16 28.2 C19.2 26.2 19.6 22.8 18.8 20.2 Z"
                  fill={tip}
                />
                <path
                  d="M14.4 20.4 C14 22.2 14.3 24.6 16 26 C17.7 24.6 18 22.2 17.6 20.4 Z"
                  fill="#C71585"
                  opacity="0.85"
                />
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

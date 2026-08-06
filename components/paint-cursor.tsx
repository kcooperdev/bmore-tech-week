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
  const { tool } = usePaint()
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [mode, setMode] = useState<'default' | 'paint' | 'interactive'>('default')
  const [dabs, setDabs] = useState<Dab[]>([])
  const toolRef = useRef(tool)
  const dabSeq = useRef(0)

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('paint-cursor')

    let lastDab = 0

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement | null
      const inPaintZone = Boolean(target?.closest('[data-paint-zone]'))
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select, label'),
      )

      if (inPaintZone) setMode('paint')
      else if (interactive) setMode('interactive')
      else setMode('default')

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
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('paint-cursor')
    }
  }, [])

  useEffect(() => {
    if (!dabs.length) return
    const timer = window.setTimeout(() => setDabs((prev) => prev.slice(1)), 280)
    return () => window.clearTimeout(timer)
  }, [dabs])

  if (!enabled) return null

  const tip = tool.kind === 'color' ? tool.color : '#7a7a7a'

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      {mode === 'paint' &&
        dabs.map((dab) => (
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

      {mode === 'paint' ? (
        <div
          className="paint-brush absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-18%, -18%) rotate(-28deg) scale(1.15)',
          }}
        >
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
      ) : (
        <div
          className="absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -50%) scale(${mode === 'interactive' ? 1.2 : 1})`,
            transition: 'transform 120ms ease-out',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect
              x="1"
              y="1"
              width="20"
              height="20"
              rx="3"
              fill="#00AFB9"
              stroke={mode === 'interactive' ? '#FDF0D5' : 'transparent'}
              strokeWidth="1.5"
            />
            <text
              x="11"
              y="15"
              textAnchor="middle"
              fill="#10131A"
              fontFamily="Impact, Haettenschweiler, sans-serif"
              fontSize="8"
              letterSpacing="0.5"
            >
              BTW
            </text>
          </svg>
        </div>
      )}
    </div>
  )
}

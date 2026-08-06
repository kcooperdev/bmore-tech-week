'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { usePaint } from '@/components/paint-context'

type LetterDef = {
  id: string
  char: string
  defaultColor: string
}

function buildLetters(word: string, defaultColor: string, prefix: string): LetterDef[] {
  return word.split('').map((char, i) => ({
    id: `${prefix}-${i}`,
    char,
    defaultColor,
  }))
}

function letterIdFromPoint(clientX: number, clientY: number): string | null {
  const stack = document.elementsFromPoint(clientX, clientY)
  for (const node of stack) {
    if (!(node instanceof HTMLElement)) continue
    const letter = node.closest('[data-paint-letter]') as HTMLElement | null
    const id = letter?.dataset.letterId
    if (id) return id
  }
  return null
}

export function PaintableWordmark() {
  const { tool, setIsPainting, resetKey, studioOpen } = usePaint()

  const baltimore = useMemo(() => buildLetters('Baltimore', '#fdf0d5', 'b'), [])
  const tech = useMemo(() => buildLetters('Tech', '#00afb9', 't'), [])
  const week = useMemo(() => buildLetters('Week', '#fdf0d5', 'w'), [])
  const allLetters = useMemo(
    () => [...baltimore, ...tech, ...week],
    [baltimore, tech, week],
  )
  const defaults = useMemo(
    () => Object.fromEntries(allLetters.map((l) => [l.id, l.defaultColor])),
    [allLetters],
  )

  const [colors, setColors] = useState<Record<string, string>>(defaults)
  const toolRef = useRef(tool)
  const studioRef = useRef(studioOpen)
  const defaultsRef = useRef(defaults)
  const paintingRef = useRef(false)

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  useEffect(() => {
    studioRef.current = studioOpen
  }, [studioOpen])

  useEffect(() => {
    defaultsRef.current = defaults
  }, [defaults])

  useEffect(() => {
    setColors(defaults)
  }, [resetKey, defaults])

  const paintById = useCallback((id: string | null) => {
    if (!id || !studioRef.current) return
    const fallback = defaultsRef.current[id]
    if (!fallback) return
    const active = toolRef.current
    const next = active.kind === 'erase' ? fallback : active.color
    setColors((prev) => {
      if (prev[id] === next) return prev
      return { ...prev, [id]: next }
    })
  }, [])

  const stopPainting = useCallback(() => {
    paintingRef.current = false
    setIsPainting(false)
  }, [setIsPainting])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!paintingRef.current || !studioRef.current) return
      if (e.pointerType === 'mouse' && e.buttons !== 1) {
        stopPainting()
        return
      }
      paintById(letterIdFromPoint(e.clientX, e.clientY))
    }
    const onUp = () => stopPainting()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [paintById, stopPainting])

  const startPaint = (e: ReactPointerEvent<HTMLElement>, id: string) => {
    if (!studioOpen) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    paintingRef.current = true
    setIsPainting(true)
    paintById(id)
  }

  const renderWord = (letters: LetterDef[]) => (
    <span className="inline-flex flex-wrap">
      {letters.map((letter) => (
        <span
          key={letter.id}
          data-paint-letter
          data-letter-id={letter.id}
          className={`paint-letter inline-block select-none transition-colors duration-100 ${
            studioOpen ? 'paint-letter-live' : 'paint-letter-idle'
          }`}
          style={{ color: colors[letter.id] ?? letter.defaultColor }}
          onPointerDown={(e) => startPaint(e, letter.id)}
        >
          {letter.char}
        </span>
      ))}
    </span>
  )

  return (
    <div
      id="paint-zone"
      className={`animate-fade-up [animation-delay:80ms] ${studioOpen ? 'paint-hero-active' : ''}`}
    >
      <h1
        className="max-w-4xl font-display text-[2.75rem] uppercase leading-[0.95] tracking-wide text-shadow-pop sm:text-6xl md:text-8xl lg:text-9xl text-balance"
        data-paint-zone={studioOpen ? 'true' : undefined}
      >
        <span className="sr-only">Baltimore Tech Week</span>
        <span aria-hidden className="block">
          {renderWord(baltimore)}
        </span>
        <span aria-hidden className="mt-1 block sm:mt-0">
          {renderWord(tech)}
          <span className="inline-block w-[0.2em]" />
          {renderWord(week)}
        </span>
      </h1>
      {studioOpen && (
        <p className="mt-3 font-playful text-sm font-bold text-primary sm:text-base">
          Drag across the letters
        </p>
      )}
    </div>
  )
}

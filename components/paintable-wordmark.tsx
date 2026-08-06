'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Eraser, RotateCcw } from 'lucide-react'
import { PAINT_COLORS, usePaint } from '@/components/paint-context'

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

function WordLine({
  letters,
  className = '',
}: {
  letters: LetterDef[]
  className?: string
}) {
  const { tool, setIsPainting, resetKey } = usePaint()
  const defaults = useMemo(
    () => Object.fromEntries(letters.map((l) => [l.id, l.defaultColor])),
    [letters],
  )
  const [colors, setColors] = useState<Record<string, string>>(defaults)
  const defaultsRef = useRef(defaults)
  const toolRef = useRef(tool)

  useEffect(() => {
    defaultsRef.current = defaults
  }, [defaults])

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  useEffect(() => {
    setColors(defaults)
  }, [resetKey, defaults])

  const paintById = (id: string) => {
    const fallback = defaultsRef.current[id]
    if (!fallback) return
    const active = toolRef.current
    setColors((prev) => ({
      ...prev,
      [id]: active.kind === 'erase' ? fallback : active.color,
    }))
  }

  useEffect(() => {
    // Drag-paint only on fine pointers (desktop). Mobile uses tap.
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const onMove = (e: PointerEvent) => {
      if (e.buttons !== 1) return
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const letter = el?.closest('[data-paint-letter]') as HTMLElement | null
      const id = letter?.dataset.letterId
      if (id) paintById(id)
    }
    const onUp = () => setIsPainting(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [setIsPainting])

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {letters.map((letter) => (
        <span
          key={letter.id}
          data-paint-letter
          data-letter-id={letter.id}
          className="paint-letter inline-block select-none transition-colors duration-150"
          style={{ color: colors[letter.id] ?? letter.defaultColor }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return
            setIsPainting(true)
            paintById(letter.id)
          }}
        >
          {letter.char}
        </span>
      ))}
    </span>
  )
}

export function PaintableWordmark() {
  const { tool, setColor, setErase, bumpReset } = usePaint()

  const baltimore = useMemo(() => buildLetters('Baltimore', '#fdf0d5', 'b'), [])
  const tech = useMemo(() => buildLetters('Tech', '#00afb9', 't'), [])
  const week = useMemo(() => buildLetters('Week', '#fdf0d5', 'w'), [])

  return (
    <div className="animate-fade-up [animation-delay:80ms]" data-paint-zone>
      <h1 className="max-w-4xl font-display text-[2.75rem] uppercase leading-[0.95] tracking-wide text-shadow-pop sm:text-6xl md:text-8xl lg:text-9xl text-balance">
        <span className="sr-only">Baltimore Tech Week</span>
        <span aria-hidden className="block">
          <WordLine letters={baltimore} />
        </span>
        <span aria-hidden className="mt-1 block sm:mt-0">
          <WordLine letters={tech} />
          <span className="inline-block w-[0.2em]" />
          <WordLine letters={week} />
        </span>
      </h1>

      <div className="mt-4 rounded-2xl border border-border/60 bg-background/55 p-3 backdrop-blur-sm sm:mt-5 sm:bg-transparent sm:p-0 sm:backdrop-blur-none sm:border-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full text-[11px] font-semibold uppercase tracking-widest text-muted-foreground sm:mr-1 sm:w-auto sm:text-xs">
            Paint the name
          </span>
          {PAINT_COLORS.map((swatch) => {
            const active = tool.kind === 'color' && tool.color === swatch.value
            return (
              <button
                key={swatch.id}
                type="button"
                title={swatch.label}
                aria-label={`Paint with ${swatch.label}`}
                aria-pressed={active}
                onClick={() => setColor(swatch.value)}
                className={`size-10 shrink-0 rounded-full border-2 transition-transform active:scale-95 sm:size-8 sm:hover:-translate-y-0.5 ${
                  active ? 'scale-110 border-cream' : 'border-white/20 sm:border-transparent'
                }`}
                style={{ backgroundColor: swatch.value }}
              />
            )
          })}
          <button
            type="button"
            title="Erase letter back to default"
            aria-label="Eraser"
            aria-pressed={tool.kind === 'erase'}
            onClick={setErase}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold uppercase tracking-wide transition-colors sm:h-8 ${
              tool.kind === 'erase'
                ? 'border-cream bg-muted text-cream'
                : 'border-border bg-card text-muted-foreground hover:text-cream'
            }`}
          >
            <Eraser className="size-3.5" />
            Erase
          </button>
          <button
            type="button"
            title="Reset all letters"
            aria-label="Reset colors"
            onClick={bumpReset}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-cream sm:h-8"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-muted-foreground/80 sm:text-xs">
          <span className="sm:hidden">Tap a letter to paint. Erase undoes one letter.</span>
          <span className="hidden sm:inline">
            Drag across letters to paint. Use Erase to undo a letter, Reset for the whole name.
          </span>
        </p>
      </div>
    </div>
  )
}

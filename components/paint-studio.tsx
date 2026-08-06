'use client'

import { useEffect } from 'react'
import { Eraser, Paintbrush, RotateCcw, X } from 'lucide-react'
import { PAINT_COLORS, usePaint } from '@/components/paint-context'

export function PaintStudio() {
  const {
    tool,
    setColor,
    setErase,
    bumpReset,
    studioOpen,
    openStudio,
    closeStudio,
  } = usePaint()

  useEffect(() => {
    if (!studioOpen) return
    document.documentElement.classList.add('paint-studio-open')
    const zone = document.getElementById('paint-zone')
    zone?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return () => {
      document.documentElement.classList.remove('paint-studio-open')
    }
  }, [studioOpen])

  return (
    <>
      {!studioOpen && (
        <button
          type="button"
          onClick={openStudio}
          className="paint-studio-tab group z-[45] font-playful"
          aria-label="Open paint studio"
        >
          <span className="paint-studio-tab-icon">
            <Paintbrush className="size-3.5" />
          </span>
          <span className="paint-studio-tab-label text-[12px] font-bold leading-none text-cream">
            Paint
          </span>
        </button>
      )}

      <aside
        className={`paint-studio-sidebar z-[60] font-playful ${studioOpen ? 'is-open' : ''}`}
        aria-hidden={!studioOpen}
        aria-label="Paint studio"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              Studio
            </p>
            <p className="mt-1 text-base font-bold leading-tight text-cream">
              Paint the name
            </p>
          </div>
          <button
            type="button"
            onClick={closeStudio}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-cream text-charcoal transition-transform hover:rotate-12"
            aria-label="Close paint studio"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <p className="mt-3 text-[12px] leading-snug text-cream/70">
          Pick a color, then drag across the letters.
        </p>

        <div className="mt-5 flex flex-col items-center gap-3">
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
                className={`size-11 rounded-full border-[3px] shadow-md transition-transform active:scale-90 ${
                  active
                    ? 'scale-110 border-cream ring-2 ring-secondary'
                    : 'border-white/25 hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.value }}
              />
            )
          })}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Eraser"
            aria-pressed={tool.kind === 'erase'}
            onClick={setErase}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-bold transition-colors ${
              tool.kind === 'erase'
                ? 'bg-secondary text-cream'
                : 'bg-cream/10 text-cream hover:bg-cream/20'
            }`}
          >
            <Eraser className="size-3.5" />
            Erase
          </button>
          <button
            type="button"
            aria-label="Reset colors"
            onClick={bumpReset}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-cream/10 px-2 py-2.5 text-[13px] font-bold text-cream transition-colors hover:bg-cream/20"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={closeStudio}
          className="mt-auto inline-flex items-center justify-center rounded-xl bg-primary px-2 py-3 text-[14px] font-bold text-primary-foreground shadow-md transition-transform active:scale-95"
        >
          Done
        </button>
      </aside>
    </>
  )
}

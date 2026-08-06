'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export const PAINT_COLORS = [
  { id: 'teal', value: '#00afb9', label: 'Teal' },
  { id: 'magenta', value: '#c71585', label: 'Magenta' },
  { id: 'cream', value: '#fdf0d5', label: 'Cream' },
  { id: 'harbor', value: '#0081a7', label: 'Harbor' },
] as const

export type PaintTool =
  | { kind: 'color'; color: string }
  | { kind: 'erase' }

type PaintContextValue = {
  tool: PaintTool
  setColor: (color: string) => void
  setErase: () => void
  resetKey: number
  bumpReset: () => void
  isPainting: boolean
  setIsPainting: (v: boolean) => void
}

const PaintContext = createContext<PaintContextValue | null>(null)

export function PaintProvider({ children }: { children: ReactNode }) {
  const [tool, setTool] = useState<PaintTool>({
    kind: 'color',
    color: PAINT_COLORS[0].value,
  })
  const [resetKey, setResetKey] = useState(0)
  const [isPainting, setIsPainting] = useState(false)

  const setColor = useCallback((color: string) => {
    setTool({ kind: 'color', color })
  }, [])

  const setErase = useCallback(() => {
    setTool({ kind: 'erase' })
  }, [])

  const bumpReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  const value = useMemo(
    () => ({
      tool,
      setColor,
      setErase,
      resetKey,
      bumpReset,
      isPainting,
      setIsPainting,
    }),
    [tool, setColor, setErase, resetKey, bumpReset, isPainting],
  )

  return <PaintContext.Provider value={value}>{children}</PaintContext.Provider>
}

export function usePaint() {
  const ctx = useContext(PaintContext)
  if (!ctx) throw new Error('usePaint must be used within PaintProvider')
  return ctx
}

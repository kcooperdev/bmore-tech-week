'use client'

import { useEffect, useState } from 'react'
import {
  BookOpen,
  Building2,
  Frame,
  Laptop,
  Paintbrush,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EARLY_ACCESS } from '@/lib/data'

const ROLE_CURSORS = {
  Founders: { Icon: Rocket, label: 'rocket' },
  Engineers: { Icon: Laptop, label: 'computer' },
  Designers: { Icon: Paintbrush, label: 'paintbrush' },
  Artists: { Icon: Frame, label: 'canvas' },
  Students: { Icon: BookOpen, label: 'school book' },
  Investors: { Icon: Building2, label: 'building' },
  Creators: { Icon: Sparkles, label: 'spark' },
  'Community leaders': { Icon: Users, label: 'community' },
} as const

type Role = keyof typeof ROLE_CURSORS

export function WhoItsFor() {
  const [cursor, setCursor] = useState<{
    role: Role
    x: number
    y: number
  } | null>(null)
  const [activeRole, setActiveRole] = useState<Role | null>(null)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const ActiveIcon = cursor ? ROLE_CURSORS[cursor.role].Icon : null

  return (
    <section
      id="who-for"
      className="section-anchor relative overflow-hidden border-y border-border bg-card py-14 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="font-playful text-sm font-bold text-secondary">The room</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl text-balance">
              Who it’s for
            </h2>
            <p className="mt-3 font-playful text-sm font-bold text-cream/60 sm:hidden">
              Tap a role to reveal its icon
            </p>
          </Reveal>

          <ul className="ea-role-rail lg:col-span-8">
            {EARLY_ACCESS.whoFor.map((role, i) => {
              const meta = ROLE_CURSORS[role as Role]
              const Icon = meta?.Icon
              const isActive = activeRole === role
              return (
                <Reveal key={role} delay={30 + i * 35}>
                  <li
                    className="ea-role-line group border-t border-cream/15 py-3 last:border-b last:border-cream/15 sm:py-4"
                    data-role-cursor={meta?.label}
                    onPointerEnter={(e) => {
                      if (!finePointer || !meta) return
                      setCursor({
                        role: role as Role,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }}
                    onPointerMove={(e) => {
                      if (!finePointer || !meta) return
                      setCursor({
                        role: role as Role,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }}
                    onPointerLeave={() => setCursor(null)}
                    onClick={() => {
                      if (finePointer || !meta) return
                      setActiveRole((prev) => (prev === role ? null : (role as Role)))
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-display text-[1.65rem] uppercase tracking-wide transition-colors sm:text-4xl md:text-5xl ${
                          isActive ? 'text-primary' : 'text-cream group-hover:text-primary'
                        }`}
                      >
                        {role}
                      </span>
                      {Icon && (
                        <span
                          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-sm border-2 border-cream bg-secondary text-cream shadow-[2px_2px_0_var(--primary)] transition-all sm:hidden ${
                            isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
                          }`}
                          aria-hidden
                        >
                          <Icon className="size-4" strokeWidth={2.25} />
                        </span>
                      )}
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>

      {finePointer && cursor && ActiveIcon && (
        <div
          className="ea-role-cursor pointer-events-none fixed z-[80] hidden md:flex"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(12px, 12px)',
          }}
          aria-hidden
        >
          <span className="inline-flex size-11 items-center justify-center rounded-sm border-2 border-cream bg-secondary text-cream shadow-[3px_3px_0_var(--primary)]">
            <ActiveIcon className="size-5" strokeWidth={2.25} />
          </span>
        </div>
      )}
    </section>
  )
}

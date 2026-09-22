import type { Metadata } from 'next'
import { WEEK_DATES } from '@/lib/data'
import {
  PROGRAM,
  PROGRAM_ROOMS,
  PROGRAM_SLOTS,
  buildProgramGrid,
  programCounts,
} from '@/lib/programming'
import { ProgrammingActions } from './actions'

export const metadata: Metadata = {
  title: '2027 Programming Blueprint',
  description:
    'Internal night programming grid for Baltimore Tech Week, April 26–30, 2027.',
  robots: { index: false, follow: false },
}

const kindClass: Record<string, string> = {
  team: 'border-[#241773] bg-[#241773] text-white',
  dark: 'border-neutral-300 bg-neutral-100 text-neutral-500',
  open: 'border-neutral-300 bg-white text-neutral-900',
}

export default function ProgrammingPage() {
  const cells = buildProgramGrid()
  const counts = programCounts(cells)

  return (
    <div className="min-h-svh bg-neutral-200 text-neutral-900 print:bg-white">
      <style>{`
        @page { size: letter landscape; margin: 0.45in; }
        @media print {
          html, body { background: white !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1100px] px-4 py-8 print:max-w-none print:px-0 print:py-0 md:px-8">
        <div className="mb-6 print:hidden">
          <ProgrammingActions />
        </div>

        <article className="bg-white p-6 shadow-sm print:p-0 print:shadow-none md:p-10">
          <header className="border-b border-neutral-200 pb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#241773]">
              Internal planning document
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase leading-none md:text-5xl">
              {PROGRAM.name}
            </h1>
            <p className="mt-2 text-lg text-neutral-700">
              {PROGRAM.edition} programming blueprint · {PROGRAM.year}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <div>
                <dt className="text-neutral-500">Dates</dt>
                <dd className="font-semibold">{PROGRAM.dates}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Hours</dt>
                <dd className="font-semibold">{PROGRAM.window}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Rooms</dt>
                <dd className="font-semibold">{PROGRAM.rooms} per night</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Contact</dt>
                <dd className="font-semibold">{PROGRAM.contact}</dd>
              </div>
            </dl>
          </header>

          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
                Locked team events
              </h2>
              <ol className="mt-2 space-y-2 text-sm">
                <li>
                  <strong>Opening Night</strong> — Monday, April 26, 5:30–7:00 PM,
                  Room A. Produced by the Tech Week team.
                </li>
                <li>
                  <strong>Closing Night</strong> — Friday, April 30, 9:00–10:00 PM,
                  Room A. Produced by the Tech Week team.
                </li>
              </ol>
              <p className="mt-2 text-sm text-neutral-600">
                Room B stays dark in those two hours so the week has one open and
                one close.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
                How booking works
              </h2>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                <li>Host confirms a room and nights.</li>
                <li>Speaker applies. They do not pick a finished event.</li>
                <li>Team books the talk into one open slot.</li>
                <li>Publish only when host, speaker, and crew are set.</li>
              </ol>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
              Inventory
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-6">
              {[
                [counts.total, 'Total slots'],
                [counts.team, 'Team events'],
                [counts.dark, 'Dark / hold'],
                [counts.open, 'Open to book'],
                [counts.fillFirst, 'Fill first'],
                [counts.publishTarget, 'Publish target'],
              ].map(([value, label]) => (
                <div key={String(label)} className="border border-neutral-200 p-3">
                  <div className="font-display text-2xl uppercase text-[#241773]">{value}</div>
                  <div className="text-neutral-600">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              30 slots is capacity. Publish about 16–18. Hold the rest so rooms
              stay full.
            </p>
          </section>

          <section className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
                Week grid
              </h2>
              <ul className="flex flex-wrap gap-3 text-xs text-neutral-600">
                <li className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 bg-[#241773]" /> Team
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 border border-neutral-400 bg-white" />{' '}
                  Open
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 bg-neutral-200" /> Dark
                </li>
                <li>Gold rule = fill 7:15 first</li>
              </ul>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left text-[13px]">
                <thead>
                  <tr>
                    <th className="w-[7.5rem] border border-neutral-200 bg-neutral-50 p-2 font-semibold">
                      Slot
                    </th>
                    {WEEK_DATES.map((day) => (
                      <th
                        key={day.iso}
                        className="border border-neutral-200 bg-neutral-50 p-2 font-semibold"
                      >
                        <div>{day.weekday}</div>
                        <div className="font-normal text-neutral-500">{day.short}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROGRAM_SLOTS.map((slot) => (
                    <tr key={slot.id}>
                      <th className="border border-neutral-200 bg-neutral-50 p-2 align-top">
                        <div>{slot.label}</div>
                        <div className="font-normal text-neutral-500">{slot.short}</div>
                      </th>
                      {WEEK_DATES.map((day) => (
                        <td
                          key={`${day.iso}-${slot.id}`}
                          className={`border border-neutral-200 p-1.5 align-top ${
                            slot.id === 'prime' ? 'bg-[#d4a017]/10' : 'bg-white'
                          }`}
                        >
                          <div className="grid gap-1.5">
                            {PROGRAM_ROOMS.map((room) => {
                              const cell = cells.find(
                                (item) =>
                                  item.day === day.iso &&
                                  item.slot === slot.id &&
                                  item.room === room.id,
                              )
                              if (!cell) return null
                              return (
                                <div
                                  key={room.id}
                                  className={`border px-2 py-1.5 ${kindClass[cell.kind]}`}
                                >
                                  <div className="text-[10px] uppercase tracking-[0.12em] opacity-80">
                                    {room.label}
                                  </div>
                                  <div className="font-semibold leading-tight">{cell.title}</div>
                                </div>
                              )
                            })}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 grid gap-6 border-t border-neutral-200 pt-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
                Slot rules
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>One event per slot. A panel is one slot with several names.</li>
                <li>Do not stack three short talks into 90 minutes.</li>
                <li>Monday stays lighter. Thursday can be fullest.</li>
                <li>Friday 9:00 is Closing only.</li>
                <li>AI, Cyber, UX, Dev color a room. They do not add extra nights.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#241773]">
                Suggested fill order
              </h2>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                <li>Book all 7:15–8:45 rooms first (10 prime slots).</li>
                <li>Add Tuesday–Thursday 5:30 sessions next.</li>
                <li>Use 9:00 only when the night already has a crowd.</li>
                <li>Leave Monday late and a few 5:30s empty if needed.</li>
              </ol>
            </div>
          </section>

          <footer className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
            Not the public schedule. Room A and Room B are placeholders until hosts
            confirm venues. Generated for team planning, {PROGRAM.dates}.
          </footer>
        </article>
      </div>
    </div>
  )
}
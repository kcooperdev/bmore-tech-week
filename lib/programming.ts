import { WEEK_DATES } from '@/lib/data'

export const PROGRAM = {
  name: 'Baltimore Tech Week',
  edition: 'Night Edition',
  year: '2027',
  dates: 'April 26–30, 2027',
  window: '5:30 PM–10:00 PM',
  city: 'Baltimore, MD',
  rooms: 2,
  nights: 5,
  contact: 'team@bmoretechweek.com',
} as const

export const PROGRAM_SLOTS = [
  { id: 'early', label: '5:30–7:00 PM', short: 'After work', minutes: 90 },
  { id: 'prime', label: '7:15–8:45 PM', short: 'Prime', minutes: 90 },
  { id: 'late', label: '9:00–10:00 PM', short: 'Late', minutes: 60 },
] as const

export const PROGRAM_ROOMS = [
  { id: 'a', label: 'Room A' },
  { id: 'b', label: 'Room B' },
] as const

export type ProgramSlotId = (typeof PROGRAM_SLOTS)[number]['id']
export type ProgramRoomId = (typeof PROGRAM_ROOMS)[number]['id']
export type ProgramKind = 'team' | 'open' | 'dark'

export type ProgramCell = {
  day: (typeof WEEK_DATES)[number]['iso']
  slot: ProgramSlotId
  room: ProgramRoomId
  kind: ProgramKind
  title: string
  note: string
  fillFirst: boolean
}

const TEAM_CELLS: Array<
  Pick<ProgramCell, 'day' | 'slot' | 'room' | 'kind' | 'title' | 'note'>
> = [
  {
    day: '2027-04-26',
    slot: 'early',
    room: 'a',
    kind: 'team',
    title: 'Opening Night',
    note: 'Produced by the Tech Week team. Welcome, week map, first room.',
  },
  {
    day: '2027-04-26',
    slot: 'early',
    room: 'b',
    kind: 'dark',
    title: 'Hold',
    note: 'Keep dark so Opening is the only 5:30 start.',
  },
  {
    day: '2027-04-30',
    slot: 'late',
    room: 'a',
    kind: 'team',
    title: 'Closing Night',
    note: 'Produced by the Tech Week team. Recap, people, last hour together.',
  },
  {
    day: '2027-04-30',
    slot: 'late',
    room: 'b',
    kind: 'dark',
    title: 'Hold',
    note: 'Keep dark so Closing is the only 9:00 event.',
  },
]

function specialFor(
  day: ProgramCell['day'],
  slot: ProgramSlotId,
  room: ProgramRoomId,
) {
  return TEAM_CELLS.find((cell) => cell.day === day && cell.slot === slot && cell.room === room)
}

export function buildProgramGrid(): ProgramCell[] {
  return WEEK_DATES.flatMap((day) =>
    PROGRAM_SLOTS.flatMap((slot) =>
      PROGRAM_ROOMS.map((room) => {
        const special = specialFor(day.iso, slot.id, room.id)
        if (special) {
          return {
            ...special,
            fillFirst: false,
          }
        }

        return {
          day: day.iso,
          slot: slot.id,
          room: room.id,
          kind: 'open' as const,
          title: slot.id === 'prime' ? 'Open · fill first' : 'Open for booking',
          note:
            slot.id === 'prime'
              ? 'Book speakers here first. Best attendance window.'
              : slot.id === 'late'
                ? 'Short talk, social, or hold if the night is already full.'
                : 'After-work session. Good for workshops and first talks.',
          fillFirst: slot.id === 'prime',
        }
      }),
    ),
  )
}

export function programCounts(cells = buildProgramGrid()) {
  const team = cells.filter((cell) => cell.kind === 'team').length
  const dark = cells.filter((cell) => cell.kind === 'dark').length
  const open = cells.filter((cell) => cell.kind === 'open').length
  const fillFirst = cells.filter((cell) => cell.fillFirst).length

  return {
    total: cells.length,
    team,
    dark,
    open,
    fillFirst,
    publishTarget: '16–18',
    holdBack: open - 16,
  }
}

export function cellsForDay(day: ProgramCell['day'], cells = buildProgramGrid()) {
  return cells.filter((cell) => cell.day === day)
}

export function toProgrammingMarkdown() {
  const cells = buildProgramGrid()
  const counts = programCounts(cells)

  const daySections = WEEK_DATES.map((day) => {
    const rows = PROGRAM_SLOTS.map((slot) => {
      const a = cells.find((cell) => cell.day === day.iso && cell.slot === slot.id && cell.room === 'a')
      const b = cells.find((cell) => cell.day === day.iso && cell.slot === slot.id && cell.room === 'b')
      return `- **${slot.label}**
  - Room A: ${a?.title}${a?.kind === 'team' ? ' (TEAM)' : a?.kind === 'dark' ? ' (DARK)' : ''}
  - Room B: ${b?.title}${b?.kind === 'team' ? ' (TEAM)' : b?.kind === 'dark' ? ' (DARK)' : ''}`
    }).join('\n')

    return `### ${day.label}\n${rows}`
  }).join('\n\n')

  return `# ${PROGRAM.name} ${PROGRAM.year}
## ${PROGRAM.edition} Programming Blueprint

- **Dates:** ${PROGRAM.dates}
- **Hours:** ${PROGRAM.window}
- **City:** ${PROGRAM.city}
- **Rooms:** ${PROGRAM.rooms} per night (placeholders until hosts confirm)
- **Contact:** ${PROGRAM.contact}

## Locked team events

1. **Opening Night** — Monday, April 26, 5:30–7:00 PM, Room A  
   Produced by the Tech Week team. Welcome, week map, first room.
2. **Closing Night** — Friday, April 30, 9:00–10:00 PM, Room A  
   Produced by the Tech Week team. Recap, people, last hour together.

Room B stays dark during those two hours so the city has one opening and one close.

## Slot rules

- Speakers apply. The team books them into an open slot.
- One event per slot. A panel is still one slot with several names.
- Do not stack three short talks into 90 minutes.
- Fill **7:15–8:45 PM** first. That is the attendance window.
- Monday stays lighter. Thursday can be fullest. Friday late is Closing only.

## Inventory

| | Count |
|---|---|
| Total slots | ${counts.total} |
| Team events | ${counts.team} |
| Dark / hold | ${counts.dark} |
| Open for speaker booking | ${counts.open} |
| Prime slots to fill first | ${counts.fillFirst} |
| Publish target | ${counts.publishTarget} |

Hold the extra open slots. Empty is better than a thin room.

## Week grid

${daySections}

## Booking flow

1. Host confirms a room and which nights it is open.
2. That room becomes Room A or Room B for those nights.
3. Speaker applies (topic, format, duration, preferred night).
4. Team books the talk into one open slot.
5. Publish only when host, speaker, and volunteers are set.

## Tracks

AI, Cyber, UX, and Dev color a night or a room. They do not create four parallel conferences.

—  
Internal planning document. Not the public schedule.
`
}
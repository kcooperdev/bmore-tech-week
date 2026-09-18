import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import type { EventRecord, PublicEvent, Speaker, StoreData, TicketSignup, Venue, Volunteer } from '@/lib/models'
import { SEED_STORE } from '@/lib/seed'

const globalStore = globalThis as typeof globalThis & { __btwStore?: StoreData }

function storePath() {
  if (process.env.VERCEL) return path.join('/tmp', 'btw-store.json')
  return path.join(process.cwd(), 'data', 'btw-store.json')
}

function normalize(data: StoreData): StoreData {
  return {
    ...data,
    volunteers: Array.isArray(data.volunteers) ? data.volunteers : [],
    ticketSignups: Array.isArray(data.ticketSignups) ? data.ticketSignups : [],
  }
}

function cloneSeed(): StoreData {
  return structuredClone(SEED_STORE)
}

async function readFromDisk(): Promise<StoreData | null> {
  try {
    const raw = await readFile(storePath(), 'utf8')
    const parsed = JSON.parse(raw) as StoreData
    if (!parsed || !Array.isArray(parsed.venues) || !Array.isArray(parsed.speakers) || !Array.isArray(parsed.events)) {
      return null
    }
    return normalize(parsed)
  } catch {
    return null
  }
}

async function persist(data: StoreData) {
  globalStore.__btwStore = data
  try {
    const file = storePath()
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  } catch (err) {
    console.warn('[store] write skipped', err)
  }
}

let chain = Promise.resolve()

function withLock<T>(fn: () => Promise<T>) {
  const run = chain.then(fn, fn)
  chain = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

async function load(): Promise<StoreData> {
  const cached = globalStore.__btwStore
  if (cached && Array.isArray(cached.ticketSignups)) {
    return normalize(cached)
  }
  const disk = await readFromDisk()
  const data = normalize(disk ?? cloneSeed())
  globalStore.__btwStore = data
  return data
}

export async function getStore() {
  return withLock(() => load())
}

export async function listVenues() {
  const store = await getStore()
  return store.venues
}

export async function listSpeakers() {
  const store = await getStore()
  return store.speakers
}

export async function listEvents() {
  const store = await getStore()
  return store.events
}

export async function listVolunteers() {
  const store = await getStore()
  return store.volunteers
}

export async function createVenue(venue: Venue) {
  return withLock(async () => {
    const store = await load()
    store.venues.push(venue)
    await persist(store)
    return venue
  })
}

export async function createSpeaker(speaker: Speaker) {
  return withLock(async () => {
    const store = await load()
    store.speakers.push(speaker)
    await persist(store)
    return speaker
  })
}

export async function createTicketSignup(signup: TicketSignup) {
  return withLock(async () => {
    const store = await load()
    const existing = store.ticketSignups.find((item) => item.email === signup.email)
    if (existing) return existing
    store.ticketSignups.push(signup)
    await persist(store)
    return signup
  })
}

export async function createVolunteer(volunteer: Volunteer) {
  return withLock(async () => {
    const store = await load()
    store.volunteers.push(volunteer)
    await persist(store)
    return volunteer
  })
}

export async function updateVenue(id: string, patch: Partial<Venue>) {
  return withLock(async () => {
    const store = await load()
    const venue = store.venues.find((item) => item.id === id)
    if (!venue) return null
    Object.assign(venue, patch)
    await persist(store)
    return venue
  })
}

export async function updateSpeaker(id: string, patch: Partial<Speaker>) {
  return withLock(async () => {
    const store = await load()
    const speaker = store.speakers.find((item) => item.id === id)
    if (!speaker) return null
    Object.assign(speaker, patch)
    await persist(store)
    return speaker
  })
}

export async function updateVolunteer(id: string, patch: Partial<Volunteer>) {
  return withLock(async () => {
    const store = await load()
    const volunteer = store.volunteers.find((item) => item.id === id)
    if (!volunteer) return null
    Object.assign(volunteer, patch)
    await persist(store)
    return volunteer
  })
}

export async function createEvent(event: EventRecord) {
  return withLock(async () => {
    const store = await load()
    store.events.push(event)
    await persist(store)
    return event
  })
}

export async function updateEvent(id: string, patch: Partial<EventRecord>) {
  return withLock(async () => {
    const store = await load()
    const event = store.events.find((item) => item.id === id)
    if (!event) return null
    Object.assign(event, patch)
    await persist(store)
    return event
  })
}

export function toPublicEvent(event: EventRecord, venues: Venue[], speakers: Speaker[]): PublicEvent | null {
  const venue = venues.find((item) => item.id === event.venueId)
  const speaker = speakers.find((item) => item.id === event.speakerId)
  if (!venue || !speaker) return null
  return {
    ...event,
    venueName: venue.name,
    venueAddress: venue.address,
    speakerName: speaker.name,
  }
}

export async function listPublishedEvents(): Promise<PublicEvent[]> {
  const store = await getStore()
  return store.events
    .filter((event) => event.status === 'published')
    .map((event) => toPublicEvent(event, store.venues, store.speakers))
    .filter((event): event is PublicEvent => Boolean(event))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
}

export async function getPublishedEvent(slug: string): Promise<PublicEvent | null> {
  const store = await getStore()
  const event = store.events.find((item) => item.slug === slug && item.status === 'published')
  if (!event) return null
  return toPublicEvent(event, store.venues, store.speakers)
}

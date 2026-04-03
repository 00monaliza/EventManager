import type { Event } from '@/types/event'
import { mockEvents } from './mock-data'

const STORAGE_KEY = 'event-manager-events'

export function loadEvents(): Event[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return mockEvents
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return mockEvents
    return parsed as Event[]
  } catch {
    return mockEvents
  }
}

export function saveEvents(events: Event[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    // localStorage unavailable (SSR or private browsing) — silently ignore
  }
}

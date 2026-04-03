import { format, isPast, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Event, FilterState } from '@/types/event'

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'd MMMM yyyy, HH:mm', { locale: ru })
}

export function isDateInPast(iso: string): boolean {
  return isPast(parseISO(iso))
}

export function exportToJSON(events: Event[]): void {
  const json = JSON.stringify(events, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `events-${format(new Date(), 'yyyy-MM-dd')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function filterAndSort(events: Event[], filters: FilterState): Event[] {
  let result = [...events]

  if (filters.category !== 'All') {
    result = result.filter((e) => e.category === filters.category)
  }

  if (filters.status !== 'All') {
    result = result.filter((e) => e.status === filters.status)
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    )
  }

  switch (filters.sort) {
    case 'date-asc':
      result.sort((a, b) => a.date.localeCompare(b.date))
      break
    case 'date-desc':
      result.sort((a, b) => b.date.localeCompare(a.date))
      break
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'title-desc':
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
}

import { create } from 'zustand'
import type { Event, EventFormData, FilterState } from '@/types/event'
import { loadEvents, saveEvents } from '@/lib/storage'
import { filterAndSort } from '@/lib/utils'
import { showToast } from '@/components/ui/Toast'

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  status: 'All',
  search: '',
  sort: 'date-asc',
}

interface EventStore {
  events: Event[]
  filters: FilterState
  isLoading: boolean

  initStore: () => void
  addEvent: (data: EventFormData) => void
  updateEvent: (id: string, data: EventFormData) => void
  deleteEvent: (id: string) => void
  toggleFavorite: (id: string) => void
  setFilters: (partial: Partial<FilterState>) => void
  resetFilters: () => void
  getFilteredEvents: () => Event[]
  getFavoriteEvents: () => Event[]
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  filters: DEFAULT_FILTERS,
  isLoading: true,

  initStore: () => {
    const events = loadEvents()
    set({ events, isLoading: false })
  },

  addEvent: (data: EventFormData) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      ...data,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    }
    const events = [...get().events, newEvent]
    saveEvents(events)
    set({ events })
    showToast('Мероприятие создано')
  },

  updateEvent: (id: string, data: EventFormData) => {
    const events = get().events.map((e) =>
      e.id === id ? { ...e, ...data } : e
    )
    saveEvents(events)
    set({ events })
    showToast('Мероприятие обновлено')
  },

  deleteEvent: (id: string) => {
    const events = get().events.filter((e) => e.id !== id)
    saveEvents(events)
    set({ events })
    showToast('Мероприятие удалено', 'info')
  },

  toggleFavorite: (id: string) => {
    const events = get().events.map((e) =>
      e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
    )
    saveEvents(events)
    set({ events })
  },

  setFilters: (partial: Partial<FilterState>) => {
    set((state) => ({ filters: { ...state.filters, ...partial } }))
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS })
  },

  getFilteredEvents: () => {
    const { events, filters } = get()
    return filterAndSort(events, filters)
  },

  getFavoriteEvents: () => {
    return get().events.filter((e) => e.isFavorite)
  },
}))

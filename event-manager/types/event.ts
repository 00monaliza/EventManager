export type EventCategory = 'Conference' | 'Webinar' | 'Meeting' | 'Other'

export type EventStatus = 'Planned' | 'Completed' | 'Cancelled'

export type SortOption =
  | 'date-asc'
  | 'date-desc'
  | 'title-asc'
  | 'title-desc'

export interface Event {
  id: string
  title: string
  description: string
  date: string // ISO 8601
  category: EventCategory
  status: EventStatus
  isFavorite: boolean
  createdAt: string // ISO 8601
}

export interface EventFormData {
  title: string
  description: string
  date: string
  category: EventCategory
  status: EventStatus
}

export interface FilterState {
  category: EventCategory | 'All'
  status: EventStatus | 'All'
  search: string
  sort: SortOption
}

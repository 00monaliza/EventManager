'use client'

import { useEffect, useState } from 'react'
import type { EventCategory, EventStatus, SortOption } from '@/types/event'
import { useEventStore } from '@/store/useEventStore'
import Button from '@/components/ui/Button'
import styles from './EventFilters.module.css'

const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Conference',
  'Webinar',
  'Meeting',
  'Other',
]
const STATUSES: (EventStatus | 'All')[] = [
  'All',
  'Planned',
  'Completed',
  'Cancelled',
]
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'date-asc', label: 'Дата ↑' },
  { value: 'date-desc', label: 'Дата ↓' },
  { value: 'title-asc', label: 'A → Z' },
  { value: 'title-desc', label: 'Z → A' },
]

export default function EventFilters() {
  const filters = useEventStore((s) => s.filters)
  const setFilters = useEventStore((s) => s.setFilters)
  const resetFilters = useEventStore((s) => s.resetFilters)
  const events = useEventStore((s) => s.events)
  const getFilteredEvents = useEventStore((s) => s.getFilteredEvents)

  const [searchInput, setSearchInput] = useState(filters.search)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchInput })
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, setFilters])

  const isFilterActive =
    filters.category !== 'All' ||
    filters.status !== 'All' ||
    filters.search !== '' ||
    filters.sort !== 'date-asc'

  const filteredCount = getFilteredEvents().length
  const totalCount = events.length

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Поиск по названию или описанию…"
          className={styles.search}
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ category: e.target.value as EventCategory | 'All' })
          }
          className={styles.select}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'Все категории' : c}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ status: e.target.value as EventStatus | 'All' })
          }
          className={styles.select}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'Все статусы' : s}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value as SortOption })}
          className={styles.select}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {isFilterActive && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Сбросить
          </Button>
        )}
      </div>

      <p className={styles.count}>
        Показано{' '}
        <strong>{filteredCount}</strong> из{' '}
        <strong>{totalCount}</strong> мероприятий
      </p>
    </div>
  )
}

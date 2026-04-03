'use client'

import { useEventStore } from '@/store/useEventStore'
import Button from '@/components/ui/Button'
import EventCard from './EventCard'
import EventSkeleton from './EventSkeleton'
import styles from './EventList.module.css'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import EventForm from './EventForm'

interface EventListProps {
  mode?: 'filtered' | 'favorites'
}

export default function EventList({ mode = 'filtered' }: EventListProps) {
  const getFilteredEvents = useEventStore((s) => s.getFilteredEvents)
  const getFavoriteEvents = useEventStore((s) => s.getFavoriteEvents)
  const events = useEventStore((s) => s.events)
  const filters = useEventStore((s) => s.filters)
  const isLoading = useEventStore((s) => s.isLoading)
  const [addOpen, setAddOpen] = useState(false)

  if (isLoading) return <EventSkeleton />

  const displayed = mode === 'favorites' ? getFavoriteEvents() : getFilteredEvents()

  const isFilterActive =
    filters.category !== 'All' ||
    filters.status !== 'All' ||
    filters.search !== ''

  if (displayed.length === 0) {
    if (mode === 'favorites') {
      return (
        <p className={styles.empty}>
          Нет избранных мероприятий. Нажмите ★ на карточке.
        </p>
      )
    }
    if (events.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.empty}>Нет мероприятий. Создайте первое!</p>
          <Button variant="primary" onClick={() => setAddOpen(true)}>
            + Добавить мероприятие
          </Button>
          <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Новое мероприятие">
            <EventForm onClose={() => setAddOpen(false)} />
          </Modal>
        </div>
      )
    }
    if (isFilterActive) {
      return (
        <p className={styles.empty}>
          Мероприятий не найдено. Попробуйте изменить фильтры.
        </p>
      )
    }
  }

  return (
    <div className={styles.grid}>
      {displayed.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

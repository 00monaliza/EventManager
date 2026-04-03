'use client'

import { useState } from 'react'
import type { Event } from '@/types/event'
import { formatDate } from '@/lib/utils'
import { useEventStore } from '@/store/useEventStore'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import EventForm from './EventForm'
import DeleteConfirm from './DeleteConfirm'
import styles from './EventCard.module.css'

interface EventCardProps {
  event: Event
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function EventCard({ event }: EventCardProps) {
  const toggleFavorite = useEventStore((s) => s.toggleFavorite)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const isCompleted = event.status === 'Completed'

  return (
    <>
      <article className={`${styles.card} ${isCompleted ? styles.completed : ''}`}>
        <div className={styles.badges}>
          <Badge type="category" value={event.category} />
          <Badge type="status" value={event.status} />
        </div>

        <h3 className={styles.title}>{event.title}</h3>

        {event.description && (
          <p className={styles.description}>{event.description}</p>
        )}

        <time
          className={`${styles.date} ${isCompleted ? styles.dateMuted : ''}`}
          dateTime={event.date}
        >
          {formatDate(event.date)}
        </time>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.favorite} ${event.isFavorite ? styles.favoriteActive : ''}`}
            onClick={() => toggleFavorite(event.id)}
            aria-label={event.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <StarIcon filled={event.isFavorite} />
          </button>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => setEditOpen(true)}
            >
              Изменить
            </button>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => setDeleteOpen(true)}
            >
              Удалить
            </button>
          </div>
        </div>
      </article>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Редактировать мероприятие">
        <EventForm initialData={event} onClose={() => setEditOpen(false)} />
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Удалить мероприятие">
        <DeleteConfirm event={event} onClose={() => setDeleteOpen(false)} />
      </Modal>
    </>
  )
}

'use client'

import type { Event } from '@/types/event'
import { useEventStore } from '@/store/useEventStore'
import Button from '@/components/ui/Button'
import styles from './DeleteConfirm.module.css'

interface DeleteConfirmProps {
  event: Event
  onClose: () => void
}

export default function DeleteConfirm({ event, onClose }: DeleteConfirmProps) {
  const deleteEvent = useEventStore((s) => s.deleteEvent)

  function handleDelete() {
    deleteEvent(event.id)
    onClose()
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Вы уверены, что хотите удалить мероприятие{' '}
        <strong>«{event.title}»</strong>? Это действие нельзя отменить.
      </p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    </div>
  )
}

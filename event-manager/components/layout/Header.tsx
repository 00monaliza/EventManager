'use client'

import { useState } from 'react'
import { useEventStore } from '@/store/useEventStore'
import { exportToJSON } from '@/lib/utils'
import { showToast } from '@/components/ui/Toast'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EventForm from '@/components/events/EventForm'
import styles from './Header.module.css'

export default function Header() {
  const getFilteredEvents = useEventStore((s) => s.getFilteredEvents)
  const [addOpen, setAddOpen] = useState(false)

  function handleExport() {
    exportToJSON(getFilteredEvents())
    showToast('Экспорт выполнен', 'info')
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Event Manager</h1>
      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={handleExport}>
          Экспорт JSON
        </Button>
        <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
          + Добавить мероприятие
        </Button>
      </div>

      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Новое мероприятие"
      >
        <EventForm onClose={() => setAddOpen(false)} />
      </Modal>
    </header>
  )
}

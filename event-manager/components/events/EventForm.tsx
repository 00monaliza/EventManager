'use client'

import { useState } from 'react'
import type { Event, EventCategory, EventFormData, EventStatus } from '@/types/event'
import { isDateInPast } from '@/lib/utils'
import { useEventStore } from '@/store/useEventStore'
import Button from '@/components/ui/Button'
import styles from './EventForm.module.css'

interface EventFormProps {
  initialData?: Event
  onClose: () => void
}

interface FormErrors {
  title?: string
  date?: string
}

const CATEGORIES: EventCategory[] = ['Conference', 'Webinar', 'Meeting', 'Other']
const STATUSES: EventStatus[] = ['Planned', 'Completed', 'Cancelled']

function toDatetimeLocal(iso: string): string {
  return iso.slice(0, 16) // "YYYY-MM-DDTHH:MM"
}

export default function EventForm({ initialData, onClose }: EventFormProps) {
  const addEvent = useEventStore((s) => s.addEvent)
  const updateEvent = useEventStore((s) => s.updateEvent)

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [date, setDate] = useState(
    initialData ? toDatetimeLocal(initialData.date) : ''
  )
  const [category, setCategory] = useState<EventCategory>(
    initialData?.category ?? 'Conference'
  )
  const [status, setStatus] = useState<EventStatus>(
    initialData?.status ?? 'Planned'
  )
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const next: FormErrors = {}

    if (!title.trim() || title.trim().length < 3) {
      next.title = 'Название обязательно и должно содержать минимум 3 символа'
    }

    if (!date) {
      next.date = 'Дата обязательна'
    } else if (status === 'Planned' && isDateInPast(new Date(date).toISOString())) {
      next.date = 'Для запланированного мероприятия дата не может быть в прошлом'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const data: EventFormData = {
      title: title.trim(),
      description: description.trim(),
      date: new Date(date).toISOString(),
      category,
      status,
    }

    if (initialData) {
      updateEvent(initialData.id, data)
    } else {
      addEvent(data)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Title */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ef-title">
          Название <span className={styles.required}>*</span>
        </label>
        <input
          id="ef-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="Название мероприятия"
        />
        {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ef-desc">
          Описание{' '}
          <span className={styles.counter}>{description.length}/500</span>
        </label>
        <textarea
          id="ef-desc"
          value={description}
          maxLength={500}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Краткое описание мероприятия (необязательно)"
          rows={4}
        />
      </div>

      {/* Date */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ef-date">
          Дата и время <span className={styles.required}>*</span>
        </label>
        <input
          id="ef-date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
        />
        {errors.date && <p className={styles.errorMsg}>{errors.date}</p>}
      </div>

      {/* Category + Status row */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ef-category">
            Категория
          </label>
          <select
            id="ef-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
            className={styles.select}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="ef-status">
            Статус
          </label>
          <select
            id="ef-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as EventStatus)}
            className={styles.select}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </form>
  )
}

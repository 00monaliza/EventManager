'use client'

import type { EventCategory, EventStatus } from '@/types/event'
import styles from './Badge.module.css'

interface BadgeProps {
  type: 'category' | 'status'
  value: EventCategory | EventStatus
}

export default function Badge({ type, value }: BadgeProps) {
  const cls = `${styles.badge} ${styles[`${type}-${value.toLowerCase()}`]}`
  return <span className={cls}>{value}</span>
}

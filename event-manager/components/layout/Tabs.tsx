'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEventStore } from '@/store/useEventStore'
import styles from './Tabs.module.css'

export default function Tabs() {
  const pathname = usePathname()
  const getFavoriteEvents = useEventStore((s) => s.getFavoriteEvents)
  const favCount = getFavoriteEvents().length

  return (
    <nav className={styles.nav}>
      <Link
        href="/events"
        className={`${styles.tab} ${pathname === '/events' ? styles.active : ''}`}
      >
        Все мероприятия
      </Link>
      <Link
        href="/favorites"
        className={`${styles.tab} ${pathname === '/favorites' ? styles.active : ''}`}
      >
        Избранное ★ {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
      </Link>
    </nav>
  )
}

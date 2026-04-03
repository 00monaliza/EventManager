'use client'

import styles from './EventSkeleton.module.css'

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.badges}>
        <div className={`${styles.shimmer} ${styles.badge}`} />
        <div className={`${styles.shimmer} ${styles.badge}`} />
      </div>
      <div className={`${styles.shimmer} ${styles.title}`} />
      <div className={`${styles.shimmer} ${styles.line}`} />
      <div className={`${styles.shimmer} ${styles.lineShort}`} />
      <div className={`${styles.shimmer} ${styles.date}`} />
    </div>
  )
}

export default function EventSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

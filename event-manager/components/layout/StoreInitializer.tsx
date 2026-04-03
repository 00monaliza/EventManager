'use client'

import { useEffect } from 'react'
import { useEventStore } from '@/store/useEventStore'

export default function StoreInitializer() {
  const initStore = useEventStore((s) => s.initStore)

  useEffect(() => {
    initStore()
  }, [initStore])

  return null
}

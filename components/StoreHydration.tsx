'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

export default function StoreHydration() {
  useEffect(() => {
    useStore.persist.rehydrate()
  }, [])

  return null
}
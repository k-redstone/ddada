'use client'

import { createContext, useContext, useMemo } from 'react'

import { GymInfo } from '@/features/gym/types/GymTypes.ts'

interface GymContextProps {
  gymInfo: GymInfo | null | undefined
  children?: React.ReactNode
}

// Context 생성
const GymContext = createContext<GymContextProps | null>(null)

// Context를 사용하는 Custom Hook
export const useGymContext = () => {
  const context = useContext(GymContext)
  if (!context) {
    throw new Error('must be used within a GymProvider')
  }
  return context
}

// Context Provider 생성
export function GymProvider({ gymInfo, children }: GymContextProps) {
  const value = useMemo(() => ({ gymInfo }), [])
  return <GymContext.Provider value={value}>{children}</GymContext.Provider>
}

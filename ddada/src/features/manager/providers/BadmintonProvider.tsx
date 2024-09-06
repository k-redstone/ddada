'use client'

import { createContext, useContext } from 'react'

import BadmintonScoreboard from '@/features/manager/utils/BadmintonScoreboard.ts'

const dummyData = {
  team1: [
    {
      id: 100,
      nickname: '박상우',
    },
    {
      id: 101,
      nickname: '윤경서',
    },
  ],
  team2: [
    {
      id: 102,
      nickname: '정한수',
    },
    {
      id: 103,
      nickname: '최성철',
    },
  ],
}

const BadmintonInstance = new BadmintonScoreboard(1, 'doubles', dummyData)

const BadmintonContext = createContext(BadmintonInstance)

function useBadmintonContext() {
  return useContext(BadmintonContext)
}

function BadmintonProvider({ children }: React.PropsWithChildren) {
  return (
    <BadmintonContext.Provider value={BadmintonInstance}>
      {children}
    </BadmintonContext.Provider>
  )
}

export { useBadmintonContext, BadmintonProvider }

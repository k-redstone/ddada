'use client'

import { useState } from 'react'

import ScoreModal from '@/features/manager/components/ScoreModal/index.tsx'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'
import BlueCourtRight from '@/static/imgs/manager/BlueCourtRight.svg'
import RedCourtLeft from '@/static/imgs/manager/RedCourtLeft.svg'

export default function BadmintonCourt() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectTeam, setselectTeam] = useState<string>('')

  const { badmintonInstance } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))

  const handleScore = (team: string) => {
    if (badmintonInstance.winner) return
    setselectTeam(team)
    setModalOpen(true)
  }
  const handleScoreModalOff = () => {
    setModalOpen(false)
  }

  return (
    <div className="flex gap-x-6">
      <div
        className="relative"
        onClick={() => handleScore('team1')}
        aria-hidden="true"
      >
        <div className="text-[#FCA211] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl">팀 A</p>
          <p className="font-bold text-6xl">
            {badmintonInstance.matchScores?.team1}
          </p>
        </div>
        <RedCourtLeft />
      </div>
      <div
        className="relative"
        onClick={() => handleScore('team2')}
        aria-hidden="true"
      >
        <div className="text-[#ffffff] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl">팀 B</p>
          <p className="font-bold text-6xl">
            {badmintonInstance.matchScores?.team2}
          </p>
        </div>
        <BlueCourtRight />
      </div>
      {isModalOpen && (
        <ScoreModal
          modalhandler={handleScoreModalOff}
          selectTeam={selectTeam}
        />
      )}
    </div>
  )
}

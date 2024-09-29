'use client'

import { useLayoutEffect } from 'react'

import BadmintonCourt from '@/features/manager/components/BadmintonCourt/index.tsx'
// import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import { REALDATADUMMY } from '@/features/manager/constants/dummyData.ts'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'
import BadmintonScoreboardInstance from '@/features/manager/utils/BadmintonScoreboardInstance.ts'

export default function BadmintonScoreBoard() {
  const { badmintonInstance, update } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))

  useLayoutEffect(() => {
    const initInstance = new BadmintonScoreboardInstance(
      1,
      REALDATADUMMY.team1,
      REALDATADUMMY.team2,
    )
    initInstance.initialize()
    update(initInstance)
  }, [])

  if (!badmintonInstance) {
    return (
      <div>
        <p>asdf</p>
      </div>
    )
  }
  return (
    <div className="p-2 flex flex-col gap-y-6 bg-white">
      <p className="font-bold">게임 진행 중</p>
      <div className="flex justify-center">
        <BadmintonSetScore />
      </div>
      <div className="flex justify-center">
        <BadmintonTool />
      </div>
      <div className="flex justify-center">
        <BadmintonCourt />
      </div>
      <MatchScoreCard
        matchResult={{
          team1: badmintonInstance.sets[0].team1Score,
          team2: badmintonInstance.sets[0].team2Score,
        }}
        isVisible={badmintonInstance.currentSet >= 2}
      />
      <MatchScoreCard
        matchResult={{
          team1: badmintonInstance.sets[1].team1Score,
          team2: badmintonInstance.sets[1].team2Score,
        }}
        isVisible={badmintonInstance.currentSet >= 3}
      />
      <MatchScoreCard
        matchResult={{
          team1: badmintonInstance.sets[2].team1Score,
          team2: badmintonInstance.sets[2].team2Score,
        }}
        isVisible={badmintonInstance.currentSet >= 4}
      />
      {badmintonInstance.winnerTeamNumber ? (
        <div className="bg-theme flex justify-center items-center h-[4.75rem] cursor-pointer">
          <span className="text-white text-xl font-bold ">매치 완료</span>
        </div>
      ) : (
        <div className="bg-disabled flex justify-center items-center h-[4.75rem]">
          <span className="text-disabled-dark text-xl font-bold">
            매치 완료
          </span>
        </div>
      )}
    </div>
  )
}

function BadmintonTool() {
  const { badmintonInstance, update } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))
  const handleUndo = () => {
    badmintonInstance.undo()
    update(badmintonInstance)
  }

  const handleRedo = () => {
    badmintonInstance.redo()
    update(badmintonInstance)
  }

  return (
    <div className="flex gap-x-3">
      <button type="button" onClick={() => handleUndo()}>
        undo
      </button>
      <button type="button" onClick={() => handleRedo()}>
        redo
      </button>
    </div>
  )
}

function BadmintonSetScore() {
  const { badmintonInstance } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
  }))

  return (
    <div className="w-[12.5rem] border border-theme px-6 py-2 rounded-[62.5rem] flex justify-center items-center">
      <p className="text-theme text-4xl font-bold ">
        {badmintonInstance.team1SetScore} : {badmintonInstance.team2SetScore}{' '}
      </p>
    </div>
  )
}

interface MatchResult {
  team1: number
  team2: number
}

function MatchScoreCard({
  matchResult = { team1: 0, team2: 0 },
  isVisible = false,
}: {
  matchResult?: MatchResult | null
  isVisible: boolean
}) {
  const winnerTeam = () => {
    if (!isVisible) {
      return false
    }
    if (!matchResult) {
      return false
    }

    if (matchResult.team1 > matchResult.team2) {
      return 1
    }
    if (matchResult.team1 < matchResult.team2) {
      return 2
    }
    return false
  }

  return (
    <div
      className={`flex gap-x-2 px-6 py-5 border-disabled bg-  border rounded-xl justify-between ${!isVisible && `bg-disabled`}`}
    >
      {/* A팀 */}
      <div className="flex gap-x-3 items-center">
        <div className="flex gap-x-3">
          {/* <GameUserInfo /> */}
          {/* <GameUserInfo /> */}
        </div>
        <div className="grow">
          <div className="flex gap-x-1 items-center">
            <span className="text-disabled-dark text-sm font-bold">팀 A</span>
            <div className="rounded-full w-2 h-2 bg-[#FFF3C5]" />
          </div>
        </div>
      </div>
      {/* 매치 점수 */}
      <div className="flex gap-x-6 text-4xl font-bold">
        <span
          className={`${winnerTeam() === 1 ? `text-theme` : `text-disabled-dark`}`}
        >
          {isVisible ? matchResult?.team1 : '00'}
        </span>
        <span>:</span>
        <span
          className={`${winnerTeam() === 2 ? `text-theme ` : `text-disabled-dark`}`}
        >
          {isVisible ? matchResult?.team2 : '00'}
        </span>
      </div>
      {/* B팀 */}
      <div className="flex gap-x-3 items-center flex-row-reverse">
        <div className="flex gap-x-3">
          {/* <GameUserInfo /> */}
          {/* <GameUserInfo /> */}
        </div>
        <div className="grow">
          <div className="flex gap-x-1 items-center">
            <div className="rounded-full w-2 h-2 bg-theme" />
            <span className="text-disabled-dark text-sm font-bold">팀 B</span>
          </div>
        </div>
      </div>
    </div>
  )
}

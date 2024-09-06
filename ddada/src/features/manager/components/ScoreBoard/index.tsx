'use client'

import { useLayoutEffect, useState } from 'react'

import ScoreModal from '@/features/manager/components/ScoreModal/index.tsx'
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

export default function ScoreBoard() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectUser, setSelectUser] = useState<number>(0)
  const [gamescore, setGamescore] = useState({
    setScores: {
      team1: 0,
      team2: 0,
    },
    matchScores: {
      team1: 0,
      team2: 0,
    },
  })
  const [gameScoreboard, setGameScoreboard] = useState<BadmintonScoreboard>(
    new BadmintonScoreboard(1, 'doubles', dummyData),
  )

  const handleScore = (user: number) => {
    setSelectUser(user)
    setModalOpen(true)
  }
  const handleScoreModalOff = () => {
    setGamescore(gameScoreboard.getScore())
    setModalOpen(false)
  }

  const handleUndo = () => {
    gameScoreboard?.undo()
    setGamescore(gameScoreboard.getScore())
  }

  const handleRedo = () => {
    gameScoreboard?.redo()
    setGamescore(gameScoreboard.getScore())
  }
  useLayoutEffect(() => {
    const scoreboardInstance = new BadmintonScoreboard(1, 'doubles', dummyData)
    scoreboardInstance.initialize()
    setGameScoreboard(scoreboardInstance)
    setGamescore(scoreboardInstance.getScore())
  }, [])

  if (!gameScoreboard) {
    return (
      <div>
        <p>로딩임</p>
      </div>
    )
  }

  return (
    <div className="w-[300px]">
      <div>
        <p>점수판</p>
        <p>
          세트 스코어 {gamescore.setScores.team1} : {gamescore.setScores.team2}
        </p>
        <p>
          매치 스코어 {gamescore.matchScores.team1} :{' '}
          {gamescore.matchScores.team2}
        </p>
        <div className="flex gap-x-3">
          <button type="button" onClick={() => handleUndo()}>
            undo
          </button>
          <button type="button" onClick={() => handleRedo()}>
            redo
          </button>
        </div>
      </div>
      <div className="flex bg-orange-700 flex-col h-[200px]">
        <div className="flex grow">
          <button
            type="button"
            className="w-[150px] border-r-2 border-dashed"
            onClick={() => handleScore(gameScoreboard.teams.team1[0].id)}
          >
            {gameScoreboard.teams.team1[0].nickname}
          </button>
          <button
            className="grow"
            type="button"
            onClick={() => handleScore(gameScoreboard.teams.team1[1].id)}
          >
            {gameScoreboard.teams.team1[1].nickname}
          </button>
        </div>
        <div className="border-y-2 border-black h-[20px]" />
        <div className="flex grow">
          <button
            type="button"
            className=" w-[150px] border-r-2 border-dashed"
            onClick={() => handleScore(gameScoreboard.teams.team2[0].id)}
          >
            {gameScoreboard.teams.team2[0].nickname}
          </button>
          <button
            type="button"
            className="grow"
            onClick={() => handleScore(gameScoreboard.teams.team2[1].id)}
          >
            {gameScoreboard.teams.team2[1].nickname}
          </button>
        </div>
      </div>
      {JSON.stringify(gameScoreboard.history)}
      {isModalOpen && (
        <ScoreModal
          modalhandler={handleScoreModalOff}
          scorehandler={gameScoreboard}
          currentUserId={selectUser}
        />
      )}
    </div>
  )
}

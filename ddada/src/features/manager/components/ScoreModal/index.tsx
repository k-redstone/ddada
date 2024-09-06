'use client'

import { useState } from 'react'

const scoreType = {
  SMASH: '스메시',
  PUSH: '푸시',
  DROP: '드롭',
  CLEAR: '클리어',
  HAIRPIN: '헤어핀',
  SERVE: '서브',
}

type TeamInfo = { id: number; nickname: string }

interface ScoreModalProps {
  modalhandler: () => void
  scorehandler: {
    pointScored: (
      userId: number,
      earnedType: string,
      missedUser: number[],
    ) => void
    getOpponent: (userId: number) => TeamInfo[] | null
  }
  currentUserId: number
}

export default function ScoreModal({
  modalhandler,
  scorehandler,
  currentUserId,
}: ScoreModalProps) {
  const [earnedType, setEarnedType] = useState<string>('')
  const [missedUser, setMissedUser] = useState<number[]>([])

  const handleMissedUser = (userId: number) => {
    setMissedUser((prevMissedUser) => {
      const index = prevMissedUser.indexOf(userId)

      if (index >= 0) {
        return prevMissedUser.filter((id) => id !== userId)
      }
      return [...prevMissedUser, userId]
    })
  }

  const handleStoreScore = () => {
    scorehandler.pointScored(currentUserId, earnedType, missedUser)
    modalhandler()
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => modalhandler()}
        aria-hidden="true"
      />

      <div className="fixed left-1/2 top-1/2 z-40 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex flex-col gap-y-5">
          {/* 위에 툴바 */}
          <div>
            <button type="button" onClick={() => modalhandler()}>
              닫기
            </button>
          </div>
          {/* 점수 타입 */}
          <div>
            <p>점수 타입</p>
            <div className="flex gap-x-3">
              {Object.entries(scoreType).map(([key, value]) => (
                <button
                  type="button"
                  key={key}
                  className={`w-[50px] h-[40px] border-2 border-black rounded-md ${earnedType === key && `bg-red-300`} `}
                  onClick={() => setEarnedType(key)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* 실책 선수 */}
          <div>
            <p>실책 선수</p>
            <div className="flex gap-x-3">
              {scorehandler.getOpponent(currentUserId)?.map((teamInfo) => (
                <button
                  type="button"
                  key={teamInfo.id}
                  className={`w-[50px] h-[40px] border-2 border-black rounded-md ${missedUser.includes(teamInfo.id) && `bg-red-300`}`}
                  onClick={() => handleMissedUser(teamInfo.id)}
                >
                  {teamInfo.nickname}
                </button>
              ))}
            </div>
          </div>
          {/* 저장 버튼 */}
          <div>
            <button
              type="button"
              className="border-2 rounded-lg"
              onClick={() => handleStoreScore()}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

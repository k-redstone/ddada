'use client'

import { useState } from 'react'

import Button from '@/features/manager/components/Button/index.tsx'
import { useBadmintonContext } from '@/features/manager/providers/BadmintonProvider.tsx'

const scoreType = {
  SMASH: '스메시',
  DROP: '드롭',
  CLEAR: '클리어',
  PUSH: '푸시',
  NET: '네트플레이',
}

const missType = {
  SERVE: '서브폴트',
}

interface ScoreModalProps {
  modalhandler: () => void
  currentUserId: number
}

export default function ScoreModal({
  modalhandler,
  currentUserId,
}: ScoreModalProps) {
  const [earnedType, setEarnedType] = useState<string>('')
  const [missedUser, setMissedUser] = useState<number[]>([])
  const badmintonInstance = useBadmintonContext()

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
    badmintonInstance.pointScored(currentUserId, earnedType, missedUser)
    modalhandler()
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => modalhandler()}
        aria-hidden="true"
      />

      <div className="fixed left-1/2 top-1/2 z-40 max-w-[919px] px-6 py-4 -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex flex-col gap-y-3">
          {/* 위에 툴바 */}
          <div className="py-3 border-b-[1px] border-[#E5E5ED]">
            <p>툴바임</p>
          </div>

          {/* 득점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">득점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(scoreType).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="earn"
                  text={value}
                  changeStyle={earnedType === key}
                  onClick={() => setEarnedType(key)}
                />
              ))}
            </div>
          </div>

          {/* 실점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">실점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(missType).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="miss"
                  text={value}
                  changeStyle={earnedType === key}
                  onClick={() => setEarnedType(key)}
                />
              ))}
            </div>
          </div>

          {/* 폴트인원 */}
          <div
            className={`py-1 px-2 flex flex-col gap-y-2 rounded-md ${missedUser.length === 0 && `bg-[#F6F6F6]`}`}
          >
            <p className="font-bold">폴트인원</p>
            <div className="flex gap-x-3">
              {badmintonInstance
                .getOpponent(currentUserId)
                ?.map((teamInfo) => (
                  <Button
                    key={teamInfo.nickname}
                    size="lg"
                    type="fault"
                    text={teamInfo.nickname}
                    changeStyle={missedUser.includes(teamInfo.id)}
                    onClick={() => handleMissedUser(teamInfo.id)}
                  />
                ))}
            </div>
          </div>

          {/* 닫기 & 저장 */}
          <div className="flex gap-x-3 text-base">
            <button
              className="grow rounded-xl border-[1px] py-[10px] border-[#FCA211]"
              type="button"
              onClick={() => modalhandler()}
            >
              닫기
            </button>
            <button
              className={`grow rounded-xl border-[1px] py-[10px]   ${earnedType === '' && missedUser.length === 0 ? `text-[#6B6E78] bg-[#E5E5ED]` : `text-[#ffffff] bg-[#FCA211]`}`}
              type="button"
              onClick={() => handleStoreScore()}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

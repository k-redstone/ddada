'use client'

import { useState } from 'react'

import Button from '@/features/manager/components/Button/index.tsx'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'
import GameUserInfo from '../GameUserInfo'

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
  selectTeam: string
  modalhandler: () => void
}

export default function ScoreModal({
  modalhandler,
  selectTeam,
}: ScoreModalProps) {
  const [earnedUser, setEarnedUser] = useState<number>(-1)
  const [earnedType, setEarnedType] = useState<string>('')
  const [missedUser, setMissedUser] = useState<number[]>([])

  const { badmintonInstance, update } = useBadmintonStore((state) => ({
    badmintonInstance: state.badmintonInstance,
    update: state.update,
  }))

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
    if (earnedType === '' && missedUser.length === 0 && earnedUser === -1)
      return

    badmintonInstance.pointScored(earnedUser, earnedType, missedUser)
    update(badmintonInstance)
    modalhandler()
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => modalhandler()}
        aria-hidden="true"
      />

      <div className="fixed left-1/2 top-1/2 z-40 max-w-[919px] px-6 py-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
        <div className="flex flex-col gap-y-3">
          {/* 위에 툴바 */}
          <div className="py-3 border-b-[1px] border-[#E5E5ED] flex gap-x-3">
            <div className="flex gap-x-3">
              <GameUserInfo />
              <GameUserInfo />
            </div>
            {selectTeam === 'team1' ? (
              <div className="flex gap-x-1 items-center">
                <span className="text-[#6B6E78] text-sm font-bold"> 팀 A</span>
                <div className="rounded-full w-2 h-2 bg-[#FFF3C5]"></div>
              </div>
            ) : (
              <div className="flex gap-x-1 items-center">
                <span className="text-[#6B6E78] text-sm font-bold"> 팀 B</span>
                <div className="rounded-full w-2 h-2 bg-[#FCA211]"></div>
              </div>
            )}
          </div>

          {/* 득점 인원 */}
          <div className="py-1 px-2 flex flex-col gap-y-2 rounded-md">
            <p className="font-bold">득점인원</p>
            <div className="flex gap-x-3">
              {selectTeam === 'team1'
                ? badmintonInstance.teams.team1.map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`A${index + 1}`}
                      changeStyle={earnedUser === playerInfo.id}
                      onClick={() => setEarnedUser(playerInfo.id)}
                    />
                  ))
                : badmintonInstance.teams.team2.map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`B${index + 1}`}
                      changeStyle={earnedUser === playerInfo.id}
                      onClick={() => setEarnedUser(playerInfo.id)}
                    />
                  ))}
            </div>
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
              {selectTeam === 'team1'
                ? badmintonInstance.teams.team2.map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`B${index + 1}`}
                      changeStyle={missedUser.includes(playerInfo.id)}
                      onClick={() => handleMissedUser(playerInfo.id)}
                    />
                  ))
                : badmintonInstance.teams.team1.map((playerInfo, index) => (
                    <Button
                      key={playerInfo.nickname}
                      size="lg"
                      type="fault"
                      text={`A${index + 1}`}
                      changeStyle={missedUser.includes(playerInfo.id)}
                      onClick={() => handleMissedUser(playerInfo.id)}
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
              className={`grow rounded-xl border-[1px] py-[10px]   ${earnedType === '' && missedUser.length === 0 && earnedUser === -1 ? `text-[#6B6E78] bg-[#E5E5ED]` : `text-[#ffffff] bg-[#FCA211]`}`}
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

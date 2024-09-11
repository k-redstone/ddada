'use client'

import { useState } from 'react'

import Button from '@/features/manager/components/Button/index.tsx'
import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import {
  EARN_TYPE,
  MISS_TYPE,
} from '@/features/manager/constants/scoreConstants.ts'
import useBadmintonStore from '@/features/manager/stores/useBadmintonStore.tsx'

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
  const [missedType, setMissedType] = useState<string>('')
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

  const handleFaultType = (key: string) => {
    // 이전꺼 초기화
    setEarnedUser(-1)
    setEarnedType('')
    setMissedUser([])

    // 폴트 설정
    setMissedType(key)
  }

  const handleEarnType = (key: string) => {
    // 이전꺼 초기화
    setMissedType('')
    setMissedUser([])

    // 득점 설정
    setEarnedType(key)
  }

  const handleStoreScore = () => {
    if (earnedType === '' && missedUser.length === 0 && earnedUser === -1)
      return
    if (missedType === 'SERVE') {
      badmintonInstance.faultScored(earnedUser, missedType, missedUser)
    } else {
      badmintonInstance.earnScored(earnedUser, earnedType, missedUser)
    }
    update(badmintonInstance)
    modalhandler()
  }

  const checkCanSave = () => {
    // earnedType === '' && missedUser.length === 0 && earnedUser === -1
    if (missedType !== 'SERVE') {
      if (earnedType !== '' && missedUser.length !== 0 && earnedUser !== -1)
        return true
    }

    if (missedType === 'SERVE') {
      if (missedUser.length !== 0) return true
    }
    return false
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
                <div className="rounded-full w-2 h-2 bg-[#FFF3C5]" />
              </div>
            ) : (
              <div className="flex gap-x-1 items-center">
                <span className="text-[#6B6E78] text-sm font-bold"> 팀 B</span>
                <div className="rounded-full w-2 h-2 bg-[#FCA211]" />
              </div>
            )}
          </div>

          {/* 득점 인원 */}
          <div
            className={`py-1 px-2 flex flex-col gap-y-2 rounded-md  ${missedType !== '' && `bg-[#F6F6F6]`}`}
          >
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
                      disabled={missedType !== ''}
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
                      disabled={missedType !== ''}
                    />
                  ))}
            </div>
          </div>
          {/* 득점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">득점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(EARN_TYPE).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="earn"
                  text={value}
                  changeStyle={earnedType === key}
                  onClick={() => handleEarnType(key)}
                />
              ))}
            </div>
          </div>

          {/* 실점 종류 */}
          <div className="py-1 px-2 flex flex-col gap-y-2">
            <p className="font-bold">실점 종류</p>
            <div className="flex gap-x-3">
              {Object.entries(MISS_TYPE).map(([key, value]) => (
                <Button
                  key={key}
                  size="md"
                  type="miss"
                  text={value}
                  changeStyle={missedType === key}
                  // onClick={() => setEarnedType(key)}
                  onClick={() => handleFaultType(key)}
                />
              ))}
            </div>
          </div>

          {/* 폴트인원 */}
          {missedType === 'SERVE' ? (
            // 서브 미스 일때
            <div className="py-1 px-2 flex flex-col gap-y-2 rounded-md">
              <p className="font-bold">폴트인원</p>
              <div className="flex gap-x-3">
                {selectTeam === 'team1'
                  ? badmintonInstance.teams.team1.map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`A${index + 1}`}
                        changeStyle={missedUser.includes(playerInfo.id)}
                        onClick={() => handleMissedUser(playerInfo.id)}
                      />
                    ))
                  : badmintonInstance.teams.team2.map((playerInfo, index) => (
                      <Button
                        key={playerInfo.nickname}
                        size="lg"
                        type="fault"
                        text={`B${index + 1}`}
                        changeStyle={missedUser.includes(playerInfo.id)}
                        onClick={() => handleMissedUser(playerInfo.id)}
                      />
                    ))}
              </div>
            </div>
          ) : (
            <div
              className={`py-1 px-2 flex flex-col gap-y-2 rounded-md ${earnedType === '' && `bg-[#F6F6F6]`}`}
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
                        disabled={earnedType === ''}
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
                        disabled={earnedType === ''}
                      />
                    ))}
              </div>
            </div>
          )}

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
              className={`grow rounded-xl border-[1px] py-[10px]   ${checkCanSave() ? `text-[#ffffff] bg-[#FCA211] ` : `text-[#6B6E78] bg-[#E5E5ED]`}`}
              type="button"
              onClick={() => handleStoreScore()}
              disabled={!checkCanSave()}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

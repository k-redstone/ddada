// todo 빼야됨
/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from 'next/image'
import { set } from 'react-hook-form'

import { ScoreDetail } from '@/features/mypage/types/MyMatchType.ts'
import GAINED_BAR from '@/static/imgs/mypage/my-page-gained-bar.svg'
import LOST_BAR from '@/static/imgs/mypage/my-page-lost-bar.svg'

interface MatchTimeLineProps {
  setNumber: number
  teamAPlayer1: {
    playerNum: number
    playerId: number
    nickname: string
    profileImagePath: string
  }
  teamAPlayer2: {
    playerNum: number
    playerId: number
    nickname: string
    profileImagePath: string
  }
  teamBPlayer1: {
    playerNum: number
    playerId: number
    nickname: string
    profileImagePath: string
  }
  teamBPlayer2: {
    playerNum: number
    playerId: number
    nickname: string
    profileImagePath: string
  }
  userTeamNum: number
  setData: {
    setNumber: number
    setWinnerTeamNumber: number
    team1Score: number
    team2Score: number
    scores: ScoreDetail[]
  }
}

export default function MatchTimeLine({
  setNumber,
  teamAPlayer1,
  teamAPlayer2,
  teamBPlayer1,
  teamBPlayer2,
  userTeamNum,
  setData,
}: MatchTimeLineProps) {
  if (!setData) {
    return (
      <div className="flex flex-col items-center text-disabled-dark">
        <p className="text-sm">해당 세트는 존재하지 않아요</p>
      </div>
    )
  }
  console.log(userTeamNum)
  console.log(setData)
  return (
    <div className="flex flex-col items-center text-disabled-dark">
      <p className="text-sm">매치스코어</p>
      <div className="text-4xl font-bold">
        <span
          className={`
          ${userTeamNum === 1 && 'text-theme'}
          `}
        >
          {setData.team1Score}
        </span>{' '}
        :{' '}
        <span
          className={`
          ${userTeamNum === 2 && 'text-theme'}
          `}
        >
          {setData.team2Score}
        </span>
      </div>
      <div className="flex flex-col items-center gap-[0.625rem] w-full">
        {/* <div className="flex gap-3"> */}
        {setData.scores.map((score, index) => (
          <>
            {/* <div>{score}</div> */}
            <div key={index} className="flex gap-3 items-center w-full">
              <div className="flex-1" />
              <GAINED_BAR />
              <div className="flex flex-col flex-1">
                <p className="font-bold">{score.scoreNumber}</p>
                <div className="flex text-sm gap-2">
                  <div className="w-6 h-6 overflow-hidden relative rounded-full">
                    <Image
                      src={teamAPlayer1.profileImagePath}
                      alt="profile"
                      fill
                    />
                  </div>
                  <p>{teamAPlayer1.nickname}</p>
                </div>
              </div>
            </div>
          </>
        ))}
        {/* <div className="flex-1" />
          <GAINED_BAR />
          <div className="flex flex-col flex-1 text-sm">
            <p className="font-bold">0:1</p>
            <p>이미지, 이름, 획득방법</p>
          </div> */}
        {/* </div> */}
        <LOST_BAR /> <LOST_BAR /> <LOST_BAR />
      </div>
    </div>
  )
}

import Image from 'next/image'
import { useState } from 'react'

import { PlayerType, SatDataType } from '@/features/mypage/types/MyMatchType.ts'
import GAINED_BAR from '@/static/imgs/mypage/my-page-gained-bar.svg'
import LOST_BAR from '@/static/imgs/mypage/my-page-lost-bar.svg'

interface MatchTimeLineProps {
  teamAPlayer1: PlayerType
  teamAPlayer2: PlayerType
  teamBPlayer1: PlayerType
  teamBPlayer2: PlayerType
  userTeamNum: number
  setData: SatDataType
}

export default function MatchTimeLine({
  teamAPlayer1,
  teamAPlayer2,
  teamBPlayer1,
  teamBPlayer2,
  userTeamNum,
  setData,
}: MatchTimeLineProps) {
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)
  if (!setData) {
    return (
      <div className="flex flex-col items-center text-disabled-dark">
        <p className="text-sm">해당 세트는 존재하지 않아요</p>
      </div>
    )
  }

  const getPlayerInfo = (playerNum: number) => {
    switch (playerNum) {
      case teamAPlayer1.playerNum:
        return teamAPlayer1
      case teamAPlayer2.playerNum:
        return teamAPlayer2
      case teamBPlayer1.playerNum:
        return teamBPlayer1
      case teamBPlayer2.playerNum:
        return teamBPlayer2
      default:
        return null
    }
  }
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
        {setData.scores.map((score) => {
          const earnedPlayer = getPlayerInfo(score.earnedMember)
          // const missedPlayer1 = getPlayerInfo(score.missedMember1)
          // const missedPlayer2 = getPlayerInfo(score.missedMember2)
          const isUserTeam = userTeamNum === (score.earnedMember <= 20 ? 1 : 2)
          const BarComponent = isUserTeam ? GAINED_BAR : LOST_BAR
          const isTeamA = score.earnedMember <= 20

          if (isTeamA) {
            setTeamAScore((prevScore) => prevScore + 1)
          } else {
            setTeamBScore((prevScore) => prevScore + 1)
          }

          return (
            <div
              // todo 유니크한 key를 넣어주자
              key={`${score.earnedMember}`}
              className="flex gap-3 items-center w-full"
            >
              {isTeamA ? (
                <>
                  <div className="flex flex-col flex-1">
                    <p
                      className={`font-bold
                      ${userTeamNum === 1 ? 'text-primary' : 'text-danger'}
                      `}
                    >
                      {teamAScore}:{teamBScore}
                    </p>
                    {earnedPlayer && (
                      <div className="flex gap-1">
                        <div className="flex text-sm gap-2 p-1">
                          <div className="w-6 h-6 overflow-hidden relative rounded-full">
                            <Image
                              src={earnedPlayer.profileImagePath}
                              alt="profile"
                              fill
                            />
                          </div>
                          <p className="text-xs">{earnedPlayer.nickname}</p>
                        </div>
                        <p className="text-sm">서브미스</p>
                      </div>
                    )}
                  </div>
                  <BarComponent />
                  <div className="flex-1" />
                </>
              ) : (
                <>
                  <div className="flex-1" />
                  <BarComponent />
                  <div className="flex flex-col flex-1">
                    <p
                      className={`font-bold
                      ${userTeamNum === 2 ? 'text-primary' : 'text-danger'}
                      `}
                    >
                      {teamAScore}:{teamBScore}
                    </p>
                    {earnedPlayer && (
                      <div className="flex gap-1">
                        <div className="flex text-sm gap-2 p-1">
                          <div className="w-6 h-6 overflow-hidden relative rounded-full">
                            <Image
                              src={earnedPlayer.profileImagePath}
                              alt="profile"
                              fill
                            />
                          </div>
                          <p className="text-xs">{earnedPlayer.nickname}</p>
                        </div>
                        <p className="text-sm">스매시</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

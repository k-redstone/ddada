// todo
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

import {
  getMyMatchDetail,
  getSetDetail,
} from '@/features/mypage/api/mypage/index.ts'
import MatchTimeLine from '@/features/mypage/components/MatchTimeLine/index.tsx'
import PlayerMatchTag from '@/features/mypage/components/PlayerMatchTag/index.tsx'
import { DEFAULT_IMAGE } from '@/features/mypage/constants/defaultImage.ts'
import {
  PlayerMatchTagColor,
  PlayerMatchTagDescription,
} from '@/features/mypage/constants/PlayerMatchTagDescription.ts'
import useGetUserInfo from '@/features/mypage/hooks/useGetUserInfo.tsx'
import Calender from '@/static/imgs/mypage/my-page-calender.svg'
import DefeatCharacter from '@/static/imgs/mypage/my-page-defeat-char.svg'
import Timer from '@/static/imgs/mypage/my-page-timer.svg'
import VictoryCharacter from '@/static/imgs/mypage/my-page-victory-char.svg'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MyMatchDetailPage({
  params,
}: {
  params: { matchId: string }
}) {
  const { matchId } = params
  const { data, isLoading } = useQuery({
    queryKey: ['myMatchDetail', { matchId }],
    queryFn: () => getMyMatchDetail(matchId),
    retry: 1,
  })
  // const { userData } = useQuery({
  //   queryKey: ['myMatchDetail', { matchId }],
  //   queryFn: () => getMyMatchDetail(matchId),
  //   retry: 1,
  // })
  const [setNumber, setSetNumber] = useState<number>(1)
  const { userTeamNum, userId, userNickname } = useGetUserInfo(data || null)
  // console.log(playerTeamNum, playerId)
  // console.log(data)
  if (isLoading) {
    return <div>로딩중</div>
  }
  const teamAPlayer1 = {
    playerNum: 11,
    playerId: data.team1.player1.id,
    nickname: data.team1.player1.nickname,
    profileImagePath: data.team1.player1.presignedUrl,
  }
  const teamAPlayer2 = {
    playerNum: 12,
    playerId: data.team1.player2.id,
    nickname: data.team1.player2.nickname,
    profileImagePath: data.team1.player2.presignedUrl,
  }
  const teamBPlayer1 = {
    playerNum: 21,
    playerId: data.team2.player1.id,
    nickname: data.team2.player1.nickname,
    profileImagePath: data.team2.player1.presignedUrl,
  }
  const teamBPlayer2 = {
    playerNum: 22,
    playerId: data.team2.player2.id,
    nickname: data.team2.player2.nickname,
    profileImagePath: data.team2.player2.presignedUrl,
  }
  const winnerTeam = data.winnerTeamNumber
  // console.log(winnerTeam)
  // todo daty에 따라 matchTag달아줘야함
  const matchTag = '저지불가'
  return (
    <div className="flex flex-col gap-3 py-6 justify-center ">
      <div
        className={`flex px-6 py-6 gap-6 border rounded-xl justify-center items-center text-disabled-dark
      ${userTeamNum === winnerTeam ? 'border-primary' : 'border-danger'}
      `}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {userTeamNum === winnerTeam ? (
            <p className="text-3xl font-bold text-center text-primary">승리</p>
          ) : (
            <p className="text-3xl font-bold text-center text-danger">패배</p>
          )}

          <div className="flex items-center gap-1 text-xs">
            <Calender />
            <p>{data.date.slice(5)}</p>
            <p>{data.time.slice(0, 5)}</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Timer />
            {/* todo 진행시간 넣기 */}
            <p>20분 15초</p>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow gap-4 text-3xl">
          <span
            className={`
            ${userTeamNum === 1 && 'font-bold'}
            ${userTeamNum === 1 && userTeamNum === winnerTeam && 'text-primary'}
            ${userTeamNum === 1 && userTeamNum !== winnerTeam && 'text-danger'}
            `}
          >
            {data.team1SetScore}
          </span>
          <span>:</span>
          <span
            className={`
            ${userTeamNum === 2 && 'font-bold'}
            ${userTeamNum === 2 && userTeamNum === winnerTeam && 'text-primary'}
            ${userTeamNum === 2 && userTeamNum !== winnerTeam && 'text-danger'}
            `}
          >
            {data.team2SetScore}
          </span>
        </div>
        <div className="flex text-xs">
          <div className="flex flex-col">
            <div className="flex gap-2 p-1">
              <div className="w-6 h-6 overflow-hidden relative rounded-full">
                <Image
                  src={teamAPlayer1.profileImagePath}
                  alt="A_player1_image"
                  fill
                />
              </div>
              <p
                className={`
              ${userId === teamAPlayer1.playerId && 'font-bold'} 
              `}
              >
                {teamAPlayer1.nickname}
              </p>
            </div>
            <div className="flex gap-2 p-1">
              <div className="w-6 h-6 overflow-hidden relative rounded-full">
                <Image
                  src={teamAPlayer2.profileImagePath}
                  alt="A_player2_image"
                  fill
                />
              </div>
              <p
                className={`
                ${userId === teamAPlayer2.playerId && 'font-bold'} 
                `}
              >
                {teamAPlayer2.nickname}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 p-1">
              <div className="w-6 h-6 overflow-hidden relative rounded-full">
                <Image
                  src={teamBPlayer1.profileImagePath}
                  alt="B_player1_image"
                  fill
                />
              </div>
              <p
                className={`
                ${userId === teamBPlayer1.playerId && 'font-bold'} 
                `}
              >
                {teamBPlayer1.nickname}
              </p>
            </div>
            <div className="flex gap-2 p-1">
              <div className="w-6 h-6 overflow-hidden relative rounded-full">
                <Image
                  src={teamBPlayer2.profileImagePath}
                  alt="B_player2_image"
                  fill
                />
              </div>
              <p
                className={`
                ${userId === teamBPlayer2.playerId && 'font-bold'} 
                `}
              >
                {teamBPlayer2.nickname}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 py-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center text-3xl">
            <p>이번 매치,</p>
            <p>
              <span className="font-bold">{userNickname}</span>님은
            </p>
          </div>
          <div>
            <PlayerMatchTag matchTag={matchTag} />
          </div>
        </div>
        <Chart
          type="line"
          series={[
            {
              name: '사용자',
              data: [1000, 2000, 3000, 6000, 1000, 1000, 1000, 10000],
            },
            {
              name: '매치평균',
              data: [1500, 1000, 2500, 3000, 1000, 2000, 2000, 1000],
            },
          ]}
          width={530}
          height={106}
          options={{
            theme: { mode: 'light' },
            chart: {
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 3 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              // categories: [
              //   1660004640, 1660091040, 1660177440, 1660177440, 1660177440,
              // ],
              // type: 'datetime',
            },
            colors: [`${PlayerMatchTagColor[matchTag]}`, '#E5E5ED'],
            // tooltip: {
            //   y: { formatter: (value) => `점수 ${value.toFixed(2)}` },
            // },
            legend: { show: false },
          }}
        />
        <div className="flex bg-base-50 rounded-xl border border-disabled py-6 px-12 gap-12 w-full justify-center items-center text-disabled-dark">
          <div>
            <VictoryCharacter />
          </div>
          <div className="flex-grow text-center">
            {PlayerMatchTagDescription[matchTag]}
          </div>
        </div>
      </div>

      <div className="flex text-sm text-disabled-dark">
        <button
          type="button"
          className={`border-b px-6
          ${setNumber === 1 && 'border-b-2 border-theme text-theme font-bold'}`}
          onClick={() => setSetNumber(1)}
        >
          1세트
        </button>
        <button
          type="button"
          className={`border-b px-6
          ${setNumber === 2 && 'border-b-2 border-theme text-theme font-bold'}`}
          onClick={() => setSetNumber(2)}
        >
          2세트
        </button>
        <button
          type="button"
          className={`border-b px-6
          ${setNumber === 3 && 'border-b-2 border-theme text-theme font-bold'}`}
          onClick={() => setSetNumber(3)}
        >
          3세트
        </button>
      </div>
      <MatchTimeLine
        setNumber={setNumber}
        setData={data.sets[setNumber - 1]}
        teamAPlayer1={teamAPlayer1}
        teamAPlayer2={teamAPlayer2}
        teamBPlayer1={teamBPlayer1}
        teamBPlayer2={teamBPlayer2}
        userTeamNum={userTeamNum}
      />
    </div>
  )
}

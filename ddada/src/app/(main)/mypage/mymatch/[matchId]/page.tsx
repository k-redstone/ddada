'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

import {
  getMyMatchDetail,
  getUserAnalysis,
} from '@/features/mypage/api/mypage/index.ts'
import MatchTimeLine from '@/features/mypage/components/MatchTimeLine/index.tsx'
import PlayerMatchTag from '@/features/mypage/components/PlayerMatchTag/index.tsx'
import {
  PlayerMatchTagColor,
  PlayerMatchTagDescription,
} from '@/features/mypage/constants/PlayerMatchTagDescription.ts'
import useGetUserInfo from '@/features/mypage/hooks/useGetUserInfo.tsx'
import Calender from '@/static/imgs/mypage/my-page-calender.svg'
import DefeatCharacter from '@/static/imgs/mypage/my-page-defeat-char.svg'
import VictoryCharacter from '@/static/imgs/mypage/my-page-victory-char.svg'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MyMatchDetailPage({
  params,
}: {
  params: { matchId: string }
}) {
  const { matchId } = params
  const {
    data: match,
    isLoading: matchLoading,
    isError: matchError,
  } = useQuery({
    queryKey: ['myMatchDetail', { matchId }],
    queryFn: () => getMyMatchDetail(matchId),
    retry: 1,
  })
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user', { matchId }],
    queryFn: () => getUserAnalysis(matchId),
    retry: 1,
  })
  const [setNumber, setSetNumber] = useState<number>(1)
  const { userTeamNum, userId, userNickname } = useGetUserInfo(match || null)
  if (matchLoading || userLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner className="animate-spin" />
      </div>
    )
  }

  if (matchError || userError) {
    return (
      <div className="flex flex-col justify-center items-center gap-[2.625rem] px-6 py-20">
        <div className="flex flex-col gap-6 text-disabled-dark justify-center">
          <p className="text-6xl font-bold text-center">앗!</p>
          <div className="flex flex-col justify-center items-center text-sm">
            <p>데이터를 불러오지 못했어요.</p>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    )
  }

  const teamAPlayer1 = {
    playerNum: 11,
    playerId: match.team1.player1.id,
    nickname: match.team1.player1.nickname,
    profileImagePath: match.team1.player1.image,
  }
  const teamAPlayer2 = {
    playerNum: 12,
    playerId: match.team1.player2.id,
    nickname: match.team1.player2.nickname,
    profileImagePath: match.team1.player2.image,
  }
  const teamBPlayer1 = {
    playerNum: 21,
    playerId: match.team2.player1.id,
    nickname: match.team2.player1.nickname,
    profileImagePath: match.team2.player1.image,
  }
  const teamBPlayer2 = {
    playerNum: 22,
    playerId: match.team2.player2.id,
    nickname: match.team2.player2.nickname,
    profileImagePath: match.team2.player2.image,
  }
  const winnerTeam = match.winnerTeamNumber
  let matchTag = '평범함'
  if (
    user.score_lose_rate.my_score_rate >
      user.score_lose_rate.mean_score_rate + 0.05 &&
    user.score_lose_rate.my_lose_rate <
      user.score_lose_rate.mean_lose_rate - 0.05 &&
    user.skill.score.skill_rate.smash > 20 &&
    user.skill.score.skill_rate.pushs > 40
  ) {
    matchTag = '저지불가'
  } else if (
    user.flow[0] < user.flow[user.flow.length - 1] &&
    user.score_lose_rate.my_score_rate > user.score_lose_rate.mean_score_rate
  ) {
    matchTag = '오르막길'
  } else if (
    user.flow.some(
      (val: number, idx: number, arr: number[]) =>
        idx > 0 && Math.abs(val - arr[idx - 1]) > 2,
    )
  ) {
    matchTag = '롤러코스터'
  } else if (
    user.flow[0] < user.flow.slice(-1)[0] &&
    user.flow.slice(0, 3).every((val: number) => val < user.flow[0] + 2)
  ) {
    matchTag = '슬로우스타터'
  } else if (
    user.score_lose_rate.my_score_rate < 0.2 &&
    user.score_lose_rate.my_lose_rate > 0.3
  ) {
    matchTag = '내리막길'
  } else if (user.flow[1] - user.flow[0] > 5) {
    matchTag = '스프린터'
  }
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
            <p>{match.date.slice(5)}</p>
            <p>{match.time.slice(0, 5)}</p>
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
            {match.team1SetScore}
          </span>
          <span>:</span>
          <span
            className={`
            ${userTeamNum === 2 && 'font-bold'}
            ${userTeamNum === 2 && userTeamNum === winnerTeam && 'text-primary'}
            ${userTeamNum === 2 && userTeamNum !== winnerTeam && 'text-danger'}
            `}
          >
            {match.team2SetScore}
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
              data: [
                user.score_lose_rate.my_score_rate, // my_score_rate
                user.score_lose_rate.my_lose_rate, // my_lose_rate
                user.skill.score.skill_rate.pushs, // skill.score.skill_rate.pushs
                user.skill.score.skill_rate.smash, // skill.score.skill_rate.smash
                user.skill.score.skill_rate.drops, // skill.score.skill_rate.drops
                user.skill.score.skill_rate.clears, // skill.score.skill_rate.clears
              ],
            },
            {
              name: '매치평균',
              data: [
                user.score_lose_rate.mean_score_rate, // mean_score_rate
                user.score_lose_rate.mean_lose_rate, // mean_lose_rate
                user.skill.score.middle_skill_rate.pushs, // skill.score.middle_skill_rate.pushs
                user.skill.score.middle_skill_rate.smash, // skill.score.middle_skill_rate.smash
                user.skill.score.middle_skill_rate.drops, // skill.score.middle_skill_rate.drops
                user.skill.score.middle_skill_rate.clears, // skill.score.middle_skill_rate.clears
              ],
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
              categories: [
                '득점율', // my_score_rate, mean_score_rate
                '실점율', // my_lose_rate, mean_lose_rate
                '푸시', // skill.score.skill_rate.pushs, skill.score.middle_skill_rate.pushs
                '스매시', // skill.score.skill_rate.smash, skill.score.middle_skill_rate.smash
                '드롭', // skill.score.skill_rate.drops, skill.score.middle_skill_rate.drops
                '클리어', // skill.score.skill_rate.clears, skill.score.middle_skill_rate.clears
              ],
            },
            colors: [`${PlayerMatchTagColor[matchTag]}`, '#E5E5ED'],
            tooltip: {
              y: { formatter: (value) => ` ${value.toFixed(1)}` },
            },
            legend: { show: false },
          }}
        />
        <div className="flex bg-base-50 rounded-xl border border-disabled py-6 px-12 gap-12 w-full justify-center items-center text-disabled-dark">
          <div>
            {userTeamNum === winnerTeam ? (
              <VictoryCharacter />
            ) : (
              <DefeatCharacter />
            )}
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
        setData={match.sets[setNumber - 1]}
        teamAPlayer1={teamAPlayer1}
        teamAPlayer2={teamAPlayer2}
        teamBPlayer1={teamBPlayer1}
        teamBPlayer2={teamBPlayer2}
        userTeamNum={userTeamNum}
      />
    </div>
  )
}

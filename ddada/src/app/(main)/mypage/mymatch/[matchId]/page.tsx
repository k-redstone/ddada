'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { getMyMatchDetail } from '@/features/mypage/api/mypage/index.ts'
import MatchTimeLine from '@/features/mypage/components/MatchTimeLine/index.tsx'
import PlayerMatchTag from '@/features/mypage/components/PlayerMatchTag/index.tsx'
import { PlayerMatchTagDescription } from '@/features/mypage/constants/PlayerMatchTagDescription.ts'
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
  const { data } = useQuery({
    queryKey: ['myMatchDetail', { matchId }],
    queryFn: () => getMyMatchDetail(matchId),
  })
  const [setNumber, setSetNumber] = useState<number>(1)
  return (
    <div className="flex flex-col gap-3 py-6 justify-center ">
      <div className="flex px-6 py-6 gap-6 border rounded-xl justify-center items-center text-disabled-dark">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-3xl font-bold text-center">승리</p>
          <div className="flex items-center gap-1 text-xs">
            <Calender />
            <p>09.26</p>
            <p>10:00</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Timer />
            <p>20분 15초</p>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow gap-4 text-3xl">
          <span>1</span>
          <span>:</span>
          <span>2</span>
        </div>
        <div className="flex text-xs">
          <div className="flex flex-col">
            <div className="flex gap-2 p-1">
              <div>이미지</div>
              <p>쿨핀</p>
            </div>
            <div className="flex gap-2 p-1">
              <div>이미지</div>
              <p>쿨핀</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 p-1">
              <div>이미지</div>
              <p>쿨핀</p>
            </div>
            <div className="flex gap-2 p-1">
              <div>이미지</div>
              <p>쿨핀</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 py-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center text-3xl">
            <p>이번 매치,</p>
            <p>
              <span className="font-bold">나는홍석</span>님은
            </p>
          </div>
          <div>
            <PlayerMatchTag matchTag="스프린터" />
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
            colors: ['#22BB33', '#E5E5ED'],
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
            {PlayerMatchTagDescription['스프린터']}
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
      <MatchTimeLine setNumber={setNumber} />
    </div>
  )
}

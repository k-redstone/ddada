'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import PlayStyleLogoProps from '@/features/mypage/components/PlayStyleLogo/index.tsx'
import MiniChart from '@/static/imgs/mypage/playstyle/my-page-playstyle-chart.png'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function PlayStyle() {
  return (
    <div className="flex flex-col py-6 items-center justify-center">
      <PlayStyleLogoProps userPlayStyle="AGGRESSIVE" />
      <Chart
        type="radar"
        series={[
          {
            // todo 사용자 데이터로 넣기
            name: '플레이어',
            data: [20, 30, 40, 50, 60],
          },
        ]}
        height="530px"
        width="600px"
        options={{
          theme: { mode: 'light' },
          chart: {
            toolbar: { show: false },
            background: 'transparent',
          },
          fill: {
            opacity: 0.5,
            colors: ['#fffbea'],
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['#fdbb52'],
            dashArray: 0,
          },
          grid: { show: false },
          yaxis: { show: false, min: 0, max: 100 },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '0.75rem',
              },
            },
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: ['전략', '득점율', '실점율', '기술', '회복'],

            // type: 'datetime',
          },
          markers: { size: 4, strokeColors: '#fdbb52', colors: '#fffbea' },
          colors: [`#E5E5ED`, '#E5E5ED'],
          tooltip: {
            y: { formatter: (value) => `점수 ${value}` },
          },
          legend: { show: false },
        }}
      />
      <div className="w-full flex justify-center items-center bg-theme text-theme-light gap-[0.625rem] py-3">
        <Image src={MiniChart} alt="미니차트이미지" />
        <p>점수 별 세부 수치를 정리했어요</p>
      </div>
      <div className="flex flex-col gap-6 py-10 w-full">
        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <p className="text-xl font-bold">누적 매치 수(매치)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5 <span className="text-disabled-dark">지난 주와 비교</span>
            </p>
          </div>
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1 ">
            <p className="text-xl font-bold">전략(점)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5{' '}
              <span className="text-disabled-dark">
                상대의 약점을 얼마나 잘 파악하는지에 관한 지표
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <p className="text-xl font-bold">매치 득점 비율(%)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5{' '}
              <span className="text-disabled-dark">
                경기 당 득점비율을 백분율로 나타냈어요
              </span>
            </p>
          </div>
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1 ">
            <p className="text-xl font-bold">매치 실점 비율(%)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5{' '}
              <span className="text-disabled-dark">
                경기 당 실점비율을 백분율로 나타냈어요
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1">
            <p className="text-xl font-bold">기술(점)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5{' '}
              <span className="text-disabled-dark">
                다양한 기술을 활용할수록 높아지는 지표
              </span>
            </p>
          </div>
          <div className="border rounded-3xl py-4 px-8 flex flex-col gap-3 flex-1 ">
            <p className="text-xl font-bold">회복력(점)</p>
            <p className="text-3xl font-bold">32</p>
            <p>
              +5{' '}
              <span className="text-disabled-dark">
                실점 상황에도 흔들리지 않는지 알 수 있는 지표
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

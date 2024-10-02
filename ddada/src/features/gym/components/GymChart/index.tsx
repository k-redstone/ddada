'use client'

import dayjs from 'dayjs'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function GymChart() {
  const today = dayjs()
  const daysArray = Array.from({ length: 7 }, (_, i) =>
    today.subtract(7 - i, 'day').format('MM.DD'),
  )
  console.log(daysArray)
  return (
    <div className="bg-white rounded-3xl px-8 py-6 flex flex-col gap-y-6">
      <h2 className="text-2xl font-bold">날짜 별 매치 현황 통계</h2>
      <Chart
        type="bar"
        series={[
          {
            name: '매치현황',
            data: [3, 1, 5, 7, 2, 8, 2],
          },
        ]}
        options={{
          theme: { mode: 'light' },
          chart: {
            toolbar: { show: false },
            background: 'transparent',
          },
          grid: { show: false },
          yaxis: { show: true },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: { show: true },
            axisTicks: { show: true },
            axisBorder: { show: true },
            categories: daysArray,
          },
          colors: ['#FCA211'],
          legend: { show: true },
        }}
      />
    </div>
  )
}

import dayjs from 'dayjs'
import { useState } from 'react'

import { KR_DAY_OF_WEEK } from '@/features/court-reservation/constants/court-reservation.ts'
import NextDateIcon from '@/static/imgs/court-reservation/court-reservation_pagination_next_icon.svg'
import PrevDateIcon from '@/static/imgs/court-reservation/court-reservation_pagination_prev_icon.svg'

interface PaginationProps {
  changeSelectedDate: (date: string) => void
}

export default function Pagination({ changeSelectedDate }: PaginationProps) {
  const today = dayjs()
  const nextWeekStartDay = today.add(1, 'week') // 다음 주의 시작 날짜

  console.log(today.startOf('week')) // 오늘 요일
  // console.log(nextWeek)
  // 백에서 오는 데이터 형식 "2024-09-10"
  // 일요일 0 ~ 토요일 6

  const getWeekDays = (dayStart: dayjs.Dayjs) => {
    const weekDays = []
    for (let i = 0; i < 7; i += 1) {
      weekDays.push(dayStart.add(i, 'day'))
    }
    return weekDays
  }
  const test = getWeekDays(today)
  const test2 = getWeekDays(nextWeekStartDay)

  const [currentWeek, setCurrentWeek] = useState(getWeekDays(today))

  const handleClickPrev = () => {
    const prevWeek = currentWeek[0].subtract(1, 'week')
    setCurrentWeek(getWeekDays(prevWeek))
  }

  const handleClickNext = () => {
    const nextWeek = currentWeek[0].add(1, 'week')
    setCurrentWeek(getWeekDays(nextWeek))
  }

  return (
    <div className="flex gap-1 items-center">
      <button type="button" onClick={handleClickPrev} aria-label="이전 주">
        <PrevDateIcon />
      </button>

      <div className="flex gap-1">
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
        <div className="flex flex-col border px-6 py-4 gap-[10px]">
          <p>09.07</p>
          <hr />
          <p>일요일</p>
        </div>
      </div>
      <button type="button" onClick={handleClickNext} aria-label="다음 주">
        <NextDateIcon />
      </button>
    </div>
  )
}

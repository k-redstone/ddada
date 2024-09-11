import { KR_DAY_OF_WEEK } from '@/features/coat-reservation/constants/coat-reservation.ts'
import NextDateIcon from '@/static/imgs/coat-reservation/coat-reservation_pagination_next_icon.svg'
import PrevDateIcon from '@/static/imgs/coat-reservation/coat-reservation_pagination_prev_icon.svg'

interface PaginationProps {
  today: number // 오늘 요일 0~6
  todate: string // 오늘 날짜 "2024-09-10"
}

export default function Pagination({ today, todate }: PaginationProps) {
  console.log(today, todate)
  console.log(KR_DAY_OF_WEEK[today])
  // 백에서 오는 데이터 형식 "2024-09-10"
  // 일요일 0 ~ 토요일 6

  return (
    <div className="flex gap-1 items-center">
      <PrevDateIcon />
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
      <NextDateIcon />
    </div>
  )
}

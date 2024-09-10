'use client'

import Link from 'next/link'
import { useState } from 'react'

import MatchCard from '@/features/manager/components/MatchCard/index.tsx'
import ToggleBtn from '@/static/imgs/manager/ToggleBtn.svg'

const dummy = [
  {
    id: 1,
    courtName: '성동구 금호스포츠센터 10번코트',
    addr: '가끔너무긴이름의장소들이있는데요이럴경우이럴경우 이럴경우',
    number: 4,
    time: new Date('2024-09-10T12:24:00'),
  },
  {
    id: 2,
    courtName: '대현산체육관 4번코트',
    addr: '서울특별시 성동구 독서당로63길 44',
    number: 2,
    time: new Date('2024-09-13T21:24:00'),
  },
]

export default function ManagerSidebar() {
  const [clickedCard, setClickedCard] = useState<number>(-1)
  const [clickedCategory, setClickedCategory] = useState<number>(1)

  return (
    <div className="max-w-[354px] flex flex-col gap-y-[10px]">
      <div className="p-2">
        <input
          className="border placeholder-[#6B6E78] px-6 py-5 w-full text-black border-[#E5E5ED] rounded-xl h-16 "
          placeholder="검색"
          type="text"
        />
      </div>
      <div className="p-2 flex gap-x-1 items-center">
        <ToggleBtn />
        <span className="text-[#5F6368] text-xs">오늘 일정 모아보기</span>
      </div>
      <div className="flex flex-col">
        <div className="flex text-sm w-ful">
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 1 && `font-bold text-[#FCA211] border-b-2 border-[#FCA211]`}`}
            onClick={() => setClickedCategory(1)}
            aria-hidden="true"
          >
            매치대기 ()
          </span>
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 2 && `font-bold text-[#FCA211] border-b-2 border-[#FCA211]`}`}
            onClick={() => setClickedCategory(2)}
            aria-hidden="true"
          >
            매치진행 ()
          </span>
          <span
            className={`py-3  text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 3 && `font-bold text-[#FCA211] border-b-2 border-[#FCA211]`}`}
            onClick={() => setClickedCategory(3)}
            aria-hidden="true"
          >
            매치완료 ()
          </span>
        </div>
        {dummy.map((item) => (
          <Link
            href={`/manager/detail/${item.id}`}
            key={item.id}
            onClick={() => setClickedCard(item.id)}
          >
            <MatchCard data={item} isClicked={item.id === clickedCard} />
          </Link>
        ))}
      </div>
    </div>
  )
}

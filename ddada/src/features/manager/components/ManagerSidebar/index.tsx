'use client'

import Link from 'next/link'
import { useState } from 'react'

import MatchCard from '@/features/manager/components/MatchCard/index.tsx'
import ToggleBtn from '@/static/imgs/manager/ToggleBtn.svg'
import { listDummy } from '@/features/manager/constants/dummyData.ts'
import {
  CATEGORY_TPYE,
  CATEGORY_TO_PAGE,
} from '@/features/manager/constants/constManager.ts'

export default function ManagerSidebar() {
  const [clickedCard, setClickedCard] = useState<number>(-1)
  const [clickedCategory, setClickedCategory] = useState<number>(1)

  return (
    <div className="flex flex-col gap-y-[10px]">
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
            매치대기 (
            {listDummy.filter((item) => item.status === 'reserved').length})
          </span>
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 2 && `font-bold text-[#FCA211] border-b-2 border-[#FCA211]`}`}
            onClick={() => setClickedCategory(2)}
            aria-hidden="true"
          >
            매치진행 (
            {listDummy.filter((item) => item.status === 'play').length})
          </span>
          <span
            className={`py-3  text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 3 && `font-bold text-[#FCA211] border-b-2 border-[#FCA211]`}`}
            onClick={() => setClickedCategory(3)}
            aria-hidden="true"
          >
            매치완료 (
            {listDummy.filter((item) => item.status === 'done').length})
          </span>
        </div>
        {listDummy
          .filter((item) => item.status === CATEGORY_TPYE[clickedCategory])
          .map((item) => (
            <Link
              href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
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

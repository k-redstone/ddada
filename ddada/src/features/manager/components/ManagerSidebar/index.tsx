'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { fetchManagerMatchList } from '@/features/manager/api/managerAPI.tsx'
import MatchCard from '@/features/manager/components/MatchCard/index.tsx'
import { CATEGORY_TO_PAGE } from '@/features/manager/constants/constManager.ts'
import ToggleBtn from '@/static/imgs/manager/ToggleBtn.svg'

export default function ManagerSidebar() {
  const [clickedCard, setClickedCard] = useState<number>(-1)
  const [clickedCategory, setClickedCategory] = useState<number>(1)

  // RESERVED: '예약됨',
  // PLAYING: '진행중',
  // FINISHED: '종료됨',
  const { data: matchCreatedList, isSuccess: isCreated } = useQuery({
    queryKey: ['managerMatch', { type: 'CREATED' }],
    queryFn: () => fetchManagerMatchList({ statuses: 'CREATED' }),
  })
  const { data: matchReservedList, isSuccess: isReserved } = useQuery({
    queryKey: ['managerMatch', { type: 'RESERVED' }],
    queryFn: () => fetchManagerMatchList({ statuses: 'RESERVED' }),
  })
  const { data: matchPlayingList, isSuccess: isPlaying } = useQuery({
    queryKey: ['managerMatch', { type: 'PLAYING' }],
    queryFn: () => fetchManagerMatchList({ statuses: 'PLAYING' }),
  })
  const { data: matchFinishedList, isSuccess: isFinished } = useQuery({
    queryKey: ['managerMatch', { type: 'FINISHED' }],
    queryFn: () => fetchManagerMatchList({ statuses: 'FINISHED' }),
  })

  if (!isReserved || !isFinished || !isPlaying || !isCreated) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-[.625rem]">
      <div className="p-2">
        <input
          className="border placeholder-disabled-dark px-6 py-5 w-full text-black border-disabled rounded-xl h-16 "
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
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 1 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(1)}
            aria-hidden="true"
          >
            매치대기 ({matchReservedList.content.length})
          </span>
          <span
            className={`py-3 text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 2 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(2)}
            aria-hidden="true"
          >
            매치진행 ({matchPlayingList.content.length})
          </span>
          <span
            className={`py-3  text-center flex-1 shrink-0 cursor-pointer ${clickedCategory === 3 && `font-bold text-theme border-b-2 border-theme`}`}
            onClick={() => setClickedCategory(3)}
            aria-hidden="true"
          >
            매치완료 ({matchFinishedList.content.length})
          </span>
        </div>
        {clickedCategory === 1 &&
          [...matchCreatedList.content, ...matchReservedList.content].map(
            (item) => (
              <Link
                href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
                key={item.id}
                onClick={() => setClickedCard(item.id)}
              >
                <MatchCard data={item} isClicked={item.id === clickedCard} />
              </Link>
            ),
          )}
        {clickedCategory === 2 &&
          matchPlayingList.content.map((item) => (
            <Link
              href={`/manager/${CATEGORY_TO_PAGE[clickedCategory]}/${item.id}`}
              key={item.id}
              onClick={() => setClickedCard(item.id)}
            >
              <MatchCard data={item} isClicked={item.id === clickedCard} />
            </Link>
          ))}
        {clickedCategory === 3 &&
          matchFinishedList.content.map((item) => (
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

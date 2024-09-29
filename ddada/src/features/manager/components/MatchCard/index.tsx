'use client'

import { ManagerMatchDataType } from '@/features/manager/types/MatchCardType.ts'
import TangerineBlankDot from '@/static/imgs/manager/TangerineBlankDot.svg'
import TangerinefillDot from '@/static/imgs/manager/TangerineFillDot.svg'

interface MatchCardProps {
  data: ManagerMatchDataType
  isClicked: boolean
}

export default function MatchCard({ data, isClicked }: MatchCardProps) {
  const diffDate =
    new Date(data.time.getTime() - new Date().getTime()).getDate() - 1

  return (
    <div
      className={`px-2 py-6 flex gap-x-3 border border-base-100 box-border ${isClicked && `bg-theme-light`}`}
    >
      <div className="w-16 rounded-lg border border-black">
        {/* <img className="w-full h-full" src="" alt="court_img" /> */}
        <p>이미지들어감</p>
      </div>
      <div className="flex flex-col gap-y-3  w-full">
        <div className="flex flex-col gap-y-1">
          <p className="flex gap-x-[.625rem]">
            <span className="font-bold grow">{data.courtName}</span>
            <span className="text-sm">
              {diffDate === 0 ? (
                <span className=" text-danger">오늘</span>
              ) : (
                <span className=" text-disabled-dark">{diffDate}일 후</span>
              )}
            </span>
          </p>
          <p className="text-sm">
            {data.addr.length > 20
              ? `${data.addr.substring(0, 20)}...`
              : data.addr}
          </p>
          <p className="text-xs">
            {data.time.getHours()}:{data.time.getMinutes()}
          </p>
        </div>
        <div className="text-theme">
          {data.number === 4 ? (
            <span className="font-bold text-xs">모집완료</span>
          ) : (
            <div className="flex gap-x-1 ">
              {Array.from({ length: data.number }).map(() => (
                <TangerinefillDot key={data.id + Math.random()} />
              ))}
              {Array.from({ length: 4 - data.number }).map(() => (
                <TangerineBlankDot key={data.id + Math.random()} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

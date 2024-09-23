import { CourtType } from '@/features/court-reservation/types/CourtType'

import { WEEKDAYS } from '@/constants/day'
import MatchTypeButton from '@/features/match-reservation/components/MatchTypeButton'
interface MatchShortInfoProps {
  courtData: CourtType
  date: string
  time: string
  matchType: string
  matchRankType: string
}

export default function MatchShortInfo({
  courtData,
  date,
  time,
  matchType,
  matchRankType,
}: MatchShortInfoProps) {
  console.log(date)
  return (
    <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
      <div className=" py-1 flex">
        <h1 className="text-base font-bold border-b-2 border-[#FCA211] box-border">
          매치정보
        </h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">타이틀</h2>
        <p className=" text-[#6B6E78]">{courtData.name}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">주소</h2>
        <p className=" text-[#6B6E78]">{courtData.address}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">일시</h2>
        <p className=" text-[#6B6E78]">
          {/* new Date(`1970-01-01T${timeString}`) */}
          {date}({WEEKDAYS[new Date(date).getDay()]}){' '}
          {new Date(`${date}T${time}`).getHours()}
          :00-{new Date(`${date}T${time}`).getHours() + 1}:00(1시간){' '}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">매치타입</h2>
        <div className="flex gap-x-1">
          <MatchTypeButton matchType={matchType} />
          <MatchTypeButton matchRankType={matchRankType} />
        </div>
      </div>
    </div>
  )
}

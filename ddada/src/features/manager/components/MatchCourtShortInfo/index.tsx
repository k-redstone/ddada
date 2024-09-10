import { ManagerMatchDataType } from '@/features/manager/types/MatchCardType.ts'
import ClockIcon from '@/static/imgs/manager/ClockIcon.svg'
import ReportIcon from '@/static/imgs/manager/ReportIcon.svg'

interface MatchCourtInfoProps {
  data: ManagerMatchDataType
}

export default function MatchCourtShortInfo({ data }: MatchCourtInfoProps) {
  return (
    <div>
      {/* 경기장 정보 */}
      <div className=" py-6 px-2 flex items-center">
        <div className="flex gap-y-1 grow text-sm flex-col">
          <p className="font-bold text-2xl">{data.courtName}</p>
          <p>
            <span className="text-[#5F6368]">{data.addr}</span>{' '}
            <span className="text-[#FCA211] underline">주소복사</span>
          </p>
          <div className="text-[#5F6368] flex gap-x-1 items-center">
            <ClockIcon />
            <p>
              {data.time.getMonth()}월 {data.time.getDay()}일{' '}
              {data.time.getHours()}:{data.time.getMinutes()}
            </p>
          </div>
        </div>
        <ReportIcon />
      </div>
    </div>
  )
}

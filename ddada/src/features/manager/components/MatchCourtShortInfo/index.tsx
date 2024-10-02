import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import ClockIcon from '@/static/imgs/manager/ClockIcon.svg'
import ReportIcon from '@/static/imgs/manager/ReportIcon.svg'

interface MatchCourtInfoProps {
  data: MatchDetailType
}

export default function MatchCourtShortInfo({ data }: MatchCourtInfoProps) {
  const matchDate = new Date(data.date)
  return (
    <div>
      {/* 경기장 정보 */}
      <div className=" py-6 px-2 flex items-center">
        <div className="flex gap-y-1 grow text-sm flex-col">
          <p className="font-bold text-2xl">{data.court.name}</p>
          <p>
            <span className="text-[#5F6368]">{data.court.address}</span>{' '}
            <span className="text-theme underline">주소복사</span>
          </p>
          <div className="text-[#5F6368] flex gap-x-1 items-center">
            <ClockIcon />
            <p>
              {matchDate.getMonth()}월 {matchDate.getDay()}일{' '}
              {matchDate.getHours()}:{matchDate.getMinutes()}
            </p>
          </div>
        </div>
        <ReportIcon />
      </div>
    </div>
  )
}

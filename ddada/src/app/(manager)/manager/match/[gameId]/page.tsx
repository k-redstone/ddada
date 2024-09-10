import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'

const dummy = {
  id: 1,
  courtName: '성동구 금호스포츠센터 10번코트',
  addr: '가끔너무긴이름의장소들이있는데요이럴경우이럴경우 이럴경우',
  number: 4,
  time: new Date('2024-09-10T12:24:00'),
}

export default function ScoreBoardPage() {
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={dummy} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo />
        <BadmintonScoreBoard />
      </div>
    </div>
  )
}

import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { singleDummy } from '@/features/manager/constants/dummyData.ts'

export default function ScoreBoardPage() {
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={singleDummy} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo />
        <BadmintonScoreBoard />
      </div>
    </div>
  )
}

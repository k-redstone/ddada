'use client'
import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { useParams } from 'next/navigation'

import {
  singleDummy,
  listDummy,
} from '@/features/manager/constants/dummyData.ts'

export default function ScoreBoardPage() {
  const params = useParams() as { gameId: string }
  const dummy = listDummy.find((item) => item.id === parseInt(params.gameId))

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

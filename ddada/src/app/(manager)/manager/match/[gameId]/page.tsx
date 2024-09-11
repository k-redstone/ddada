'use client'

import { useParams } from 'next/navigation'

import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import {
  listDummy,
  // singleDummy,
} from '@/features/manager/constants/dummyData.ts'

export default function ScoreBoardPage() {
  const params = useParams() as { gameId: string }
  const dummy = listDummy.find(
    (item) => item.id === parseInt(params.gameId, 10),
  )
  if (!dummy) {
    return (
      <div>
        <p>임시</p>
      </div>
    )
  }
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

'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import BadmintonScoreBoard from '@/features/manager/components/BadmintonScoreBoard/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'

export default function ScoreBoardPage() {
  const params = useParams() as { gameId: string }

  const { data, isSuccess } = useQuery({
    queryKey: ['matchDetail', params.gameId],
    queryFn: () => fetchMatchDetail(params.gameId),
    enabled: !!params.gameId,
  })

  if (!isSuccess) {
    return (
      <div>
        <p>임시</p>
      </div>
    )
  }
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={data} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo data={data} />
        <BadmintonScoreBoard data={data} />
      </div>
    </div>
  )
}

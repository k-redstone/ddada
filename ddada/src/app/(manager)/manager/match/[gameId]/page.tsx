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
  if (
    data.status === 'RESERVED' ||
    data.status === 'CREATED' ||
    data.status === 'FINISHED' ||
    data.status === 'CANCELED'
  ) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-2xl font-bold">잘못된 접근입니다.</p>
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

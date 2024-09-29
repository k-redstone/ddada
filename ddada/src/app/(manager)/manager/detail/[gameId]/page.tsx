'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import MatchCourtInfo from '@/components/MatchCourtInfo/index.tsx'
import MatchRule from '@/components/MatchRule/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import { MatchReservationDetailProvider } from '@/features/reservationDetail/providers/index.tsx'

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
        <MatchReservationDetailProvider matchDetailData={data}>
          <MatchPlayerInfo data={data} />
          <MatchRule>
            <MatchRule.TitleWithUnderline />
            <MatchRule.TossRule />
            <MatchRule.ScoreRule />
            <MatchRule.DoubleRule />
            <MatchRule.InvalidityRule />
            <MatchRule.FaultRule />
          </MatchRule>
          <MatchCourtInfo>
            <MatchCourtInfo.Title />
            <MatchCourtInfo.CourtImage />
            <MatchCourtInfo.Number />
            <MatchCourtInfo.Website />
            <MatchCourtInfo.Detail />
          </MatchCourtInfo>
        </MatchReservationDetailProvider>

        {true ? (
          <div>
            <div className="bg-[#471801] flex justify-center items-center py-3">
              <span className="text-white text-xs font-bold ">
                매치 시간 10분 전부터 버튼이 활성화되며, 매니저님께서는 모든
                인원을 확인하고 매치를 시작해주세요.
              </span>
            </div>
            <div className="bg-[#FCA211] flex justify-center items-center h-[4.75rem] cursor-pointer">
              <span className="text-white text-xl font-bold ">매치 시작</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#E5E5ED] flex justify-center items-center h-[4.75rem]">
            <span className="text-[#6B6E78] text-xl font-bold">
              매치 대기중
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

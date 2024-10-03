'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import MatchCourtInfo from '@/components/MatchCourtInfo/index.tsx'
import MatchRule from '@/components/MatchRule/index.tsx'
import { changeMatchStatus } from '@/features/manager/api/managerAPI.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import { fetchMatchDetail } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import { MatchReservationDetailProvider } from '@/features/reservationDetail/providers/index.tsx'

export default function ScoreBoardPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams() as { gameId: string }

  const { data, isSuccess } = useQuery({
    queryKey: ['matchDetail', params.gameId],
    queryFn: () => fetchMatchDetail(params.gameId),
    enabled: !!params.gameId,
  })

  const handleMatchStart = async () => {
    // todo: 매치 시작 분기로직

    if (!data) {
      toast.error('해당 경기는 아직 시작할 수 없어요')
      return
    }

    if (data.status !== 'RESERVED') {
      toast.error('해당 경기는 아직 시작할 수 없어요')
      return
    }
    await changeMatchStatus(data.id, 'PLAYING').then(async () => {
      await queryClient.invalidateQueries({
        queryKey: ['matchDetail', data.id],
      })
      await queryClient.invalidateQueries({ queryKey: ['managerMatch'] })
      toast.success('경기가 시작되었습니다.')
      router.push(`/manager/match/${data.id}`)
    })
  }

  if (!isSuccess) {
    return (
      <div>
        <p>임시</p>
      </div>
    )
  }

  if (
    data.status === 'PLAYING' ||
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
            <button
              type="button"
              onClick={() => handleMatchStart()}
              className="bg-[#FCA211] flex justify-center items-center h-[4.75rem] cursor-pointer w-full"
            >
              <span className="text-white text-xl font-bold ">매치 시작</span>
            </button>
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

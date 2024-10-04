import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { addUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'

interface MatchRequestButtonProps {
  matchId: number
  clickedTeam: number
  isJoin: boolean
  handleModalOpen: () => void
}

export default function MatchRequestButton({
  clickedTeam,
  matchId,
  isJoin,
  handleModalOpen,
}: MatchRequestButtonProps) {
  const queryClient = useQueryClient()
  const matchDetailData = useMatchDetailContext()
  const { invalidateMatchReservationList } = useInvalidateMatchReservations()
  const teamALength = [
    matchDetailData.team1.player1,
    matchDetailData.team1.player2,
  ].filter((player) => player !== null).length
  const teamBLength = [
    matchDetailData.team2.player1,
    matchDetailData.team2.player2,
  ].filter((player) => player !== null).length

  const handleMatchJoin = async () => {
    if (clickedTeam === -1) {
      return
    }
    // if (isJoinTeamA || isJoinTeamB) {
    //   return
    // }
    try {
      await addUserToMatch(matchId, clickedTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      toast.success('매치 예약에 성공했습니다.')

      invalidateMatchReservationList()
    } catch {
      toast.error('매치 예약 중 오류가 발생했습니다.')
    }
  }
  if (
    matchDetailData.status === 'PLAYING' ||
    matchDetailData.status === 'FINISHED' ||
    matchDetailData.status === 'CANCELED'
  ) {
    return (
      <button
        type="button"
        className="border border-disabled  rounded-[.25rem] py-2 px-1 box-border bg-base-50"
        disabled
      >
        <span className="text-xs text-disabled-dark">신청 마감</span>
      </button>
    )
  }

  if (isJoin) {
    return (
      <button
        type="button"
        className="border border-danger  rounded-[.25rem] py-2 px-1 box-border"
        onClick={() => handleModalOpen()}
      >
        <span className="text-xs text-danger">예약 취소하기</span>
      </button>
    )
  }
  if (teamALength + teamBLength === 4) {
    return (
      <button
        type="button"
        className="border border-disabled  rounded-[.25rem] py-2 px-1 box-border bg-base-50"
        disabled
      >
        <span className="text-xs text-disabled-dark">신청 마감</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="bg-theme rounded-[.25rem] py-2 px-1 box-border"
      onClick={() => handleMatchJoin()}
    >
      <span className="text-xs text-white">매치 신청하기</span>
    </button>
  )
}

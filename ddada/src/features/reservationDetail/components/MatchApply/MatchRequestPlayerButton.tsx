import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { addUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
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
  const { invalidateMatchReservationList } = useInvalidateMatchReservations()

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

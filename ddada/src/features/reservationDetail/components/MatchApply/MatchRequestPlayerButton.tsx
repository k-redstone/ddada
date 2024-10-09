import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import { addUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import { checkGenderMatchJoin } from '@/features/reservationDetail/utils/index.ts'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import { UserRole } from '@/types/user/index.ts'

interface MatchRequestButtonProps {
  matchId: number
  clickedTeam: number
  isJoin: boolean
  userRole: UserRole | null
  handleModalOpen: () => void
}

export default function MatchRequestButton({
  clickedTeam,
  matchId,
  isJoin,
  userRole,
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
      const playerGender = await queryClient.ensureQueryData({
        queryKey: ['profile'],
        queryFn: getProfile,
      })

      checkGenderMatchJoin(matchDetailData, clickedTeam, playerGender.gender)

      await addUserToMatch(matchId, clickedTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      toast.success('매치 예약에 성공했습니다.')

      invalidateMatchReservationList()
    } catch (error) {
      const err = error as Error
      switch (err.message) {
        case 'gender':
          toast.error('매치타입을 확인해주세요')
          break
        case 'miss gender':
          toast.error('참여하는 팀의 성별을 확인해주세요')
          break
        default:
          toast.error('매치 예약 중 오류가 발생했습니다.')
      }
    }
  }
  if (
    matchDetailData.status === 'PLAYING' ||
    matchDetailData.status === 'FINISHED' ||
    matchDetailData.status === 'CANCELED' ||
    userRole === undefined ||
    userRole === null
  ) {
    return (
      <button
        type="button"
        className="border border-disabled  rounded-[.25rem] py-2 px-1 box-border bg-base-50"
        disabled
      >
        <span className="text-xs text-disabled-dark">신청 불가</span>
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

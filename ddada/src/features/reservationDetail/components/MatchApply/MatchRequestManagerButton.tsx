import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import {
  addJudgeToMatch,
  deleteJudgeToMatch,
} from '@/features/manager/api/managerAPI.tsx'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'

interface MatchRequestManagerButtonProps {
  isJoin: boolean
  matchId: number
}

export default function MatchRequestManagerButton({
  isJoin,
  matchId,
}: MatchRequestManagerButtonProps) {
  const queryClient = useQueryClient()
  const { invalidateMatchReservationList, invalidateReservationList } =
    useInvalidateMatchReservations()

  const handleMatchJudgeJoin = async () => {
    try {
      await addJudgeToMatch(matchId)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      invalidateMatchReservationList()
      toast.success('매치 심판 신청에 성공했습니다.')
    } catch {
      toast.error('매치 심판 신청 중 오류가 발생했습니다.')
    }
  }

  const handleMatchJudgeCancel = async () => {
    try {
      await deleteJudgeToMatch(matchId)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchId}`],
      })
      invalidateReservationList()
      toast.success('매치 심판 취소에 성공했습니다.')
    } catch {
      toast.error('매치 심판 취소 중 오류가 발생했습니다.')
    }
  }

  if (isJoin) {
    return (
      <button
        type="button"
        className="border border-[#DC3545]  rounded-[.25rem] py-2 px-1 box-border"
        onClick={() => handleMatchJudgeCancel()}
      >
        <span className="text-xs text-[#DC3545]">매치 심판 취소하기</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="bg-[#FCA211] rounded-[.25rem] py-2 px-1 box-border"
      onClick={() => handleMatchJudgeJoin()}
    >
      <span className="text-xs text-white">매치 심판 신청하기</span>
    </button>
  )
}

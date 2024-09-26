import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import Link from 'next/link'
import { createPortal } from 'react-dom'

import MatchTypeTag from '@/components/MatchTypeTag/index.tsx'
import MatchStatusTag from '@/features/mypage/components/MatchStatusTag/index.tsx'
import { MyMatchDetailsType } from '@/features/mypage/types/MyMatchType.ts'
import { deleteUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import MatchCancelModal from '@/features/reservationDetail/components/MatchCancelModal/index.tsx'
import useModal from '@/hooks/useModal/index.tsx'

interface MyMatchCardProps {
  match: MyMatchDetailsType
}

export default function MyMatchCard({ match }: MyMatchCardProps) {
  dayjs.locale('ko')
  const queryClient = useQueryClient()
  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()

  const [team] = match.MyTeamAndNumber.split(' ')
  const dayOfWeek = dayjs(match.matchDate).format('dd')
  const handleMatchCancel = async () => {
    try {
      let playerTeam = 1
      if (team === 'B팀') {
        playerTeam = 2
      }
      await deleteUserToMatch(match.matchId, playerTeam)
      queryClient.invalidateQueries({ queryKey: ['myMatchList'] })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <MatchCancelModal
              handleModalClose={handleModalClose}
              handleMatchCancel={handleMatchCancel}
            />,
            portalElement,
          )
        : null}
      {/* todo 승패여부에 따라서도 색깔을 넣어줘야함 */}
      <div className="bg-base-50 rounded-xl flex gap-3 px-6 py-3">
        <div className="flex flex-col justify-center items center text-xs">
          <MatchStatusTag matchStatus={match.matchStatus} />
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-sm font-bold">{match.gymName}</p>
            </div>
            <div className="text-xs text-disabled-dark">
              <span>{match.gymAddress}</span>
              <span> · </span>
              <span> {match.matchDate}</span>
              <span>({dayOfWeek})</span>
              <span> </span>
              <span>{match.matchTime.slice(0, 5)}</span>
            </div>
            <div>
              <p className="text-xs text-disabled-dark">
                {match.MyTeamAndNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <MatchTypeTag matchType={match.matchType} />
            <MatchTypeTag matchRankType={match.rankType} />
          </div>
        </div>
        <div className="flex gap-1 justify-center items-center text-xs">
          {match.matchStatus === ('CREATED' || 'RESERVED') && (
            <div>
              <button
                type="button"
                onClick={() => handleModalOpen()}
                className="py-1 px-3 border border-disabled text-disabled-dark flex justify-center items-center rounded bg-white"
              >
                <p>취소</p>
              </button>
            </div>
          )}
          <Link href={`/match-reservation/detail/${match.matchId}`}>
            <div className="py-1 px-3 text-disabled-dark flex justify-center items-center bg-[#FCA211] text-theme-light rounded">
              상세
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

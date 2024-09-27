/* eslint no-nested-ternary: "off" */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-hot-toast'

import { WEEKDAYS } from '@/constants/day/index.ts'
import { fetchManagerPk } from '@/features/manager/api/managerAPI.tsx'
import { deleteUserToMatch } from '@/features/reservationDetail/api/matchDetailAPI.tsx'
import MatchPaymentInfo from '@/features/reservationDetail/components/MatchApply/MatchPaymentInfo.tsx'
import MatchRequestManagerButton from '@/features/reservationDetail/components/MatchApply/MatchRequestManagerButton.tsx'
import MatchRequestPlayerButton from '@/features/reservationDetail/components/MatchApply/MatchRequestPlayerButton.tsx'
import MatchStatus from '@/features/reservationDetail/components/MatchApply/MatchStatus.tsx'
import MatchCancelModal from '@/features/reservationDetail/components/MatchCancelModal/index.tsx'
import TeamSelectBtn from '@/features/reservationDetail/components/TeamSelectBtn/index.tsx'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import { useFetchUserPk, useUserRole } from '@/hooks/queries/user.ts'
import useInvalidateMatchReservations from '@/hooks/useInvalidateMatchReservations/index.tsx'
import useModal from '@/hooks/useModal/index.tsx'

export default function MatchApply() {
  const queryClient = useQueryClient()
  const { data: userRole, isSuccess: isUserRole } = useUserRole()
  const { data: playerPk } = useFetchUserPk()

  const { data: managerPk } = useQuery({
    queryKey: ['managerPk'],
    queryFn: fetchManagerPk,
    retry: 1,
  })

  const matchDetailData = useMatchDetailContext()
  const [clickedTeam, setClickedTeam] = useState<number>(-1)

  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()

  const { invalidateReservationList } = useInvalidateMatchReservations()

  if (!isUserRole) {
    return (
      <div>
        <p>now loading</p>
      </div>
    )
  }

  const isJoinTeamA = !![
    matchDetailData.team1.player1,
    matchDetailData.team1.player2,
  ].find((player) => player?.id === playerPk?.playerId)
  const isJoinTeamB = !![
    matchDetailData.team2.player1,
    matchDetailData.team2.player2,
  ].find((player) => player?.id === playerPk?.playerId)

  const isJoinManager = !![matchDetailData.manager].find(
    (player) => player?.id === managerPk?.id,
  )

  const handleMatchCancel = async () => {
    try {
      let playerTeam = 1
      if (isJoinTeamB) {
        playerTeam = 2
      }
      await deleteUserToMatch(matchDetailData.id, playerTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchDetailData.id}`],
      })
      invalidateReservationList()
    } catch {
      toast.error('매치 예약 취소 중 오류가 발생했습니다.')
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
      <div className="flex flex-col gap-y-4 py-6 px-3">
        {/* 설명 */}
        <MatchStatus status={matchDetailData.status} isMatchReserved={false} />

        {/* 팀 선택 */}
        <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs">
          <h2 className="text-sm font-bold">팀 선택</h2>
          <div className="p-1 flex gap-x-2">
            {/* 팀A 버튼 */}
            {userRole?.memberType === 'PLAYER' ? (
              <button
                type="button"
                className="flex-1"
                onClick={() => {
                  setClickedTeam(1)
                }}
                disabled={isJoinTeamA || isJoinTeamB}
              >
                <TeamSelectBtn
                  isDisabled={false}
                  isJoined={isJoinTeamA}
                  isOtherTeamSelect={isJoinTeamB}
                  isClicked={clickedTeam === 1}
                >
                  <span className="font-bold">A팀</span>
                  <span>
                    (
                    {
                      [
                        matchDetailData.team1.player1,
                        matchDetailData.team1.player2,
                      ].filter((player) => player !== null).length
                    }
                    /2)
                  </span>
                </TeamSelectBtn>
              </button>
            ) : (
              <button type="button" className="flex-1" disabled>
                <TeamSelectBtn isDisabled>
                  <span className="font-bold">A팀</span>
                  <span>
                    (
                    {
                      [
                        matchDetailData.team1.player1,
                        matchDetailData.team1.player2,
                      ].filter((player) => player !== null).length
                    }
                    /2)
                  </span>
                </TeamSelectBtn>
              </button>
            )}

            {/* 팀B 버튼 */}
            {userRole?.memberType === 'PLAYER' ? (
              <button
                type="button"
                className="flex-1"
                onClick={() => setClickedTeam(2)}
                disabled={isJoinTeamA || isJoinTeamB}
              >
                <TeamSelectBtn
                  isDisabled={false}
                  isJoined={isJoinTeamB}
                  isClicked={clickedTeam === 2}
                  isOtherTeamSelect={isJoinTeamA}
                >
                  <span className="font-bold">B팀</span>
                  <span>
                    (
                    {
                      [
                        matchDetailData.team2.player1,
                        matchDetailData.team2.player2,
                      ].filter((player) => player !== null).length
                    }
                    /2)
                  </span>
                </TeamSelectBtn>
              </button>
            ) : (
              <button type="button" className="flex-1" disabled>
                <TeamSelectBtn isDisabled>
                  <span className="font-bold">B팀</span>
                  <span>
                    (
                    {
                      [
                        matchDetailData.team2.player1,
                        matchDetailData.team2.player2,
                      ].filter((player) => player !== null).length
                    }
                    /2)
                  </span>
                </TeamSelectBtn>
              </button>
            )}

            {/* 매니저 버튼 */}
            {userRole?.memberType === 'MANAGER' ? (
              <button
                type="button"
                className="flex-1"
                onClick={() => setClickedTeam(3)}
                disabled={isJoinManager}
              >
                {isJoinManager ? (
                  <TeamSelectBtn
                    isDisabled={false}
                    isClicked={clickedTeam === 3}
                    isJoined={isJoinManager}
                  >
                    <span className="font-bold">매니저</span>
                    <span>
                      (
                      {
                        [matchDetailData.manager].filter(
                          (player) => player !== null,
                        ).length
                      }
                      /1)
                    </span>
                  </TeamSelectBtn>
                ) : (
                  <TeamSelectBtn
                    isDisabled={isJoinManager}
                    isClicked={clickedTeam === 3}
                    isJoined={isJoinManager}
                  >
                    <span className="font-bold">매니저</span>
                    <span>
                      (
                      {
                        [matchDetailData.manager].filter(
                          (player) => player !== null,
                        ).length
                      }
                      /1)
                    </span>
                  </TeamSelectBtn>
                )}
              </button>
            ) : (
              <button type="button" className="flex-1" disabled>
                <TeamSelectBtn isDisabled>
                  <span className="font-bold">매니저</span>
                  <span>
                    (
                    {
                      [matchDetailData.manager].filter(
                        (player) => player !== null,
                      ).length
                    }
                    /1)
                  </span>
                </TeamSelectBtn>
              </button>
            )}
          </div>
        </div>

        {/* 예약정보 */}
        <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs text-[#6B6E78]">
          <h2 className="text-sm font-bold text-black">예약정보</h2>
          <p className="text-sm">{matchDetailData.court.name}</p>
          <p>{matchDetailData.court.address}</p>
          <p>
            {' '}
            {matchDetailData.date}(
            {WEEKDAYS[new Date(matchDetailData.date).getDay()]}){' '}
            {new Date(
              `${matchDetailData.date}T${matchDetailData.time}`,
            ).getHours()}
            :00-
            {new Date(
              `${matchDetailData.date}T${matchDetailData.time}`,
            ).getHours() + 1}
            :00(1시간){' '}
          </p>
        </div>

        {/* 결제금액 */}

        <MatchPaymentInfo isMatchReserved={false} />

        {/* 신청버튼 */}
        {userRole?.memberType === 'MANAGER' ? (
          <MatchRequestManagerButton isJoin matchId={matchDetailData.id} />
        ) : (
          <MatchRequestPlayerButton
            isJoin={false}
            matchId={matchDetailData.id}
            clickedTeam={clickedTeam}
            handleModalOpen={handleModalOpen}
          />
        )}
      </div>
    </>
  )
}

import { useUserRole, useFetchUserProfile } from '@/hooks/queries/user'
import { useMatchDetailContext } from '@/features/reservationDetail/providers/index.tsx'
import { WEEKDAYS } from '@/constants/day'
import { TeamSelectBtn } from '../TeamSelectBtn/index.tsx'
import { useState } from 'react'

import { createPortal } from 'react-dom'
import MatchCancelModal from '../MatchCancelModal/index.tsx'
import { useQueryClient } from '@tanstack/react-query'

import {
  addUserToMatch,
  deleteUserToMatch,
} from '@/features/reservationDetail/api/matchDetailAPI.tsx'

import {
  addJudgeToMatch,
  deleteJudgeToMatch,
} from '@/features/manager/api/managerAPI.tsx'

import useModal from '@/hooks/useModal/index.tsx'

export default function MatchApply() {
  const queryClient = useQueryClient()
  const { data: userRole, isSuccess: isUserRole } = useUserRole()
  const { data: userProfile, isSuccess: isUserProfile } = useFetchUserProfile()
  const matchDetailData = useMatchDetailContext()
  const [clickedTeam, setClickedTeam] = useState<number>(-1)

  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()

  if (!isUserRole) {
    return (
      <div>
        <p>now loading</p>
      </div>
    )
  }

  const isJoinTeamA = [
    matchDetailData.team1.player1,
    matchDetailData.team1.player2,
  ].find((player) => player?.nickname === userProfile?.nickname)
    ? true
    : false
  const isJoinTeamB = [
    matchDetailData.team2.player1,
    matchDetailData.team2.player2,
  ].find((player) => player?.nickname === userProfile?.nickname)
    ? true
    : false

  const isJoinManager = [matchDetailData.manager].find(
    (player) => player?.nickname === userProfile?.nickname,
  )
    ? true
    : false

  const handleMatchJoin = async () => {
    try {
      await addUserToMatch(matchDetailData.id, clickedTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchDetailData.id}`],
      })
    } catch {
      console.error('asdf')
    }
    console.log('asdf')
  }
  const handleMatchCancel = async () => {
    try {
      console.log('asdf')
      let clickedTeam = 1
      if (isJoinTeamB) {
        clickedTeam = 2
      }
      await deleteUserToMatch(matchDetailData.id, clickedTeam)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchDetailData.id}`],
      })
    } catch {
      console.error('asdf')
    }
    console.log('asdHJGHGHf')
  }

  const handleMatchJudgeJoin = async () => {
    try {
      await addJudgeToMatch(matchDetailData.id)
      queryClient.invalidateQueries({
        queryKey: ['matchDetail', `${matchDetailData.id}`],
      })
    } catch {
      console.error('asdf')
    }
    console.log('asdf')
  }

  const handleMatchJudgeCancel = async () => {}

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
        <div className="pb-3 border-b border-[#E5E5ED]">
          {isJoinTeamA || isJoinTeamA ? (
            <div className="flex flex-col items-center">
              <p className="font-bold">이미 예약한 매치에요</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="font-bold">결제하고 바로 매치 확정하기 🤙</p>
              <p className="text-sm text-[#6B6E78]">
                빠르게 팀을 고르고 매치를 준비하세요
              </p>
            </div>
          )}
        </div>

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
                <TeamSelectBtn isDisabled={true}>
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
                <TeamSelectBtn isDisabled={true}>
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
              >
                <TeamSelectBtn isDisabled={false} isClicked={clickedTeam === 3}>
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
            ) : (
              <button type="button" className="flex-1" disabled>
                <TeamSelectBtn isDisabled={true}>
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

        {isJoinTeamA || isJoinTeamB || (
          <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs text-[#6B6E78]">
            <h2 className="text-sm font-bold text-black">결제금액</h2>
            <div className="flex justify-between">
              <span>공간사용료</span>
              <span>₩5,000</span>
            </div>
            <div className="flex justify-between">
              <span>수수료</span>
              <span>₩500</span>
            </div>
          </div>
        )}

        {/* 최종금액 */}
        {isJoinTeamA || isJoinTeamB || (
          <div className="flex justify-end">
            <span className="text-base text-[#FCA211] font-bold">₩5,500</span>
          </div>
        )}

        {/* 신청버튼 */}

        {userRole?.memberType === 'MANAGER' ? (
          isJoinManager ? (
            <button
              type="button"
              className="border border-[#DC3545]  rounded-[.25rem] py-2 px-1 box-border"
              onClick={() => handleMatchJudgeCancel()}
            >
              <span className="text-xs text-[#DC3545]">매치 심판 취소하기</span>
            </button>
          ) : (
            <button
              type="button"
              className="bg-[#FCA211] rounded-[.25rem] py-2 px-1 box-border"
              onClick={() => handleMatchJudgeJoin()}
            >
              <span className="text-xs text-white">매치 심판 신청하기</span>
            </button>
          )
        ) : isJoinTeamA || isJoinTeamB ? (
          <button
            type="button"
            className="border border-[#DC3545]  rounded-[.25rem] py-2 px-1 box-border"
            onClick={() => handleModalOpen()}
          >
            <span className="text-xs text-[#DC3545]">예약 취소하기</span>
          </button>
        ) : (
          <button
            type="button"
            className="bg-[#FCA211] rounded-[.25rem] py-2 px-1 box-border"
            onClick={() => handleMatchJoin()}
          >
            <span className="text-xs text-white">매치 신청하기</span>
          </button>
        )}

        {/* {isJoinTeamA || isJoinTeamB ? (
        <button
          type="button"
          className="border border-[#DC3545]  rounded-[.25rem] py-2 px-1 box-border"
          onClick={() => handleMatchCancel()}
        >
          <span className="text-xs text-[#DC3545]">예약 취소하기</span>
        </button>
      ) : (
        <button
          type="button"
          className="bg-[#FCA211] rounded-[.25rem] py-2 px-1 box-border"
          onClick={() => handleMatchJoin()}
        >
          <span className="text-xs text-white">매치 신청하기</span>
        </button>
      )} */}
      </div>
    </>
  )
}

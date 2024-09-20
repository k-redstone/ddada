'use client'

import { useState } from 'react'

import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import AllMatch from '@/static/imgs/match-reservation/match-reservation_all_match.svg'
import CheckedIcon from '@/static/imgs/match-reservation/match-reservation_checked_icon.svg'
import FemaleMatch from '@/static/imgs/match-reservation/match-reservation_female_double_match.svg'
import MaleMatch from '@/static/imgs/match-reservation/match-reservation_male_double_match.svg'
import MixedMatch from '@/static/imgs/match-reservation/match-reservation_mixed_match.svg'

interface MatchTypeModalProps {
  closeModal: () => void
  chooseMatchType: string[]
  handleMatchType: (matchTypes: string[]) => void
}

export default function MatchTypeModal({
  closeModal,
  chooseMatchType,
  handleMatchType,
}: MatchTypeModalProps) {
  const [selectedMatchType, setSelectedMatchType] =
    useState<string[]>(chooseMatchType)

  const handleCloseModal = () => {
    closeModal()
  }

  const handleSelectedMatchType = (matchType: string) => {
    if (selectedMatchType.includes('전체')) {
      setSelectedMatchType([matchType])
      return
    }
    if (selectedMatchType.includes(matchType)) {
      setSelectedMatchType(
        selectedMatchType.filter((selected) => selected !== matchType),
      )
      return
    }
    setSelectedMatchType([...selectedMatchType, matchType])
  }

  const handleClearSelectedMatchType = () => {
    setSelectedMatchType(['전체'])
  }

  const handleSelectedAllMatchType = () => {
    if (selectedMatchType.includes('전체')) {
      setSelectedMatchType([])
      return
    }
    setSelectedMatchType(['전체'])
  }

  const handleSaveSelectedMatchType = () => {
    if (selectedMatchType.length === 0) {
      setSelectedMatchType(['전체'])
    }
    handleMatchType(selectedMatchType)
    closeModal()
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden"
        onClick={handleCloseModal}
        aria-hidden="true"
      />
      {/* height 수정 필요 */}
      <div className="flex flex-col text-xs gap-6 fixed top-10 left-1/3 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">매치 타입</p>
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="예약 및 결제 닫기"
          >
            <ModalCloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              className="flex flex-col gap-1"
              onClick={handleSelectedAllMatchType}
            >
              <div
                className={`rounded-[0.75rem]
                ${selectedMatchType.includes('전체') ? 'ring ring-[#FCA211]' : ''}
              `}
              >
                <AllMatch />
              </div>
              <div className="w-full flex justify-between text-left">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">전체</p>
                  <p className="text-xs text-[#6B6E78]">
                    모든 매치를 확인합니다.
                  </p>
                </div>
                {selectedMatchType.includes('전체') && <CheckedIcon />}
              </div>
            </button>
            <button
              type="button"
              className="flex flex-col gap-1"
              onClick={() => handleSelectedMatchType('MIXED_DOUBLE')}
            >
              <div
                className={`rounded-[0.75rem]
                ${selectedMatchType.includes('MIXED_DOUBLE') ? 'ring ring-[#FCA211]' : ''}
              `}
              >
                <MixedMatch />
              </div>
              <div className="w-full flex justify-between text-left">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">혼합복식</p>
                  <p className="text-xs text-[#6B6E78]">
                    혼성간 팀을 이뤄 경기합니다.
                  </p>
                </div>
                {selectedMatchType.includes('MIXED_DOUBLE') && <CheckedIcon />}
              </div>
            </button>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex flex-col gap-1"
              onClick={() => handleSelectedMatchType('MALE_DOUBLE')}
            >
              <div
                className={`rounded-[0.75rem]
                ${selectedMatchType.includes('MALE_DOUBLE') ? 'ring ring-[#FCA211]' : ''}
              `}
              >
                <MaleMatch />
              </div>
              <div className="w-full flex justify-between text-left">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">남성복식</p>
                  <p className="text-xs text-[#6B6E78]">
                    남성 동성간 팀이 되어 경기합니다.
                  </p>
                </div>
                {selectedMatchType.includes('MALE_DOUBLE') && <CheckedIcon />}
              </div>
            </button>
            <button
              type="button"
              className="flex flex-col gap-1"
              onClick={() => handleSelectedMatchType('FEMALE_DOUBLE')}
            >
              <div
                className={`rounded-[0.75rem]
                ${selectedMatchType.includes('FEMALE_DOUBLE') ? 'ring ring-[#FCA211]' : ''}
              `}
              >
                <FemaleMatch />
              </div>
              <div className="w-full flex justify-between text-left">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">여성복식</p>
                  <p className="text-xs text-[#6B6E78]">
                    여성 동성간 팀이 되어 경기합니다.
                  </p>
                </div>
                {selectedMatchType.includes('FEMALE_DOUBLE') && <CheckedIcon />}
              </div>
            </button>
          </div>
        </div>
        <div className="flex gap-6">
          <button
            type="button"
            onClick={handleClearSelectedMatchType}
            className="text-[#6B6E78] border rounded px-4 py-2 border border-[#E5E5ED]"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={handleSaveSelectedMatchType}
            className="text-white bg-[#FCA211] rounded px-4 py-2 grow"
          >
            적용
          </button>
        </div>
      </div>
    </>
  )
}
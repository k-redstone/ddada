'use client'

import { createPortal } from 'react-dom'

import RacketSearchModal from '@/features/racketRecommend/components/RacketSearchModal/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.tsx'
import useSelectRacketStore from '@/features/racketRecommend/stores/useSelectRacketStore.ts'
import { RacketRecommendBranchProps } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import useModal from '@/hooks/useModal/index.tsx'
import SearchIcon from '@/static/imgs/racketRecommned/SearchIcon.svg'

export default function Step1({ changeMoveNext }: RacketRecommendBranchProps) {
  const { setPreference } = useRacketRecommendStore()
  const {
    isSelectNone,
    selectedRacketList,
    updateIsNone,
    deleteSelectedRacketList,
  } = useSelectRacketStore()
  const { isModalOpen, portalElement, handleModalOpen, handleModalClose } =
    useModal()

  const handleSelectNone = () => {
    if (isSelectNone) {
      updateIsNone(false)
      changeMoveNext(false)
      return
    }
    changeMoveNext(true)
    updateIsNone(true)
    setPreference('racket', 'none')
  }

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <RacketSearchModal handleModalClose={handleModalClose} />,
            portalElement,
          )
        : null}
      <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
        <p className="text-xl text-center">가지고 계신 라켓을 알려주세요</p>
        <div className="flex flex-col gap-y-3">
          <div>
            <button
              type="button"
              className="border border-[#FCA211] py-3 px-6 flex gap-x-2.5 text-sm text-[#FCA211] rounded-xl items-center"
              onClick={() => handleModalOpen()}
            >
              <span>라켓 찾기</span>
              <SearchIcon />
            </button>
          </div>
          {selectedRacketList.length === 0 && (
            <button
              type="button"
              className={`border border-[#E5E5ED] text-[#6B6E78] rounded-xl py-3 px-6 ${isSelectNone && `bg-[#FFFBEA] text-[#FCA211] border-[#FFFBEA]`}`}
              onClick={() => handleSelectNone()}
            >
              <span className="text-bold">없음</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

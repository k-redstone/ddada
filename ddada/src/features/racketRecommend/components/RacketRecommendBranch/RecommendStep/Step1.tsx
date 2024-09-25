'use client'

import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.tsx'
import { RacketRecommendBranchProps } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import SearchIcon from '@/static/imgs/racketRecommned/SearchIcon.svg'

export default function Step1({ changeMoveNext }: RacketRecommendBranchProps) {
  const { setPreference } = useRacketRecommendStore()

  const handleSelectNext = () => {
    changeMoveNext(true)
    setPreference('racket', 'none')
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">가지고 계신 라켓을 알려주세요</p>
      <div className="flex flex-col gap-y-3">
        <div>
          <button
            type="button"
            className="border border-[#FCA211] py-3 px-6 flex gap-x-2.5 text-sm text-[#FCA211] rounded-xl items-center"
          >
            <span>라켓 찾기</span>
            <SearchIcon />
          </button>
        </div>
        <button
          className="border border-[#E5E5ED] rounded-xl py-3 px-6"
          onClick={() => handleSelectNext()}
        >
          <span className="text-[#6B6E78] text-bold">없음</span>
        </button>
      </div>
    </div>
  )
}

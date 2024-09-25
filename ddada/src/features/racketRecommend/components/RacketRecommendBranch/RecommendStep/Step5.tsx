'use client'

import Image from 'next/image'

import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racketRecommend/types/RacketRecommendType.ts'
import NoneImg from '@/static/imgs/racketRecommned/NoneImg.png'
import SinuousImg from '@/static/imgs/racketRecommned/SinuousImg.png'
import SolidImg from '@/static/imgs/racketRecommned/SolidImg.png'
import SuitableImg from '@/static/imgs/racketRecommned/SuitableImg.png'

export default function Step5({
  changeProgress,
  changeStep,
}: RacketRecommendBranchProps) {
  const { setPreference } = useRacketRecommendStore()

  const handleSelectNext = (shaft: string) => {
    changeStep(6)
    changeProgress(ProgressStepType.loading)
    setPreference('shaft', shaft)
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">선호하는 라켓의 탄성을 골라주세요</p>
      <div className="flex gap-x-3 justify-between ">
        {/* 4개의 탄성 */}
        {/* 견고한 */}
        <div
          onClick={() => handleSelectNext('solid')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6] "
        >
          <Image src={SolidImg} alt="SolidImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">견고한</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>강한 반발력, 높은 정확성</span>
            </p>
          </div>
        </div>
        {/* 적당한 */}
        <div
          onClick={() => handleSelectNext('suitable')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={SuitableImg} alt="SuitableImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">적당한</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>균형 잡힌 성능, 적당한 탄성</span>
            </p>
          </div>
        </div>
        {/* 유연함 */}
        <div
          onClick={() => handleSelectNext('sinuous')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={SinuousImg} alt="SinuousImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">유연한</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>부드러움, 편안함</span>
            </p>
          </div>
        </div>
        {/* 상관없음 */}
        <div
          onClick={() => handleSelectNext('none')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={NoneImg} alt="NoneImg" />
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">상관없음</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>라켓의 탄성은 상관없다</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

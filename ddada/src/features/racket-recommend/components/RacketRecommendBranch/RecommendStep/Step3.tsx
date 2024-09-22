'use client'

import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racket-recommend/types/RacketRecommendType.ts'

import HeavyWeightImg from '@/static/imgs/racketRecommned/HeavyWeightImg.png'
import LightWeightImg from '@/static/imgs/racketRecommned/LightWeightImg.png'
import NoneImg from '@/static/imgs/racketRecommned/NoneImg.png'
import Image from 'next/image'

import useRacketRecommendStore from '@/features/racket-recommend/stores/useRacketRecommendStore'

export default function Step3({
  changeProgress,
  changeStep,
}: RacketRecommendBranchProps) {
  const { setPreference } = useRacketRecommendStore()

  const handleSelectNext = (weight: string) => {
    changeStep(4)
    changeProgress(ProgressStepType.step4)
    setPreference('weight', weight)
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">선호하는 무게를 골라주세요</p>
      <div className="flex gap-x-3 justify-between">
        {/* 3개의 무개 */}
        {/* 무거운 */}
        <div
          onClick={() => handleSelectNext('heavy')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={HeavyWeightImg} alt="HeavyWeightImg"></Image>
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">무거운</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>묵직하고 강한</span>
            </p>
          </div>
        </div>
        {/* 가벼운 */}
        <div
          onClick={() => handleSelectNext('light')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={LightWeightImg} alt="LightWeightImg"></Image>
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">가벼운</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>민첩하고 빠른</span>
            </p>
          </div>
        </div>
        {/* 상관없음 */}
        <div
          onClick={() => handleSelectNext('none')}
          className="max-h-[13.75rem] px-3 py-6 flex flex-col gap-y-3 rounded-xl hover:bg-[#F6F6F6]"
        >
          <Image src={NoneImg} alt="NoneWeightImg"></Image>
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm">상관없음</span>
            <p className="text-xs text-[#6B6E78] flex flex-col items-center">
              <span>둘 다 괜찮다</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

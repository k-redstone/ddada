'use client'

import { useRouter } from 'next/navigation'
import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racket-recommend/types/RacketRecommendType.ts'

import ProgressBar from '@/features/racket-recommend/components/ProgressBar/index.tsx'

export default function Step2({ changeProgress }: RacketRecommendBranchProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-[5.25rem] max-w-[34rem] ">
      <div onClick={() => router.back()}>이전으로 돌아가기</div>

      <div className="flex flex-col gap-y-2 px-6">
        <ProgressBar step={2} />
      </div>
      <button
        type="button"
        className=" bg-[#FCA211] text-white px-6 py-3 rounded-xl"
        onClick={() => changeProgress(ProgressStepType.step2)}
      >
        asdf
      </button>
    </div>
  )
}

'use client'

import ProgressBar from '@/features/racket-recommend/components/ProgressBar/index.tsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProgressStepType } from '@/features/racket-recommend/types/RacketRecommendType'

import RacketRecommendBranch from '@/features/racket-recommend/components/RacketRecommendBranch'
export default function RecommendPage() {
  const router = useRouter()
  const [recommendStep, setRecommendStep] = useState<ProgressStepType>(
    ProgressStepType.step1,
  )
  const [step, setStep] = useState<number>(1)
  const [canMoveNext, setCanMoveNext] = useState<boolean>(false)

  return (
    <div className="flex justify-center">
      <div className="grow flex flex-col gap-y-[5.25rem] max-w-[34rem]">
        <div onClick={() => router.back()}>이전으로 돌아가기</div>

        <div className="flex flex-col gap-y-2 px-6">
          <ProgressBar step={step} />
        </div>
        <RacketRecommendBranch
          progressStep={recommendStep}
          changeProgress={setRecommendStep}
          changeMoveNext={setCanMoveNext}
        />

        {canMoveNext && (
          <button
            type="button"
            className=" bg-[#FCA211] text-white px-6 py-3 rounded-xl"
            // onClick={() => changeProgress(ProgressStepType.step2)}
            onClick={() => {
              setStep(step + 1)
              setCanMoveNext(false)
            }}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

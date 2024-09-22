'use client'

import ProgressBar from '@/features/racket-recommend/components/ProgressBar/index.tsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProgressStepType } from '@/features/racket-recommend/types/RacketRecommendType'
import ResultLoading from '@/features/racket-recommend/components/RacketRecommendBranch/RecommendStep/ResultLoading'
import RacketRecommendBranch from '@/features/racket-recommend/components/RacketRecommendBranch'
export default function RecommendPage() {
  const router = useRouter()
  const [recommendStep, setRecommendStep] = useState<ProgressStepType>(
    ProgressStepType.step1,
  )
  const [step, setStep] = useState<number>(1)
  const [canMoveNext, setCanMoveNext] = useState<boolean>(false)

  const handleMoveNext = () => {
    setStep(step + 1)
    let nextStep: ProgressStepType

    switch (step + 1) {
      case 1:
        nextStep = ProgressStepType.step1
        break
      case 2:
        nextStep = ProgressStepType.step2
        break
      case 3:
        nextStep = ProgressStepType.step3
        break
      case 4:
        nextStep = ProgressStepType.step4
        break
      case 5:
        nextStep = ProgressStepType.step5
        break
      default:
        nextStep = ProgressStepType.main // 처음으로 돌아가거나, 다른 처리를 원할 때
    }

    setRecommendStep(nextStep)
    setCanMoveNext(false)
  }
  if (recommendStep === ProgressStepType.loading) {
    return (
      <div className="flex justify-center h-[calc(100vh-5.125rem)]">
        <ResultLoading />
      </div>
    )
  }
  return (
    <div className="flex justify-center h-[calc(100vh-5.125rem)] py-2">
      <div className="grow flex flex-col gap-y-[5.25rem] max-w-[34rem]">
        <div onClick={() => router.back()}>이전으로 돌아가기</div>

        <div className="flex flex-col gap-y-2 px-6">
          <ProgressBar step={step} />
        </div>
        <div className="grow">
          <RacketRecommendBranch
            progressStep={recommendStep}
            changeProgress={setRecommendStep}
            changeMoveNext={setCanMoveNext}
            changeStep={setStep}
          />
        </div>

        {canMoveNext && (
          <button
            type="button"
            className=" bg-[#FCA211] text-white px-6 py-3 rounded-xl"
            // onClick={() => changeProgress(ProgressStepType.step2)}
            onClick={() => handleMoveNext()}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

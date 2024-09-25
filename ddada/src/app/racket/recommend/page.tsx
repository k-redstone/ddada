'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ProgressBar from '@/features/racketRecommend/components/ProgressBar/index.tsx'
import RacketRecommendBranch from '@/features/racketRecommend/components/RacketRecommendBranch/index.tsx'
import ResultLoading from '@/features/racketRecommend/components/RacketRecommendBranch/RecommendStep/ResultLoading.tsx'
import { ProgressStepType } from '@/features/racketRecommend/types/RacketRecommendType.ts'

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
        <button type="button" onClick={() => router.back()}>
          이전으로 돌아가기
        </button>

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

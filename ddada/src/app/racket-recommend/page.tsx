'use client'

import { useState } from 'react'

import RacketRecommendBranch from '@/features/racket-recommend/components/RacketRecommendBranch/index.tsx'
import { ProgressStepType } from '@/features/racket-recommend/types/RacketRecommendType.ts'

export default function RacketRecommendPage() {
  const [progressStep, setProgressStep] = useState<ProgressStepType>(
    ProgressStepType.main,
  )
  return (
    <div>
      <RacketRecommendBranch
        progressStep={progressStep}
        changeProgress={setProgressStep}
      />
    </div>
  )
}

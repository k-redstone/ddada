import Image from 'next/image'

import {
  ProgressStepType,
  RacketRecommendBranchProps,
} from '@/features/racket-recommend/types/RacketRecommendType.ts'
import MainBackgroundImg from '@/static/imgs/racketRecommned/MainBackgroundImg.png'

export default function Step1({ changeProgress }: RacketRecommendBranchProps) {
  return (
    <div className="w-full h-[calc(100vh-5.125rem)]">
      <Image
        className="w-full h-full"
        src={MainBackgroundImg}
        alt="MainBannerImg"
      />
      <button
        type="button"
        onClick={() => changeProgress(ProgressStepType.step2)}
      >
        asdf
      </button>
    </div>
  )
}

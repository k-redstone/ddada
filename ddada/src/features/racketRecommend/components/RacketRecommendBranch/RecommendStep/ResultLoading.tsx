'use client'

import Image from 'next/image'

import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
import LoadingGIF from '@/static/imgs/racketRecommned/LoadingGIF.png'

export default function ResultLoading() {
  const { userPreference } = useRacketRecommendStore()

  console.log(userPreference)
  // 3초 후 이동 & 결과 post 로직 만들어야함
  return (
    <div className="flex flex-col gap-y-3 w-[34rem] items-center justify-center">
      <Image src={LoadingGIF} alt="LoadingGIF" />
      <span className="text-xl">결과를 분석 중이에요</span>
    </div>
  )
}

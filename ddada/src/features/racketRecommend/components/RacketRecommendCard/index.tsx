import Image from 'next/image'

import DummyRacket from '@/static/imgs/racketRecommned/DummyRacket.png'

// interface RacketRecommendCardProps {
//   data: string
// }

export default function RacketRecommendCard() {
  return (
    <div className="flex flex-col gap-y-3 grow">
      <div className="p-6 border border-disabled rounded-xl flex justify-center">
        <Image
          src={DummyRacket}
          width={100}
          height={100}
          alt="badminton Racket"
        />
      </div>
      <div className="flex flex-col gap-y-3 text-xs">
        <p className="flex flex-col gap-y-1">
          <span className="text-disabled-dark">브랜드</span>
          <span className="text-sm">라켓명</span>
        </p>
        <p className="flex gap-x-1 text-disabled-dark">
          <span>무게</span>
          <span>•</span>
          <span>재질</span>
          <span>•</span>
          <span>탄성</span>
          <span>•</span>
          <span>밸런스</span>
        </p>
      </div>
    </div>
  )
}

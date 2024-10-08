import Image from 'next/image'

import { RacketRecommendDetail } from '@/features/racketRecommend/types/RacketRecommendType.ts'

interface RacketRecommendCardProps {
  data: RacketRecommendDetail
}

export default function RacketRecommendCard({
  data,
}: RacketRecommendCardProps) {
  return (
    <div className="flex flex-col gap-y-3 grow">
      <div className="p-6 border border-disabled rounded-xl flex justify-center">
        <Image
          src={data.image.startsWith('//') ? `https:${data.image}` : data.image}
          width={100}
          height={100}
          alt="badminton Racket"
        />
      </div>
      <div className="flex flex-col gap-y-3 text-xs">
        <p className="flex flex-col gap-y-1">
          <span className="text-disabled-dark">{data.manufacturer}</span>
          <span className="text-sm">{data.name}</span>
        </p>
        <p className="flex flex-col items-center gap-x-1 text-disabled-dark">
          <p>
            <span>{data.weight}</span>
            <span>•</span>
            <span>{data.material}</span>
          </p>
          <p>
            <span>{data.shaft}</span>
            <span>•</span>
            <span>{data.balance}</span>
          </p>
        </p>
      </div>
    </div>
  )
}

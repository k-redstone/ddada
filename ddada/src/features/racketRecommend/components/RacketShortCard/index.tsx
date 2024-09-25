import Image from 'next/image'

import { RacketShortType } from '@/features/racketRecommend/types/RacketRecommendType.ts'

interface RacketShortCardProps {
  data: RacketShortType
}

export default function RacketShortCard({ data }: RacketShortCardProps) {
  return (
    <div className="px-3 py-6 flex flex-col items-center gap-y-3 rounded-xl hover:bg-[#F6F6F6]">
      <Image width={100} height={100} src={data.image} alt="AttackStyleImg" />
      <div className="flex flex-col gap-y-1 items-center">
        <p className=" flex flex-col items-center">
          <span className="text-sm">
            {data.name.length >= 10 ? `${data.name.slice(0, 9)}..` : data.name}
          </span>
        </p>
        <p className="text-xs text-[#6B6E78] flex flex-col items-center">
          <span>{data.made}</span>
        </p>
      </div>
    </div>
  )
}

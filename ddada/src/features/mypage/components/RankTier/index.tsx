import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

import Amateur from '@/static/imgs/rank/Amateur.svg'
import Master from '@/static/imgs/rank/Master.svg'
import Professional from '@/static/imgs/rank/Professional.svg'
import Rookie from '@/static/imgs/rank/Rookie.svg'
import SemiPro from '@/static/imgs/rank/Semi-pro.svg'

interface RankTierProps {
  rating: number
}

export default function RankTier({ rating }: RankTierProps) {
  useEffect(() => {
    const currentTier = tiers.find((t) => rating >= t.min && rating < t.max)

    if (currentTier) {
      setTier(currentTier.tier)
      if (currentTier.tierNum === 1) {
        setTierNum('I')
      } else if (currentTier.tierNum === 2) {
        setTierNum('II')
      } else if (currentTier.tierNum === 3) {
        setTierNum('III')
      }
    }
  }, [])

  const [tier, setTier] = useState<string>('')
  const [tierNum, setTierNum] = useState<string>('')

  const tiers = [
    { min: 0, max: 1000, tier: '루키', tierNum: 1 },
    { min: 1000, max: 2000, tier: '아마추어', tierNum: 2 },
    { min: 2000, max: 3000, tier: '세미프로', tierNum: 3 },
    { min: 3000, max: 4000, tier: '프로페셔널', tierNum: 2 },
    { min: 4000, max: 5000, tier: '마스터', tierNum: 3 },
  ]

  return (
    <div
      className={`border-2 rounded-full flex items-center justify-center py-1 px-3 gap-2
    ${tier === '루키' && 'border-[#000000] text-[#000000] bg-[#000000] bg-opacity-20'}
    ${tier === '아마추어' && 'border-[#963D0A] text-[#963D0A] bg-[#963D0A] bg-opacity-20'}
    ${tier === '세미프로' && 'border-[#6D6D6D] text-[#6D6D6D] bg-[#F6F6F6]'}
    ${tier === '프로페셔널' && 'border-[#FCA211] text-[#FCA211] bg-[#FFFBEA]'}
    ${tier === '마스터' && 'border-[#9180D4] text-[#9180D4] bg-[#F1F2FC]'}
    `}
    >
      <div className=" flex items-center justify-center h-6 w-6">
        {tier === '루키' && <Rookie className="w-full h-full" />}
        {tier === '아마추어' && <Amateur className="w-full h-full" />}
        {tier === '세미프로' && <SemiPro className="w-full h-full" />}
        {tier === '프로페셔널' && <Professional className="w-full h-full" />}
        {tier === '마스터' && <Master className="w-full h-full" />}
      </div>
      <p className="text-sm font-normal">
        {tier} {tierNum}
      </p>
    </div>
  )
}

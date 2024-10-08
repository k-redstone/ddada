'use client'

import { getRanking } from '@/features/ranking/api/getRanking.ts'
import { useQuery } from '@tanstack/react-query'
import RankTier from '@/features/mypage/components/RankTier/index.tsx'
export default function RankingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn: getRanking,
    retry: 0,
    staleTime: 1000 * 60 * 1,
  })

  if (isLoading) {
    return <div>로딩중</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div>랭킹 이미지</div>
      <p>플레이어의 랭킹</p>
      <div className="flex gap-x-3 p-4 justify-between items-center">
        <p>{data[data.length - 1].ranking}</p>
        <p>{data[data.length - 1].nickname}</p>
        <p>
          <RankTier rating={data[data.length - 1].rating} />
        </p>
      </div>
      {data.slice(0, -1).map((rank: any) => (
        <div
          className={`flex gap-x-3 p-4 border bg-disabled bg-opacity-20 rounded-xl hover:bg-theme hover:bg-opacity-20 hover:border-theme hover:text-theme justify-between items-center
    
        `}
        >
          <p>{rank.ranking}위</p>
          <p>{rank.nickname}</p>
          <p>
            <RankTier rating={rank.rating} />
          </p>
        </div>
      ))}
    </div>
  )
}

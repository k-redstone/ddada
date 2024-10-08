'use client'
import Image from 'next/image'
import RankingLogo from '@/static/imgs/ranking/ranking_main_logo.png'
import LoadingSpinner from '@/static/imgs/mypage/playstyle/my-page-playstyle-spinner.svg'
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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <LoadingSpinner className="animate-spin w-12 h-12" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-center mb-6">
        <Image
          src={RankingLogo}
          alt="랭킹 로고"
          height={200}
          width={734}
          priority
        />
      </div>

      <div className="rounded-xl p-6 w-full max-w-2xl">
        <div className="rounded-lg p-4 mb-6  text-gray-700">
          <p className="font-semibold text-lg text-gray-600">플레이어 랭킹</p>
          <div className="flex items-center justify-between gap-4 p-2 border-b border-gray-300">
            <p className="text-xl font-bold text-theme">
              {data[data.length - 1].ranking}위
            </p>
            <p className="text-lg text-theme font-medium">
              {data[data.length - 1].nickname}
            </p>
            <RankTier rating={data[data.length - 1].rating} />
          </div>
        </div>

        <div className="space-y-4">
          {data.slice(0, -1).map((rank: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
            >
              <p className="text-lg font-semibold text-gray-700">
                {rank.ranking}위
              </p>
              <p className="text-lg">{rank.nickname}</p>
              <RankTier rating={rank.rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

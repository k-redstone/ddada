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
  const [firstPlace, secondPlace, thirdPlace, ...restRankings] = data

  return (
    <div className="flex flex-col items-center py-8 min-h-screen">
      <div className="flex justify-center mb-6">
        <Image
          src={RankingLogo}
          alt="랭킹 로고"
          height={200}
          width={734}
          priority
        />
      </div>

      <div className="flex flex-col rounded-xl p-6 w-full max-w-2xl gap-y-6">
        <div className="rounded-lg p-4 mb-6  text-gray-700">
          <p className="font-semibold text-lg text-gray-600">플레이어 랭킹</p>
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out">
            <p className="text-xl font-bold text-theme">
              {data[data.length - 1].ranking}위
            </p>
            <p className="text-lg text-theme font-medium">
              {data[data.length - 1].nickname}
            </p>
            <RankTier rating={data[data.length - 1].rating} />
          </div>
        </div>
        <p className="font-semibold text-lg text-gray-600">전체 랭킹</p>

        <div className="flex justify-center items-end mb-12 gap-4">
          <div className="text-center">
            <div className="bg-gray-200 rounded-full p-4 mb-2 text-2xl font-bold">
              2
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="font-semibold">{secondPlace.nickname}</p>
              <RankTier rating={secondPlace.rating} />
            </div>
          </div>

          <div className="text-center -mt-8">
            <div className="bg-yellow-400 rounded-full p-4 mb-2 text-3xl font-bold">
              1
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="font-bold text-xl">{firstPlace.nickname}</p>
              <RankTier rating={firstPlace.rating} />
            </div>
          </div>

          <div className="text-center">
            <div className="bg-orange-200 rounded-full p-4 mb-2 text-2xl font-bold">
              3
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="font-semibold">{thirdPlace.nickname}</p>
              <RankTier rating={thirdPlace.rating} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {restRankings.slice(0, -1).map((rank: any, index: number) => (
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

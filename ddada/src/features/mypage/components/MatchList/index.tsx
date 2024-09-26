'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { getMyMatchList } from '@/features/mypage/api/mypage/index.ts'
import MyMatchCard from '@/features/mypage/components/MyMatchCard/index.tsx'
import { MyMatchDetailsType } from '@/features/mypage/types/MyMatchType.ts'
import MatchListLogo from '@/static/imgs/mypage/my-page-matchlist.png'

export default function MatchList() {
  const { data } = useQuery({
    queryKey: ['myMatchList'],
    queryFn: getMyMatchList,
    staleTime: 1000 * 60 * 1,
  })
  const router = useRouter()
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image src={MatchListLogo} alt="mypage-MatchList-logo" />
      </div>
      <div className="flex flex-col gap-3">
        {data && data.length ? (
          data.map((match: MyMatchDetailsType) => (
            <MyMatchCard key={match.matchId} match={match} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-sm  text-disabled-dark gap-1">
            <div className="flex flex-col justify-center items-center font-bold">
              <p>매치가 없어요 :(</p>
              <p>
                <Link href="/match-reservation">매치를 예약해볼까요? </Link>
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push('/match-reservation')}
              className="bg-[#FCA211] text-theme-light py-1 px-3 rounded-xl"
            >
              매치 잡기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

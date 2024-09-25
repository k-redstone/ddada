import Image from 'next/image'

import MyMatchCard from '@/features/mypage/components/MyMatchCard/index.tsx'
import MatchListLogo from '@/static/imgs/mypage/my-page-matchlist.png'

export default function MatchList() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image src={MatchListLogo} alt="mypage-MatchList-logo" />
      </div>
      <div className="flex flex-col gap-3">
        <MyMatchCard />
      </div>
    </div>
  )
}

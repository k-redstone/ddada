import Image from 'next/image'

import Aggressive from '@/static/imgs/mypage/playstyle/my-page-playstyle-aggressive.png'
import Allrounder from '@/static/imgs/mypage/playstyle/my-page-playstyle-allrounder.png'
import Defensive from '@/static/imgs/mypage/playstyle/my-page-playstyle-defensive.png'
import Recovery from '@/static/imgs/mypage/playstyle/my-page-playstyle-recovery.png'
import Strategic from '@/static/imgs/mypage/playstyle/my-page-playstyle-strategic.png'

interface PlayStyleLogoProps {
  userPlayStyle: string
}

export default function PlayStyleLogo({ userPlayStyle }: PlayStyleLogoProps) {
  return (
    <div className="flex flex-col items-center">
      {userPlayStyle === 'AGGRESSIVE' && (
        <Image src={Aggressive} alt="Aggressive" width={580} height={220} />
      )}
      {userPlayStyle === 'ALLROUNDER' && (
        <Image src={Allrounder} alt="Allrounder" width={580} height={220} />
      )}
      {userPlayStyle === 'DEFENSIVE' && (
        <Image src={Defensive} alt="Defensive" width={580} height={220} />
      )}
      {userPlayStyle === 'RECOVERY' && (
        <Image src={Recovery} alt="Recovery" width={580} height={220} />
      )}
      {userPlayStyle === 'STRATEGIC' && (
        <Image src={Strategic} alt="Strategic" width={580} height={220} />
      )}
      <p className="text-xs font-disabled-dark">
        위 플레이스타일은 누적 매치에 의한 분석 결과로, 참여한 매치 수가 적다면
        분석이 정확하지 않을 수 있습니다.
      </p>
    </div>
  )
}

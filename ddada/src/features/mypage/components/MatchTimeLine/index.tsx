import GAINED_BAR from '@/static/imgs/mypage/my-page-gained-bar.svg'
import LOST_BAR from '@/static/imgs/mypage/my-page-lost-bar.svg'

interface MatchTimeLineProps {
  setNumber: number
}
export default function MatchTimeLine({ setNumber }: MatchTimeLineProps) {
  return (
    <div className="flex flex-col items-center text-disabled-dark">
      <p className="text-sm">매치스코어</p>
      <div className="text-4xl font-bold">21 : 14</div>
      <div className="flex flex-col items-center gap-[0.625rem]">
        <div className="flex gap-3">
          <div className="flex-1" />
          <GAINED_BAR />
          <div className="flex flex-col flex-1 text-sm">
            <p className="font-bold">0:1</p>
            <p>이미지, 이름, 획득방법</p>
          </div>
        </div>
        <LOST_BAR /> <LOST_BAR /> <LOST_BAR />
      </div>
    </div>
  )
}

// import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import { objectDummy } from '@/features/manager/constants/dummyData.ts'
import BronzeIcon from '@/static/imgs/manager/BronzeIcon.svg'
import TangerineFillDot from '@/static/imgs/manager/TangerineFillDot.svg'
import TangerineLightDot from '@/static/imgs/manager/TangerineLightDot.svg'

export default function MatchPlayerInfo() {
  return (
    <div className="p-2 flex flex-col gap-y-6 bg-white">
      <h2 className="text-xl font-bold">선수 정보</h2>

      {/* 선수목록 */}
      <div className="flex gap-x-6 items-center">
        {/* A팀 */}
        <div className="flex flex-col gap-y-3">
          {/* 개별 컴포 */}

          {objectDummy.team1.map((item, index) => (
            <div className="flex gap-x-3" key={item.id}>
              {/* <GameUserInfo /> */}
              <div className="flex flex-col gap-y-1 text-sm">
                <p className="flex gap-x-1 items-center">
                  <span className="font-bold">[A{index + 1}] 나는혹석</span>
                  <TangerineLightDot />
                </p>
                <p className="flex gap-x-1 items-center">
                  <BronzeIcon />
                  <span>아마추어</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div> | </div>

        {/* B팀 */}
        <div className="flex flex-col gap-y-3">
          {objectDummy.team1.map((item, index) => (
            <div className="flex gap-x-3" key={item.id}>
              {/* <GameUserInfo /> */}
              <div className="flex flex-col gap-y-1 text-sm">
                <p className="flex gap-x-1 items-center">
                  <span className="font-bold">[B{index + 1}] 나는혹석</span>
                  <TangerineFillDot />
                </p>
                <p className="flex gap-x-1 items-center">
                  <BronzeIcon />
                  <span>아마추어</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

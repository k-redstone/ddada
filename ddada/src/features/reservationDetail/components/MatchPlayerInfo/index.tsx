import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import { objectDummy } from '@/features/manager/constants/dummyData.ts'
import BronzeIcon from '@/static/imgs/manager/BronzeIcon.svg'

export default function MatchPlayerInfo() {
  return (
    <div className="p-2 flex flex-col gap-y-3 bg-white text-xs">
      <div className="flex ">
        <h2 className="text-xl font-bold border-b-2 border-[#FCA211] box-border">
          선수 정보
        </h2>
      </div>
      <div className="bg-[#0D6EFD] px-2 py-1 flex justify-center">
        <p className="text-white">
          현재 매치의 평균 티어는 <span className="font-bold">세미프로</span>
          에요
        </p>
      </div>

      {/* 선수목록 */}
      <div className="flex justify-between items-center">
        {/* A팀 */}
        <div className="flex flex-col gap-y-6">
          {/* 개별 컴포 */}

          {objectDummy.team1.map((item, index) => (
            <div className="flex gap-x-3" key={item.id}>
              <GameUserInfo />
              <div className="flex flex-col gap-y-1">
                <p className="flex gap-x-1 items-center">
                  <span className="font-bold">[A{index + 1}] 나는혹석</span>
                </p>
                <p className="flex gap-x-1 items-center">
                  <BronzeIcon />
                  <span>아마추어</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* B팀 */}
        <div className="flex flex-col gap-y-6">
          {objectDummy.team1.map((item, index) => (
            <div className="flex gap-x-3" key={item.id}>
              <div className="flex flex-col gap-y-1">
                <p className="flex gap-x-1 items-center flex-row-reverse">
                  <span className="font-bold">[B{index + 1}] 나는혹석</span>
                </p>
                <p className="flex gap-x-1 items-center flex-row-reverse">
                  <span>프로페셔널 III</span>
                  <BronzeIcon />
                </p>
              </div>
              <GameUserInfo />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import MatchCourtInfo from '@/features/manager/components/MatchCourtInfo/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import MatchRule from '@/features/manager/components/MatchRule/index.tsx'
import { singleDummy } from '@/features/manager/constants/dummyData.ts'

export default function ScoreBoardPage() {
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={singleDummy} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo />
        <MatchRule />
        <MatchCourtInfo />

        {true ? (
          <div>
            <div className="bg-[#471801] flex justify-center items-center py-3">
              <span className="text-white text-xs font-bold ">
                매치 시간 10분 전부터 버튼이 활성화되며, 매니저님께서는 모든
                인원을 확인하고 매치를 시작해주세요.
              </span>
            </div>
            <div className="bg-[#FCA211] flex justify-center items-center h-[76px] cursor-pointer">
              <span className="text-white text-xl font-bold ">매치 시작</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#E5E5ED] flex justify-center items-center h-[76px]">
            <span className="text-[#6B6E78] text-xl font-bold">
              매치 대기중
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

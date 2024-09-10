import MatchCourtInfo from '@/features/manager/components/MatchCourtInfo/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import MatchRule from '@/features/manager/components/MatchRule/index.tsx'

const dummy = {
  id: 1,
  courtName: '성동구 금호스포츠센터 10번코트',
  addr: '가끔너무긴이름의장소들이있는데요이럴경우이럴경우 이럴경우',
  number: 4,
  time: new Date('2024-09-10T12:24:00'),
}

export default function ScoreBoardPage() {
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={dummy} />
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

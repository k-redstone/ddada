'use client'

import { useParams } from 'next/navigation'

import MatchCourtInfo from '@/components/MatchCourtInfo/index.tsx'
import MatchRule from '@/components/MatchRule/index.tsx'
import MatchCourtShortInfo from '@/features/manager/components/MatchCourtShortInfo/index.tsx'
import MatchPlayerInfo from '@/features/manager/components/MatchPlayerInfo/index.tsx'
import {
  listDummy,
  // singleDummy,
} from '@/features/manager/constants/dummyData.ts'

export default function ScoreBoardPage() {
  const params = useParams() as { gameId: string }

  const dummy = listDummy.find(
    (item) => item.id === parseInt(params.gameId, 10),
  )

  if (!dummy) {
    return (
      <div>
        <p>임시</p>
      </div>
    )
  }
  return (
    <div className="bg-[#E7E7E7]">
      <MatchCourtShortInfo data={dummy} />
      <div className="flex flex-col gap-y-3">
        <MatchPlayerInfo />
        <MatchRule>
          <MatchRule.TitleWithUnderline />
          <MatchRule.TossRule />
          <MatchRule.ScoreRule />
          <MatchRule.DoubleRule />
          <MatchRule.InvalidityRule />
          <MatchRule.FaultRule />
        </MatchRule>
        <MatchCourtInfo>
          <MatchCourtInfo.Title />
          <MatchCourtInfo.CourtImage />
          <MatchCourtInfo.Number />
          <MatchCourtInfo.Website />
          <MatchCourtInfo.Detail />
        </MatchCourtInfo>

        {true ? (
          <div>
            <div className="bg-[#471801] flex justify-center items-center py-3">
              <span className="text-white text-xs font-bold ">
                매치 시간 10분 전부터 버튼이 활성화되며, 매니저님께서는 모든
                인원을 확인하고 매치를 시작해주세요.
              </span>
            </div>
            <div className="bg-[#FCA211] flex justify-center items-center h-[4.75rem] cursor-pointer">
              <span className="text-white text-xl font-bold ">매치 시작</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#E5E5ED] flex justify-center items-center h-[4.75rem]">
            <span className="text-[#6B6E78] text-xl font-bold">
              매치 대기중
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

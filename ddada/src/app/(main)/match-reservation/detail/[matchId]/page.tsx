'use client'

import MatchCourtInfo from '@/components/MatchCourtInfo/index.tsx'
import MatchRule from '@/components/MatchRule/index.tsx'
import MatchApply from '@/features/reservationDetail/components/MatchApply/index.tsx'
import MatchPlayerInfo from '@/features/reservationDetail/components/MatchPlayerInfo/index.tsx'
import MatchShortInfo from '@/features/reservationDetail/components/MatchShortInfo/index.tsx'
import RefundPolicyInfo from '@/features/reservationDetail/components/RefundPolicyInfo/index.tsx'

export default function MatchReservationDetailPage() {
  return (
    <div className=" max-w-[46rem] flex flex-col">
      <div className="h-[12.5rem]">
        <p>이미지임</p>
      </div>
      <div className="flex gap-x-1">
        <div className="flex flex-col gap-y-3 flex-1">
          <MatchPlayerInfo />
          <MatchShortInfo />
          <MatchCourtInfo>
            <MatchCourtInfo.TitleWithUnderline />
            <MatchCourtInfo.Amenities />
            <MatchCourtInfo.Number />
            <MatchCourtInfo.Website />
            <MatchCourtInfo.Detail />
          </MatchCourtInfo>
          <MatchRule>
            <MatchRule.TitleWithUnderline />
            <MatchRule.TossRule />
            <MatchRule.ScoreRule />
            <MatchRule.DoubleRule />
            <MatchRule.InvalidityRule />
            <MatchRule.FaultRule />
          </MatchRule>
          <RefundPolicyInfo />
        </div>
        <div className="flex-1">
          <MatchApply />
        </div>
      </div>
    </div>
  )
}

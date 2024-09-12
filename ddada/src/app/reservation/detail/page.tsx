'use client'

import MatchRule from '@/components/MatchRule/index.tsx'
import RefundPolicyInfo from '@/features/reservationDetail/components/RefundPolicyInfo/index.tsx'

export default function MatchReservationDetailPage() {
  return (
    <div className=" max-w-[46rem] flex flex-col">
      <div>
        <img src="" alt="임시" />
      </div>
      <div className="flex ">
        <div className="flex flex-col gap-y-3">
          <p>userInfo</p>
          <p>matchinfo</p>
          <p>courtinfo</p>
          {/* <MatchRule /> */}
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
        <div>
          <p>오른쪽</p>
        </div>
      </div>
    </div>
  )
}

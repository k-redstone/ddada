// todo props로 승패여부와, 오르고 내린 점수 등락폭 넘겨야함

interface MatchStatusTagProps {
  matchStatus: string
}

export default function MatchStatusTag({ matchStatus }: MatchStatusTagProps) {
  return (
    // todo 나중에 api에 따라 추가될 예정
    // 승리시 패배시
    <div
      className={`border rounded-full h-[50px] w-[50px] flex justify-center items-center
      ${matchStatus === 'CREATED' && 'border-theme text-theme bg-theme-light'}
      ${matchStatus === 'MATCHED' && 'border-success text-success bg-success opacity-20'}
      ${matchStatus === 'CANCELED' && 'border-disabled-dark text-disabled-dark bg-disabled opacity-20'}
    `}
    >
      {matchStatus === 'CREATED' && <p className="text-theme">모집중</p>}
      {matchStatus === 'MATCHED' && <p className="text-success">모집완료</p>}
      {matchStatus === 'CANCELED' && <p className="text-disabled-dark">중단</p>}
    </div>
  )
}

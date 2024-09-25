interface MatchStatusTagProps {
  matchStatus: string
}

export default function MatchStatusTag({ matchStatus }: MatchStatusTagProps) {
  return (
    <div
      className={`border rounded-full h-[50px] w-[50px] flex justify-center items-center
      ${matchStatus === 'CREATED' && 'border-[#FCA211]text-[#FCA211] bg-theme-light'}
      ${matchStatus === 'MATCHED' && 'border-success text-success bg-success opacity-20'}
      ${matchStatus === 'CANCELED' && 'border-disabled-dark text-disabled-dark bg-disabled opacity-20'}
    `}
    >
      원
    </div>
  )
}

interface MatchTypeButtonProps {
  matchType?: string
  matchRankType?: string
}

export default function MatchTypeButton({
  matchType,
  matchRankType,
}: MatchTypeButtonProps) {
  return (
    <div
      className={`rounded-[1000px] px-2 py-1 text-xs text-white
    ${matchType ? 'bg-[#FCA211]' : ''}
    ${matchRankType && (matchRankType === '경쟁' ? 'bg-[#DC3545]' : 'bg-[#0D6EFD]')}
    `}
    >
      {matchType || matchRankType}
      {matchRankType && (matchRankType === '경쟁' ? '전' : '경기')}
    </div>
  )
}

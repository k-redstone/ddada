import { MyMatchDetailsType } from '@/features/mypage/types/MyMatchType.ts'
import MatchTypeTag from '@/components/MatchTypeTag/index.tsx'
interface MyMatchCardProps {
  match: MyMatchDetailsType
}

export default function MyMatchCard({ match }: MyMatchCardProps) {
  console.log(match)
  return (
    <div className="bg-base-50 rounded-xl flex gap-3 px-6 py-3">
      <div className="flex flex-col justify-center items center">원</div>
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-sm font-bold">{match.courtName}</p>
          </div>
          <div className="text-xs text-disabled-dark">
            <span>{match.courtAddress}</span>
            <span> · </span>
            <span>{match.matchDate}</span>
            <span>{match.matchTime}</span>
          </div>
          <div>
            <p className="text-xs text-disabled-dark">
              {match.MyTeamAndNumber}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <MatchTypeTag matchType={match.matchType} />
          <MatchTypeTag matchRankType={match.rankType} />
        </div>
      </div>
      <div className="flex gap-1">취소,상세</div>
    </div>
  )
}

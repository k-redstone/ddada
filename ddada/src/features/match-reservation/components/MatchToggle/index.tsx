import NormalMatchIcon from '@/static/imgs/match-reservation/match-reservation_normal_match_icon.svg'
import RankMatchIcon from '@/static/imgs/match-reservation/match-reservation_rank_match_icon.svg'

interface MatchToggleProps {
  matchRankType: string
  handleMatchRankType: (matchRankType: string) => void
}

export default function MatchToggle({
  matchRankType,
  handleMatchRankType,
}: MatchToggleProps) {
  const handleMatchType = () => {
    if (matchRankType === '랭크') {
      handleMatchRankType('친선')
    } else {
      handleMatchRankType('랭크')
    }
  }

  return (
    <button
      type="button"
      onClick={handleMatchType}
      className="text-xs relative grid grid-cols-2 w-[200px] rounded-full bg-[#E5E5ED] border border-[5px] border-[#E5E5ED]"
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full transition-all duration-300 z-0 ${
          matchRankType === '랭크' ? 'translate-x-full' : ''
        }`}
      />

      <div
        className={`flex py-2 px-4 gap-2 text-center z-10 transition-colors duration-300
        ${matchRankType === '친선' ? 'font-bold text-[#000000]' : ''}
        `}
      >
        <NormalMatchIcon />
        친선
      </div>
      <div
        className={`flex py-2 px-4 gap-2 text-center  z-10 transition-colors duration-300
        ${matchRankType === '랭크' ? 'font-bold text-[#000000]' : ''}
        `}
      >
        <RankMatchIcon />
        랭크
      </div>
    </button>
  )
}

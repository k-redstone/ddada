import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'
import { PlayerType } from '@/features/manager/types/MatchDataType.ts'
import BronzeIcon from '@/static/imgs/manager/BronzeIcon.svg'
import TangerineFillDot from '@/static/imgs/manager/TangerineFillDot.svg'
import TangerineLightDot from '@/static/imgs/manager/TangerineLightDot.svg'

interface MatchTeamInfoProps {
  player: PlayerType
  team: string
}

export default function MatchTeamInfo({ player, team }: MatchTeamInfoProps) {
  return (
    <div className="grow">
      {player ? (
        <div className="flex gap-x-3 grow">
          <GameUserInfo src={player.image} />
          <div className="flex flex-col gap-y-1 text-sm">
            <p className="flex gap-x-1 items-center">
              <span className="font-bold">[A1] {player.nickname}</span>
              {team === 'A' ? <TangerineLightDot /> : <TangerineFillDot />}
            </p>
            <p className="flex gap-x-1 items-center">
              <BronzeIcon />
              <span>아마추어</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-disabled-dark font-bold text-center grow">
          매칭중...
        </p>
      )}
    </div>
  )
}

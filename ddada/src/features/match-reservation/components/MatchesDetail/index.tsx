import Link from 'next/link'

import MatchTypeButton from '@/features/match-reservation/components/MatchTypeButton/index.tsx'
import { MatchType } from '@/features/match-reservation/types/MatchType.ts'
import MatchBar from '@/static/imgs/match-reservation/match-reservation_match_bar_icon.svg'
import MasterIcon from '@/static/imgs/rank/Master.svg'

interface MatchesDetailProps {
  match: MatchType
}

export default function MatchesDetail({ match }: MatchesDetailProps) {
  const { matchType } = match
  const matchRankType = match.rankType
  const matchDay = match.date
  const changeMatchDay = (Day: string) => {
    return Day.split('-').slice(1).join('.')
  }
  const fixMatchDay = changeMatchDay(matchDay)
  const matchTime = match.time.slice(0, 5)
  const matchCourt = match.court.name
  const matchAddress = match.court.address
  // todo rating 에 따른 이미지와 mmr 텍스트 변경해주기
  // const { rating } = match
  const mmr = '프로페셔널 2'
  const AteamNum = match.team1PlayerCount
  const BteamNum = match.team2PlayerCount

  return (
    <Link href={`/match-reservation/detail/${match.id}`}>
      <div className="flex w-[47.6875rem] h-[7.5rem] rounded-[0.75rem] border flex-col py-2 px-4 gap-2 hover:bg-[#F6F6F6]">
        <div className="text-xs text-[#6B6E78]">
          경기일자 {fixMatchDay} {matchTime}
        </div>
        <div>
          <div className="flex">
            <div className="flex flex-col gap-3 w-[18.75rem]">
              <div>
                <p className="text-base font-bold">{matchCourt}</p>
                <p className="text-sm text-[#6B6E78]">{matchAddress}</p>
              </div>

              <div className="flex gap-1">
                <MatchTypeButton matchType={matchType} />
                <MatchTypeButton matchRankType={matchRankType} />
              </div>
            </div>
            <div className="flex align-center gap-6 text-center flex-grow">
              <div className="flex flex-col justify-center gap-[0.625rem]">
                <p className="text-xl font-bold">{AteamNum}</p>
                <p className="text-xs">A팀(명)</p>
              </div>
              <div className="flex flex-col justify-center">
                <MatchBar />
              </div>
              <div className="flex flex-col justify-center gap-[0.625rem]">
                <p className="text-xl font-bold">{BteamNum}</p>
                <p className="text-xs">B팀(명)</p>
              </div>
            </div>
            <div className="flex justify-end w-[6.25rem]">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-10 h-10 rounded-[1000px]">
                  <MasterIcon />
                </div>
                <p className="text-xs text-center">{mmr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
import MatchTypeButton from '@/features/match-reservation/components/MatchTypeButton/index.tsx'
import MatchBar from '@/static/imgs/match-reservation/match-reservation_match_bar_icon.svg'
import ProfessionalIcon from '@/static/imgs/match-reservation/Professional.svg'

export default function MatchesCards() {
  // todo 이제 이걸 mattch 리스트로 받아서 출력하기
  // todo 여기 전체에 Link 달아서 매치 id를 토해 매치 상세 페이지로 보내기
  const matchType = '혼합복식'
  const matchRankType = '경쟁'
  const matchDay = '2024-09-08'
  const changeMatchDay = (Day: string) => {
    return Day.split('-').slice(1).join('.')
  }
  const fixMatchDay = changeMatchDay(matchDay)
  const matchTime = '10:00'
  const matchCourt = '서울 문화체육관'
  const matchAddress = '서울특별시 강남구 역삼동 2-3'
  const mmr = '프로페셔널 2'
  const AteamNum = 1
  const BteamNum = 2

  return (
    <div className="flex w-[47.6875rem] h-[7.5rem] rounded-[0.75rem] border flex-col py-2 px-4 gap-2">
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
                <ProfessionalIcon />
              </div>
              <p className="text-xs text-center">{mmr}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

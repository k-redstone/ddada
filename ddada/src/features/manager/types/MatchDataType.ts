import {
  EARN_TYPE,
  MATCH_STATUS,
  MATCH_TYPE,
  MISS_TYPE,
} from '@/features/manager/constants/matchConstants.ts'

type PlayerType = {
  id: number
  nickname: string
  gender: 'MALE' | 'FEMALE'
  rating: number
}

type TeamType = {
  id: number
  player1: PlayerType | null
  player2: PlayerType | null
}

type CourtType = {
  id: number
  name: string
  address: string
  status: string
  image: string
  facilities: string[]
  contact_number: string
  description: string
  reservations: Record<string, string[]>
}

type SetType = {
  id: number
  set_number: number
  set_winner_team_number: number
  team1_score: number
  team2_score: number
}

type ManagerType = {
  id: number
  nickname: string
}

type MatchDetailType = {
  id: number
  court: CourtType
  team1: TeamType
  team2: TeamType
  winner_team_number: 1 | 2
  manager: ManagerType
  team1_set_score: number
  team2_set_score: number
  status: MatchStatusType
  rank_type: 'RANK' | 'NORMAL'
  match_type: MatchType
  date: string
  time: string
  sets: SetType[]
}

type PlayerScoreType = {
  score_number: number // 스코어 순번
  earned_member: 11 | 12 | 21 | 22 | null
  missed_member1: 11 | 12 | 21 | 22 | null
  missed_member2: 11 | 12 | 21 | 22 | null
  earned_type: EarnType | null // 득점 유형
  missed_type: MissType | null // 실점 유형
}

type SetResultType = {
  set_number: number // 세트 번호
  set_winner_team_number: 1 | 2 // 해당 세트에서 이긴 팀
  team1_score: number // 팀1의 해당 세트 점수
  team2_score: number // 팀2의 해당 세트 점수
  scores: PlayerScoreType[] // 해당 세트에서의 모든 스코어 기록
}

type MatchReusltStoreType = {
  id: number
  winner_team_number: 1 | 2
  team1_set_score: number
  team2_set_score: number
  sets: SetResultType[]
}

type MatchStatusType = keyof typeof MATCH_STATUS
type MatchType = keyof typeof MATCH_TYPE
type EarnType = keyof typeof EARN_TYPE
type MissType = keyof typeof MISS_TYPE

export type { MatchDetailType, MatchReusltStoreType }

export type MatchStatus =
  | 'CREATED'
  | 'RESERVED'
  | 'PLAYING'
  | 'FINISHED'
  | 'CANCELED'

export type MatchType =
  | 'FEMALE_SINGLE'
  | 'MALE_SINGLE'
  | 'FEMALE_DOUBLE'
  | 'MALE_DOUBLE'
  | 'MIXED_DOUBLE'

export type RankType = 'NORMAL' | 'RANK'

export type MyMatchDetailsType = {
  MyTeamAndNumber: string
  avgRating: number
  gymAddress: string
  gymName: string
  matchDate: string
  matchId: number
  matchStatus: MatchStatus
  matchTime: string
  matchType: MatchType
  myRatingChange: number
  rankType: RankType
}

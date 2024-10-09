import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

export function getTier(rating: number) {
  const tiers = [
    { min: -Infinity, max: 800, tier: '아마추어', tierNum: 1 },
    { min: 800, max: 1000, tier: '아마추어', tierNum: 2 },
    { min: 1000, max: 1200, tier: '아마추어', tierNum: 3 },
    { min: 1200, max: 1400, tier: '세미프로', tierNum: 1 },
    { min: 1400, max: 1600, tier: '세미프로', tierNum: 2 },
    { min: 1600, max: 1800, tier: '세미프로', tierNum: 3 },
    { min: 1800, max: 2000, tier: '프로페셔널', tierNum: 1 },
    { min: 2000, max: 2200, tier: '프로페셔널', tierNum: 2 },
    { min: 2200, max: 2400, tier: '프로페셔널', tierNum: 3 },
    { min: 2400, max: Infinity, tier: '마스터', tierNum: 0 },
  ]
  const currentTier = tiers.find((t) => rating >= t.min && rating < t.max)

  let numTier

  if (currentTier) {
    numTier = currentTier.tier
    if (currentTier.tierNum === 0) {
      numTier = ''
    } else if (currentTier.tierNum === 1) {
      numTier = 'I'
    } else if (currentTier.tierNum === 2) {
      numTier = 'II'
    } else if (currentTier.tierNum === 3) {
      numTier = 'III'
    }
  }
  if (!currentTier) {
    return '루키'
  }
  return currentTier.tier + numTier
}

export function getAverageRating(matchDetailData: MatchDetailType) {
  const averageRating =
    [
      matchDetailData.team1.player1,
      matchDetailData.team1.player2,
      matchDetailData.team2.player1,
      matchDetailData.team2.player2,
    ]
      .filter((player) => player !== null)
      .map((player) => player.rating)
      .reduce((acc, cur) => {
        return acc + cur
      }, 0) /
    [
      matchDetailData.team1.player1,
      matchDetailData.team1.player2,
      matchDetailData.team2.player1,
      matchDetailData.team2.player2,
    ]
      .filter((player) => player !== null)
      .map((player) => player.rating).length

  return averageRating
}

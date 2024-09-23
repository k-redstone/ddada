import { publicAPI } from '@/api/axios.ts'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

export async function fetchMatchDetail(
  matchId: string,
): Promise<MatchDetailType> {
  const res = await publicAPI.get(`/matches/${matchId}`)
  return res.data.result
}

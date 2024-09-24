import { publicAPI, privateAPI } from '@/api/axios.ts'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

export async function fetchMatchDetail(
  matchId: string,
): Promise<MatchDetailType> {
  const res = await publicAPI.get(`/matches/${matchId}`)
  return res.data.result
}

export async function addUserToMatch(matchId: number, teamNumber: number) {
  await privateAPI.patch(`/matches/${matchId}/teams/${teamNumber}`)
}

export async function deleteUserToMatch(matchId: number, teamNumber: number) {
  await privateAPI.delete(`/matches/${matchId}/teams/${teamNumber}`)
}

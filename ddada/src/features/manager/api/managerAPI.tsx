import { publicAPI, privateAPI } from '@/api/axios.ts'

export async function addJudgeToMatch(matchId: number) {
  await privateAPI.patch(`manager/matches/${matchId}`)
}

export async function deleteJudgeToMatch(matchId: number) {
  await privateAPI.delete(`manager/matches/${matchId}}`)
}

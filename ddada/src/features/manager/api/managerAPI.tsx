import { privateAPI } from '@/api/axios.ts'
import { ManagerPk } from '@/features/manager/types/ManagerType.ts'

export async function addJudgeToMatch(matchId: number) {
  await privateAPI.patch(`manager/matches/${matchId}`)
}

export async function deleteJudgeToMatch(matchId: number) {
  await privateAPI.delete(`manager/matches/${matchId}`)
}

export async function fetchManagerPk(): Promise<ManagerPk | null> {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const res = await privateAPI.get('/manager/id')
  return res.data.result
}

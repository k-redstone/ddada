import { privateAPI } from '@/api/axios.ts'
import { GymInfo, GymMatchList } from '@/features/gym/types/GymTypes.ts'

export async function fetchGymInfo(): Promise<GymInfo> {
  const res = await privateAPI.get(`/gym`)
  return res.data.result
}

export async function fetchGymMatchList(): Promise<GymMatchList> {
  const res = await privateAPI.get(`/gym/matches`)
  return res.data.result
}

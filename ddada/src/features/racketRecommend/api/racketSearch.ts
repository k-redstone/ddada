import { publicAPI } from '@/api/axios.ts'
import { RacketDetailType } from '@/features/racketRecommend/types/RacketRecommendType.ts'

export async function fetchRacketSearch(
  keyword: string,
): Promise<RacketDetailType[]> {
  const params = {
    keyword,
  }
  const res = await publicAPI.get('/rackets', { params })
  return res.data.result.rackets
}

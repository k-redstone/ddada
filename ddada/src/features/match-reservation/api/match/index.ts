import { publicAPI } from '@/api/axios.ts'

const getMatchList = async (
  page: number,
  size: number,
  rank_type: string,
  match_types?: string,
  statues?: string,
  keyword?: string,
  regions?: string,
) => {
  const params: {
    keyword?: string
    regions?: string
    rank_type: string
    match_types?: string
    statues?: string
    page: number
    size: number
  } = { rank_type, page, size }

  if (keyword) {
    params.keyword = keyword
  }
  if (regions) {
    params.regions = regions
  }
  if (match_types) {
    params.match_types = match_types
  }
  if (statues) {
    params.statues = statues
  }

  const res = await publicAPI.get('/courts/search', {
    params,
  })
  return res
}

export { getMatchList }

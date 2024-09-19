import { privateAPI, publicAPI } from '@/api/axios.ts'

const getCourtList = async (
  page: number,
  size: number,
  keyword?: string,
  regions?: string,
) => {
  const params: {
    keyword?: string
    regions?: string
    page: number
    size: number
  } = { page, size }

  if (keyword) {
    params.keyword = keyword
  }
  if (regions) {
    params.regions = regions
  }
  const res = await publicAPI.get('/courts/search', {
    params,
  })
  return res
}

const postMatchReservation = async (data: {
  courtId: number
  rankType: string
  matchType: string
  date: string
  time: string
}) => {
  const res = await privateAPI.post('/matches', data)
  return res
}

export { getCourtList, postMatchReservation }

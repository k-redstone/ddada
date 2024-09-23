import { privateAPI } from '@/api/axios.ts'

const loginUserRole = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const userRole = await privateAPI.get('/auth/type')
  return userRole
}

export { loginUserRole }

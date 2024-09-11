import { privateAPI } from '@/api/axios.ts'

// todo 수정필요
const loginUserRole = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  // todo back의 api와 연결
  const userRole = await privateAPI.get('/auth/type')
  return userRole
}

export { loginUserRole }

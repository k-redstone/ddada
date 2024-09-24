import { privateAPI } from '@/api/axios.ts'

const loginUserRole = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const userRole = await privateAPI.get('/auth/type')
  return userRole
}

// todo 로그아웃 http 메서드 변경 예정
const logOut = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  await privateAPI.post('/auth/logout', {
    accessToken,
  })
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('loginType')
  return null
}

export { loginUserRole, logOut }

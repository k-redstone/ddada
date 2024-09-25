import { privateAPI } from '@/api/axios.ts'
import { UserProfile, UserRole } from '@/types/user/index.ts'

// todo 수정필요
const loginUserRole = async (): Promise<UserRole | null> => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  // todo back의 api와 연결
  const res = await privateAPI.get('/auth/type')
  return res.data.result
}

const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  // todo back의 api와 연결
  const res = await privateAPI.get('/player/profile')
  return res.data.result
}

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

export { loginUserRole, logOut, fetchUserProfile }

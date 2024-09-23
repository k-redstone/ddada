import { privateAPI } from '@/api/axios.ts'
import { UserProfile, UserRole } from '@/types/user'

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

export { loginUserRole, fetchUserProfile }

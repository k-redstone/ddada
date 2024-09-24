import { privateAPI } from '@/api/axios.ts'

const loginUserRole = async () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) return null
  const userRole = await privateAPI.get('/auth/type')
  return userRole
}

// const kakaoLogout = async () => {
//   const accessToken = sessionStorage.getItem('accessToken')
//   headers.append('Authorization', `Bearer ${accessToken}`)
//   const res = await fetch('https://kauth.kakao.com/oauth/logout', {
//     method: 'POST',
//     headers,
//   })
//   const data = await res.json()
//   return data
// }

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

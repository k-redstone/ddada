import instance from '@/features/auth/api/axiosModule.ts'

const originLogin = async (email: string, password: string) => {
  const res = await instance.post('/auth/login', {
    email,
    password,
    loginType: 'basic',
  })
  return res
}

const socialLogin = async (authCode: string) => {
  const res = await instance.post('/auth/login', {
    authCode,
    loginType: 'kakao',
  })
  return res
}

// 임시 코드 삭제 필요
const sendRefreshToken = async (refreshToken: string) => {
  const res = await instance.post('/auth/refresh', { refreshToken })
  return res
}

export { sendRefreshToken, socialLogin, originLogin }

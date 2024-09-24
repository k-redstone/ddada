import { publicAPI } from '@/api/axios.ts'

const sendAuthEmail = async (email: string) => {
  const res = await publicAPI.post('/auth/email', {
    email,
  })
  return res
}

const checkAuthCode = async (email: string, authCode: string) => {
  const res = await publicAPI.get('/auth/verify_code', {
    params: {
      userInfo: email,
      certificationCode: authCode,
    },
  })
  return res
}

const resetPassword = async (email: string, password: string) => {
  const res = await publicAPI.post('/auth/reset_password', {
    email,
    password,
  })
  return res
}

export { sendAuthEmail, checkAuthCode, resetPassword }

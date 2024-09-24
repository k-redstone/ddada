import { privateAPI } from '@/api/axios.ts'
import { ProfileEditType } from '@/features/mypage/types/ProfileEditType.ts'
const getProfile = async () => {
  const response = await privateAPI.get('/player/profile')
  return response.data.result
}

const patchDeleteUser = async () => {
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('loginType')
  await privateAPI.patch('/player')
  return null
}

// todo api 수정될 예정

const putProfileEdit = async (data: ProfileEditType) => {
  const formData = new FormData()
  formData.append('nickname', data.nickname)
  formData.append('introduction', data.introduction)
  if (data.profilePicture) {
    formData.append('profilePicture', data.profilePicture)
  } else {
    formData.append('profilePicture', '')
  }
  const res = await privateAPI.put('/player/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data.result
}

export { getProfile, patchDeleteUser, putProfileEdit }

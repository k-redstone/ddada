'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import {
  getProfile,
  putProfileEdit,
} from '@/features/mypage/api/mypage/index.ts'
import UpLoadImage from '@/static/imgs/auth/signup/imageUpload_icon.svg'
import Logo from '@/static/imgs/logo.svg'
import ProfileEditLogo from '@/static/imgs/mypage/mypage-profile-edit.png'

interface ProfileEditType {
  profilePicture: File | null
  email: string
  nickname: string
  phoneNumber: string
  introduction: string
}

export default function ProfileEdit() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: false,
  })

  const [payload, setPayload] = useState<ProfileEditType>({
    profilePicture: null,
    email: '',
    nickname: '',
    phoneNumber: '',
    introduction: '',
  })
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  )
  const [defaultImage, setDefaultImage] = useState<boolean>(true)
  const [imageError, setImageError] = useState<string>('')
  const [nickName, setNickName] = useState<string>(data.nickname)
  const [nicknameError, setNicknameError] = useState<string>('')
  const [nickNameLength, setNickNameLength] = useState<number>(
    data.nickname.length,
  )
  // todo api로 받은 한줄 소개값넣기
  const [introduction, setIntroduction] = useState<string>('')
  const [introductionLength, setIntroductionLength] = useState<number>(0)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const validFileTypes = ['image/png', 'image/jpeg', 'image/gif']
      const maxSizeMB = 2

      if (!validFileTypes.includes(file.type)) {
        setImageError(
          '지원되지 않는 파일 형식입니다. PNG, JPEG, GIF만 지원됩니다.',
        )
        return
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setImageError('파일 크기가 2MB를 초과합니다.')
        return
      }
      setImageError('')
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setDefaultImage(false)
        setPayload({
          ...payload,
          profilePicture: file,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = () => {
    setProfileImage(undefined)
    setDefaultImage(true)
  }

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    if (inputValue.length > 21) {
      setNicknameError('닉네임은 20자 이하로 입력해주세요.')
      return
    }
    setNickName(inputValue)
    setNickNameLength(event.target.value.length)
    setNicknameError('')
    setPayload({
      ...payload,
      nickname: event.target.value,
    })
  }

  const handleIntroduction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    if (inputValue.length > 80) {
      return
    }
    setIntroduction(inputValue)
    setIntroductionLength(event.target.value.length)
    setPayload({
      ...payload,
      introduction: event.target.value,
    })
  }

  // todo api 수정될예정
  const sendProfileEdit = async () => {
    const res = await putProfileEdit(payload)
    console.log(res)
  }
  return (
    <div className="flex flex-col gap-6">
      <Image src={ProfileEditLogo} alt="mypage-profile-edit" />
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">내 프로필</p>
        <button
          type="button"
          onClick={sendProfileEdit}
          className="bg-[#FCA211] text-[#FFFBEA] py-2 px-3 rounded"
        >
          변경사항 저장
        </button>
      </div>
      <div className="text-sm">
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div>
          <div className="flex gap-[1.5rem]">
            <div className="flex justify-center items-center rounded-full bg-[#F6F6F6] h-[5rem] w-[5rem] overflow-hidden">
              {defaultImage ? (
                <Logo />
              ) : (
                <img
                  src={profileImage}
                  alt="프로필 사진"
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="grid gap-4 mb-[3.625rem]">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl border border-[#E5E5ED] text-[#6B6E78]"
                  onClick={() =>
                    document.getElementById('profilePicture')?.click()
                  }
                >
                  <div className="flex justify-center items-center">
                    <div className="mr-[0.625rem]">
                      <UpLoadImage className="fill" />
                    </div>
                    <p>이미지 변경</p>
                  </div>
                </button>
                {profileImage && (
                  <button
                    type="button"
                    className="text-[#DC3545] rounded-[0.75rem] border border-[#DC3545] px-[1.5rem] py-[0.75rem]"
                    onClick={handleImageDelete}
                  >
                    삭제
                  </button>
                )}
              </div>
              <div>
                <p className="text-[#6B6E78] text-sm">
                  .png, .jpeg, .gif 파일은 최대 2MB까지 지원합니다.
                </p>
                {imageError && <p className="text-[#DC3545]">{imageError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="w-[7.5rem] font-bold">이메일</p>
        <div className="px-6 py-3 text-[#6B6E78] bg-[#F6F6F6] flex-grow rounded-xl border">
          {/* todo api로 받은 이메일 값 */}
          jth12109@gmail.com
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="w-[7.5rem]">닉네임</p>
        <div className="flex-grow">
          <div className="flex justify-between px-6 py-3 text-[#6B6E78] flex-grow rounded-xl border">
            <input
              type="text"
              className="flex-grow focus:outline-none"
              maxLength={19}
              value={nickName}
              onChange={handleNickname}
            />
            <div className="">{nickNameLength}/20</div>
          </div>
          {nicknameError && <p className="text-[#DC3545]">{nicknameError}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="w-[7.5rem] font-bold">휴대폰 번호</p>
        <div className="px-6 py-3 text-[#6B6E78] bg-[#F6F6F6] flex-grow rounded-xl border">
          {/* todo api로 받은 휴대폰 값 */}
          010-1234-5678
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="w-[7.5rem]">한줄 소개</p>
        <div className="flex justify-between px-6 py-3 text-[#6B6E78] flex-grow rounded-xl border">
          <input
            type="text"
            className="flex-grow focus:outline-none"
            maxLength={79}
            value={introduction}
            onChange={handleIntroduction}
          />
          <div className="">{introductionLength}/80</div>
        </div>
      </div>
    </div>
  )
}

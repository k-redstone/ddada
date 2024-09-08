/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { signupSubmit } from '@/features/auth/api/signup/index.ts'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import CheckIcon from '@/static/imgs/auth/signup/checked_circle_icon.svg'
import FemaleIcon from '@/static/imgs/auth/signup/female.svg'
import UpLoadImage from '@/static/imgs/auth/signup/imageUpload_icon.svg'
import MaleIcon from '@/static/imgs/auth/signup/male.svg'
import Logo from '@/static/imgs/logo.svg'

interface SignUpStep3Props {
  changeViewStep: (viewStep: SignUpStepType) => void
}

export default function SignUpStep3({ changeViewStep }: SignUpStep3Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormData>()

  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  )
  const [defaultImage, setDefaultImage] = useState<boolean>(true)
  const [maleChecked, setMaleChecked] = useState<boolean>(false)
  const [femaleChecked, setFemaleChecked] = useState<boolean>(false)
  const [isNextStepEnabled, setIsNextStepEnabled] = useState<boolean>(false)
  const profilePicture = watch('profilePicture')
  const gender = watch('gender')
  useEffect(() => {
    if (profilePicture && gender && Object.keys(errors).length === 0) {
      setIsNextStepEnabled(true)
    } else {
      setIsNextStepEnabled(false)
    }
  }, [profilePicture, gender])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      // 파일 크기 및 형식 검사
      const validFileTypes = ['image/png', 'image/jpeg', 'image/gif']
      const maxSizeMB = 2

      if (!validFileTypes.includes(file.type)) {
        setError('profilePicture', {
          type: 'manual',
          message:
            '지원되지 않는 파일 형식입니다. PNG, JPEG, GIF만 지원됩니다.',
        })
        return
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError('profilePicture', {
          type: 'manual',
          message: '파일 크기가 2MB를 초과합니다.',
        })
        return
      }
      clearErrors('profilePicture')
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setDefaultImage(false)
        setValue('profilePicture', file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = () => {
    setProfileImage(undefined)
    setDefaultImage(true)
  }
  const handleMaleGender = () => {
    setValue('gender', 'male')
    setMaleChecked(true)
    setFemaleChecked(false)
  }

  const handleFeMaleGender = () => {
    setValue('gender', 'female')
    setFemaleChecked(true)
    setMaleChecked(false)
  }

  const signUpFinished = async (data: SignUpFormData) => {
    // todo 백에다가 회원가입 요청 보내기
    const payload = {
      nickname: data.nickname,
      email: data.email,
      gender: data.gender,
      profileImage: data.profilePicture,
      birthYear: data.birthYear,
      password: data.password,
      phoneNumber: data.phoneNumber,
      description: data.introduction,
    }
    // todo 리턴값 보고 수정필요
    const res = await signupSubmit(payload)
    sessionStorage.setItem('accessToken', res.data.accessToken)
    sessionStorage.setItem('refreshToken', res.data.refreshToken)
    changeViewStep(SignUpStepType.step4)
  }
  const profilePictureRegister = register('profilePicture', {})

  const genderRegister = register('gender', {
    required: { value: true, message: '성별을 선택해주세요.' },
  })

  const introductionRegister = register('introduction', {})

  return (
    <>
      <div className="text-sm">
        <label htmlFor="profilePicture">
          <p className="text-[#6B6E78]">프로필 사진</p>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="hidden"
            {...profilePictureRegister}
            onChange={handleImageUpload}
          />
        </label>
        <div>
          <div className="flex gap-[1.5rem]">
            <div className="flex justify-center items-center rounded-full bg-[#F6F6F6] h-[150px] w-[150px] overflow-hidden">
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

            <div className="grid gap-4 mb-[58px]">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-[1.5rem] py-[0.75rem] rounded-[0.75rem] border border-[#E5E5ED] text-[#6B6E78]"
                  onClick={() =>
                    document.getElementById('profilePicture')?.click()
                  }
                >
                  <div className="flex">
                    <div className="mr-[0.625rem]">
                      <UpLoadImage className="fill" />
                    </div>
                    <p>이미지 업로드</p>
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
                <p>.png, .jpeg, .gif 파일은 최대 2MB까지 지원합니다.</p>
                {errors.profilePicture && (
                  <p className="text-[#DC3545]">
                    {errors.profilePicture.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm">
        <label htmlFor="gender">
          <p className="text-[#6B6E78]">성별</p>
          <input
            type="text"
            id="gender"
            {...genderRegister}
            className="hidden"
          />
        </label>

        <div className="flex gap-2">
          <div
            className={`relative flex-col justify-center items-center border rounded-[0.75rem] ${
              maleChecked ? 'border-[#FCA211]' : 'border-[#E5E5ED]'
            }`}
          >
            {maleChecked && (
              <CheckIcon className="absolute top-4 right-[1.4375rem]" />
            )}
            <button type="button" onClick={handleMaleGender}>
              <div className="p-6">
                <MaleIcon />
                <p className="text-center text-[#6B6E78]">남성</p>
              </div>
            </button>
          </div>
          <div
            className={`relative flex-col justify-center items-center border rounded-[0.75rem] ${
              femaleChecked ? 'border-[#FCA211]' : 'border-[#E5E5ED]'
            }`}
          >
            {femaleChecked && (
              <CheckIcon className="absolute top-4 right-[1.4375rem]" />
            )}
            <button type="button" onClick={handleFeMaleGender}>
              <div className="p-6">
                <FemaleIcon />
                <p className="text-center text-[#6B6E78]">여성</p>
              </div>
            </button>
          </div>
        </div>
        {errors.gender && (
          <p className="text-[#DC3545]">{errors.gender.message}</p>
        )}
      </div>

      <div className="text-sm">
        <label htmlFor="introduction">
          <p className="text-[#6B6E78]">(선택) 한줄 소개</p>
          <div
            className={`flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211] 
              ${errors.email ? 'border-[#DC3545]' : ''}`}
          >
            <input
              type="text"
              id="introduction"
              placeholder="간략한 한 줄 소개를 남겨보세요."
              className="w-full focus:outline-none"
              autoComplete="new-email"
              {...introductionRegister}
            />
          </div>
          {errors.email && (
            <p className="text-[#DC3545]">{errors.email.message}</p>
          )}
        </label>
      </div>
      <button
        type="button"
        onClick={handleSubmit(signUpFinished)}
        className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
          isNextStepEnabled
            ? 'bg-[#FCA211] text-white cursor-pointer'
            : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
        }`}
        disabled={!isNextStepEnabled}
      >
        회원가입
      </button>
    </>
  )
}

'use client'

import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
interface SignUpStep2Props {
  changeViewStep: (viewStep: SignUpStepType) => void
  submitFormData: SignUpFormData
  setSubmitFormData: (submitFormData: SignUpFormData) => void
}

export default function SignUpStep2({
  changeViewStep,
  submitFormData,
  setSubmitFormData,
}: SignUpStep2Props) {
  const {
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext<SignUpFormData>()

  const nickName = watch('nickname')
  const phoneNumber = watch('phoneNumber')

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState<boolean>(false)

  const handleVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handleConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility)
  }

  // todo 백에다가 닉네임 중복체크 api
  const handleCheckNickName = () => {
    console.log('닉네임 중복체크')
  }

  // 백에다가 전화번호 인증받기
  const handleCheckPhoneNumber = () => {
    console.log('전화번호 인증받기')
  }
  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '이메일 형식이 올바르지 않습니다',
    },
  })
  const passwordRegister = register('password', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  })
  const passwordConFirmRegister = register('confirmPassword', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },

    validate: (value) =>
      value === watch('password') || '비밀번호가 일치하지 않아요를레이이후.',
  })

  const nicknameRegister = register('nickname', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    maxLength: {
      value: 20,
      message: '닉네임은 20자 이하로 입력해주세요.',
    },
  })

  const phoneNumberRegister = register('phoneNumber', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value: /^(010)(\d{4})(\d{4})$/,
      message: '전화번호 형식을 확인해주세요.',
    },
  })
  const birthYearRegister = register('birthYear', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    // 생년월일을 입력받음
    pattern: {
      value:
        /^(19[0-9][0-9]|20[0-2][0-9]|2030)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
      message: '생년월일 형식을 확인해주세요.',
    },
  })
  return (
    <>
      <div className="text-sm">
        <label htmlFor="email">
          <p className="text-[#6B6E78]">이메일</p>
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
              className="w-full focus:outline-none"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...emailRegister}
            />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>
      </div>
      <div className="text-sm">
        <label htmlFor="password">
          <p className="text-[#6B6E78]">비밀번호</p>
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            <input
              type={passwordVisibility ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full focus:outline-none"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...passwordRegister}
            />

            <button type="button" onClick={handleVisibility} className="ml-2">
              {passwordVisibility ? (
                <PasswordVisible className="cursor-pointer" />
              ) : (
                <PasswordUnVisible className="cursor-pointer" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>
      </div>
      <div className="text-sm">
        <label htmlFor="confirmPassword">
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            <input
              type={passwordConfirmVisibility ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="w-full focus:outline-none"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...passwordConFirmRegister}
            />

            <button
              type="button"
              onClick={handleConfirmVisibility}
              className="ml-2"
            >
              {passwordConfirmVisibility ? (
                <PasswordVisible className="cursor-pointer" />
              ) : (
                <PasswordUnVisible className="cursor-pointer" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </label>
      </div>

      <div className="text-sm ">
        <label htmlFor="nickname">
          <p className="text-[#6B6E78]">닉네임</p>
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            {/* <div className="flex items-center border rounded-xl px-4 py-2 h-[3.875rem] focus-within:ring-1 focus-within:ring-[#FCA211]"> */}
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해주세요. (최대 20자)"
              className="w-full focus:outline-none"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...nicknameRegister}
            />
          </div>
          {errors.nickname && (
            <p className="text-red-500">{errors.nickname.message}</p>
          )}
        </label>
        <button
          type="button"
          onClick={() => handleCheckNickName()}
          className={`px-[1.5rem] py-[1.3125rem] rounded-xl ${
            nickName && !errors.nickname
              ? 'bg-[#FCA211] text-white cursor-pointer'
              : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
          }`}
          disabled={!nickName}
        >
          중복체크
        </button>
      </div>
      <div className="text-sm">
        <label htmlFor="phoneNumber">
          <p className="text-[#6B6E78]">휴대폰번호</p>
          <div className="flex">
            <select className=" border rounded-xl px-6 py-[1.3125rem] mr-[0.25rem]  focus-within:ring-1 focus-within:ring-[#FCA211]">
              <option>+82</option>
              <option>+81</option>
            </select>
            <div className="flex w-full items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
              <input
                type="text"
                id="phoneNumber"
                placeholder="숫자만 입력해주세요."
                className="w-full focus:outline-none"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...phoneNumberRegister}
              />
            </div>
          </div>
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </label>
        <button
          type="button"
          onClick={() => handleCheckPhoneNumber()}
          className={`px-[1.5rem] py-[1.3125rem] rounded-xl ${
            phoneNumber && !errors.phoneNumber
              ? 'bg-[#FCA211] text-white cursor-pointer'
              : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
          }`}
          disabled={!phoneNumber}
        >
          인증번호받기
        </button>
      </div>
      <div className="text-sm ">
        <label htmlFor="birthYear">
          <p className="text-[#6B6E78]">생년월일</p>
          <div className="flex items-center border rounded-xl px-4 py-[1.3125rem] focus-within:ring-1 focus-within:ring-[#FCA211]">
            <input
              type="text"
              id="birthYear"
              placeholder="연도. 월. 일"
              className="w-full focus:outline-none"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...birthYearRegister}
            />
          </div>
          {errors.birthYear && (
            <p className="text-red-500">{errors.birthYear.message}</p>
          )}
        </label>
      </div>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step3)}
      >
        test{' '}
      </button>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import PasswordUnVisible from '@/static/imgs/auth/auth_password_unvisible_icon.svg'
import PasswordVisible from '@/static/imgs/auth/auth_password_visible_icon.svg'
import KakaoLogo from '@/static/imgs/auth/kakao_logo.svg'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [passwordExists, setPasswordExists] = useState<boolean>(false)
  const [emailExists, setEmailExists] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [axiosError, setAxiosError] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()

  const emailRegister = register('email', {
    required: { value: true, message: '' },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  })

  const handleVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handlePasswordExists = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setPasswordExists(true)
    } else {
      setPasswordExists(false)
    }
    if (emailExists && event.target.value.length > 0) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }

  const handleLoginVisibility = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value.length > 0) {
      setEmailExists(true)
    } else {
      setEmailExists(false)
    }
    if (passwordVisibility && event.target.value.length > 0) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }

  const loginSubmit = (data: LoginForm) => {
    // todo 백엔드로 axios 요청 보내기
    console.log(data)
    setAxiosError(true)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="min-w-[544px]">
        <p className="text-4xl font-bold text-center mb-[70px]">
          따다에 가입하세요
        </p>
        <div className="bg-white">
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="grid gap-4 px-10"
          >
            <div className="text-sm">
              <label htmlFor="email">
                이메일
                <div className="flex items-center border rounded-xl px-4 py-2 h-[3.875rem] focus-within:ring-1 focus-within:ring-[#FEE500]">
                  <input
                    type="text"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                    className="w-full focus:outline-none"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...emailRegister}
                    onChange={handleLoginVisibility}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="password">
                비밀번호
                <div className="flex items-center border rounded-xl px-4 py-2 h-[3.875rem] focus-within:ring-1 focus-within:ring-[#FEE500]">
                  <input
                    type={passwordVisibility ? 'text' : 'password'}
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full focus:outline-none"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...passwordRegister}
                    onChange={handlePasswordExists}
                  />

                  {passwordExists && (
                    <button
                      type="button"
                      onClick={handleVisibility}
                      className="ml-2"
                    >
                      {passwordVisibility ? (
                        <PasswordVisible className="cursor-pointer" />
                      ) : (
                        <PasswordUnVisible className="cursor-pointer" />
                      )}
                    </button>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {axiosError && (
                  <p className="text-red-500">
                    잘못된 이메일 또는 비밀번호입니다.
                  </p>
                )}
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="reset-password"
                className="text-gray-700 hover:text-black"
              >
                비밀번호를 잊어버리셨나요?
              </Link>
              <button
                type="submit"
                className={`h-[3.875rem] w-full mt-3 rounded-xl ${
                  isButtonEnabled && !isSubmitting
                    ? 'bg-[#FEE500] text-black cursor-pointer'
                    : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                }`}
                disabled={!isButtonEnabled || isSubmitting}
              >
                로그인
              </button>
            </div>
            <div className="text-sm">
              <div className="flex justify-center items-center">
                <div className="grow border-t" />
                <span className="mx-2">또는</span>
                <div className="grow border-t" />
              </div>
              <button
                type="button"
                className="h-[3.875rem] w-full bg-[#FEE500] text-gray-700 py-2 rounded-xl flex items-center justify-center relative mt-3"
              >
                <KakaoLogo className="absolute left-[10px]" />
                카카오 로그인
              </button>
            </div>
            <p className="text-sm text-center">
              아직 계정이 없으신가요?{' '}
              <Link href="signup/" className="text-[#FEE500]">
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

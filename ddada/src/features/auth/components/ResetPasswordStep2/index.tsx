'use client'

/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  checkAuthCode,
  sendAuthEmail,
} from '@/features/auth/api/resetPassword/index.ts'
import { ResetPasswordStepType } from '@/features/auth/types/ResetPasswordType.ts'

interface ResetPasswordStep2Props {
  changeViewStep: (viewStep: ResetPasswordStepType) => void
  email: string
}

interface VerificationCodeForm {
  code: string[]
}

const authEmailReSend = async (email: string, resetTimer: () => void) => {
  const res = await sendAuthEmail(email)
  toast.success('인증번호를 재전송했습니다.')
  resetTimer()
  console.log(res)
}

export default function ResetPasswordStep2({
  changeViewStep,
  email,
}: ResetPasswordStep2Props) {
  const [authCodeCheck, setAuthCodeCheck] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<number>(180) // 3분 = 180초
  const [isExpired, setIsExpired] = useState<boolean>(false)

  const { handleSubmit, control, setValue, watch, reset } =
    useForm<VerificationCodeForm>({
      defaultValues: {
        code: ['', '', '', '', '', ''],
      },
      mode: 'onChange',
    })

  const codeFields = watch('code')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // 인증 코드 제출 함수
  const onSubmit = (data: VerificationCodeForm) => {
    if (isExpired) {
      setErrorMessage('만료된 인증번호입니다.')
      reset({ code: ['', '', '', '', '', ''] })
      setAuthCodeCheck(false)
      return
    }

    const verificationCode = data.code.join('')
    checkAuthCode(email, verificationCode).then((res) => {
      if (res.data.code === '200') {
        console.log(res)
        // todo : 비밀번호 변경 페이지로 이동
        changeViewStep(ResetPasswordStepType.step3)
      } else {
        setErrorMessage('잘못된 인증번호입니다.')
        reset({ code: ['', '', '', '', '', ''] })
        setAuthCodeCheck(false)
      }
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (value.length === 1 || value === '') {
      setValue(`code.${index}`, value)
    }

    if (codeFields.join('').length === 6) {
      setAuthCodeCheck(true)
    } else {
      setAuthCodeCheck(false)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && codeFields[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // 타이머 설정 및 관리
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timeLeft > 0 && !isExpired) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setIsExpired(true)
      setAuthCodeCheck(false)
    }

    return () => clearTimeout(timer)
  }, [timeLeft, isExpired])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimeLeft(180)
    setIsExpired(false)
    setErrorMessage('')
  }

  return (
    <div className="min-w-[34rem] mt-[7.4013rem]">
      <div className="mb-[5.25rem] text-center">
        <p className="text-4xl font-bold text-[#2D2541]">
          인증번호를 보내드렸어요
        </p>
        <p className="mb-[1.25rem] text-[#6B6E78]">
          이메일을 받지 못하셨나요?
          <button
            type="button"
            className="text-[#FCA211] underline"
            onClick={() => authEmailReSend(email, resetTimer)}
          >
            이곳을 클릭하세요
          </button>
        </p>
      </div>
      <div className="bg-white max-w-[34rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 px-10">
          <div className="text-sm">
            <p className="text-[#FCA211] mb-4 text-center font-bold">
              {formatTime(timeLeft)}
            </p>
            <div className="flex gap-1 h-[100px]">
              {Array.from({ length: 6 }).map((_, index) => (
                <Controller
                  key={`${email + index}`}
                  name={`code.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={1}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      value={field.value || ''}
                      className={`w-full border text-center text-5xl font-bold rounded-xl focus:outline-none focus:border-[#FCA211]
                        ${field.value ? 'border-[#FCA211]' : 'border-[#E5E5ED]'}`}
                    />
                  )}
                />
              ))}
            </div>
            {errorMessage && (
              <p className="text-[#DC3545] text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className={`py-[1.1875rem] w-full mt-3 rounded-xl
            ${authCodeCheck && !isExpired ? 'bg-[#FCA211] text-white cursor-pointer' : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'}`}
            disabled={!authCodeCheck || isExpired}
          >
            계속하기
          </button>
        </form>
      </div>
    </div>
  )
}

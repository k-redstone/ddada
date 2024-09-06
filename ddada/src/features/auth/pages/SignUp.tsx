'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import SignUpBranch from '@/features/auth/pages/SignUpBranch.tsx'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import Progress1 from '@/static/imgs/auth/signup/progress/signup_progress_step1.svg'
import Progress2 from '@/static/imgs/auth/signup/progress/signup_progress_step2.svg'
import Progress3 from '@/static/imgs/auth/signup/progress/signup_progress_step3.svg'
import Progress4 from '@/static/imgs/auth/signup/progress/signup_progress_step4.svg'
import GoBeforeArrow from '@/static/imgs/auth/signup/signup_goBeforepage_icon.svg'

const signUpSubmit: SubmitHandler<SignUpFormData> = (data) => {
  alert('회원가입 데이타 보내기 성공')
  console.log(data)
}

export default function SignUp() {
  const [viewStep, setViewStep] = useState<SignUpStepType>(SignUpStepType.step1)
  const [submitFormData, setSubmitFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    profilePicture: undefined,
    gender: '',
    introduction: '',
  })
  const methods = useForm<SignUpFormData>({
    mode: 'all',
  })
  const { handleSubmit } = methods
  const router = useRouter()

  const handleViewStep = () => {
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className=" absolute top-[1.2138rem] left-0">
          <button type="button" className="flex" onClick={handleViewStep}>
            <GoBeforeArrow className="m-[0.125rem]" />
            <p className="text-sm">이전으로 돌아가기</p>
          </button>
        </div>
        <div className="min-w-[34rem]  mt-[7.4013rem]">
          <div className="mb-[5.25rem] text-center">
            <p className="text-4xl font-bold">따다 회원가입</p>
            <p className="mb-[1.25rem]">가입하고 간단하게 배드민턴 즐기기</p>
            {viewStep === SignUpStepType.step1 && <Progress1 />}
            {viewStep === SignUpStepType.step2 && <Progress2 />}
            {viewStep === SignUpStepType.step3 && <Progress3 />}
            {viewStep === SignUpStepType.step4 && <Progress4 />}
          </div>
          <div className="bg-white">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(signUpSubmit)}
                className="grid gap-4"
              >
                <SignUpBranch
                  viewStep={viewStep}
                  changeViewStep={setViewStep}
                  submitFormData={submitFormData}
                  setSubmitFormData={setSubmitFormData}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

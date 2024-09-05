'use client'

import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import SignUpBranch from '@/features/auth/pages/SignUpBranch.tsx'
import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'

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

  const methods = useForm<SignUpFormData>()
  const { handleSubmit } = methods

  return (
    <div className="flex items-center justify-center mt-[7.4013rem]">
      <div className="min-w-[544px]">
        <div className="mb-[70px] text-center">
          <p className="text-4xl font-bold">따다 회원가입</p>
          <p>가입하고 간단하게 배드민턴 즐기기</p>
        </div>
        <div className="bg-white">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(signUpSubmit)}
              className="grid gap-4 px-10"
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
  )
}

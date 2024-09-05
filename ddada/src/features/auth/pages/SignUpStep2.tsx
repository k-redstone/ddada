import { useFormContext } from 'react-hook-form'

import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'

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
  } = useFormContext<SignUpFormData>()
  const email = watch()
  console.log(email)
  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '이메일 형식이 올바르지 않습니다',
    },
  })
  return (
    <>
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
            />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
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

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
  const email = watch('email')
  console.log(email)
  return (
    <>
      <p>스탭2</p>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step3)}
      >
        test{' '}
      </button>
    </>
  )
}

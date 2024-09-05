import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'

interface SignUpStep4Props {
  changeViewStep: (viewStep: SignUpStepType) => void
  submitFormData: SignUpFormData
  setSubmitFormData: (submitFormData: SignUpFormData) => void
}

export default function SignUpStep4({
  changeViewStep,
  submitFormData,
  setSubmitFormData,
}: SignUpStep4Props) {
  console.log(submitFormData.email)
  return (
    <>
      <p>스탭4</p>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step1)}
      >
        test{' '}
      </button>
    </>
  )
}

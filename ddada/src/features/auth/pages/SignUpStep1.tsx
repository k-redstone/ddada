import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'

interface SignUpStep1Props {
  changeViewStep: (viewStep: SignUpStepType) => void
  submitFormData: SignUpFormData
  setSubmitFormData: (submitFormData: SignUpFormData) => void
}

export default function SignUpStep1({
  changeViewStep,
  submitFormData,
  setSubmitFormData,
}: SignUpStep1Props) {
  console.log(submitFormData.email)
  return (
    <>
      <p>스탭1</p>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step2)}
      >
        test{' '}
      </button>
    </>
  )
}

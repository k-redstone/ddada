export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  nickname: string
  phoneNumber: string
  birthYear: string
  birthMonth?: string
  birthDay?: string
  profilePicture?: File
  gender: string
  introduction?: string
}

export enum SignUpStepType {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
}

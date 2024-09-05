import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import { useFormContext } from 'react-hook-form'
import React, { useState } from 'react'
import Logo from '@/static/imgs/logo.svg'
interface SignUpStep3Props {
  changeViewStep: (viewStep: SignUpStepType) => void
  submitFormData: SignUpFormData
  setSubmitFormData: (submitFormData: SignUpFormData) => void
}

export default function SignUpStep3({
  changeViewStep,
  submitFormData,
  setSubmitFormData,
}: SignUpStep3Props) {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<SignUpFormData>()

  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  )
  const [defaultImage, setDefaultImage] = useState<boolean>(true)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setDefaultImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = () => {
    setProfileImage(undefined)
    setDefaultImage(true)
  }

  const profilePictureRegister = register('profilePicture', {
    required: { value: true, message: '프로필 사진을 등록해주세요.' },
  })

  return (
    <>
      <div className="text-sm">
        <label htmlFor="profilePicture">
          <p className="text-[#6B6E78]">프로필</p>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="hidden"
            {...profilePictureRegister}
            onChange={handleImageUpload}
            disabled={false}
          />
          <div>
            <div className="flex">
              <div>
                {defaultImage ? (
                  <Logo />
                ) : (
                  <img
                    src={profileImage}
                    alt="프로필 사진"
                    className="w-24 h-24 rounded-full"
                  />
                )}
              </div>
              <div>
                {profileImage && (
                  <button type="button" onClick={handleImageDelete}>
                    삭제
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('profilePicture')?.click()
                  }
                >
                  업로드
                </button>
              </div>
            </div>
            {errors.profilePicture && (
              <p className="text-[#DC3545]">{errors.profilePicture.message}</p>
            )}
          </div>
        </label>
      </div>
      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step4)}
      >
        다음
      </button>
    </>
  )
}

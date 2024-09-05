import { useState, useEffect } from 'react'

import {
  SignUpFormData,
  SignUpStepType,
} from '@/features/auth/types/SignUpType.ts'
import CheckedBox from '@/static/imgs/auth/signup/signup_checkedBox_icon.svg'
import UnCheckedBox from '@/static/imgs/auth/signup/signup_unCheckedBox_icon.svg'
import TOSArrow from '@/static/imgs/auth/signup/signup_TOS_arrow.svg'

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
  const [allCheck, setAllCheck] = useState(false)
  const [checkAge, setCheckAge] = useState(false)
  const [checkTos, setCheckTos] = useState(false)
  const [checkService, setCheckService] = useState(false)
  const [checkPersonal, setCheckPersonal] = useState(false)
  const [checkMarketing, setCheckMarketing] = useState(false)

  const [isNextStepEnabled, setIsNextStepEnabled] = useState<boolean>(false)

  const handleAllCheck = () => {
    setAllCheck(!allCheck)
    setCheckAge(!allCheck)
    setCheckTos(!allCheck)
    setCheckService(!allCheck)
    setCheckPersonal(!allCheck)
    setCheckMarketing(!allCheck)
  }

  useEffect(() => {
    if (checkAge && checkTos && checkService && checkPersonal) {
      setIsNextStepEnabled(true)
    } else {
      setIsNextStepEnabled(false)
    }
  }, [checkAge, checkTos, checkService, checkPersonal])
  return (
    <>
      <button
        type="button"
        className="flex font-bold"
        onClick={() => handleAllCheck()}
      >
        {allCheck && <CheckedBox />}
        {!allCheck && <UnCheckedBox />}
        <p className="ml-2.5">전체 동의</p>
      </button>

      <div className="grow border-t" />

      <button
        type="button"
        className="flex"
        onClick={() => setCheckAge(!checkAge)}
      >
        {checkAge && <CheckedBox />}
        {!checkAge && <UnCheckedBox />}
        <p className="ml-2.5 font-[#6B6E78]">[필수] 만 14세 이상입니다.</p>
      </button>
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckTos(!checkTos)}
        >
          {checkTos && <CheckedBox />}
          {!checkTos && <UnCheckedBox />}
          <p className="ml-2.5 font-[#6B6E78]">[필수] 따다 이용약관 동의</p>
        </button>
        <button type="button">
          <TOSArrow />
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckService(!checkService)}
        >
          {checkService && <CheckedBox />}
          {!checkService && <UnCheckedBox />}
          <p className="ml-2.5 font-[#6B6E78]">
            [필수] 따다 서비스 이용약관 동의
          </p>
        </button>
        <button type="button">
          <TOSArrow />
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="flex"
          onClick={() => setCheckPersonal(!checkPersonal)}
        >
          {checkPersonal && <CheckedBox />}
          {!checkPersonal && <UnCheckedBox />}
          <p className="ml-2.5 font-[#6B6E78]">
            [필수] 따다 개인정보 수집 및 이용 동의
          </p>
        </button>
        <button type="button">
          <TOSArrow />
        </button>
      </div>

      <button
        type="button"
        className="flex"
        onClick={() => setCheckMarketing(!checkMarketing)}
      >
        {checkMarketing && <CheckedBox />}
        {!checkMarketing && <UnCheckedBox />}
        <p className="ml-2.5 font-[#6B6E78]">
          [선택] 마케팅 및 프로모션 수신 동의
        </p>
      </button>

      <button
        type="button"
        onClick={() => changeViewStep(SignUpStepType.step2)}
        className={`py-[1.1875rem] w-full mt-3 rounded-xl ${
          isNextStepEnabled
            ? 'bg-[#FCA211] text-white cursor-pointer'
            : 'bg-[#E5E5ED] text-[#6B6E78] cursor-not-allowed'
        }`}
        disabled={!isNextStepEnabled}
      >
        다음단계{' '}
      </button>
    </>
  )
}

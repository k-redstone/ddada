import Link from 'next/link'

import GoBeforeArrow from '@/static/imgs/auth/signup/signup_goBeforepage_icon.svg'

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className=" absolute top-[1.2138rem] left-0">
          <Link href="/login" type="button" className="flex">
            <GoBeforeArrow className="m-[0.125rem]" />
            <p className="text-sm">이전으로 돌아가기</p>
          </Link>
        </div>
        <div className="min-w-[34rem]  mt-[7.4013rem]">
          <div className="mb-[5.25rem] text-center">
            <p className="text-4xl font-bold text-[#2D2541]">
              비밀번호를 잊으셨나요?
            </p>
            <p className="mb-[1.25rem] text-[#6B6E78]">
              괜찮아요, 저희가 찾아드릴게요
            </p>
          </div>
          <div className="bg-white">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'

import Logo from '@/static/imgs/logo.svg'
import CalendarIcon from '@/static/imgs/main/CalendarIcon.svg'

export default function MainHeader() {
  const [currentNav, setCurrentNav] = useState<number>(-1)
  return (
    <div className="px-4 flex gap-x-[0.625rem] py-[0.625rem]">
      {/* logo */}
      <div className="flex gap-x-3 items-center">
        <Logo />
        <h1 className="text-2xl font-bold">DDADA</h1>
      </div>

      {/* 가운데 링크들 */}
      <div className="flex gap-x-12 items-center justify-center text-[#6B6E78] grow">
        <Link
          href="/"
          className={`${currentNav === 1 && 'text-[#FCA211]'}`}
          onClick={() => setCurrentNav(1)}
        >
          홈
        </Link>
        <Link
          href="/match-reservation/detail/1"
          className={`${currentNav === 2 && 'text-[#FCA211]'}`}
          onClick={() => setCurrentNav(2)}
        >
          매치 예약
        </Link>
        <Link
          href="/court-reservation"
          className={`${currentNav === 3 && 'text-[#FCA211]'}`}
          onClick={() => setCurrentNav(3)}
        >
          장소 예약
        </Link>
        <Link
          href="/"
          className={`${currentNav === 4 && 'text-[#FCA211]'}`}
          onClick={() => setCurrentNav(4)}
        >
          라켓 추천 • 검색
        </Link>
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-x-[0.625rem] items-center text-xs">
        <Link
          className="border border-[#6B6E78] rounded-[62.5rem] py-3 px-6"
          href="/"
        >
          <p className="flex gap-x-3 items-center">
            <CalendarIcon />
            <span />내 일정 확인하기
          </p>
        </Link>
        <Link
          className="bg-[#6B6E78] rounded-[62.5rem] text-white py-3 px-6"
          href="/login"
        >
          로그인
        </Link>
      </div>
    </div>
  )
}

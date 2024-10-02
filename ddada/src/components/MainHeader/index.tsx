'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logOut } from '@/api/user/index.ts'
import { useUserRole } from '@/hooks/queries/user.ts'
import Logo from '@/static/imgs/logo.svg'
import CalendarIcon from '@/static/imgs/main/CalendarIcon.svg'

export default function MainHeader() {
  const { data } = useUserRole()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loginType, setLoginType] = useState<string | null>(null)
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState<string>(pathname.split('/')[1])

  console.log(currentPath)

  useEffect(() => {
    setCurrentPath(pathname.split('/')[1])
  }, [pathname])

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'))
    setLoginType(sessionStorage.getItem('loginType'))
  }, [])

  const handleLogout = async () => {
    if (loginType === 'kakao') {
      await logOut()
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`
    } else {
      await logOut()
      window.location.href = '/'
    }
  }
  return (
    <div className="px-4 flex gap-x-[0.625rem] py-[0.625rem]">
      {/* logo */}
      <div className="flex gap-x-3 items-center">
        <Logo />
        <h1 className="text-2xl font-bold">DDADA</h1>
      </div>

      {/* 가운데 링크들 */}
      <div className="flex gap-x-12 items-center justify-center text-disabled-dark grow">
        <Link href="/" className={`${currentPath === '' && 'text-theme'}`}>
          홈
        </Link>
        <Link
          href="/match-reservation"
          className={`${currentPath === 'match-reservation' && 'text-theme'}`}
        >
          매치 예약
        </Link>
        <Link
          href="/court-reservation"
          className={`${currentPath === 'court-reservation' && 'text-theme'}`}
        >
          장소 예약
        </Link>
        <Link
          href="/racket"
          className={`${currentPath === 'racket' && 'text-theme'}`}
        >
          라켓 추천 • 검색
        </Link>
        {accessToken && data?.memberType === 'PLAYER' && (
          <Link
            href="/mypage/mymatch"
            className={`${currentPath === '/mypage/mymatch' && 'text-theme'}`}
          >
            내 매치 확인하기
          </Link>
        )}
        {accessToken && data?.memberType === 'MANAGER' && (
          <Link
            href="/manager"
            className={`${currentPath === 'manager' && 'text-theme'}`}
          >
            매니저 페이지
          </Link>
        )}
        {accessToken && data?.memberType === 'GYM_ADMIN' && (
          <Link
            href="/dashboard"
            className={`${currentPath === 'dashboard' && 'text-theme'}`}
          >
            체육관 페이지
          </Link>
        )}
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-x-[0.625rem] items-center text-xs">
        <Link
          className="border border-disabled-dark rounded-[62.5rem] py-3 px-6"
          href="/"
        >
          <p className="flex gap-x-3 items-center">
            <CalendarIcon />
            <span />내 일정 확인하기
          </p>
        </Link>
        {accessToken ? (
          <button
            type="button"
            className="bg-disabled-dark rounded-[62.5rem] text-white py-3 px-6"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            className="bg-disabled-dark rounded-[62.5rem] text-white py-3 px-6"
            href="/login"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}

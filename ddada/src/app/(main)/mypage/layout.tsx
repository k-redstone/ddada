'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// import Image from 'next/image'
import { logOut } from '@/api/user/index.ts'
import { getProfile } from '@/features/mypage/api/mypage/index.ts'
import DeleteUserModal from '@/features/mypage/components/DeleteUserModal/index.tsx'
import RankTier from '@/features/mypage/components/RankTier/index.tsx'
import Logo from '@/static/imgs/logo.svg'
import FemaleIcon from '@/static/imgs/mypage/mypage-female-icon.svg'
import MaleIcon from '@/static/imgs/mypage/mypage-male-icon.svg'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loginType, setLoginType] = useState<string | null>(null)
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = pathname.split('/')[2]
  const [isAllowed, setIsAllowed] = useState(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isAllowed,
  })
  useEffect(() => {
    setLoginType(sessionStorage.getItem('loginType'))
  }, [])
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')

    if (!accessToken) {
      router.push('/')
    } else {
      setIsAllowed(true)
    }
  }, [router])
  if (!isAllowed) {
    return null
  }

  const handleOpenDeleteUserModal = () => {
    setDeleteUserModal(true)
  }
  const handleCloseDeleteUserModal = () => {
    setDeleteUserModal(false)
  }

  const handleLogout = async () => {
    if (loginType === 'kakao') {
      await logOut()
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`
    } else {
      await logOut()
      window.location.href = '/'
    }
  }

  if (isSuccess) {
    const { gender, nickname, profilePreSignedUrl } = data
    return (
      <>
        <div className="flex justify-center h-full">
          <div className="flex flex-col p-6 gap-4 text-[#6B6E78] font-bold w-[20.625rem]">
            <div className="flex flex-col py-6 gap justify-center items-center">
              <div className="w-[80px] h-[80px] justify-center items-center rounded-full overflow-hidden">
                {profilePreSignedUrl ? (
                  <img
                    src={profilePreSignedUrl}
                    alt="profile"
                    className="w-full h-full"
                  />
                ) : (
                  <Logo />
                )}
              </div>
              <div className="flex gap-1">
                <p>{nickname}</p>
                <div className="flex justify-center items-center">
                  {gender === 'MALE' ? <MaleIcon /> : <FemaleIcon />}
                </div>
              </div>
              <p>{data.rating}</p>
              {/* 나중에 number로 바꿔준대 지금은 걍 숫자 넣음 todo */}
              <RankTier rating={4001} />
              {/* 나중에 승률 내가 계산해야할듯? */}
              <p className="text-sm">승패</p>
              <p className="text-sm">승률</p>
            </div>
            <div className="flex flex-col gap-3 flex-grow">
              <button
                type="button"
                onClick={() => router.push('/mypage/profile-edit')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'profile-edit' ? 'bg-[#FFFBEA] text-[#FCA211]' : 'hover:bg-[#F6F6F6]'}`}
              >
                내 프로필 수정
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/password-change')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'password-change' ? 'bg-[#FFFBEA] text-[#FCA211]' : 'hover:bg-[#F6F6F6]'}`}
              >
                비밀번호 변경
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/mymatch')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'mymatch' ? 'bg-[#FFFBEA] text-[#FCA211]' : 'hover:bg-[#F6F6F6]'}`}
              >
                나의 매치
              </button>
              <button
                type="button"
                onClick={() => router.push('/mypage/playstyle')}
                className={`p-6 rounded-xl text-left
                ${currentPath === 'playstyle' ? 'bg-[#FFFBEA] text-[#FCA211]' : 'hover:bg-[#F6F6F6]'}`}
              >
                플레이스타일 분석
              </button>
            </div>
            <div className="p-6">
              <button type="button" onClick={handleLogout}>
                <p className="underline">로그아웃</p>
              </button>
            </div>
            <div className="p-6 text-[#DC3545]">
              <button type="button" onClick={handleOpenDeleteUserModal}>
                회원탈퇴
              </button>
            </div>
          </div>
          <div className="p-6 w-[36.25rem]">{children}</div>
        </div>
        {deleteUserModal && (
          <DeleteUserModal
            closeModal={handleCloseDeleteUserModal}
            nickname={nickname}
          />
        )}
      </>
    )
  }
  return <div>Loading...</div>
}

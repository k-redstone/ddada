'use client'

import { useUserRole } from '@/hooks/queries/user.ts'

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data } = useUserRole()
  if (data?.memberType !== 'MANAGER') {
    return <div className="text-3xl font-bold">권한이 없습니다.</div>
  }
  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <div className="border-b border-[#E7E7E7] px-6 py-[0.625rem]">
        <div className="flex gap-x-6 items-center">
          <p className="text-2xl">
            <span>DDADA</span> <span className="font-bold">for managers</span>
          </p>
          <p>홈</p>
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}

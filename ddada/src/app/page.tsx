'use client'

import MainFooter from '@/components/MainFooter/index.tsx'
import MainHeader from '@/components/MainHeader/index.tsx'
import Landing from '@/features/landing/components/landing/index.tsx'
import { useUserRole } from '@/hooks/queries/user.ts'

export default function Home() {
  useUserRole()
  return (
    <main>
      <div className="flex flex-col h-screen">
        <MainHeader />
        <div className="flex justify-center flex-1">
          <Landing />
        </div>
        <MainFooter />
      </div>
    </main>
  )
}

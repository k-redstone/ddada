'use client'

import { useUserRole } from '@/hooks/queries/user.ts'

export default function Home() {
  useUserRole()
  return (
    <main>
      <h1 className="text-black font-black text-2xl">
        세상에 이런 폰트가 나오다니 천재인듯
      </h1>
    </main>
  )
}

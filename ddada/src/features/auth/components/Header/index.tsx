import Link from 'next/link'

import Logo from '@/static/imgs/logo.svg'

export default function AuthHeader() {
  return (
    <div className="flex items-center justify-center border-b py-2.5">
      <Link href="/">
        <Logo />
      </Link>
      <div>
        <p className="text-2xl">DDADA 통합 로그인</p>
      </div>
    </div>
  )
}

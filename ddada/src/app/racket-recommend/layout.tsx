import Logo from '@/static/imgs/logo.svg'

export default function RacketRecommendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center p-2.5 gap-y-2.5">
        <Logo />
        <div>
          <p className=" font-bold text-2xl">DDADA 라켓 추천</p>
        </div>
      </div>
      {children}
    </div>
  )
}

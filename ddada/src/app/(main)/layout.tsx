import MainHeader from '@/components/MainHeader/index.tsx'

export default function MatchReservationDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col">
      <MainHeader />
      <div className="flex justify-center">{children}</div>
    </div>
  )
}

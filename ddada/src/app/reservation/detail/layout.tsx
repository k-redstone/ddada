export default function MatchReservationDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="">
      <div>
        <p>헤더임</p>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  )
}

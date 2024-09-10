import ManagerSidebar from '@/features/manager/components/ManagerSidebar/index.tsx'

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <ManagerSidebar />
      <div className="grow">{children}</div>
    </div>
  )
}

import ManagerSidebar from '@/features/manager/components/ManagerSidebar/index.tsx'

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <div className="max-w-[354px] grow">
        <ManagerSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

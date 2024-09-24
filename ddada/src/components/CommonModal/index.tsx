interface CommonModalProps {
  handleModalClose: () => void
  children: React.ReactNode
}

export default function CommonModal({
  handleModalClose,
  children,
}: CommonModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center"
      onClick={() => handleModalClose()}
      aria-hidden="true"
    >
      <div onClick={(e) => e.stopPropagation()} aria-hidden="true">
        {children}
      </div>
    </div>
  )
}

interface TeamSelectBtnProps {
  isDisabled: boolean
  isClicked?: boolean
  isJoined?: boolean
  isOtherTeamSelect?: boolean
  children: React.ReactNode
}

export function TeamSelectBtn({
  isDisabled,
  isClicked,
  isJoined,
  isOtherTeamSelect,
  children,
}: TeamSelectBtnProps) {
  if (isDisabled || isOtherTeamSelect) {
    return (
      <div className="rounded-xl px-4 py-2 border bg-[#F6F6F6] border-[#E5E5ED] text-[#6B6E78]">
        {isClicked}
        <div className="flex flex-col">{children}</div>
      </div>
    )
  }
  return (
    <div
      className={`rounded-xl px-4 py-2 border border-[#FCA211] text-[#FCA211] ${isClicked || isJoined ? `bg-[#FCA211] text-white` : `bg-white text-[#FCA211]`}`}
    >
      <div>{isClicked}</div>
      <div className="flex flex-col ">{children}</div>
    </div>
  )
}

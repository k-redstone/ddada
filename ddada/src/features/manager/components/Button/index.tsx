interface ButtonProps {
  size: 'md' | 'lg'
  type: 'earn' | 'fault' | 'miss'
  text: string
  changeStyle?: boolean
  disabled?: boolean
  onClick?: () => void
}

function Button({
  size,
  text,
  type,
  changeStyle,
  disabled,
  onClick,
}: ButtonProps) {
  const btnSize = {
    md: 'px-4 py-2',
    lg: 'px-6 py-2',
  }

  const btnStyle = {
    earn: `${changeStyle ? ` bg-[#0D6EFD] text-[#ffffff]` : `border-[#0D6EFD] text-[#0D6EFD]`}`,
    miss: `${changeStyle ? ` bg-[#DC3545] text-[#ffffff]` : `border-[#DC3545] text-[#DC3545] `}`,
    fault: `${changeStyle ? ` bg-[#FCA211] text-[#ffffff]` : `border-[#FCA211] text-[#FCA211]`}`,
  }
  return (
    <button
      type="button"
      className={`text-sm border- rounded-[62.5rem] ${btnSize[size]} ${btnStyle[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button

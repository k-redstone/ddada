export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="relative h-[.3125rem] bg-[#E5E5ED] rounded-full">
      <div
        className={`absolute flex flex-col gap-y-2 transition-all duration-700 ease-in-out`}
        style={{ width: `calc(100% * ${step} / 6)` }}
      >
        <div className="w-full h-[.3125rem] bg-[#FCA211] rounded-full" />
        <p className="w-full text-xs text-[#FCA211] text-end">
          {Math.floor((step / 6) * 100)}%
        </p>
      </div>
    </div>
  )
}

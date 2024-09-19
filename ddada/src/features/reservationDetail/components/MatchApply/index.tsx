export default function MatchApply() {
  return (
    <div className="flex flex-col gap-y-4 py-6 px-3">
      {/* 설명 */}
      <div className="pb-3 flex flex-col items-center border-b border-[#E5E5ED]">
        <p className="font-bold">결제하고 바로 매치 확정하기 🤙</p>
        <p className="text-sm text-[#6B6E78]">
          빠르게 팀을 고르고 매치를 준비하세요
        </p>
      </div>

      {/* 팀 선택 */}
      <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs">
        <h2 className="text-sm font-bold">팀 선택</h2>
        <div className="p-1 flex gap-x-2">
          <button
            type="button"
            className="rounded-xl px-4 py-2 border border-[#E5E5ED] text-[#6B6E78] flex-1"
          >
            <div className="flex flex-col ">
              <span>A팀</span>
              <span>(1/2)</span>
            </div>
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2 border border-[#E5E5ED] text-[#6B6E78] flex-1"
          >
            <div className="flex flex-col ">
              <span>A팀</span>
              <span>(1/2)</span>
            </div>
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2 border border-[#E5E5ED] text-[#6B6E78] flex-1"
          >
            <div className="flex flex-col ">
              <span>A팀</span>
              <span>(1/2)</span>
            </div>
          </button>
        </div>
      </div>

      {/* 예약정보 */}
      <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs text-[#6B6E78]">
        <h2 className="text-sm font-bold text-black">예약정보</h2>
        <p className="text-sm">성동구 금호스포츠센터 10번코트</p>
        <p>서울특별시 성동구 금호로 20</p>
        <p>2024.09.08(일) 10:00-11:00(1시간)</p>
      </div>

      {/* 결제금액 */}
      <div className="pb-3 flex flex-col gap-y-1  border-b border-[#E5E5ED] text-xs text-[#6B6E78]">
        <h2 className="text-sm font-bold text-black">결제금액</h2>
        <div className="flex justify-between">
          <span>공간사용료</span>
          <span>₩5,000</span>
        </div>
        <div className="flex justify-between">
          <span>수수료</span>
          <span>₩500</span>
        </div>
      </div>

      {/* 최종금액 */}
      <div className="flex justify-end">
        <span className="text-base text-[#FCA211] font-bold">₩5,500</span>
      </div>

      {/* 신청버튼 */}
      <button
        type="button"
        className="bg-[#FCA211] rounded-[.25rem] py-2 px-1 box-border"
      >
        <span className="text-xs text-white">매치 신청하기</span>
      </button>
    </div>
  )
}

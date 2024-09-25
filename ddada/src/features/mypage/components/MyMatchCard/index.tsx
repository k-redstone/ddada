export default function MyMatchCard() {
  return (
    <div className="bg-base-50 rounded-xl flex gap-3 px-6 py-3">
      <div className="flex flex-col justify-center items center">
        <div className="border rounded-full h-[50px] w-[50px] flex justify-center items-center">
          원
        </div>
      </div>
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-sm font-bold">경기장이름</p>
          </div>
          <div className="text-xs text-disabled-dark">
            <span>경기장 주소</span>
            <span> · </span>
            <span>요일</span>
            <span> 시간</span>
          </div>
          <div>
            <p className="text-xs text-disabled-dark">속한 팀 번호</p>
          </div>
        </div>
        <div>남자복식, 경쟁전</div>
      </div>
      <div className="flex gap-1">취소,상세</div>
    </div>
  )
}

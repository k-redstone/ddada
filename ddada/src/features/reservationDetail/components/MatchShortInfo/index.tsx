export default function MatchShortInfo() {
  return (
    <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
      <div className=" py-1 flex">
        <h1 className="text-base font-bold border-b-2 border-[#FCA211] box-border">
          매치정보
        </h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">타이틀</h2>
        <p className=" text-[#6B6E78]">성동구 금호스포츠센터 10번 코트</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">주소</h2>
        <p className=" text-[#6B6E78]">
          서울특별시 성동구 금호로 20 금호스포츠센터트
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">일시</h2>
        <p className=" text-[#6B6E78]">2024.09.08(일) 10:00-11:00(1시간) </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">매치타입</h2>
        <div className="flex gap-x-1">
          <div className="bg-[#FCA211] text-white py-1 px-2 rounded-[62.5rem]">
            <span>남자복식</span>
          </div>
          <div className="bg-[#DC3545] text-white py-1 px-2 rounded-[62.5rem]">
            <span>경쟁전</span>
          </div>
        </div>
      </div>
    </div>
  )
}

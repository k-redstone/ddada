// import GameUserInfo from '@/features/manager/components/GameUserInfo/index.tsx'

export default function GymReservedList() {
  return (
    <div className="flex flex-col gap-y-6 p-6 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold">예약 현황</h2>
      {/* 달력 */}
      <div className="">
        <input
          className="w-[25rem] gap-x-2.5 px-6 py-[.4375rem] border rounded-full border-disabled"
          type="date"
        />
      </div>
      {/* 리스트 */}
      <div className="flex flex-col gap-y-1 w-full">
        <div className="rounded-full grid grid-cols-[50px_repeat(5,_1fr)] gap-x-2 p-3 bg-theme text-white">
          <span className="w-[3.125rem] text-center">No</span>
          <span>매치 시각</span>
          <span>코트번호</span>
          <span>인원 수</span>
          <span>상태</span>
          <span>담당매니저</span>
        </div>
        {/* lists data */}
        <div className="rounded-full grid grid-cols-[50px_repeat(5,_1fr)]  gap-x-2 p-3 justify-center items-center text-disabled-dark">
          <div className="w-[3.125rem] text-center">No</div>
          <span>매치 시각</span>
          <span>코트번호</span>
          <span>인원 수</span>
          <div className="flex items-center">
            <MatchStatus status="FINISHED" />
          </div>
          <div className="flex items-center">
            <Manager />
          </div>
        </div>
        <div className="rounded-full grid grid-cols-[50px_repeat(5,_1fr)]  gap-x-2 p-3 justify-center items-center text-disabled-dark">
          <div className="w-[3.125rem] text-center">No</div>
          <span>매치 시각</span>
          <span>코트번호</span>
          <span>인원 수</span>
          <div className="flex items-center">
            <MatchStatus status="PLAYING" />
          </div>
          <div className="flex items-center">
            <Manager />
          </div>
        </div>
        <div className="rounded-full grid grid-cols-[50px_repeat(5,_1fr)]  gap-x-2 p-3 justify-center items-center text-disabled-dark">
          <div className="w-[3.125rem] text-center">No</div>
          <span>매치 시각</span>
          <span>코트번호</span>
          <span>인원 수</span>
          <div className="flex items-center">
            <MatchStatus status="RESERVED" />
          </div>
          <div className="flex items-center">
            <Manager />
          </div>
        </div>
      </div>
    </div>
  )
}

function Manager() {
  return (
    <div className="flex gap-x-3">
      {/* <GameUserInfo src="asdf" /> */}
      <div className="flex flex-col gap-y-1">
        <p className="text-disabled-dark text-xs">
          매니저 <span className="font-bold">윤경서</span>
        </p>
        <button
          type="button"
          className="rounded-full border border-theme text-theme text-xs px-2 py-1"
        >
          연결하기
        </button>
      </div>
    </div>
  )
}

function MatchStatus({ status }: { status: string }) {
  if (status === 'FINISHED') {
    return (
      <div className="rounded-full py-1 px-3 border border-danger bg-danger bg-opacity-20 text-danger">
        <span>종료됨</span>
      </div>
    )
  }
  if (status === 'CANCELED') {
    return (
      <div className="rounded-full py-1 px-3 border border-danger bg-danger bg-opacity-20 text-danger ">
        <span>취소됨</span>
      </div>
    )
  }
  if (status === 'PLAYING') {
    return (
      <div className="rounded-full py-1 px-3 border border-primary bg-primary bg-opacity-20 text-primary ">
        <span>진행 중</span>
      </div>
    )
  }
  if (status === 'CREATED' || status === 'RESERVED') {
    return (
      <div className="rounded-full py-1 px-3 border border-disabled-dark bg-base-50 bg-opacity-20 text-disabled-dark ">
        <span>진행 예정</span>
      </div>
    )
  }
}

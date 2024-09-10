export default function MatchCourtInfo() {
  return (
    <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
      <div>
        <h1 className="text-xl font-bold">체육관 정보</h1>
      </div>

      {/* 이미지 */}
      <div className="flex flex-col gap-y-2 h-[200px] border border-black">
        <p>이미지 들어감</p>
      </div>

      {/* 위치 */}
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">위치</h2>
        <ul>
          <li className="list-inside list-disc pl-2">
            서울 성동구 독서당로63길 44 대현산체육관
          </li>
          <li className="list-inside list-disc pl-2">행당동 산30-40</li>
          <li className="list-inside list-disc pl-2">
            응봉역 2번 출구에서 945m
          </li>
        </ul>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">전화번호</h2>
        <ul>
          <li className="list-inside list-disc pl-2">
            <span>02-2204-7680</span>{' '}
            <span className="text-[#FCA211]">번호복사</span>
          </li>
        </ul>
      </div>

      {/* 웹사이트 */}
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">웹사이트</h2>
        <ul>
          <li className="list-inside list-disc pl-2">https://ddada.io</li>
        </ul>
      </div>

      {/* 특이사항 */}
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold">특이사항</h2>
        <ul>
          <li className="list-inside list-disc pl-2">
            주 소: 서울특별시 성동구 금호로 20 금호스포츠센터
          </li>
          <li className="list-inside list-disc pl-2">
            운영시간
            <ul>
              <li className="list-inside list-disc pl-5">평일: 06:00~22:00</li>
              <li className="list-inside list-disc pl-5">
                토요일: 06:00~22:00
              </li>
              <li className="list-inside list-disc pl-5">
                휴관일: 신정, 설날, 근로자의 날, 추석
              </li>
            </ul>
          </li>
          <li className="list-inside list-disc pl-2">
            안내전화 : 02-2204-7675(FAX : 02-2254-7675)
          </li>
        </ul>
      </div>
    </div>
  )
}

'use client'

import { createContext, useContext } from 'react'

import ParkingIcon from '@/static/imgs/matchReservation/ParkingIcon.svg'
import ShowerIcon from '@/static/imgs/matchReservation/ShowerIcon.svg'
import ToiletIcon from '@/static/imgs/matchReservation/ToiletIcon.svg'
import WifiIcon from '@/static/imgs/matchReservation/WifiIcon.svg'
import { CourtType } from '@/features/manager/types/MatchDataType'
interface CourtInfoProps {
  courtData: CourtType
  children: React.ReactNode
}

const CourtInfoContext = createContext<CourtType | null>(null)

const useCourtInfoContext = () => {
  const context = useContext(CourtInfoContext)
  return context
}

export default function CourtInfo({ courtData, children }: CourtInfoProps) {
  return (
    <CourtInfoContext.Provider value={courtData}>
      <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
        {children}
      </div>
    </CourtInfoContext.Provider>
  )
}

function Title() {
  return (
    <div>
      <h1 className="text-xl font-bold">체육관 정보</h1>
    </div>
  )
}

function TitleWithUnderline() {
  return (
    <div className=" py-1 flex">
      <h1 className="text-base font-bold border-b-2 border-[#FCA211] box-border">
        체육관 정보
      </h1>
    </div>
  )
}

function CourtImage() {
  return (
    <div className="flex flex-col gap-y-2 h-[12.5rem] border border-black">
      <p>이미지 들어감</p>
    </div>
  )
}

function Location() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">위치</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          서울 성동구 독서당로63길 44 대현산체육관
        </li>
        <li className="list-inside list-disc pl-2">행당동 산30-40</li>
        <li className="list-inside list-disc pl-2">응봉역 2번 출구에서 945m</li>
      </ul>
    </div>
  )
}

function Number() {
  const courtData = useCourtInfoContext()
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">전화번호</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          <span>{courtData?.contactNumber}</span>{' '}
          <span className="text-[#FCA211]">번호복사</span>
        </li>
      </ul>
    </div>
  )
}

function Website() {
  const courtData = useCourtInfoContext()

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">웹사이트</h2>
      <ul>
        <li className="list-inside list-disc pl-2">{courtData?.url}</li>
      </ul>
    </div>
  )
}
function Amenities() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">편의시설</h2>
      <div className="flex gap-x-[0.625rem]">
        <ParkingIcon />
        <ShowerIcon />
        <ToiletIcon />
        <WifiIcon />
      </div>
    </div>
  )
}

function Detail() {
  const courtData = useCourtInfoContext()

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold">특이사항</h2>
      <ul>
        <li className="list-inside list-disc pl-2">
          주 소: {courtData?.address}
        </li>
        <li className="list-inside list-disc pl-2">
          운영시간
          <ul>
            <li className="list-inside list-disc pl-5">평일: 06:00~22:00</li>
            <li className="list-inside list-disc pl-5">토요일: 06:00~22:00</li>
            <li className="list-inside list-disc pl-5">
              휴관일: 신정, 설날, 근로자의 날, 추석
            </li>
          </ul>
        </li>
        <li className="list-inside list-disc pl-2">
          안내전화 : {courtData?.contactNumber}(FAX : {courtData?.contactNumber}
          )
        </li>
      </ul>
    </div>
  )
}

CourtInfo.Title = Title
CourtInfo.TitleWithUnderline = TitleWithUnderline
CourtInfo.CourtImage = CourtImage
CourtInfo.Location = Location
CourtInfo.Number = Number
CourtInfo.Website = Website
CourtInfo.Detail = Detail
CourtInfo.Amenities = Amenities

// export function MatchCourtInfo() {
//   return (
//     <div className="flex flex-col gap-y-6 p-2 text-sm bg-white">
//       <div>
//         <h1 className="text-xl font-bold">체육관 정보</h1>
//       </div>

//       {/* 이미지 */}
//       <div className="flex flex-col gap-y-2 h-[12.5rem] border border-black">
//         <p>이미지 들어감</p>
//       </div>

//       <div className="flex flex-col gap-y-2">
//         <h2 className="font-bold">위치</h2>
//         <ul>
//           <li className="list-inside list-disc pl-2">
//             서울 성동구 독서당로63길 44 대현산체육관
//           </li>
//           <li className="list-inside list-disc pl-2">행당동 산30-40</li>
//           <li className="list-inside list-disc pl-2">
//             응봉역 2번 출구에서 945m
//           </li>
//         </ul>
//       </div>

//       {/* 전화번호 */}
//       <div className="flex flex-col gap-y-2">
//         <h2 className="font-bold">전화번호</h2>
//         <ul>
//           <li className="list-inside list-disc pl-2">
//             <span>02-2204-7680</span>{' '}
//             <span className="text-[#FCA211]">번호복사</span>
//           </li>
//         </ul>
//       </div>

//       {/* 웹사이트 */}
//       <div className="flex flex-col gap-y-2">
//         <h2 className="font-bold">웹사이트</h2>
//         <ul>
//           <li className="list-inside list-disc pl-2">https://ddada.io</li>
//         </ul>
//       </div>

//       {/* 특이사항 */}
//       <div className="flex flex-col gap-y-2">
//         <h2 className="font-bold">특이사항</h2>
//         <ul>
//           <li className="list-inside list-disc pl-2">
//             주 소: 서울특별시 성동구 금호로 20 금호스포츠센터
//           </li>
//           <li className="list-inside list-disc pl-2">
//             운영시간
//             <ul>
//               <li className="list-inside list-disc pl-5">평일: 06:00~22:00</li>
//               <li className="list-inside list-disc pl-5">
//                 토요일: 06:00~22:00
//               </li>
//               <li className="list-inside list-disc pl-5">
//                 휴관일: 신정, 설날, 근로자의 날, 추석
//               </li>
//             </ul>
//           </li>
//           <li className="list-inside list-disc pl-2">
//             안내전화 : 02-2204-7675(FAX : 02-2254-7675)
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }

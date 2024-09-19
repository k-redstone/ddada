'use client'

import { useEffect, useState } from 'react'

import PaymentModal from '@/features/court-reservation/components/PaymentModal/index.tsx'
import { COURT_RESERVATION_TIMES } from '@/features/court-reservation/constants/court-reservation.ts'
import { CourtType } from '@/features/court-reservation/types/CourtType.ts'
import ParkingIcon from '@/static/imgs/court-reservation/court-reservation_parking-lot_icon.svg'
import ShowerIcon from '@/static/imgs/court-reservation/court-reservation_shower_icon.svg'
import ToiletIcon from '@/static/imgs/court-reservation/court-reservation_toilet_icon.svg'
import WifiIcon from '@/static/imgs/court-reservation/court-resservation_wifi_icon.svg'

interface CourtsDetailProps {
  court: CourtType
  selectedDate: string
}

export default function Courts({ court, selectedDate }: CourtsDetailProps) {
  useEffect(() => {
    setSelectedTime('')
  }, [selectedDate])
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  const handlePaymentModal = () => {
    setPaymentModalOpen(true)
  }
  const handlePaymentModalOff = () => {
    setPaymentModalOpen(false)
  }

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time)
  }
  return (
    <div
      key={court.id}
      className="flex border-b h-[12.5rem] w-[46rem] gap-[0.625rem] py-2"
    >
      <div>
        <img
          src={court.image}
          alt="테스트이미지"
          className="w-[9.375rem] h-full rounded-[0.5rem]"
        />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <p className="font-bold">{court.name}</p>
          <p className="text-sm text-[#6B6E78]">{court.address}</p>
        </div>
        <div className="flex gap-[0.625rem]">
          <ParkingIcon />
          <ShowerIcon />
          <ToiletIcon />
          <WifiIcon />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">예약 가능시간</p>
          <div className="flex gap-[0.625rem] text-xs">
            {COURT_RESERVATION_TIMES.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSelectedTime(time)}
                className={`border px-2 py-1
                      rounded-[62.5rem]
                  ${court.reservations[selectedDate] && court.reservations[selectedDate].includes(time) ? 'text-[#E5E5ED]' : ''}
                  ${selectedTime === time ? 'bg-[#FCA211] text-white' : ''}
                  `}
                disabled={
                  court.reservations[selectedDate] &&
                  court.reservations[selectedDate].includes(time)
                }
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs flex flex-col justify-end gap-3">
        <div className="text-right">
          <p className="text-[#E5E5ED] line-through">5000원</p>
          <div className="flex justify-end">
            <p className="font-bold">4000</p>
            <span>원/매치</span>
          </div>
        </div>
        <button
          type="button"
          className={`text-white px-4 py-2  rounded-xl
            ${selectedTime ? 'bg-[#FCA211]' : 'bg-[#E5E5ED]'}`}
          onClick={handlePaymentModal}
          disabled={!selectedTime}
        >
          매치 생성하기
        </button>
      </div>
      {paymentModalOpen && (
        <PaymentModal
          courtId={court.id}
          closeModal={handlePaymentModalOff}
          courtName={court.name}
          reservationDay={selectedDate}
          reservationTime={selectedTime}
        />
      )}
    </div>
  )
}

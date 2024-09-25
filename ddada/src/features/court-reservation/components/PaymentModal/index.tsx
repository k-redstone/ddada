'use client'

import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import Script from 'next/script'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { postMatchReservation } from '@/features/court-reservation/api/court/index.ts'
import {
  KR_DAY_OF_WEEK,
  MATCH_INFO,
} from '@/features/court-reservation/constants/court-reservation.ts'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import CheckedIcon from '@/static/imgs/court-reservation/court-reservation_payment_checked_icon.svg'
import UnCheckedIcon from '@/static/imgs/court-reservation/court-reservation_paymenty_unchecked_icon.svg'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PortOne: any
  }
}
interface PaymentModalProps {
  courtId: number
  closeModal: () => void
  courtName: string
  reservationDay: string
  reservationTime: string
}

export default function PaymentModal({
  courtId,
  closeModal,
  courtName,
  reservationDay,
  reservationTime,
}: PaymentModalProps) {
  const router = useRouter()
  const pathName = usePathname()
  const day = dayjs(reservationDay).format('MM.DD')
  const date = dayjs(reservationDay).format('YYYY-MM-DD')
  const DAY_OF_WEEK = KR_DAY_OF_WEEK[dayjs(reservationDay).day()]
  const [competitionType, setCompetitionType] = useState('친선')
  const [matchType, setMatchType] = useState('혼합복식')

  const matchReservation = async () => {
    let RankType = ''
    let MatchType = ''
    if (competitionType === '경쟁') {
      RankType = 'RANK'
    } else {
      RankType = 'NORMAL'
    }
    if (matchType === '혼합복식') {
      MatchType = 'MIXED_DOUBLE'
    } else if (matchType === '남자복식') {
      MatchType = 'MALE_DOUBLE'
    } else if (matchType === '여자복식') {
      MatchType = 'FEMALE_DOUBLE'
    }
    const data = {
      courtId,
      rankType: RankType,
      matchType: MatchType,
      date,
      time: `${reservationTime}`,
    }
    const res = await postMatchReservation(data)
    console.log(res)
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const handlePayment = async () => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) {
      router.push(`/login?redirect=${encodeURIComponent(pathName)}`)
    } else {
      handlePortOne()
      closeModal()
    }
  }

  const handlePortOne = () => {
    async function requestPayment() {
      const response = await window.PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_STORE_ID,
        channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
        paymentId: `payment-${crypto.randomUUID()}`,
        // orderName에 예약한 장소 이름 넣기
        orderName: 'test',
        totalAmount: 1000,
        currency: 'CURRENCY_KRW',
        payMethod: 'EASY_PAY',
        issueName: 'ddada',
      })

      if (response.code != null) {
        toast.error('예약 실패')
        return console.log('예약 실패')
      }
      // todo 나중에 이 response에 있는걸로 블라블라하기
      // todo 마이페이지로 보내버리기
      matchReservation()
      toast.success('예약 성공')
      return console.log('예약 성공')
    }
    requestPayment()
  }

  return (
    <>
      <Script src="https://cdn.portone.io/v2/browser-sdk.js" />
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden"
        onClick={closeModal}
        aria-hidden="true"
      />
      {/* height 수정 필요 */}
      <div className="flex flex-col gap-6 fixed top-10 left-1/3 z-20 w-[35rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">예약 및 결제 </h2>
          <button
            type="button"
            onClick={closeModal}
            aria-label="예약 및 결제 닫기"
          >
            <ModalCloseIcon />
          </button>
        </div>
        <div className="flex-col gap-3 px-6 py-3 border border-3.5 border-black rounded-xl border text-lg font-bold">
          <p>{courtName}</p>
          <p>
            {day}({DAY_OF_WEEK}) {reservationTime.slice(0, 5)}
          </p>
        </div>
        <div>
          <hr />
        </div>
        <div className="flex flex-col gap-3 ">
          <h3 className="text-lg font-bold">매치정보 선택</h3>
          <div className="flex flex-col gap-2">
            <p>경쟁여부</p>

            <div>
              <button
                type="button"
                onClick={() => setCompetitionType('친선')}
                className="flex items-center gap-2"
              >
                {competitionType === '친선' ? (
                  <CheckedIcon />
                ) : (
                  <UnCheckedIcon />
                )}
                친선
                <p className="text-[#FCA211]">
                  (승리와 패배에 따른 실력점수와 등락이 없습니다.)
                </p>
              </button>
              <button
                type="button"
                onClick={() => setCompetitionType('경쟁')}
                className="flex items-center gap-2"
              >
                {competitionType === '경쟁' ? (
                  <CheckedIcon />
                ) : (
                  <UnCheckedIcon />
                )}
                경쟁
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>매치타입</p>
            <div>
              {MATCH_INFO.matchType.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMatchType(type)}
                  className="flex items-center gap-2"
                >
                  {matchType === type ? <CheckedIcon /> : <UnCheckedIcon />}
                  {type}
                </button>
              ))}
              <p className="text-[#6B6E78]">단식은 추후 지원 예정입니다.</p>
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">결제 정보</h3>

          <div className="flex justify-between">
            <p>매치 가격</p>
            <p>5,000원</p>
          </div>
          <div className="flex justify-between">
            <p>첫 예약 할인</p>
            <p>-1,000원</p>
          </div>

          <div>
            <hr />
          </div>
          <div className="flex justify-between">
            <p className="font-bold">첫 결제 금액</p>
            <p>4,000원</p>
          </div>
        </div>
        <div className="flex gap-6">
          <button
            type="button"
            className="text-[#FCA211] border border-[#FCA211] rounded px-4 py-2 border border-[#E5E5ED] grow"
            onClick={handleCloseModal}
          >
            닫기
          </button>
          <button
            type="button"
            className="text-white bg-[#FCA211] rounded px-4 py-2 grow"
            onClick={handlePayment}
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  )
}

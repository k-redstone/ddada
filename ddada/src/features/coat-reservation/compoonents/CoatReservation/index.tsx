'use client'

import { useState } from 'react'

import LocationModal from '@/features/coat-reservation/compoonents/LocationModal/index.tsx'
import PaymentModal from '@/features/coat-reservation/compoonents/PaymentModal/index.tsx'
import LocationIcon from '@/static/imgs/coat-reservation/coat-reservation_location_icon.svg'
import LocationDetailIcon from '@/static/imgs/coat-reservation/coat-reservation_location_under_icon.svg'
import ShowerIcon from '@/static/imgs/coat-reservation/coat-reservation_shower_icon.svg'
import ToiletIcon from '@/static/imgs/coat-reservation/coat-reservation_toilet_icon.svg'
import WifiIcon from '@/static/imgs/coat-reservation/coat-reservation_toilet_icon.svg'
import ParkingIcon from '@/static/imgs/coat-reservation/cost-reservation_parking-lot_icon.svg'
import SearchIcon from '@/static/imgs/coat-reservation/cost-reservation_search_icon.svg'

export default function CoatReservation() {
  const [search, setSearch] = useState('')
  const [filterCoat, setFilterCoat] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])

  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFilterCoat(search)
  }
  const handleSelectedRegion = (regions: string[]) => {
    setSelectedRegion(regions)
  }

  const handleLocationModalOff = () => {
    setLocationModalOpen(false)
  }
  const handleLocationModal = () => {
    setLocationModalOpen(true)
  }
  const handlePaymentModal = () => {
    setPaymentModalOpen(true)
  }
  const handlePaymentModalOff = () => {
    setPaymentModalOpen(false)
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[926px]">
        <div className="flex gap-x-2 text-[#6B6E78] text-xs">
          <div className="flex items-center border rounded-[62.5rem] gap-x-3 px-4 py-2 ">
            <form id="search" onSubmit={handleClickSearch}>
              <input
                type="text"
                id="search"
                onChange={handleSearch}
                placeholder="지역, 체육관 명으로 검색"
                // todo width 수           정
                className="w-[7.1875rem] placeholder-[#6B6E78]"
              />
            </form>
            <button
              form="search"
              type="submit"
              aria-label="지역,체육관 명으로 검색"
            >
              <SearchIcon />
            </button>
          </div>
          <button
            type="button"
            className="flex items-center border rounded-[62.5rem] gap-x-2 px-4"
            onClick={handleLocationModal}
          >
            <LocationIcon />
            <p>지역</p>
            <LocationDetailIcon />
          </button>
        </div>

        {locationModalOpen && (
          <LocationModal
            closeModal={handleLocationModalOff}
            chooseLocation={selectedRegion}
            handleLoactions={handleSelectedRegion}
          />
        )}
        {paymentModalOpen && (
          <PaymentModal closeModal={handlePaymentModalOff} />
        )}

        <p>-------------------------------------------</p>
        <button
          type="button"
          className="text-white px-4 py-2 bg-[#FCA211] rounded-xl"
          onClick={handlePaymentModal}
        >
          매치 생성하기
        </button>
        <div>여기에 pagination</div>
        <p>-------------------------------------------</p>
        <div>여기에 코트 리스트쫙</div>
      </div>
    </div>
  )
}

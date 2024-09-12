'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import Courts from '@/features/court-reservation/components/Courts/index.tsx'
import LocationModal from '@/features/court-reservation/components/LocationModal/index.tsx'
import Pagination from '@/features/court-reservation/components/Pagination/index.tsx'
import { DUMMY_COURTS } from '@/features/court-reservation/constants/court-reservation.ts'
import LocationColorIcon from '@/static/imgs/court-reservation/court-reservation_location_color_icon.svg'
import LocationIcon from '@/static/imgs/court-reservation/court-reservation_location_icon.svg'
import LocationDetailColorIcon from '@/static/imgs/court-reservation/court-reservation_location_under_color_icon.svg'
import LocationDetailIcon from '@/static/imgs/court-reservation/court-reservation_location_under_icon.svg'
import ReservationLogo from '@/static/imgs/court-reservation/court-reservation_reservation_logo.svg'
import SearchIcon from '@/static/imgs/court-reservation/court-reservation_search_icon.svg'

export default function CoatReservation() {
  const today = dayjs().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [filterCoat, setFilterCoat] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(0)
  // // pagination에서 선택한 날짜
  // useEffect(() => {
  //   console.log(selectedDate)
  // }, [selectedDate])

  useEffect(() => {
    if (selectedRegion.length === 1) {
      if (selectedRegion[0] === '전체') {
        setSelectedRegionNum(0)
      } else {
        setSelectedRegionNum(1)
      }
    } else {
      setSelectedRegionNum(selectedRegion.length)
    }
  }, [selectedRegion])

  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // todo 검색 api 호출
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[752px] px-2">
        <div className="flex flex-col gap-3 py-4">
          <div className="w-full">
            <ReservationLogo className="w-full" />
          </div>

          <div className="flex gap-x-2 text-[#6B6E78] text-xs">
            <div className="flex items-center border rounded-[62.5rem] gap-x-3 px-4 py-2 ">
              <form id="search" onSubmit={handleClickSearch}>
                <input
                  type="text"
                  id="search"
                  onChange={handleSearch}
                  placeholder="지역, 체육관 명으로 검색"
                  // todo width 수           정
                  className="w-[7.1875rem] placeholder-[#6B6E78] focus:outline-none focus:border-none"
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
              className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4
                ${selectedRegionNum > 0 ? 'text-[#FCA211] border-[#FCA211] bg-[#FFFBEA]' : 'text-[#6B6E78]'}
              `}
              onClick={handleLocationModal}
            >
              {selectedRegionNum > 0 ? <LocationColorIcon /> : <LocationIcon />}
              {selectedRegionNum > 0 ? (
                <p>지역 +{selectedRegionNum}</p>
              ) : (
                <p>지역</p>
              )}
              {selectedRegionNum > 0 ? (
                <LocationDetailColorIcon />
              ) : (
                <LocationDetailIcon />
              )}
            </button>
          </div>
        </div>

        {locationModalOpen && (
          <LocationModal
            closeModal={handleLocationModalOff}
            chooseLocation={selectedRegion}
            handleLoactions={handleSelectedRegion}
          />
        )}

        <div>
          <Pagination changeSelectedDate={handleSelectedDate} />
        </div>

        <div>
          <Courts courtList={DUMMY_COURTS} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

import LocationModal from '@/features/coat-reservation/compoonents/LocationModal/index.tsx'
import LocationIcon from '@/static/imgs/coat-reservation/coat-reservation_location_icon.svg'
import LocationDetailIcon from '@/static/imgs/coat-reservation/coat-reservation_location_under_icon.svg'
import SearchIcon from '@/static/imgs/coat-reservation/cost-reservation_search_icon.svg'

export default function CoatReservation() {
  const [search, setSearch] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])

  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSelectedRegion([...selectedRegion, search])
    console.log(selectedRegion)
    console.log(search)
  }
  const handleSelectedRegion = (regions: string[]) => {
    setSelectedRegion(regions)
  }

  const handleLocationModalOff = () => {
    setLocationModalOpen(false)
  }
  const handleLocationModal = () => {
    console.log('지역 모달')
    setLocationModalOpen(true)
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
                // todo width 수정
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

        <p>-------------------------------------------</p>
        <div>여기에 pagination</div>
        <p>-------------------------------------------</p>
        <div>여기에 코트 리스트쫙</div>
      </div>
    </div>
  )
}

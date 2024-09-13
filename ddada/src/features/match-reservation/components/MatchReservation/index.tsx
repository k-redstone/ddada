'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import Courts from '@/features/court-reservation/components/Courts/index.tsx'
import LocationModal from '@/features/court-reservation/components/LocationModal/index.tsx'
import Pagination from '@/features/court-reservation/components/Pagination/index.tsx'
import { DUMMY_COURTS } from '@/features/court-reservation/constants/court-reservation.ts'
import MatchCards from '@/features/match-reservation/components/MatchesCards/index.tsx'
import MatchToggle from '@/features/match-reservation/components/MatchToggle/index.tsx'
import MatchTypeButton from '@/features/match-reservation/components/MatchTypeButton/index.tsx'
import MatchTypeModal from '@/features/match-reservation/components/MatchTypeModal/index.tsx'
import LocationColorIcon from '@/static/imgs/court-reservation/court-reservation_location_color_icon.svg'
import LocationIcon from '@/static/imgs/court-reservation/court-reservation_location_icon.svg'
import LocationDetailColorIcon from '@/static/imgs/court-reservation/court-reservation_location_under_color_icon.svg'
import LocationDetailIcon from '@/static/imgs/court-reservation/court-reservation_location_under_icon.svg'
import SearchIcon from '@/static/imgs/court-reservation/court-reservation_search_icon.svg'
import BadmintonColorIcon from '@/static/imgs/match-reservation/match-reservation_badminton_color_icon.svg'
import BadmintonIcon from '@/static/imgs/match-reservation/match-reservation_badminton_icon.svg'
import ReservationLogo from '@/static/imgs/match-reservation/match-reservation_reservation_logo.svg'

export default function MatchReservation() {
  const today = dayjs().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [filterCoat, setFilterCoat] = useState('')
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [matchTypeModalOpen, setMatchTypeModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>(['전체'])
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(0)
  const [selectedMatchType, setSelectedMatchType] = useState<string[]>(['전체'])
  const [selectedMatchTypeNum, setSelectedMatchTypeNum] = useState<number>(0)
  const [selectedMatchRankType, setSelectedMatchRankType] =
    useState<string>('친선')
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
    // todo 검색 api 호출
  }, [selectedRegion])

  useEffect(() => {
    if (selectedMatchType.length === 1) {
      if (selectedMatchType[0] === '전체') {
        setSelectedMatchTypeNum(0)
      } else {
        setSelectedMatchTypeNum(1)
      }
    } else {
      setSelectedMatchTypeNum(selectedMatchType.length)
    }
    // todo 검색 api 호출
  }, [selectedMatchType])

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
  const handleMaTchTypeModalOff = () => {
    setMatchTypeModalOpen(false)
  }
  const handleMaTchTypeModal = () => {
    setMatchTypeModalOpen(true)
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSelectedMatchType = (matchTypes: string[]) => {
    setSelectedMatchType(matchTypes)
  }

  const handleSelectedMatchRankType = (matchRankType: string) => {
    setSelectedMatchRankType(matchRankType)
  }

  return (
    <div className="flex justify-center items-center px-2  gap-2">
      <div className="flex flex-col gap-3 py-4">
        {/* <div className="w-full">
            <ReservationLogo className="w-full" />
          </div> */}
        <div className="flex justify-center">
          <ReservationLogo />
        </div>
        <div className="flex justify-center">
          <div className="flex text-[#6B6E78] text-xs items-center border rounded-[62.5rem] gap-x-3 px-4 py-2 ">
            <button
              form="search"
              type="submit"
              aria-label="지역,체육관 명으로 검색"
            >
              <SearchIcon />
            </button>
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
          </div>
        </div>
        <div className="flex justify-center text-[#6B6E78] text-xs ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4 py-2
            ${selectedRegionNum > 0 ? 'text-[#FCA211] border-[#FCA211] bg-[#FFFBEA]' : 'text-[#6B6E78]'}
          `}
                onClick={handleLocationModal}
              >
                {selectedRegionNum > 0 ? (
                  <LocationColorIcon />
                ) : (
                  <LocationIcon />
                )}
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
              <button
                type="button"
                className={`flex items-center border rounded-[62.5rem] gap-x-2 px-4 py-2 text-[#6B6E78]
                  ${selectedMatchTypeNum > 0 ? 'text-[#FCA211] border-[#FCA211] bg-[#FFFBEA]' : ''}
                    `}
                onClick={handleMaTchTypeModal}
              >
                {selectedMatchTypeNum > 0 ? (
                  <BadmintonColorIcon />
                ) : (
                  <BadmintonIcon />
                )}
                {selectedMatchTypeNum > 0 ? (
                  <p>매치타입 +{selectedMatchTypeNum}</p>
                ) : (
                  <p>매치타입</p>
                )}
                {selectedMatchTypeNum > 0 ? (
                  <LocationDetailColorIcon />
                ) : (
                  <LocationDetailIcon />
                )}
              </button>
            </div>
            <div className="flex justify-center">
              <MatchToggle
                matchRankType={selectedMatchRankType}
                handleMatchRankType={handleSelectedMatchRankType}
              />
            </div>
          </div>
        </div>
        <div>
          <Pagination changeSelectedDate={setSelectedDate} />
        </div>
        <MatchCards />
      </div>

      {locationModalOpen && (
        <LocationModal
          closeModal={handleLocationModalOff}
          chooseLocation={selectedRegion}
          handleLoactions={handleSelectedRegion}
        />
      )}

      {matchTypeModalOpen && (
        <MatchTypeModal
          closeModal={handleMaTchTypeModalOff}
          chooseMatchType={selectedMatchType}
          handleMatchType={handleSelectedMatchType}
        />
      )}

      {/* <div>
          <Pagination changeSelectedDate={handleSelectedDate} />
        </div>

        <div>
          <Courts courtList={DUMMY_COURTS} selectedDate={selectedDate} />
        </div> */}
    </div>
  )
}

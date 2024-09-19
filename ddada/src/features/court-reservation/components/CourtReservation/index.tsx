'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import { getCourtList } from '@/features/court-reservation/api/court/index.ts'
import Courts from '@/features/court-reservation/components/Courts/index.tsx'
import LocationModal from '@/features/court-reservation/components/LocationModal/index.tsx'
import Pagination from '@/features/court-reservation/components/Pagination/index.tsx'
import { useObserver } from '@/features/court-reservation/components/useObserver/index.tsx'
import { DUMMY_COURTS } from '@/features/court-reservation/constants/court-reservation.ts'
import LocationColorIcon from '@/static/imgs/court-reservation/court-reservation_location_color_icon.svg'
import LocationIcon from '@/static/imgs/court-reservation/court-reservation_location_icon.svg'
import LocationDetailColorIcon from '@/static/imgs/court-reservation/court-reservation_location_under_color_icon.svg'
import LocationDetailIcon from '@/static/imgs/court-reservation/court-reservation_location_under_icon.svg'
import ReservationLogo from '@/static/imgs/court-reservation/court-reservation_reservation_logo.svg'
import SearchIcon from '@/static/imgs/court-reservation/court-reservation_search_icon.svg'

export default function CoatReservation() {
  const bottom = useRef(null)

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
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await getCourtList(0, 10, '족발', '')
  //     // console.log(res.data)
  //   }
  //   fetchData()
  // }, [])
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

  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['courtList', filterCoat, selectedRegion],
    queryFn: ({ pageParam = 0 }) => {
      if (selectedRegion && selectedRegion[0] === '전체') {
        return getCourtList(pageParam, 10, filterCoat)
      }
      return getCourtList(pageParam, 10, filterCoat, selectedRegion.join(','))
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage.data.result.page.number
      if (lastPage.data.result.page.totalPages === page + 1) return false
      return page + 1
    },
    initialPageParam: 0,
  })
  // console.log(data?.pages.map((page) => page.data.result.content))

  // console.log(data)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      fetchNextPage()
    }
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

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
      <div className=" px-2">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex justify-center">
            <ReservationLogo />
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
          {/* {status === 'success' && (
            <Courts
              courtList={data.pages.map((page) => page.data.result.content)}
            />
          )} */}
          {data?.pages.map((page) => (
            <Courts
              courtList={page.data.result.content}
              selectedDate={selectedDate}
              key={page.data.result.page.number}
            />
          ))}
          {/* <Courts courtList={DUMMY_COURTS} selectedDate={selectedDate} /> */}
          {status === 'pending' && <div>로딩중...</div>}
        </div>
        <div ref={bottom} />
      </div>
    </div>
  )
}

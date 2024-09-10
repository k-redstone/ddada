'use client'

import { useState } from 'react'

import { locationName } from '@/features/coat-reservation/constants/location.ts'
import ModalCloseIcon from '@/static/imgs/coat-reservation/coat-reservation_modalclose_icon.svg'

interface LocationModalProps {
  chooseLocation: string[]
  closeModal: () => void
  handleLoactions: (regions: string[]) => void
}

export default function LocationModal({
  chooseLocation,
  closeModal,
  handleLoactions,
}: LocationModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string[]>(chooseLocation)

  const handleSelectedRegion = (region: string) => {
    if (selectedRegion.includes('전체')) {
      setSelectedRegion([region])
      return
    }
    if (selectedRegion.includes(region)) {
      setSelectedRegion(
        selectedRegion.filter((selected) => selected !== region),
      )
      return
    }
    setSelectedRegion([...selectedRegion, region])
  }

  const handleClearSelectedRegion = () => {
    setSelectedRegion(['전체'])
  }

  const handleSelectedAllRegion = () => {
    if (selectedRegion.includes('전체')) {
      setSelectedRegion([])
      return
    }
    setSelectedRegion(['전체'])
  }

  const handleSaveSelectedRegion = () => {
    handleLoactions(selectedRegion)
    console.log(selectedRegion)
    closeModal()
  }
  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden"
        onClick={closeModal}
        aria-hidden="true"
      />
      {/* height 수정 필요 */}
      <div className="flex flex-col gap-6 fixed top-0 left-1/3 z-20 w-[35rem] h-[45.625rem] bg-white rounded-xl overflow-hidden drop-shadow-lg py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">지역 선택</h2>
          <button
            type="button"
            onClick={closeModal}
            aria-label="지역 선택 닫기"
          >
            <ModalCloseIcon />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={handleSelectedAllRegion}
            className={`${
              selectedRegion.includes('전체')
                ? 'bg-[#FCA211] text-white'
                : 'bg-[#F9F9F9] text-[#6B6E78]'
            } border rounded-xl px-4 py-2`}
          >
            전체
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별시</h3>
          <div>
            {locationName.특별시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-[#FCA211] text-white'
                    : 'bg-[#F9F9F9] text-[#6B6E78]'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">도</h3>
          <div className="flex gap-3">
            {locationName.도.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-[#FCA211] text-white'
                    : 'bg-[#F9F9F9] text-[#6B6E78]'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">광역시</h3>
          <div className="flex gap-3">
            {locationName.광역시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-[#FCA211] text-white'
                    : 'bg-[#F9F9F9] text-[#6B6E78]'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별자치도</h3>
          <div className="flex gap-3">
            {locationName.특별자치도.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-[#FCA211] text-white'
                    : 'bg-[#F9F9F9] text-[#6B6E78]'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">특별자치시</h3>
          <div>
            {locationName.특별자치시.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => handleSelectedRegion(region)}
                className={`${
                  selectedRegion.includes(region)
                    ? 'bg-[#FCA211] text-white'
                    : 'bg-[#F9F9F9] text-[#6B6E78]'
                } border rounded-xl px-4 py-2`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <button
            type="button"
            onClick={handleClearSelectedRegion}
            className="text-[#6B6E78] border rounded px-4 py-2"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={handleSaveSelectedRegion}
            className="text-white bg-[#FCA211] rounded px-4 py-2"
          >
            적용
          </button>
        </div>
      </div>
    </>
  )
}

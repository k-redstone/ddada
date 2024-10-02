'use client'

import { useState } from 'react'

import PriceSelectCard from '@/features/racketRecommend/components/PriceSelectCard/index.tsx'
import useRacketRecommendStore from '@/features/racketRecommend/stores/useRacketRecommendStore.ts'
// import { RacketRecommendBranchProps } from '@/features/racketRecommend/types/RacketRecommendType.ts'

export default function Step4() {
  const [selectedPrice, setSelectedPrice] = useState<number[]>([])
  const { setCanMoveNext, setPreference } = useRacketRecommendStore()

  const handlePriceSelect = (price: number) => {
    if (selectedPrice.includes(0)) {
      setSelectedPrice([])
    }

    if (selectedPrice.includes(price)) {
      if (selectedPrice.length - 1 === 0) {
        setCanMoveNext(false)
        setPreference('price', [])
      }
      setPreference('price', [
        ...selectedPrice.filter((item) => item !== price),
      ])

      return setSelectedPrice((prev) => [
        ...prev.filter((item) => item !== price),
      ])
    }

    setCanMoveNext(true)
    setPreference('price', [...selectedPrice, price])

    return setSelectedPrice((prev) => [...prev, price])
  }

  const handlePriceSelectNone = () => {
    if (selectedPrice.includes(0)) {
      setCanMoveNext(false)
      setPreference('price', [])
      return setSelectedPrice([])
    }
    setCanMoveNext(true)
    setPreference('price', [])
    return setSelectedPrice([0])
  }

  return (
    <div className="flex flex-col gap-y-[5.25rem] w-[34rem] ">
      <p className="text-xl text-center">
        구매하려는 라켓의 가격대를 골라주세요
      </p>
      <div className="flex flex-col gap-y-3">
        <button type="button" onClick={() => handlePriceSelectNone()}>
          <PriceSelectCard isClicked={selectedPrice.includes(0)}>
            <span>가격은 상관없어요</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(5)}>
          <PriceSelectCard isClicked={selectedPrice.includes(5)}>
            <span>10만 원 미만</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(10)}>
          <PriceSelectCard isClicked={selectedPrice.includes(10)}>
            <span>10만 원대</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(20)}>
          <PriceSelectCard isClicked={selectedPrice.includes(20)}>
            <span>20만 원대</span>
          </PriceSelectCard>
        </button>
        <button type="button" onClick={() => handlePriceSelect(30)}>
          <PriceSelectCard isClicked={selectedPrice.includes(30)}>
            <span>30만 원대</span>
          </PriceSelectCard>
        </button>
      </div>
    </div>
  )
}

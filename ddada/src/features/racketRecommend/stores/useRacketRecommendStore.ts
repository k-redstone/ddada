import { create } from 'zustand'

interface RacketRecommendStoreProps {
  canMoveNext: boolean
  userPreference: {
    racket: string | null
    balance: string | null
    weight: string | null
    price: number[]
    shaft: string | null
  }

  setCanMoveNext: (value: boolean) => void
  setPreference: (
    key: keyof RacketRecommendStoreProps['userPreference'],
    value: string | number[],
  ) => void
}

const useRacketRecommendStore = create<RacketRecommendStoreProps>()((set) => ({
  canMoveNext: false,

  userPreference: {
    racket: null,
    balance: null,
    weight: null,
    price: [],
    shaft: null,
  },
  setCanMoveNext: (value) =>
    set(() => ({
      canMoveNext: value,
    })),
  setPreference: (key, value) =>
    set((state) => ({
      userPreference: {
        ...state.userPreference,
        [key]: value,
      },
    })),
}))

export default useRacketRecommendStore

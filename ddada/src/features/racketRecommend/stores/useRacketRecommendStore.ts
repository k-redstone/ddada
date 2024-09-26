import { create } from 'zustand'

interface RacketRecommendStoreProps {
  canMoveNext: boolean
  userPreference: {
    racket: number[]
    price: number[]
    balance: string
    weight: string
    shaft: string
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
    racket: [],
    price: [],
    balance: '',
    weight: '',
    shaft: '',
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

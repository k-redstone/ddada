import { create } from 'zustand'

interface RacketRecommendStoreProps {
  userPreference: {
    racket: string | null
    balance: string | null
    weight: string | null
    price: string | null
    shaft: string | null
  }
  setPreference: (
    key: keyof RacketRecommendStoreProps['userPreference'],
    value: string,
  ) => void
}

const useRacketRecommendStore = create<RacketRecommendStoreProps>()((set) => ({
  userPreference: {
    racket: null,
    balance: null,
    weight: null,
    price: null,
    shaft: null,
  },
  setPreference: (key, value) =>
    set((state) => ({
      userPreference: {
        ...state.userPreference,
        [key]: value,
      },
    })),
}))

export default useRacketRecommendStore

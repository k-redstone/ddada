import CommonModal from '@/components/CommonModal/index.tsx'
import RacketDetailCard from '@/features/racketRecommend/components/RacketDetailCard/index.tsx'
import { racketDummy } from '@/features/racketRecommend/dummy/index.ts'
import useSelectRacketStore from '@/features/racketRecommend/stores/useSelectRacketStore.ts'
import { RacketDetailType } from '@/features/racketRecommend/types/RacketRecommendType.ts'
import ModalCloseIcon from '@/static/imgs/court-reservation/court-reservation_modalclose_icon.svg'
import SearchIcon from '@/static/imgs/racketRecommned/SearchIcon.svg'

interface MatchCancelModalProps {
  handleModalClose: () => void
}

export default function RacketSearchModal({
  handleModalClose,
}: MatchCancelModalProps) {
  const { selectedRacketList, updateIsNone, addSelectedRacketList } =
    useSelectRacketStore()

  const handleSelectRacket = (data: RacketDetailType) => {
    if (selectedRacketList.find((item) => item.id === data.id)) {
      return alert('이미 추가한 라켓입니다')
    }
    updateIsNone(false)
    addSelectedRacketList(data)
    return handleModalClose()
  }

  return (
    <CommonModal handleModalClose={handleModalClose}>
      <div className="w-[35rem] bg-white rounded-xl flex flex-col px-6 py-8 gap-y-6 ">
        {/* 헤더 */}
        <div className="flex gap-x-2.5 justify-between">
          <h1 className="text-xl font-bold">라켓 검색</h1>
          <ModalCloseIcon
            className="cursor-pointer"
            onClick={() => handleModalClose()}
          />
        </div>
        {/* 검색 인풋 */}
        <form
          className="flex gap-x-6 py-2 px-4 border border-disabled rounded-full"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="text"
            placeholder="라켓, 브랜드 명으로 검색"
            className="text-xs text-disabled-dark grow focus:outline-none"
          />
          <SearchIcon className="cursor-pointer" />
        </form>
        <div className="max-h-[31.25rem] flex flex-col gap-y-6 overflow-y-scroll pr-2">
          <div
            aria-hidden="true"
            onClick={() => handleSelectRacket(racketDummy)}
          >
            <RacketDetailCard data={racketDummy} />
          </div>
          <div
            aria-hidden="true"
            onClick={() => handleSelectRacket(racketDummy)}
          >
            <RacketDetailCard data={racketDummy} />
          </div>
          <div
            aria-hidden="true"
            onClick={() => handleSelectRacket(racketDummy)}
          >
            <RacketDetailCard data={racketDummy} />
          </div>
        </div>
      </div>
    </CommonModal>
  )
}

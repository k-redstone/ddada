import ScoreBoard from '@/features/manager/components/ScoreBoard/index.tsx'
import { BadmintonProvider } from '@/features/manager/providers/BadmintonProvider.tsx'

export default function Manager() {
  return (
    <div>
      <p>asdf</p>
      <BadmintonProvider>
        <ScoreBoard />
      </BadmintonProvider>
    </div>
  )
}

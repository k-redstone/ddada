import { useEffect, useState } from 'react'

import { fetchUserPk } from '@/api/user/index.ts'
import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'
import { useUserRole } from '@/hooks/queries/user.ts'

export default function useGetUserInfo(data: MatchDetailType) {
  const { data: userRole, isSuccess } = useUserRole()
  const [isTeamA, setIsTeamA] = useState<boolean>(false)
  const [isTeamB, setIsTeamB] = useState<boolean>(false)
  const [playerId, setPlayerId] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (!isSuccess) {
      return
    }
    fetchUserPk().then((res) => {
      setPlayerId(res?.playerId)
      setIsTeamA(
        !![data.team1.player1, data.team1.player2].find(
          (player) => player?.id === res?.playerId,
        ),
      )

      setIsTeamB(
        !![data.team2.player1, data.team2.player2].find(
          (player) => player?.id === res?.playerId,
        ),
      )
    })
  }, [isSuccess, data, userRole?.memberType, playerId])

  return { isTeamA, isTeamB, playerId }
}

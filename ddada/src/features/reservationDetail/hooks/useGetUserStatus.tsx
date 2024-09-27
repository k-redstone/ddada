import { useEffect } from 'react'

import { fetchManagerPk } from '@/features/manager/api/managerAPI.tsx'
import { useFetchUserPk, useUserRole } from '@/hooks/queries/user.ts'

interface useGetUserStatusProps {
  first: string
}

export default function useGetUserStatus({ first }: useGetUserStatusProps) {
  const { data: userRole, isSuccess: isUserRole } = useUserRole()

  useEffect(() => {
    userRole
  }, [isUserRole])
}

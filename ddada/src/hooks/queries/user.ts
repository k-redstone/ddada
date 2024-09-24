import { useQuery } from '@tanstack/react-query'

import { fetchUserProfile, loginUserRole } from '@/api/user/index.ts'

export function useUserRole() {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: loginUserRole,
    staleTime: Infinity,
    retry: 1,
  })
}

export function useFetchUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: Infinity,
    retry: 1,
  })
}

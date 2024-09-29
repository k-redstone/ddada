export type UserProfile = {
  profilePreSignedUrl: string
  nickname: string
  gender: string
}

export type UserRole = {
  memberType: 'PLAYER' | 'MANAGER'
}

export type UserPk = {
  playerId: number
}

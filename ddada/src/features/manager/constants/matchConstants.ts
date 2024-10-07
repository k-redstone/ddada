const EARN_TYPE: { [key: string]: string } = {
  SMASH: '스메시',
  DROP: '드롭',
  CLEAR: '클리어',
  PUSH: '푸시',
  NET: '네트플레이',
  SERVE: '서브',
}
const MISS_TYPE: { [key: string]: string } = {
  SERVE_MISS: '서브폴트',
}

const MATCH_STATUS: { [key: string]: string } = {
  CREATED: '모집중',
  RESERVED: '예약됨',
  PLAYING: '진행중',
  FINISHED: '종료됨',
  CANCELED: '취소됨',
}

const MATCH_TYPE: { [key: string]: string } = {
  FEMALE_SINGLE: '여성단식',
  MALE_SINGLE: '남성단식',
  FEMALE_DOUBLE: '여성복식',
  MALE_DOUBLE: '남성복식',
  MIXED_DOUBLE: '혼합복식',
}

export { EARN_TYPE, MISS_TYPE, MATCH_STATUS, MATCH_TYPE }

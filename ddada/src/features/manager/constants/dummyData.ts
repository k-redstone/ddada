import { MatchDetailType } from '@/features/manager/types/MatchDataType.ts'

const singleDummy = {
  id: 1,
  courtName: '성동구 금호스포츠센터 10번코트',
  addr: '가끔너무긴이름의장소들이있는데요이럴경우이럴경우 이럴경우',
  number: 4,
  time: new Date('2024-09-10T12:24:00'),
}
const objectDummy = {
  team1: [
    {
      id: 100,
      nickname: '박상우',
    },
    {
      id: 101,
      nickname: '윤경서',
    },
  ],
  team2: [
    {
      id: 102,
      nickname: '정한수',
    },
    {
      id: 103,
      nickname: '최성철',
    },
  ],
}

const listDummy = [
  {
    id: 1,
    courtName: '성동구 금호스포츠센터 10번코트',
    addr: '가끔너무긴이름의장소들이있는데요이럴경우이럴경우 이럴경우',
    number: 4,
    time: new Date('2024-09-10T12:24:00'),
    status: 'reserved',
  },
  {
    id: 2,
    courtName: '대현산체육관 4번코트',
    addr: '서울특별시 성동구 독서당로63길 44',
    number: 2,
    time: new Date('2024-09-13T21:24:00'),
    status: 'reserved',
  },
  {
    id: 3,
    courtName: '성동구 금호스포츠센터 2번코트',
    addr: '서울특별시 성동구 금호로 20',
    number: 4,
    time: new Date('2024-09-13T21:24:00'),
    status: 'play',
  },
  {
    id: 4,
    courtName: '성동구 금호스포츠센터 2번코트',
    addr: '서울특별시 성동구 금호로 20',
    number: 1,
    time: new Date('2024-09-13T21:24:00'),
    status: 'reserved',
  },
  {
    id: 5,
    courtName: '성동구 금호스포츠센터 2번코트',
    addr: '서울특별시 성동구 금호로 20',
    number: 2,
    time: new Date('2024-09-13T21:24:00'),
    status: 'reserved',
  },
]

const REALDATADUMMY: MatchDetailType = {
  id: 1,
  court: {
    id: 32,
    name: '서울시 청소년수련관',
    address: '서울특별시 강남구 역삼동 11-1',
    status: 'PLAYING',
    image: 's3-url',
    facilities: ['WIFI'],
    contactNumber: '02-123-1234',
    description: '특이사항~~',
    reservations: {
      '2024-09-12': ['10:00', '14:00'],
      '2024-09-13': ['10:00', '12:00'],
      '2024-09-14': ['12:00', '14:00'],
    },
  },
  team1: {
    id: 20,
    player1: {
      id: 41,
      nickname: '김땡땡',
      gender: 'MALE',
      rating: 1234,
      image: 'string',
    },
    player2: {
      id: 102,
      nickname: '박땡땡',
      gender: 'MALE',
      rating: 1234,
      image: 'string',
    },
  },
  team2: {
    id: 30,
    player1: {
      id: 56,
      nickname: '최모씨',
      gender: 'MALE',
      rating: 1234,
      image: 'string',
    },
    player2: {
      id: 33,
      nickname: '이모씨',
      gender: 'MALE',
      rating: 1234,
      image: 'string',
    },
  },
  winnerTeamNumber: null,
  manager: {
    id: 3,
    nickname: '도매니저',
  },
  team1SetScore: null,
  team2SetScore: null,
  status: 'FINISHED',
  rankType: 'RANK',
  matchType: 'FEMALE_DOUBLE',
  date: '2024-09-07',
  time: '10:00',
  sets: [],
}

export { singleDummy, objectDummy, listDummy, REALDATADUMMY }

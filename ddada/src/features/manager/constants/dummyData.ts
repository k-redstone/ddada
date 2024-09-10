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
]

export { singleDummy, objectDummy, listDummy }

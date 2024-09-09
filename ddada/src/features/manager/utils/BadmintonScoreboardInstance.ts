'use client'

type TeamType = {
  id: number
  nickname: string
}
type ScoreType = {
  team1: number
  team2: number
}
type HistoryType = {
  setScores: ScoreType
  matchScores: ScoreType
  currentSet: number
  scoreNumber: number
  winner: number | null
}

/**
 * 배드민턴 인스턴스
 */
class BadmintonScoreboardInstance {
  teams: {
    team1: TeamType[]
    team2: TeamType[]
  }
  gameresult: {
    [key: `matchScore_${number}`]: ScoreType | null
    setScore: ScoreType | null
  }
  history: HistoryType[]
  setScores: ScoreType
  matchScores: ScoreType
  currentHistoryIndex: number
  currentSet: number
  winner: number | null

  /**
   * constructor
   * @param {number} gameId
   * @param {string} gameType singles | doubles
   * @param {object} teamConfig teamData
   */

  constructor(
    gameId?: number,
    gameType?: string,
    teamConfig?: {
      team1: TeamType[]
      team2: TeamType[]
    },
  ) {
    this.teams = {
      team1: teamConfig?.team1 ?? [],
      team2: teamConfig?.team2 ?? [],
    }
    // this.teams =
    //   gameType === 'doubles'
    //     ? teamConfig
    //     : {
    //         team1: teamConfig.team1,
    //         team2: teamConfig.team2,
    //       }

    this.setScores = {
      team1: 0,
      team2: 0,
    }
    this.matchScores = {
      team1: 0,
      team2: 0,
    }
    this.gameresult = {
      matchScore_1: null,
      matchScore_2: null,
      matchScore_3: null,
      setScore: null,
    }

    this.history = [] // 상태 히스토리를 저장하는 배열
    this.currentHistoryIndex = -1 // 현재 히스토리의 위치
    this.winner = null
    this.currentSet = 1
  }

  initialize() {
    const savedData = BadmintonScoreboardInstance.loadFromLocalStorage()
    if (savedData) {
      this.setScores = savedData.setScores
      this.matchScores = savedData.matchScores
      this.currentSet = savedData.currentSet
      this.winner = savedData.winner
      this.history = savedData.history || []
      this.currentHistoryIndex = savedData.currentHistoryIndex || -1
      this.gameresult = savedData.gameResult
    } else {
      this.saveToHistory()
    }
  }

  /**
   * pointScored
   * @param player userId
   * @param earnedType
   * @param missedUser
   */
  pointScored(player: number, earnedType: string, missedUser: Array<number>) {
    if (this.winner || !this.teams) return

    // 팀 구별
    const team = this.teams.team1?.some((user) => user.id === player)
      ? 'team1'
      : 'team2'
    const opponentTeam = team === 'team1' ? 'team2' : 'team1'
    console.log(player)
    // 득점 반영
    if (earnedType === 'SERVE') {
      this.matchScores[opponentTeam] += 1
    } else if (player === -1) {
      this.matchScores[opponentTeam] += 1
    } else {
      this.matchScores[team] += 1
    }
    console.log(`유저 ${player} 팀${team} 점수${this.matchScores[team]} `)
    console.log(`득점유형 ${earnedType} 실책 선수 ${missedUser}`)

    // 세트 종료 분기처리
    if (
      this.matchScores[team] - this.matchScores[opponentTeam] >= 2 &&
      this.matchScores[team] >= 3
    ) {
      this.setScores[team] += 1
      this.checkMatchWinner()
      if (!this.winner) {
        this.nextSet()
      }
    }
    if (
      this.matchScores[opponentTeam] - this.matchScores[team] >= 2 &&
      this.matchScores[opponentTeam] >= 3
    ) {
      this.setScores[opponentTeam] += 1
      this.checkMatchWinner()
      if (!this.winner) {
        this.nextSet()
      }
    }

    // 데이터 저장
    this.saveToHistory(player, earnedType, missedUser)
    this.saveToLocalStorage()
  }

  finishMatch() {
    // 게임이 끝났는지 확인
    if (this.winner) {
      localStorage.removeItem('badmintonScoreboard')
    }
    throw new Error('asdf')
  }

  checkMatchWinner() {
    if (this.setScores.team1 === 2) {
      this.winner = 1 // 팀1 승리
      this.gameresult.setScore = this.setScores
      this.gameresult[`matchScore_${this.currentSet}`] = this.matchScores
      this.currentSet += 1
      console.log('팀1이 매치에서 승리했습니다.')
    } else if (this.setScores.team2 === 2) {
      this.winner = 2 // 팀2 승리
      this.gameresult.setScore = this.setScores
      this.gameresult[`matchScore_${this.currentSet}`] = this.matchScores
      this.currentSet += 1
      console.log('팀2가 매치에서 승리했습니다.')
    }
  }

  nextSet() {
    if (!this.winner) {
      this.gameresult[`matchScore_${this.currentSet}`] = this.matchScores
      this.currentSet += 1
      this.matchScores = { team1: 0, team2: 0 }
      console.log(`세트 ${this.currentSet} 시작`)
      // 세트 진행 후 승자 체크
      if (this.currentSet > 3) {
        console.log('경기가 세트 최대 수를 초과했습니다.')
      }
    }
  }

  /**
   * 현재 스코어 반환
   */
  getScore() {
    return { setScores: this.setScores, matchScores: this.matchScores }
  }

  /**
   * 상대팀 선수 반환
   */
  getOpponent(player: number) {
    if (this.winner || !this.teams) return null
    const team = this.teams.team1?.some((user) => user.id === player)
      ? 'team2'
      : 'team1'
    return this.teams[team]
  }

  /**
   * history undo
   */
  undo() {
    if (this.currentHistoryIndex > 0) {
      this.currentHistoryIndex -= 1
      this.applyState(this.history[this.currentHistoryIndex])
    }
  }

  /**
   * history redo
   */
  redo() {
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.currentHistoryIndex += 1

      this.applyState(this.history[this.currentHistoryIndex])
    }
  }

  /**
   * state 적용
   */
  applyState(state: {
    setScores: ScoreType
    matchScores: ScoreType
    currentSet: number
    winner: number | null
  }) {
    this.setScores = { ...state.setScores }
    this.matchScores = { ...state.matchScores }
    this.currentSet = state.currentSet
    this.winner = state.winner

    this.saveToLocalStorage()
  }

  saveToHistory(
    player?: number,
    earnedType?: string,
    missedUser?: Array<number>,
  ) {
    // 현재 상태를 히스토리에 저장하고, 인덱스 갱신
    const currentState = {
      player,
      earnedType,
      missedUser,
      scoreNumber: this.currentHistoryIndex,
      currentSet: this.currentSet,
      setScores: { ...this.setScores },
      matchScores: { ...this.matchScores },
      winner: this.winner,
    }
    // 현재 인덱스보다 이후의 히스토리가 존재할 경우 삭제 (되돌리기 후 새로 입력된 경우)
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentHistoryIndex + 1)
    }
    this.history.push(currentState)
    this.currentHistoryIndex += 1
  }

  saveToLocalStorage() {
    const data = {
      currentSet: this.currentSet,
      setScores: this.setScores,
      matchScores: this.matchScores,
      winner: this.winner,
      history: this.history, // 히스토리 저장
      currentHistoryIndex: this.currentHistoryIndex, // 현재 인덱스 저장
      gameResult: this.gameresult,
      teams: this.teams,
    }

    localStorage.setItem('badmintonScoreboard', JSON.stringify(data))
  }

  static loadFromLocalStorage() {
    const savedData = localStorage.getItem(`badmintonScoreboard`)
    return savedData ? JSON.parse(savedData) : null
  }
}

export default BadmintonScoreboardInstance

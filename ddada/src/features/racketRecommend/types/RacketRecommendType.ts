export enum ProgressStepType {
  main = 'main',
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
  step5 = 'step5',
  loading = 'loading',
}

export type RacketRecommendBranchProps = {
  progressStep?: ProgressStepType
  changeProgress: (arg: ProgressStepType) => void
  // changeMoveNext: (arg: boolean) => void
  changeStep: (arg: number) => void
}

export type RacketDetailType = {
  id: number
  name: string
  weight: string
  material: string
  image: string
  made: string
}

export type RacketShortType = {
  id: number
  name: string
  made: string
  image: string
}

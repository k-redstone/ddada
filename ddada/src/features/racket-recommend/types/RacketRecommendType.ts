export enum ProgressStepType {
  main = 'main',
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
}

export type RacketRecommendBranchProps = {
  progressStep?: ProgressStepType
  changeProgress: (arg: ProgressStepType) => void
}

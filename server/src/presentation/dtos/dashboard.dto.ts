export class DashboardDto {
  constructor(
    public readonly candidates: number,
    public readonly resumes: number,
    public readonly companies: number,
    public readonly jobs: number,
    public readonly applies: number,
    public readonly percentageOfAnswerApplies: number,
    public readonly candidatesHired: number,
    public readonly candidatesWithLeastOneApply: number,
    public readonly candidatesWithLeastOneApplyPercentage: number,
    public readonly appliesPerJobAverage: number,
    public readonly appliesPerCandidateAverage: number,
    public readonly candidatesPerJobAverage: number,
  ) {}
}

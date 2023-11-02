import { Injectable } from '@nestjs/common';
import { CandidateService } from '../candidate.service';

@Injectable()
export class GetCandidateResumeUseCase {
  constructor(private readonly candidateService: CandidateService) {}

  async execute(userId: string) {
    return this.candidateService.getResumeFromCandidate(userId);
  }
}

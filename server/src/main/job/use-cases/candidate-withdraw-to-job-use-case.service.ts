import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';

@Injectable()
export class CandidateWithdrawToJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(jobSlug: string, userId: string) {
    return this.jobService.withdrawCandidate(jobSlug, userId);
  }
}

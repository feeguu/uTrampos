import { Injectable } from '@nestjs/common';
import { ApplyService } from '../apply.service';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';

@Injectable()
export class GetAppliesByCandidateUseCase {
  constructor(private readonly applyService: ApplyService) {}
  async execute(userId: string, status?: ApplyStatus) {
    if (status) {
      return this.applyService.getAppliesByCandidateAndStatus(userId, status);
    }
    return this.applyService.getAppliesByCandidate(userId);
  }
}

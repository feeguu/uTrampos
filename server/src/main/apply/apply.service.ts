import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { ApplyDto } from '@/presentation/dtos/job/entities/apply.dto';
import { ApplyMapper } from '@/presentation/mappers/apply.mapper';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ApplyService {
  constructor(
    private readonly applyRepository: ApplyRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}
  async getAppliesByCandidate(userId: string): Promise<ApplyDto[]> {
    const candidate = await this.candidateRepository.findByUserId(userId);
    const applies = await this.applyRepository.findByCandidate(candidate.id);
    return applies.map((apply) => ApplyMapper.toDto(apply));
  }
  private static readonly STATUS_ORDER = [
    ApplyStatus.PENDING,
    ApplyStatus.INTERVIEW_SCHEDULED,
    ApplyStatus.INTERVIEW_COMPLETED,
    ApplyStatus.OFFERED,
    ApplyStatus.ACCEPTED,
  ];
  private static readonly FINISHED_STATUS = [
    ApplyStatus.REJECTED,
    ApplyStatus.WITHDRAWN,
    ApplyStatus.ACCEPTED,
  ];

  async getAppliesByCandidateAndStatus(
    userId: string,
    status: ApplyStatus,
  ): Promise<ApplyDto[]> {
    const candidate = await this.candidateRepository.findByUserId(userId);
    const applies = await this.applyRepository.findByCandidateAndStatus(
      candidate.id,
      status,
    );
    return applies.map((apply) => ApplyMapper.toDto(apply));
  }

  async proceedApply(applyId: string, userId: string): Promise<ApplyDto> {
    const apply = await this.applyRepository.find(applyId);
    if (!apply) {
      throw new NotFoundException('Apply not found');
    }
    if (apply.job.company.user.id !== userId) {
      throw new NotFoundException('Apply not found');
    }

    if (ApplyService.FINISHED_STATUS.includes(apply.status)) {
      throw new BadRequestException('Apply already finished');
    }
    const index = ApplyService.STATUS_ORDER.indexOf(apply.status);
    apply.status = ApplyService.STATUS_ORDER[index + 1];
    await this.applyRepository.update(apply.id, apply);
    return ApplyMapper.toDto(apply);
  }

  async rejectApply(applyId: string, userId: string): Promise<ApplyDto> {
    const apply = await this.applyRepository.find(applyId);
    if (!apply) {
      throw new NotFoundException('Apply not found');
    }
    if (apply.job.company.user.id !== userId) {
      throw new NotFoundException('Apply not found');
    }
    if (ApplyService.FINISHED_STATUS.includes(apply.status)) {
      throw new BadRequestException('Apply already finished');
    }
    apply.status = ApplyStatus.REJECTED;
    await this.applyRepository.update(apply.id, apply);
    return ApplyMapper.toDto(apply);
  }
}

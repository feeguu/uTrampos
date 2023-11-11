import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { ApplyDto } from '@/presentation/dtos/job/entities/apply.dto';
import { ApplyMapper } from '@/presentation/mappers/apply.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class applyService {
  constructor(
    private readonly applyRepository: ApplyRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}
  async getAppliesByCandidate(userId: string): Promise<ApplyDto[]> {
    const candidate = await this.candidateRepository.findByUserId(userId);
    const applies = await this.applyRepository.findByCandidate(candidate.id);
    return applies.map((apply) => ApplyMapper.toDto(apply));
  }

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
}

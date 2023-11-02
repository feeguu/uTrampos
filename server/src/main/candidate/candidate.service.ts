import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { ResumeMapper } from '@/presentation/mappers/resume.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CandidateService {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly resumeRepository: ResumeRepository,
  ) {}

  async getResumeFromCandidate(id: string) {
    const candidate = await this.candidateRepository.findByUserId(id);
    if (!candidate) throw new NotFoundException('Candidate not found');
    const resume = await this.resumeRepository.getByUserId(candidate.user.id);
    if (!resume) throw new NotFoundException('Resume not found');
    return ResumeMapper.toDto(resume);
  }
}

import { Candidate } from '@/domain/entities/candidate.entity';
import { CandidateDto } from '../dtos/candidate.dto';

export class CandidateMapper {
  static toDto(candidate: Candidate): CandidateDto {
    const {
      user: { password, ...user },
      ...candidateDto
    } = candidate;
    return {
      user,
      ...candidateDto,
    };
  }
}

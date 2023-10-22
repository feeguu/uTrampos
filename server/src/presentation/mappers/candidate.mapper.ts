import { Candidate } from '@/domain/entities/candidate.entity';
import { CandidateDto } from '../dtos/candidate.dto';
import { UserMapper } from './user.mapper';

export class CandidateMapper {
  static toDto(candidate: Candidate): CandidateDto {
    const { user, ...candidateDto } = candidate;
    return {
      user: UserMapper.toDto(candidate.user),
      ...candidateDto,
    };
  }
}

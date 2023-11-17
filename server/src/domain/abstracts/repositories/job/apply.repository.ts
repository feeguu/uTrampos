import { Apply } from '@/domain/entities/job/apply.entity';
import { Repository } from '../generic.repository';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';

export interface SearchAppliesFilters {
  status?: ApplyStatus;
  jobId?: string;
  query?: string;
  limit?: number;
  offset?: number;
}

export abstract class ApplyRepository extends Repository<Apply> {
  abstract findByJob(jobId: string): Promise<Apply[]>;
  abstract findByCandidate(candidateId: string): Promise<Apply[]>;
  abstract findByCandidateAndStatus(
    candidateId: string,
    status: ApplyStatus,
  ): Promise<Apply[]>;
  abstract findByJobAndCandidate(
    jobId: string,
    candidateId: string,
  ): Promise<Apply>;
  abstract searchApplies(filters: SearchAppliesFilters): Promise<Apply[]>;
}

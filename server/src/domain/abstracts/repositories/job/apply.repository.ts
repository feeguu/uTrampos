import { Apply } from '@/domain/entities/job/apply.entity';
import { Repository } from '../generic.repository';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';

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
}

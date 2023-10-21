import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { Candidate } from '../candidate.entity';
import { Job } from './job.entity';

export class Apply {
  public id: string;
  // ISO 8601
  public datetime: string;
  public job: Job;
  public candidate: Candidate;
  public status: ApplyStatus = ApplyStatus.PENDING;

  constructor(apply: Omit<Apply, 'id'>) {
    this.job = apply.job;
    this.candidate = apply.candidate;
    this.datetime = new Date().toISOString();
  }
}

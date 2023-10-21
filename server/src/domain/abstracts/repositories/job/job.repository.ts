import { Job } from '@/domain/entities/job/job.entity';
import { Repository } from '../generic.repository';
import { ContractType } from '@/domain/enums/contract-type.enum';

export interface SearchFilters {
  salaryRange: {
    min?: number;
    max?: number;
  };
  contractType?: ContractType;
}

export abstract class JobRepository extends Repository<Job> {
  abstract findByCompany(companyId: string): Promise<Job[]>;
  abstract searchJobs(search: string, filters?: SearchFilters): Promise<Job[]>;
  abstract findJobsByApplicant(applicantId: string): Promise<Job[]>;
  abstract findJobBySlug(slug: string): Promise<Job>;
}

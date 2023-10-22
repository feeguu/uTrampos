import {
  JobRepository,
  SearchFilters,
} from '@/domain/abstracts/repositories/job/job.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmJob } from '../../entities/job/typeorm-job.entity';
import {
  Any,
  Between,
  FindOptionsOrder,
  FindOptionsRelations,
  Like,
  Repository,
} from 'typeorm';
import { Job } from '@/domain/entities/job/job.entity';
import { ContractType } from '@/domain/enums/contract-type.enum';

export class TypeOrmJobRepository implements JobRepository {
  static readonly RELATIONS: FindOptionsRelations<TypeOrmJob> = {
    sections: true,
    company: {
      user: true,
    },
    applies: true,
  };
  static readonly ORDER_SECTIONS: FindOptionsOrder<TypeOrmJob> = {
    sections: {
      order: 'ASC',
    },
  };
  constructor(
    @InjectRepository(TypeOrmJob)
    private readonly jobRepository: Repository<TypeOrmJob>,
  ) {}
  async create(job: Job): Promise<Job> {
    return await this.jobRepository.save(job);
  }

  async find(id: string): Promise<Job> {
    return await this.jobRepository.findOne({
      where: { id },
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
    });
  }

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find({
      relations: TypeOrmJobRepository.RELATIONS,
    });
  }

  async update(id: string, job: Partial<Job>): Promise<Job> {
    const jobToUpdate = await this.jobRepository.findOne({
      where: { id },
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
    });
    if (!jobToUpdate) return null;
    Object.assign(jobToUpdate, job);
    await this.jobRepository.update(id, job);
    return jobToUpdate;
  }

  async delete(id: string): Promise<void> {
    await this.jobRepository.delete({ id });
  }

  async findByCompany(companyId: string): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { company: { id: companyId } },
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
    });
  }

  async findJobsByApplicant(applicantId: string): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { applies: { candidate: { id: applicantId } } },
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
    });
  }

  async findJobBySlug(slug: string): Promise<Job> {
    return await this.jobRepository.findOne({
      where: { slug },
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
    });
  }

  async searchJobs(search: string, filters?: SearchFilters): Promise<Job[]> {
    // TODO: Implement FTS
    // TODO: Implement filters
    const salaryRangeClause = Between(
      Math.min(filters.salaryRange.min, 0),
      Math.max(filters.salaryRange.max, 999999999),
    );

    return await this.jobRepository.find({
      relations: TypeOrmJobRepository.RELATIONS,
      order: TypeOrmJobRepository.ORDER_SECTIONS,
      where: {
        title: Like(`%${search}%`),
        salary: salaryRangeClause,
        contractType:
          filters.contractType ||
          Any([
            ContractType.CLT,
            ContractType.PJ,
            ContractType.INTERNSHIP,
            ContractType.TEMPORARY,
            ContractType.OTHER,
          ]),
      },
    });
  }
}

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
  SelectQueryBuilder,
} from 'typeorm';
import { Job } from '@/domain/entities/job/job.entity';
import { TypeOrmSection } from '../../entities/job/typeorm-section.entity';
import {TypeOrmApply} from "../../entities/job/typeorm-apply.entity"
export class TypeOrmJobRepository implements JobRepository {
  static readonly RELATIONS: FindOptionsRelations<TypeOrmJob> = {
    sections: true,
    company: {
      user: true,
    },
    applies: {
      candidate: {
        user: true,
        resume: {
          educations: true,
          professionalExperiences: true,
          skills: true,
          languages: true,
          socialNetworks: true,
          academicProjects: true,
        },
      },
    },
  };
  static readonly ORDER_SECTIONS: FindOptionsOrder<TypeOrmJob> = {
    sections: {
      order: 'ASC',
    },
  };
  constructor(
    @InjectRepository(TypeOrmJob)
    private readonly jobRepository: Repository<TypeOrmJob>,
    @InjectRepository(TypeOrmSection)
    private readonly sectionRepository: Repository<TypeOrmSection>,
    @InjectRepository(TypeOrmApply)
    private readonly applyRepository: Repository<TypeOrmApply>,
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
    await this.jobRepository.save(jobToUpdate);
    return jobToUpdate;
  }

  async delete(id: string): Promise<void> {
    await this.applyRepository.delete({job: {id}})
    await this.sectionRepository.delete({ job: { id } });
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

  async searchJobs(filters?: SearchFilters): Promise<Job[]> {
    const sanitizedQuery = filters.q
      ? filters.q
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      : null;
    const queryBuilder = this.jobRepository.createQueryBuilder('job');
    queryBuilder.leftJoinAndSelect('job.company', 'company');
    queryBuilder.leftJoinAndSelect('company.user', 'user');
    queryBuilder.leftJoinAndSelect('job.sections', 'sections');
    queryBuilder.leftJoinAndSelect('job.applies', 'applies');
    queryBuilder.leftJoinAndSelect('applies.candidate', 'candidate');
    queryBuilder.addSelect([
      'job.id',
      'job.title',
      'job.slug',
      'job.description',
      'job.address',
      'job.salary',
      'job.contractType',
      'job.keywords',
    ]);
    if (filters.q) {
      queryBuilder.addSelect(
        `ts_rank(document, plainto_tsquery('portuguese', '${sanitizedQuery}'))`,
        'rank',
      );
      queryBuilder.andWhere(
        `document @@ plainto_tsquery('portuguese', :query)`,
        {
          query: sanitizedQuery,
        },
      );
      queryBuilder.orderBy('rank', 'DESC');
    }
    if (filters.contractType) {
      queryBuilder.andWhere('job.contractType = :contractType', {
        contractType: filters.contractType,
      });
    }
    if (filters.salaryRange.min) {
      queryBuilder.andWhere('job.salary >= :minSalary', {
        minSalary: filters.salaryRange.min,
      });
    }
    if (filters.salaryRange.max) {
      queryBuilder.andWhere('job.salary <= :maxSalary', {
        maxSalary: filters.salaryRange.max,
      });
    }
    if (filters.location) {
      queryBuilder.andWhere('job.address ilike :location', {
        location: `%${filters.location}%`,
      });
    }
    if (filters.limit) {
      queryBuilder.take(filters.limit);
    }
    if (filters.offset) {
      queryBuilder.skip(filters.offset);
    }
    return await queryBuilder.getMany();
  }
}

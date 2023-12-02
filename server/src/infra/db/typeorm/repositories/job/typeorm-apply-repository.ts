import {
  ApplyRepository,
  SearchAppliesFilters,
} from '@/domain/abstracts/repositories/job/apply.repository';
import { Apply } from '@/domain/entities/job/apply.entity';
import { Injectable } from '@nestjs/common';
import { FindOptionsRelations, Repository } from 'typeorm';
import { TypeOrmApply } from '../../entities/job/typeorm-apply.entity';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmApplyRepository implements ApplyRepository {
  private static RELATIONS: FindOptionsRelations<TypeOrmApply> = {
    candidate: {
      user: true,
    },
    job: {
      company: {
        user: true,
      },
      sections: true,
    },
  };
  constructor(
    @InjectRepository(TypeOrmApply)
    private readonly applyRepository: Repository<TypeOrmApply>,
  ) {}
  async create(entity: Apply): Promise<Apply> {
    return this.applyRepository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.applyRepository.delete(id);
  }
  async find(id: string): Promise<Apply> {
    return (
      this.applyRepository.findOne({
        where: { id },
        relations: TypeOrmApplyRepository.RELATIONS,
      }) || null
    );
  }
  async findByJob(jobId: string): Promise<Apply[]> {
    return this.applyRepository.find({
      where: { job: { id: jobId } },
      relations: TypeOrmApplyRepository.RELATIONS,
    });
  }
  async findByJobAndCandidate(jobId: string, userId: string): Promise<Apply> {
    return (
      this.applyRepository.findOne({
        where: {
          job: { id: jobId },
          candidate: { user: { id: userId } },
        },
        relations: TypeOrmApplyRepository.RELATIONS,
      }) || null
    );
  }
  async findByCandidateAndStatus(
    candidateId: string,
    status: ApplyStatus,
  ): Promise<Apply[]> {
    return this.applyRepository.find({
      where: { candidate: { id: candidateId }, status },
      relations: TypeOrmApplyRepository.RELATIONS,
    });
  }
  async findByCandidate(candidateId: string): Promise<Apply[]> {
    return this.applyRepository.find({
      where: { candidate: { id: candidateId } },
      relations: TypeOrmApplyRepository.RELATIONS,
    });
  }
  async findAll(): Promise<Apply[]> {
    return this.applyRepository.find({
      relations: TypeOrmApplyRepository.RELATIONS,
    });
  }
  async update(id: string, entity: Apply): Promise<Apply> {
    const apply = await this.applyRepository.findOne({
      where: { id },
      relations: TypeOrmApplyRepository.RELATIONS,
    });
    if (!apply) return null;
    Object.assign(apply, entity);
    return this.applyRepository.save(entity);
  }

  async searchApplies(filters: SearchAppliesFilters): Promise<Apply[]> {
    const { jobId, status, query, limit, offset } = filters;
    const queryBuilder = this.applyRepository.createQueryBuilder('apply');
    queryBuilder.leftJoinAndSelect('apply.candidate', 'candidate');
    queryBuilder.leftJoinAndSelect('candidate.resume', 'resume');
    queryBuilder.leftJoinAndSelect('candidate.user', 'user');
    queryBuilder.leftJoinAndSelect('apply.job', 'job');
    queryBuilder.leftJoinAndSelect('job.sections', 'sections')
    queryBuilder.leftJoinAndSelect('job.company', 'company');
    queryBuilder.leftJoinAndSelect('company.user', 'companyUser');
    if (jobId) queryBuilder.andWhere('job.id = :jobId', { jobId });
    if (status) queryBuilder.andWhere('apply.status = :status', { status });
    if (query) {
      const sanitizedQuery = query
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      queryBuilder.addSelect(
        `ts_rank(resume.document, plainto_tsquery('portuguese', ${sanitizedQuery}))`,
        'rank',
      );
      queryBuilder.andWhere(
        `resume.document @@ plainto_tsquery('portuguese', :query)`,
        {
          query: sanitizedQuery,
        },
      );
      queryBuilder.orderBy('rank', 'DESC');
    }
    if (limit) queryBuilder.take(limit);
    if (offset) queryBuilder.skip(offset);
    return queryBuilder.getMany();
  }
}

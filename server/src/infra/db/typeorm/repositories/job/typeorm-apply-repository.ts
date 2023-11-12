import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
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
    return this.applyRepository.find();
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
}

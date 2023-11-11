import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { Apply } from '@/domain/entities/job/apply.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmApply } from '../../entities/job/typeorm-apply.entity';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmApplyRepository implements ApplyRepository {
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
    return this.applyRepository.findOne({ where: { id } }) || null;
  }
  async findByJob(jobId: string): Promise<Apply[]> {
    return this.applyRepository.find({ where: { job: { id: jobId } } });
  }
  async findByJobAndCandidate(jobId: string, userId: string): Promise<Apply> {
    return (
      this.applyRepository.findOne({
        where: { job: { id: jobId }, candidate: { user: { id: userId } } },
      }) || null
    );
  }
  async findByCandidateAndStatus(
    candidateId: string,
    status: ApplyStatus,
  ): Promise<Apply[]> {
    return this.applyRepository.find({
      where: { candidate: { id: candidateId }, status },
    });
  }
  async findByCandidate(candidateId: string): Promise<Apply[]> {
    return this.applyRepository.find({
      where: { candidate: { id: candidateId } },
    });
  }
  async findAll(): Promise<Apply[]> {
    return this.applyRepository.find();
  }
  async update(id: string, entity: Apply): Promise<Apply> {
    const apply = await this.applyRepository.findOne({ where: { id } });
    if (!apply) return null;
    Object.assign(entity, apply);
    return this.applyRepository.save(entity);
  }
}

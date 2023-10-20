import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { Resume } from '@/domain/entities/resume/resume.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmResume } from '../../entities/resume/typeorm-resume.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmResumeRepository implements ResumeRepository {
  constructor(
    @InjectRepository(TypeOrmResume)
    private readonly resumeRepo: Repository<Resume>,
  ) {}
  async create(entity: Resume): Promise<Resume> {
    const newResume = this.resumeRepo.create(entity);
    await this.resumeRepo.save(newResume);
    return newResume;
  }
  async find(id: string): Promise<Resume> {
    return await this.resumeRepo.findOne({ where: { id } });
  }
  async findAll(): Promise<Resume[]> {
    return await this.resumeRepo.find();
  }
  async delete(id: string): Promise<void> {
    await this.resumeRepo.delete(id);
  }
  async update(id: string, entity: Partial<Resume>): Promise<Resume | null> {
    const resume = await this.resumeRepo.findOne({ where: { id } });
    if (!resume) return null;
    await this.resumeRepo.update(id, entity);
    return Object.assign(resume, entity);
  }
  async getByUserId(userId: string): Promise<Resume> {
    return await this.resumeRepo.findOne({
      where: { candidate: { user: { id: userId } } },
    });
  }
}

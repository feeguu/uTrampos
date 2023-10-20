import { Resume } from '@/domain/entities/resume/resume.entity';
import { Repository } from '../generic.repository';

export abstract class ResumeRepository extends Repository<Resume> {
  public abstract getByUserId(userId: string): Promise<Resume | null>;
}

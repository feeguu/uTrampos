import { Resume } from '@/domain/entities/resume/resume.entity';
import { Repository } from '../generic.repository';
import { EducationType } from '@/domain/enums/education-type';

export interface SearchFilters {
  name?: string;
  query?: string;
  skills?: string[];
  languages?: string[];
  minEducationLevel?: EducationType;
}

export abstract class ResumeRepository extends Repository<Resume> {
  public abstract getByUserId(userId: string): Promise<Resume | null>;
  public abstract searchResumes(
    searchFilters?: SearchFilters,
  ): Promise<Resume[]>;
}

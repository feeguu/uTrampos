import { AcademicProject } from '@/domain/entities/resume/academic-project.entity';
import { Repository } from '../generic.repository';

export abstract class AcademicProjectRepository extends Repository<AcademicProject> {
  public abstract getByResumeId(resumeId: string): Promise<AcademicProject[]>;
}

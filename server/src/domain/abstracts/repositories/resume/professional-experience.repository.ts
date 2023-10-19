import { ProfessionalExperience } from '@/domain/entities/resume/professional-experience.entity';
import { Repository } from '../generic.repository';

export abstract class ProfessionalExperienceRepository extends Repository<ProfessionalExperience> {
  public abstract getByResumeId(
    resumeId: String,
  ): Promise<ProfessionalExperience[]>;
}

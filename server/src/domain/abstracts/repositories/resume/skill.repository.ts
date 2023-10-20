import { Skill } from '@/domain/entities/resume/skill.entity';
import { Repository } from '../generic.repository';
import { ExperienceTime } from '@/domain/enums/experience-time.enum';

export abstract class SkillRepository extends Repository<Skill> {
  public abstract findByNameAndExperience(
    name: string,
    experienceTime: ExperienceTime,
  ): Promise<Skill>;
}

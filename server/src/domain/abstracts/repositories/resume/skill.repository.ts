import { Skill } from '@/domain/entities/resume/skill.entity';
import { Repository } from '../generic.repository';

export abstract class SkillRepository extends Repository<Skill> {
  abstract findByUserId(userId: string): Promise<Skill[]>;
}

import { SkillRepository } from '@/domain/abstracts/repositories/resume/skill.repository';
import { Skill } from '@/domain/entities/resume/skill.entity';
import { ExperienceTime } from '@/domain/enums/experience-time.enum';
import { Repository } from 'typeorm';

export class TypeOrmSkillRepository implements SkillRepository {
  constructor(private readonly repository: Repository<Skill>) {}
  async create(entity: Skill): Promise<Skill> {
    return await this.repository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async find(id: string): Promise<Skill> {
    return await this.repository.findOne({ where: { id } });
  }
  async findAll(): Promise<Skill[]> {
    return await this.repository.find();
  }
  async update(id: string, entity: Partial<Skill>): Promise<Skill> {
    const skill = await this.repository.findOne({ where: { id } });
    if (!skill) return null;
    await this.repository.update(id, entity);
    return Object.assign(skill, entity);
  }
  async findByNameAndExperience(
    name: string,
    experienceTime: ExperienceTime,
  ): Promise<Skill> {
    return await this.repository.findOne({
      where: { name, experienceTime },
    });
  }
}

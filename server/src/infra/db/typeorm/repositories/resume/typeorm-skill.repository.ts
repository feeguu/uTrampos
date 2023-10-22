import { SkillRepository } from '@/domain/abstracts/repositories/resume/skill.repository';
import { Skill } from '@/domain/entities/resume/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { TypeOrmSkill } from '../../entities/resume/typeorm-skill.entity';

export class TypeOrmSkillRepository implements SkillRepository {
  static readonly ALL_RELATIONS: FindOptionsRelations<TypeOrmSkill> = {
    resume: {
      candidate: {
        user: true,
      },
    },
  };
  constructor(
    @InjectRepository(TypeOrmSkill)
    private readonly repository: Repository<TypeOrmSkill>,
  ) {}
  async create(entity: Skill): Promise<Skill> {
    return await this.repository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async find(id: string): Promise<Skill> {
    return await this.repository.findOne({
      where: { id },
      relations: TypeOrmSkillRepository.ALL_RELATIONS,
    });
  }
  async findAll(): Promise<Skill[]> {
    return await this.repository.find({
      relations: TypeOrmSkillRepository.ALL_RELATIONS,
    });
  }
  async update(id: string, entity: Partial<Skill>): Promise<Skill> {
    const skill = await this.repository.findOne({
      where: { id },
      relations: TypeOrmSkillRepository.ALL_RELATIONS,
    });
    if (!skill) return null;
    await this.repository.update(id, entity);
    return Object.assign(skill, entity);
  }
  async findByUserId(userId: string): Promise<Skill[]> {
    return await this.repository.find({
      where: { resume: { candidate: { user: { id: userId } } } },
      relations: TypeOrmSkillRepository.ALL_RELATIONS,
    });
  }
}

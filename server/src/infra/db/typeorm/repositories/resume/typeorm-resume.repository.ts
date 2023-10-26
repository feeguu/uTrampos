import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { Resume } from '@/domain/entities/resume/resume.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmResume } from '../../entities/resume/typeorm-resume.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { TypeOrmLanguage } from '../../entities/resume/typeorm-language.entity';
import { TypeOrmProfessionalExperience } from '../../entities/resume/typeorm-professional-experience.entity';
import { TypeOrmAcademicProject } from '../../entities/resume/typeorm-academic-project.entity';
import { SocialNetwork } from '@/domain/entities/resume/social-network.entity';
import { TypeOrmSocialNetwork } from '../../entities/resume/typeorm-social-network.entity';
import { TypeOrmSkill } from '../../entities/resume/typeorm-skill.entity';

@Injectable()
export class TypeOrmResumeRepository implements ResumeRepository {
  static readonly ALL_RELATIONS: FindOptionsRelations<TypeOrmResume> = {
    candidate: {
      user: true,
    },
    languages: true,
    professionalExperiences: true,
    academicProjects: true,
    socialNetworks: true,
    skills: true,
  };
  constructor(
    @InjectRepository(TypeOrmResume)
    private readonly resumeRepo: Repository<TypeOrmResume>,
    @InjectRepository(TypeOrmLanguage)
    private readonly languageRepo: Repository<TypeOrmLanguage>,
    @InjectRepository(TypeOrmProfessionalExperience)
    private readonly professionalExperienceRepo: Repository<TypeOrmProfessionalExperience>,
    @InjectRepository(TypeOrmAcademicProject)
    private readonly academicProjectRepo: Repository<TypeOrmAcademicProject>,
    @InjectRepository(TypeOrmSocialNetwork)
    private readonly socialNetworkRepo: Repository<TypeOrmSocialNetwork>,
    @InjectRepository(TypeOrmSkill)
    private readonly skillRepo: Repository<TypeOrmSkill>,
  ) {}
  async create(entity: Resume): Promise<Resume> {
    const newResume = this.resumeRepo.create(entity);
    await this.resumeRepo.save(newResume);
    return newResume;
  }
  async find(id: string): Promise<Resume> {
    return await this.resumeRepo.findOne({
      where: { id },
      relations: TypeOrmResumeRepository.ALL_RELATIONS,
    });
  }
  async findAll(): Promise<Resume[]> {
    return await this.resumeRepo.find({
      relations: TypeOrmResumeRepository.ALL_RELATIONS,
    });
  }
  async delete(id: string): Promise<void> {
    await this.languageRepo.delete({ resume: { id } });
    await this.professionalExperienceRepo.delete({ resume: { id } });
    await this.academicProjectRepo.delete({ resume: { id } });
    await this.socialNetworkRepo.delete({ resume: { id } });
    await this.skillRepo.delete({ resume: { id } });
    await this.resumeRepo.delete(id);
  }
  async update(id: string, entity: Partial<Resume>): Promise<Resume | null> {
    const resume = await this.resumeRepo.findOne({
      where: { id },
      relations: TypeOrmResumeRepository.ALL_RELATIONS,
    });
    if (!resume) return null;
    Object.assign(resume, entity);
    await this.resumeRepo.save(resume);
    return resume;
  }
  async getByUserId(userId: string): Promise<Resume> {
    return await this.resumeRepo.findOne({
      where: { candidate: { user: { id: userId } } },
      relations: TypeOrmResumeRepository.ALL_RELATIONS,
    });
  }
}

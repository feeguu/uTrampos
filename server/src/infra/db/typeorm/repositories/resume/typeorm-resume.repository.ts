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
import { TypeOrmEducation } from '../../entities/resume/typeorm-education.entity';
import { SearchFilters } from '@/domain/abstracts/repositories/resume/resume.repository';
import { EducationType } from '@/domain/enums/education-type';

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
    educations: true,
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
    @InjectRepository(TypeOrmEducation)
    private readonly educationRepo: Repository<TypeOrmEducation>,
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
    await this.educationRepo.delete({ resume: { id } });
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

  async searchResumes(searchFilters?: SearchFilters): Promise<Resume[]> {
    const { name, query, skills, languages, minEducationLevel } = searchFilters;
    const queryBuilder = this.resumeRepo.createQueryBuilder('resume');
    queryBuilder.leftJoinAndSelect('resume.candidate', 'candidate');
    queryBuilder.leftJoinAndSelect('candidate.user', 'user');
    queryBuilder.leftJoinAndSelect('resume.educations', 'educations');
    queryBuilder.leftJoinAndSelect('resume.languages', 'languages');
    queryBuilder.leftJoinAndSelect(
      'resume.professionalExperiences',
      'professionalExperiences',
    );
    queryBuilder.leftJoinAndSelect('resume.skills', 'skills');
    queryBuilder.leftJoinAndSelect('resume.socialNetworks', 'socialNetworks');
    queryBuilder.leftJoinAndSelect(
      'resume.academicProjects',
      'academicProjects',
    );
    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', {
        name: `%${name}%`,
      });
    }
    if (query) {
      const sanitizedQuery = query
        .trim()
        .replace(/\s+/g, ' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      queryBuilder.addSelect(
        `ts_rank(resume.document, plainto_tsquery('portuguese', '${sanitizedQuery}'))`,
        'rank',
      );
      queryBuilder.andWhere(
        `resume.document @@ plainto_tsquery('portuguese', :query)`,
        {
          query: sanitizedQuery,
        },
      );
      queryBuilder.orderBy('rank', 'DESC');
    }

    if (skills) {
      queryBuilder.andWhere('LOWER(skills.name) IN (:...skills)', {
        skills: skills.map((skill) => skill.toLowerCase()),
      });
    }

    if (languages) {
      queryBuilder.andWhere('LOWER(languages.language) IN (:...languages)', {
        languages: languages.map((language) => language.toLowerCase()),
      });
    }

    if (minEducationLevel) {
      const EDUCATION_LEVELS = [
        EducationType.SECONDARY,
        EducationType.TECHNICAL_COURSE,
        EducationType.GRADUATION,
        EducationType.POSTGRADUATION,
        EducationType.MASTER,
        EducationType.DOCTORATE,
      ];

      const minEducationLevelIndex =
        EDUCATION_LEVELS.indexOf(minEducationLevel);

      const educationLevels = EDUCATION_LEVELS.slice(minEducationLevelIndex);

      queryBuilder.andWhere(
        'educations.educationType IN (:...educationLevel)',
        {
          educationLevel: educationLevels,
        },
      );
    }

    return await queryBuilder.getMany();
  }
}

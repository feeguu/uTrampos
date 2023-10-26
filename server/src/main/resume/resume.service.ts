import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { LanguageRepository } from '@/domain/abstracts/repositories/resume/language.repository';
import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { SkillRepository } from '@/domain/abstracts/repositories/resume/skill.repository';
import { AcademicProject } from '@/domain/entities/resume/academic-project.entity';
import { Language } from '@/domain/entities/resume/language.entity';
import { ProfessionalExperience } from '@/domain/entities/resume/professional-experience.entity';
import { Resume } from '@/domain/entities/resume/resume.entity';
import { Skill } from '@/domain/entities/resume/skill.entity';
import { SocialNetwork } from '@/domain/entities/resume/social-network.entity';
import { ResumeDto } from '@/presentation/dtos/resume/entities/resume.dto';
import { CreateResumeDto } from '@/presentation/dtos/resume/create/create-resume.dto';
import { ResumeMapper } from '@/presentation/mappers/resume.mapper';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateResumeDto } from '@/presentation/dtos/resume/update/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    private readonly resumeRepository: ResumeRepository,
    private readonly candidateRepository: CandidateRepository,
    private readonly languageRepository: LanguageRepository,
    private readonly skillRepository: SkillRepository,
  ) {}

  async createResume(
    userId: string,
    createResumeDto: CreateResumeDto,
  ): Promise<ResumeDto> {
    console.log(userId);
    const candidate = await this.candidateRepository.findByUserId(userId);
    console.log(candidate);
    if (await this.resumeRepository.getByUserId(userId))
      throw new BadRequestException('Resume already exists');
    const resume = new Resume({
      candidate: candidate,
      description: createResumeDto.description,
      objective: createResumeDto.objective,
      additionalInformation: createResumeDto.additionalInformation,
      academicProjects: [],
      languages: [],
      professionalExperiences: [],
      skills: [],
      socialNetworks: [],
    });

    const academicProjects = createResumeDto.academicProjects.map((project) => {
      return new AcademicProject({
        title: project.title,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
      });
    });

    const languages = createResumeDto.languages.map((language) => {
      return new Language({
        language: language.name,
        level: language.level,
      });
    });

    const professionalExperiences = createResumeDto.professionalExperiences.map(
      (experience) => {
        return new ProfessionalExperience({
          company: experience.company,
          position: experience.position,
          description: experience.description,
          startDate: experience.startDate,
          endDate: experience.endDate,
        });
      },
    );

    const skills = createResumeDto.skills.map((skill) => {
      return new Skill({
        name: skill.name,
        experienceTime: skill.experienceTime,
      });
    });

    const socialNetworks = createResumeDto.socialNetworks.map(
      (socialNetwork) => {
        return new SocialNetwork({
          socialNetwork: socialNetwork.socialNetwork,
          url: socialNetwork.url,
        });
      },
    );

    resume.academicProjects = academicProjects;
    resume.languages = languages;
    resume.professionalExperiences = professionalExperiences;
    resume.skills = skills;
    resume.socialNetworks = socialNetworks;
    const createdResume = await this.resumeRepository.create(resume);
    console.log(createdResume);
    return ResumeMapper.toDto(createdResume);
  }

  async getResume(userId: string, resumeId: string): Promise<ResumeDto> {
    const resume = await this.resumeRepository.find(resumeId);
    if (!resume) throw new NotFoundException();
    if (resume.candidate.user.id !== userId)
      throw new BadRequestException('You are not allowed to get this resume');
    return ResumeMapper.toDto(resume);
  }

  async updateResume(
    userId: string,
    resumeId: string,
    resumeDto: UpdateResumeDto,
  ): Promise<ResumeDto> {
    const resume = await this.resumeRepository.find(resumeId);
    if (!resume) throw new NotFoundException();
    if (resume.candidate.user.id !== userId)
      throw new BadRequestException(
        'You are not allowed to update this resume',
      );
    Object.assign(resume, resumeDto);
    const updatedResume = await this.resumeRepository.update(resume.id, resume);
    return ResumeMapper.toDto(updatedResume);
  }

  async deleteResume(userId: string, resumeId: string): Promise<void> {
    const resume = await this.resumeRepository.find(resumeId);
    if (!resume) throw new NotFoundException();
    if (resume.candidate.user.id !== userId)
      throw new BadRequestException(
        'You are not allowed to delete this resume',
      );
    await this.resumeRepository.delete(resume.id);
  }
}

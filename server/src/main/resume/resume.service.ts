import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { LanguageRepository } from '@/domain/abstracts/repositories/resume/language.repository';
import {
  ResumeRepository,
  SearchFilters,
} from '@/domain/abstracts/repositories/resume/resume.repository';
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
import { Education } from '@/domain/entities/resume/education.entity';
import { UserType } from '@/domain/enums/user-type.enum';
import { SearchResumeParamsDto } from '@/presentation/dtos/resume/search-resume-params.dto';

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
    const candidate = await this.candidateRepository.findByUserId(userId);
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
      educations: [],
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

    const educations = createResumeDto.educations.map((education) => {
      return new Education({
        institution: education.institution,
        educationType: education.educationType,
        course: education.course,
        startDate: education.startDate,
        endDate: education.endDate,
        educationStatus: education.status,
      });
    });

    resume.academicProjects = academicProjects;
    resume.languages = languages;
    resume.professionalExperiences = professionalExperiences;
    resume.skills = skills;
    resume.socialNetworks = socialNetworks;
    resume.educations = educations;
    const createdResume = await this.resumeRepository.create(resume);
    return ResumeMapper.toDto(createdResume);
  }

  async getResume(userId: string): Promise<ResumeDto> {
    const resume = await this.resumeRepository.getByUserId(userId);
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

  async deleteResume(
    userId: string,
    resumeId: string,
    userType: UserType,
  ): Promise<void> {
    const resume = await this.resumeRepository.find(resumeId);
    if (!resume) throw new NotFoundException();
    if (userType === UserType.ADMIN) {
      await this.resumeRepository.delete(resumeId);
      return;
    }
    if (resume.candidate.user.id !== userId)
      throw new BadRequestException(
        'You are not allowed to delete this resume',
      );
    await this.resumeRepository.delete(resume.id);
  }

  async getAllResumes(): Promise<ResumeDto[]> {
    const resumes = await this.resumeRepository.findAll();
    return resumes.map((resume) => ResumeMapper.toDto(resume));
  }

  async searchResumes(searchResumeParamsDto: SearchResumeParamsDto) {
    const languages = searchResumeParamsDto.languages
      ? Array.isArray(searchResumeParamsDto.languages)
        ? searchResumeParamsDto.languages
        : [searchResumeParamsDto.languages]
      : undefined;
    const skills = searchResumeParamsDto.skills
      ? Array.isArray(searchResumeParamsDto.skills)
        ? searchResumeParamsDto.skills
        : [searchResumeParamsDto.skills]
      : undefined;
    const searchFilter: SearchFilters = {
      languages,
      minEducationLevel: searchResumeParamsDto.minEducationLevel,
      name: searchResumeParamsDto.name,
      query: searchResumeParamsDto.q,
      skills,
    };
    const resumes = await this.resumeRepository.searchResumes(searchFilter);
    return resumes.map((resume) => ResumeMapper.toDto(resume));
  }
}

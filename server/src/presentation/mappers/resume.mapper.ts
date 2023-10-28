import { ProfessionalExperience } from '@/domain/entities/resume/professional-experience.entity';
import { Resume } from '@/domain/entities/resume/resume.entity';
import { ProfessionalExperienceDto } from '../dtos/resume/entities/professional-experience.dto';
import { SocialNetwork } from '@/domain/entities/resume/social-network.entity';
import { Language } from '@/domain/entities/resume/language.entity';
import { LanguageDto } from '../dtos/resume/entities/language.dto';
import { SocialNetworkDto } from '../dtos/resume/entities/social-network.dto';
import { SkillDto } from '../dtos/resume/entities/skill.dto';
import { Skill } from '@/domain/entities/resume/skill.entity';
import { AcademicProject } from '@/domain/entities/resume/academic-project.entity';
import { AcademicProjectDto } from '../dtos/resume/entities/academic-project.dto';
import { ResumeDto } from '../dtos/resume/entities/resume.dto';
import { CandidateMapper } from './candidate.mapper';
import { EducationDto } from '../dtos/resume/entities/education.dto';
import { Education } from '@/domain/entities/resume/education.entity';

export class ResumeMapper {
  static toDto(resume: Resume): ResumeDto {
    return new ResumeDto({
      id: resume.id,
      description: resume.description,
      objective: resume.objective,
      additionalInformation: resume.additionalInformation,
      skills: resume.skills.map((skill) => this.skillToDto(skill)),
      professionalExperiences: resume.professionalExperiences.map(
        (experience) => this.professionalExperienceToDto(experience),
      ),
      academicProjects: resume.academicProjects.map((project) =>
        this.academicProjectToDto(project),
      ),
      languages: resume.languages.map((language) =>
        this.languageToDto(language),
      ),
      socialNetworks: resume.socialNetworks.map((socialNetwork) =>
        this.socialNetworkToDto(socialNetwork),
      ),
      educations: resume.educations.map((education) =>
        this.educationToDto(education),
      ),
      candidate: CandidateMapper.toDto(resume.candidate),
    });
  }

  static academicProjectToDto(
    academicProject: AcademicProject,
  ): AcademicProjectDto {
    return new AcademicProjectDto({
      id: academicProject.id,
      title: academicProject.title,
      description: academicProject.description,
      startDate: academicProject.startDate,
      endDate: academicProject.endDate,
    });
  }

  static skillToDto(skill: Skill): SkillDto {
    return new SkillDto({
      id: skill.id,
      name: skill.name,
      experienceTime: skill.experienceTime,
    });
  }

  static languageToDto(language: Language): LanguageDto {
    return new LanguageDto({
      id: language.id,
      language: language.language,
      level: language.level,
    });
  }

  static socialNetworkToDto(socialNetwork: SocialNetwork): SocialNetworkDto {
    return new SocialNetworkDto({
      id: socialNetwork.id,
      socialNetwork: socialNetwork.socialNetwork,
      url: socialNetwork.url,
    });
  }

  static professionalExperienceToDto(
    professionalExperience: ProfessionalExperience,
  ): ProfessionalExperienceDto {
    return new ProfessionalExperienceDto({
      id: professionalExperience.id,
      company: professionalExperience.company,
      description: professionalExperience.description,
      startDate: professionalExperience.startDate,
      endDate: professionalExperience.endDate,
    });
  }

  static educationToDto(education: Education): EducationDto {
    return new EducationDto({
      id: education.id,
      institution: education.institution,
      educationType: education.educationType,
      course: education.course,
      startDate: education.startDate,
      endDate: education.endDate,
      status: education.educationStatus,
    });
  }
}

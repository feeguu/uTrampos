import { CandidateDto } from '../../candidate.dto';
import { AcademicProjectDto } from './academic-project.dto';
import { SkillDto } from './skill.dto';
import { ProfessionalExperienceDto } from './professional-experience.dto';
import { SocialNetworkDto } from './social-network.dto';
import { LanguageDto } from './language.dto';
import { EducationDto } from './education.dto';

export class ResumeDto {
  public id: string;
  public description: string;
  public objective: string;
  public additionalInformation: string;
  public skills: SkillDto[];
  public professionalExperiences: ProfessionalExperienceDto[];
  public academicProjects: AcademicProjectDto[];
  public languages: LanguageDto[];
  public socialNetworks: SocialNetworkDto[];
  public educations: EducationDto[];
  public candidate: Omit<CandidateDto, 'resume'>;
  constructor(resume: ResumeDto) {
    this.id = resume.id;
    this.description = resume.description;
    this.objective = resume.objective;
    this.additionalInformation = resume.additionalInformation;
    this.skills = resume.skills;
    this.professionalExperiences = resume.professionalExperiences;
    this.academicProjects = resume.academicProjects;
    this.languages = resume.languages;
    this.socialNetworks = resume.socialNetworks;
    this.candidate = resume.candidate;
    this.educations = resume.educations;
  }
}

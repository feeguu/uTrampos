import { ProfessionalExperience } from './professional-experience.entity';
import { Skill } from './skill.entity';
import { SocialNetwork } from './social-network.entity';
import { AcademicProject } from './academic-project.entity';
import { Candidate } from '../candidate.entity';
import { Language } from './language.entity';
import { randomUUID } from 'crypto';
import { Education } from './education.entity';

export class Resume {
  public id: string;
  public candidate: Candidate;
  public description: string;
  public objective: string;
  public additionalInformation: string;
  public professionalExperiences: ProfessionalExperience[];
  public skills: Skill[];
  public socialNetworks: SocialNetwork[];
  public academicProjects: AcademicProject[];
  public languages: Language[];
  public educations: Education[];

  constructor(resumeData: {
    candidate: Candidate;
    description: string;
    objective: string;
    additionalInformation: string;
    professionalExperiences: ProfessionalExperience[];
    skills: Skill[];
    socialNetworks: SocialNetwork[];
    academicProjects: AcademicProject[];
    languages: Language[];
    educations: Education[];
  }) {
    this.id = randomUUID();
    this.candidate = resumeData.candidate;
    this.description = resumeData.description;
    this.objective = resumeData.objective;
    this.additionalInformation = resumeData.additionalInformation;
    this.professionalExperiences = resumeData.professionalExperiences;
    this.skills = resumeData.skills;
    this.socialNetworks = resumeData.socialNetworks;
    this.academicProjects = resumeData.academicProjects;
    this.languages = resumeData.languages;
    this.educations = resumeData.educations;
  }
}

import { ProfessionalExperience } from './professional-experience.entity';
import { Skill } from './skill.entity';
import { User } from '../user.entity';
import { SocialNetwork } from './social-network.entity';
import { AcademicProject } from './academic-project.entity';

export class Resume {
  public id: String;
  public user: User;
  public description: String;
  public objective: String;
  public additionalInformation: String;
  public professionalExperiences: ProfessionalExperience[];
  public skills: Skill[];
  public socialNetworks: SocialNetwork[];
  public academicProjects: AcademicProject[];

  constructor(resumeData: {
    user: User;
    description: String;
    objective: String;
    additionalInformation: String;
    professionalExperiences: ProfessionalExperience[];
    skills: Skill[];
    socialNetworks: SocialNetwork[];
    academicProjects: AcademicProject[];
  }) {
    this.id = crypto.randomUUID();
    this.user = resumeData.user;
    this.description = resumeData.description;
    this.objective = resumeData.objective;
    this.additionalInformation = resumeData.additionalInformation;
    this.professionalExperiences = resumeData.professionalExperiences;
    this.skills = resumeData.skills;
    this.socialNetworks = resumeData.socialNetworks;
    this.academicProjects = resumeData.academicProjects;
  }
}

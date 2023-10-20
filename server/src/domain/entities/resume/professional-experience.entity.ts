import { Resume } from './resume.entity';

export class ProfessionalExperience {
  public id: string;
  public resume: Resume;
  public company: string;
  public position: string;
  public description: string;
  // ISO 8601
  public startDate: string;
  public endDate: string | null;

  constructor(professionalExperienceData: {
    resume: Resume;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string | null;
  }) {
    this.id = crypto.randomUUID();
    this.resume = professionalExperienceData.resume;
    this.company = professionalExperienceData.company;
    this.position = professionalExperienceData.position;
    this.description = professionalExperienceData.description;
    this.startDate = professionalExperienceData.startDate;
    this.endDate = professionalExperienceData.endDate;
  }
}

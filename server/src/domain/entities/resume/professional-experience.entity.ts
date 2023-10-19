import { Resume } from './resume.entity';

export class ProfessionalExperience {
  public id: String;
  public resume: Resume;
  public company: String;
  public position: String;
  public description: String;
  // ISO 8601
  public startDate: String;
  public endDate: String | null;

  constructor(professionalExperienceData: {
    resume: Resume;
    company: String;
    position: String;
    description: String;
    startDate: String;
    endDate: String | null;
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

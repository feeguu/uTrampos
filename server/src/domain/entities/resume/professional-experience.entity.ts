import { randomUUID } from 'crypto';

export class ProfessionalExperience {
  public id: string;
  public company: string;
  public position: string;
  public description: string;
  // ISO 8601
  public startDate: string;
  public endDate: string | null;

  constructor(professionalExperienceData: {
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string | null;
  }) {
    this.id = randomUUID();
    this.company = professionalExperienceData.company;
    this.position = professionalExperienceData.position;
    this.description = professionalExperienceData.description;
    this.startDate = professionalExperienceData.startDate;
    this.endDate = professionalExperienceData.endDate;
  }
}

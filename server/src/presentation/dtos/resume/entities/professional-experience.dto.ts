export class ProfessionalExperienceDto {
  public id: string;
  public description: string;
  public company: string;
  public position: string;
  // ISO 8601
  public startDate: string;
  public endDate: string;

  constructor(professionalExperienceData: ProfessionalExperienceDto) {
    this.id = professionalExperienceData.id;
    this.company = professionalExperienceData.company;
    this.description = professionalExperienceData.description;
    this.position = professionalExperienceData.position;
    this.startDate = professionalExperienceData.startDate;
    this.endDate = professionalExperienceData.endDate;
  }
}

export class ProfessionalExperienceDto {
  public id: string;
  public description: string;
  public company: string;
  // ISO 8601
  public startDate: string;
  public endDate: string;

  constructor(professionalExperienceData: ProfessionalExperienceDto) {
    this.company = professionalExperienceData.company;
    this.description = professionalExperienceData.description;
    this.startDate = professionalExperienceData.startDate;
    this.endDate = professionalExperienceData.endDate;
  }
}

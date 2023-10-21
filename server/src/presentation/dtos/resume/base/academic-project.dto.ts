export class AcademicProjectDto {
  public id: string;
  public title: string;
  public description: string;
  // ISO 8601
  public startDate: string;
  public endDate: string;

  constructor(academicProjectData: AcademicProjectDto) {
    this.id = academicProjectData.id;
    this.title = academicProjectData.title;
    this.description = academicProjectData.description;
    this.startDate = academicProjectData.startDate;
    this.endDate = academicProjectData.endDate;
  }
}

import { Resume } from './resume.entity';

export class AcademicProject {
  public id: string;
  public resume: Resume;
  public title: string;
  public description: string;
  // ISO 8601
  public startDate: string;
  public endDate: string;

  constructor(academicProjectData: {
    resume: Resume;
    title: string;
    description: string;
    start: string;
    end: string;
  }) {
    this.id = crypto.randomUUID();
    this.resume = academicProjectData.resume;
    this.title = academicProjectData.title;
    this.description = academicProjectData.description;
    this.startDate = academicProjectData.start;
    this.endDate = academicProjectData.end;
  }
}

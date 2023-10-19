import { Resume } from './resume.entity';

export class AcademicProject {
  public id: String;
  public resume: Resume;
  public title: string;
  public description: string;
  // ISO 8601
  public start: String;
  public end: String;

  constructor(academicProjectData: {
    resume: Resume;
    title: string;
    description: string;
    start: String;
    end: String;
  }) {
    this.id = crypto.randomUUID();
    this.resume = academicProjectData.resume;
    this.title = academicProjectData.title;
    this.description = academicProjectData.description;
    this.start = academicProjectData.start;
    this.end = academicProjectData.end;
  }
}

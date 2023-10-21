import { randomUUID } from 'crypto';
import { Resume } from './resume.entity';

export class AcademicProject {
  public id: string;
  public title: string;
  public description: string;
  // ISO 8601
  public startDate: string;
  public endDate: string;

  constructor(academicProjectData: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) {
    this.id = randomUUID();
    this.title = academicProjectData.title;
    this.description = academicProjectData.description;
    this.startDate = academicProjectData.startDate;
    this.endDate = academicProjectData.endDate;
  }
}

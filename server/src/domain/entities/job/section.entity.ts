import { randomUUID } from 'crypto';
import { Job } from './job.entity';

export class Section {
  public id: string;
  public title: string;
  public description: string;
  public order: number;

  constructor(section: Omit<Section, 'id'>) {
    this.title = section.title;
    this.description = section.description;
    this.order = section.order;
    this.id = randomUUID();
  }
}

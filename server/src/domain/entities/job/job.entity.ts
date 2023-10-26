import { randomUUID } from 'crypto';
import { Company } from '../company.entity';
import { Section } from './section.entity';
import { Apply } from './apply.entity';
import { ContractType } from '@/domain/enums/contract-type.enum';

export class Job {
  public id: string;
  public title: string;
  public description: string;
  public address: string | 'remote';
  public salary: number;
  public contractType: ContractType;
  public company: Company;
  public slug: string;
  public sections: Section[];
  public keywords: string[];
  public applies: Apply[];

  constructor(job: Omit<Job, 'id' | 'slug'>) {
    this.company = job.company;
    this.address = job.address;
    this.description = job.description;
    this.contractType = job.contractType;
    this.salary = job.salary;
    this.title = job.title;
    this.sections = job.sections;
    this.keywords = job.keywords;
    this.applies = job.applies;
    this.id = randomUUID();
  }
}

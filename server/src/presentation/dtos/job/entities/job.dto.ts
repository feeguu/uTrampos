import { ContractType } from '@/domain/enums/contract-type.enum';
import { SectionDto } from './section.dto';
import { CompanyDto } from '../../company.dto';

export class JobDto {
  public id: string;
  public title: string;
  public description: string;
  public address: string;
  public slug: string;
  public salary: number;
  public contractType: ContractType;
  public sections: SectionDto[];
  public keywords: string[];
  public company: CompanyDto;
  constructor(job: JobDto) {
    this.id = job.id;
    this.title = job.title;
    this.description = job.description;
    this.salary = job.salary;
    this.address = job.address;
    this.sections = job.sections;
    this.keywords = job.keywords;
    this.slug = job.slug;
    this.company = job.company;
    this.contractType = job.contractType;
  }
}

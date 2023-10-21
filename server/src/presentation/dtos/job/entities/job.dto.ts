import { ContractType } from '@/domain/enums/contract-type.enum';
import { SectionDto } from './section.dto';
import { KeywordDto } from './keyword.dto';

export class JobDto {
  public id: string;
  public title: string;
  public description: string;
  public address: string;
  public salary: number;
  public contractType: ContractType;
  public sections: SectionDto[];
  public keywords: KeywordDto[];
  constructor(job: JobDto) {
    this.id = job.id;
    this.title = job.title;
    this.description = job.description;
    this.sections = job.sections;
    this.keywords = job.keywords;
  }
}

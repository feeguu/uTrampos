import { randomUUID } from 'crypto';
import { User } from './user.entity';
import { CompanySize } from '../enums/company-size.enum';
import { Job } from './job/job.entity';

export class Company {
  public id: string;
  public jobs: Job[] = [];
  constructor(
    public user: User,
    public cnpj: string,
    public description: string,
    public companySize: CompanySize,
  ) {
    this.id = randomUUID();
  }
}

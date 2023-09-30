import { randomUUID } from 'crypto';
import { User } from './user.entity';
import { UserType } from '../enums/user-type.enum';
import { CompanySize } from '../enums/company-size.enum';

export class Company {
  public id: string;
  public type: UserType = UserType.Company;
  constructor(
    public user: User,
    public cnpj: string,
    public description: string,
    public companySize: CompanySize,
  ) {
    this.id = randomUUID();
  }
}

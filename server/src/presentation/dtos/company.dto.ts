import { CompanySize } from '@/domain/enums/company-size.enum';
import { UserDto } from './user.dto';

export class CompanyDto {
  public id: string;
  public cnpj: string;
  public description: string;
  public companySize: CompanySize;
  public user: UserDto;
  constructor(
    id: string,
    cnpj: string,
    description: string,
    companySize: CompanySize,
    user: UserDto,
  ) {
    this.id = id;
    this.cnpj = cnpj;
    this.description = description;
    this.companySize = companySize;
    this.user = user;
  }
}

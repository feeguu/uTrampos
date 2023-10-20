import { CompanySize } from '@/domain/enums/company-size.enum';
import { UserDto } from './user.dto';

export class CompanyDto {
  constructor(
    public id: string,
    public cnpj: string,
    public description: string,
    public companySize: CompanySize,
    public user: UserDto,
  ) {}
}

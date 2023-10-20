import { Company } from '@/domain/entities/company.entity';
import { CompanyDto } from '../dtos/company.dto';

export class CompanyMapper {
  static toDto(company: Company): CompanyDto {
    // Remove password from user that are inside a company object
    const {
      user: { password, ...user },
      ...companyDto
    } = company;
    return {
      ...companyDto,
      user,
    };
  }
}

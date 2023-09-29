import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { TypeOrmUserRepository } from './typeorm-user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCompany } from '../entities/typeorm-company.entity';
import { Repository } from 'typeorm';
import { Company } from '@/domain/entities/company.entity';
import { User } from '@/domain/entities/user.entity';
import { TypeOrmUser } from '../entities/typeorm-user.entity';

export class TypeOrmCompanyRepository
  extends TypeOrmUserRepository
  implements CompanyRepository
{
  constructor(
    @InjectRepository(TypeOrmCompany)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(TypeOrmUser)
    userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = this.companyRepo.findOne({
      where: { email },
      relations: { user: true },
    });
    if (!company) return null;
    return company;
  }

  async findByCnpj(cnpj: string) {
    return this.companyRepo.findOne({
      where: { cnpj },
      relations: { user: true },
    });
  }
}

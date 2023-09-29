import { Company } from '@/domain/entities/company.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CompanyRepository extends UserRepository<Company> {
  abstract findByCnpj(cnpj: string): Promise<Company | null>;
}

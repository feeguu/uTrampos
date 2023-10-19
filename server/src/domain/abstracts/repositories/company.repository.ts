import { Company } from '@/domain/entities/company.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from './generic.repository';

@Injectable()
export abstract class CompanyRepository extends Repository<Company> {
  abstract findByEmail(email: string): Promise<Company | null>;
  abstract findByCnpj(cnpj: string): Promise<Company | null>;
  abstract findByUserId(userId: string): Promise<Company | null>;
}

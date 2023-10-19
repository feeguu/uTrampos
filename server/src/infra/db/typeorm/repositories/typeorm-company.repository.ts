import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCompany } from '../entities/typeorm-company.entity';
import { Repository } from 'typeorm';
import { Company } from '@/domain/entities/company.entity';

export class TypeOrmCompanyRepository implements CompanyRepository {
  constructor(
    @InjectRepository(TypeOrmCompany)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(entity: Company): Promise<Company> {
    const newCompany = this.companyRepo.create(entity);
    await this.companyRepo.save(newCompany);
    return newCompany;
  }

  async find(id: string): Promise<Company | null> {
    const company = await this.companyRepo.findOneBy({ id });
    if (!company) return null;
    return company;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.companyRepo.findOne({
      where: { user: { email } },
    });
    if (!company) return null;
    return company;
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.companyRepo.findOneBy({ cnpj });
    if (!company) return null;
    return company;
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  async delete(id: string): Promise<void> {
    this.companyRepo.delete({ id });
  }

  async update(id: string, entity: Partial<Company>): Promise<Company | null> {
    const company = await this.companyRepo.findOneBy({ id });
    if (!company) return null;
    await this.companyRepo.update({ id }, entity);
    return Object.assign(company, entity);
  }

  async findByUserId(userId: string): Promise<Company | null> {
    const company = await this.companyRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!company) return null;
    return company;
  }
}

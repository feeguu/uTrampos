import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { Company } from '@/domain/entities/company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];
  async create(entity: Company): Promise<Company> {
    this.companies.push(entity);
    return entity;
  }
  async find(id: string): Promise<Company> {
    return this.companies.find((company) => company.id === id) || null;
  }

  async findAll(): Promise<Company[]> {
    return this.companies;
  }

  async update(
    id: string,
    entityData: Partial<Company>,
  ): Promise<Company | null> {
    const company = this.companies.find((c) => id === c.id);
    if (!company) return null;
    Object.assign(company, entityData);
    return company;
  }

  async delete(id: string): Promise<void> {
    this.companies = this.companies.filter((company) => company.id !== id);
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return this.companies.find((company) => company.cnpj === cnpj) || null;
  }

  async findByEmail(email: string): Promise<Company | null> {
    return (
      this.companies.find((company) => company.user.email === email) || null
    );
  }
}

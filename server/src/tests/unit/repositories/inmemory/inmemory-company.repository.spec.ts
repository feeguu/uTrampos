import { Company } from '@/domain/entities/company.entity';
import { User } from '@/domain/entities/user.entity';
import { CompanySize } from '@/domain/enums/company-size.enum';
import { UserType } from '@/domain/enums/user-type.enum';
import { InMemoryCompanyRepository } from '@/infra/db/inmemory/repositories/inmemory-company.repository';
import { Test } from '@nestjs/testing';

describe('InMemoryCompanyRepository', () => {
  let repository: InMemoryCompanyRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [InMemoryCompanyRepository],
    }).compile();
    repository = module.get(InMemoryCompanyRepository);
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const user = new User(
        'Company Name',
        '123456789',
        '12345678',
        '123456',
        '12345678',
        UserType.Candidate,
      );
      const company = new Company(
        user,
        '11.111.111/0001-11',
        'Description',
        CompanySize.Big,
      );
      const createdCompany = await repository.create(company);
      expect(createdCompany).toBeInstanceOf(Company);
      expect(createdCompany).toHaveProperty('id');
    });
  });

  describe('find', () => {
    it('should find a company by id', async () => {
      const user = new User(
        'Company Name',
        '123456789',
        '12345678',
        '123456',
        '12345678',
        UserType.Candidate,
      );
      const company = new Company(
        user,
        '11.111.111/0001-12',
        'Lorem ipsum',
        CompanySize.Big,
      );
      const createdCompany = await repository.create(company);
      const foundCompany = await repository.find(createdCompany.id);
      expect(foundCompany).toBeInstanceOf(Company);
      expect(foundCompany).toHaveProperty('id');
      expect(foundCompany.cnpj).toBe(company.cnpj);
    });
    it('should find a company by cnpj', async () => {
      const company = await repository.findByCnpj('11.111.111/0001-12');
      expect(company).toBeInstanceOf(Company);
      expect(company).toHaveProperty('id');
      expect(company.cnpj).toBe('11.111.111/0001-12');
      expect(company.description).toBe('Lorem ipsum');
    });

    it('should find all companies', async () => {
      const companies = await repository.findAll();
      expect(companies).toBeInstanceOf(Array);
      expect(companies.length).toBe(2);
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const company = await repository.findByCnpj('11.111.111/0001-11');
      repository.update(company.id, { description: 'Description Updated' });
      const updatedCompany = await repository.find(company.id);
      expect(updatedCompany.description).toBe('Description Updated');
    });
    it('should return null if company does not exist', async () => {
      const updatedCompany = await repository.update('123', {
        description: 'Description Updated',
      });
      expect(updatedCompany).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a company', async () => {
      const company = await repository.findByCnpj('11.111.111/0001-11');
      await repository.delete(company.id);
      const deletedCompany = await repository.findByCnpj('11.111.111/0001-11');
      expect(deletedCompany).toBeNull();
    });

    it('should not fail if company does not exist', async () => {
      await expect(repository.delete('123')).resolves.not.toThrowError();
    });
  });
});

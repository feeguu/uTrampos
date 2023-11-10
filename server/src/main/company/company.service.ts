import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { CompanyDto } from '@/presentation/dtos/company.dto';
import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { CompanyMapper } from '@/presentation/mappers/company.mapper';
import { JobMapper } from '@/presentation/mappers/job.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async getCompanyJobs(companyId: string): Promise<JobDto[]> {
    const jobs = await this.jobRepository.findByCompany(companyId);
    return jobs.map((job) => JobMapper.toDto(job));
  }

  async getCompanyJobsByUserId(userId: string): Promise<JobDto[]> {
    const company = await this.companyRepository.findByUserId(userId);
    const jobs = await this.jobRepository.findByCompany(company.id);
    return jobs.map((job) => JobMapper.toDto(job));
  }

  async getCompany(companyId: string): Promise<CompanyDto> {
    const company = await this.companyRepository.find(companyId);
    return CompanyMapper.toDto(company);
  }
}

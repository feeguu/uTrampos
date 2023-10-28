import { CompanyRepository } from "@/domain/abstracts/repositories/company.repository";
import { JobRepository } from "@/domain/abstracts/repositories/job/job.repository";
import { JobDto } from "@/presentation/dtos/job/entities/job.dto";
import { JobMapper } from "@/presentation/mappers/job.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly jobRepository: JobRepository,
    ) {}

    async getCompanyJobs(companyId: string): Promise<JobDto[]> {
        const jobs = await this.jobRepository.findByCompany(companyId);
        return jobs.map(job => JobMapper.toDto(job))
    }
}
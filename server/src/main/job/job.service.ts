import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { Job } from '@/domain/entities/job/job.entity';
import { Keyword } from '@/domain/entities/job/keyword.entity';
import { Section } from '@/domain/entities/job/section.entity';
import { CreateJobDto } from '@/presentation/dtos/job/create/create-job.dto';
import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { JobMapper } from '@/presentation/mappers/job.mapper';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}
  async createJob(userId: string, createJobDto: CreateJobDto): Promise<JobDto> {
    const company = await this.companyRepository.findByUserId(userId);
    if (!company)
      throw new UnauthorizedException('You are not allowed to create a job');
    const job = new Job({
      company,
      applies: [],
      sections: [],
      keywords: [],
      title: createJobDto.title,
      address: createJobDto.address,
      description: createJobDto.description,
      salary: createJobDto.salary,
      contractType: createJobDto.contractType,
    });
    const sections = createJobDto.sections.map((section) => {
      return new Section({
        title: section.title,
        description: section.description,
        order: section.order,
      });
    });

    const keywords = createJobDto.keywords.map((keyword) => {
      return new Keyword({ name: keyword.name });
    });

    job.sections = sections;
    job.keywords = keywords;

    const createdJob = await this.jobRepository.create(job);
    return JobMapper.toDto(createdJob);
  }

  async getJobs() {
    return await this.jobRepository.findAll()
  }
}

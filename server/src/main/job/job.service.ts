import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import {
  JobRepository,
  SearchFilters,
} from '@/domain/abstracts/repositories/job/job.repository';
import { Job } from '@/domain/entities/job/job.entity';
import { Section } from '@/domain/entities/job/section.entity';
import { UserType } from '@/domain/enums/user-type.enum';
import { CreateJobDto } from '@/presentation/dtos/job/create/create-job.dto';
import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { SearchJobParamsDto } from '@/presentation/dtos/job/search-job-params.dto';
import { UpdateJobDto } from '@/presentation/dtos/job/update/update-job.dto';
import { JobMapper } from '@/presentation/mappers/job.mapper';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}
  async createJob(
    userId: string,
    createJobDto: CreateJobDto,
    userType: UserType,
  ): Promise<JobDto> {
    const company = await this.companyRepository.findByUserId(userId);
    if (!company) throw new NotFoundException('Company not found');
    if (userType !== UserType.ADMIN && company.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to create a job for this company',
      );
    }
    const job = new Job({
      company,
      applies: [],
      sections: [],
      keywords: createJobDto.keywords,
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

    job.sections = sections;

    const createdJob = await this.jobRepository.create(job);
    return JobMapper.toDto(createdJob);
  }

  async getJobs(query: SearchJobParamsDto): Promise<JobDto[]> {
    const searchFilters: SearchFilters = {
      contractType: query.contractType,
      location: query.location,
      q: query.q,
      salaryRange: {
        min: query.minSalary,
        max: query.maxSalary,
      },
      limit: query.limit,
      offset: query.offset,
    };
    const jobs = await this.jobRepository.searchJobs(searchFilters);
    return jobs.map((job) => JobMapper.toDto(job));
  }

  async getBySlug(slug: string): Promise<JobDto> {
    const job = await this.jobRepository.findJobBySlug(slug);
    if (!job) throw new NotFoundException();
    return JobMapper.toDto(job);
  }

  async updateJob(
    userId: string,
    slug: string,
    updateJobDto: UpdateJobDto,
    userType: UserType,
  ): Promise<JobDto> {
    const job = await this.jobRepository.findJobBySlug(slug);
    if (!job) throw new NotFoundException();
    if (userType === UserType.ADMIN) {
      Object.assign(job, updateJobDto);
      const updatedJob = await this.jobRepository.update(job.id, job);
      return JobMapper.toDto(updatedJob);
    }
    if (job.company.user.id !== userId)
      throw new UnauthorizedException('You are not allowed to update this job');
    Object.assign(job, updateJobDto);
    const updatedJob = await this.jobRepository.update(job.id, job);
    return JobMapper.toDto(updatedJob);
  }

  async deleteJob(
    userId: string,
    slug: string,
    userType: UserType,
  ): Promise<void> {
    const job = await this.jobRepository.findJobBySlug(slug);
    if (!job) throw new NotFoundException();
    if (userType === UserType.ADMIN) {
      await this.jobRepository.delete(job.id);
      return;
    }
    if (job.company.user.id !== userId)
      throw new UnauthorizedException('You are not allowed to delete this job');
    await this.jobRepository.delete(job.id);
  }
}

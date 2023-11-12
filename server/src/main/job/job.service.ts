import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import {
  JobRepository,
  SearchFilters,
} from '@/domain/abstracts/repositories/job/job.repository';
import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { Apply } from '@/domain/entities/job/apply.entity';
import { Job } from '@/domain/entities/job/job.entity';
import { Section } from '@/domain/entities/job/section.entity';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { UserType } from '@/domain/enums/user-type.enum';
import { CreateJobDto } from '@/presentation/dtos/job/create/create-job.dto';
import { ApplyDto } from '@/presentation/dtos/job/entities/apply.dto';
import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { SearchJobParamsDto } from '@/presentation/dtos/job/search-job-params.dto';
import { UpdateJobDto } from '@/presentation/dtos/job/update/update-job.dto';
import { ApplyMapper } from '@/presentation/mappers/apply.mapper';
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
    private readonly candidateRepository: CandidateRepository,
    private readonly resumeRepository: ResumeRepository,
    private readonly applyRepository: ApplyRepository,
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

  async applyCandidate(jobSlug: string, userId: string): Promise<ApplyDto> {
    const job = await this.jobRepository.findJobBySlug(jobSlug);
    if (!job) throw new NotFoundException();
    const candidate = await this.candidateRepository.findByUserId(userId);
    if (!candidate)
      throw new UnauthorizedException(
        'You are not allowed to apply to this job',
      );
    if (
      job.applies.some(
        (apply) =>
          apply.candidate.user.id === userId &&
          apply.status !== ApplyStatus.WITHDRAWN,
      )
    )
      throw new UnauthorizedException('You already applied to this job');

    const resume = await this.resumeRepository.getByUserId(userId);

    if (!resume)
      throw new UnauthorizedException(
        'You need to create a resume before applying to a job',
      );

    const newApply = new Apply({
      candidate,
      datetime: new Date().toISOString(),
      status: ApplyStatus.PENDING,
      job,
    });

    job.applies.push(newApply);
    const updatedJob = await this.jobRepository.update(job.id, job);
    console.log(updatedJob.applies);
    return ApplyMapper.toDto(newApply);
  }

  async withdrawCandidate(jobSlug: string, userId: string): Promise<void> {
    const job = await this.jobRepository.findJobBySlug(jobSlug);
    if (!job) throw new NotFoundException();
    const apply = await this.applyRepository.findByJobAndCandidate(
      job.id,
      userId,
    );
    if (!apply) throw new NotFoundException();
    apply.status = ApplyStatus.WITHDRAWN;
    await this.applyRepository.update(apply.id, apply);
  }
}

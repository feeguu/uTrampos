import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { JobService } from '../job.service';
import { SearchJobParamsDto } from '@/presentation/dtos/job/search-job-params.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetJobsUseCase {
  constructor(private readonly jobsService: JobService) {}
  async execute(query: SearchJobParamsDto): Promise<JobDto[]> {
    return await this.jobsService.getJobs(query);
  }
}

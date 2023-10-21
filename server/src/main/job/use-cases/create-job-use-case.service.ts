import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';
import { CreateJobDto } from '@/presentation/dtos/job/create/create-job.dto';

@Injectable()
export class CreateJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(userId: string, job: CreateJobDto) {
    return this.jobService.createJob(userId, job);
  }
}

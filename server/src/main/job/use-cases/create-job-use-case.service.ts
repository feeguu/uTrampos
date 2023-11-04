import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';
import { CreateJobDto } from '@/presentation/dtos/job/create/create-job.dto';
import { UserType } from '@/domain/enums/user-type.enum';

@Injectable()
export class CreateJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(userId: string, job: CreateJobDto, userType: UserType) {
    return this.jobService.createJob(userId, job, userType);
  }
}

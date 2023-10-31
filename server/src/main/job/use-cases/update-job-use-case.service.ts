import { UpdateJobDto } from '@/presentation/dtos/job/update/update-job.dto';
import { JobService } from '../job.service';
import { JobDto } from '@/presentation/dtos/job/entities/job.dto';
import { Injectable } from '@nestjs/common';
import { UserType } from '@/domain/enums/user-type.enum';

@Injectable()
export class UpdateJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(
    userId: string,
    jobSlug: string,
    updateJobDto: UpdateJobDto,
    userType: UserType,
  ): Promise<JobDto> {
    return this.jobService.updateJob(userId, jobSlug, updateJobDto, userType);
  }
}

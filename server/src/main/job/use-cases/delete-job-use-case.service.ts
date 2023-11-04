import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';
import { UserType } from '@/domain/enums/user-type.enum';

@Injectable()
export class DeleteJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(
    userId: string,
    slug: string,
    userType: UserType,
  ): Promise<void> {
    await this.jobService.deleteJob(userId, slug, userType);
  }
}

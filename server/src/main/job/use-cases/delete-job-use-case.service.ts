import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';

@Injectable()
export class DeleteJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(userId: string, slug: string): Promise<void> {
    await this.jobService.deleteJob(userId, slug);
  }
}

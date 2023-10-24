import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';

@Injectable()
export class GetJobBySlugUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(slug: string) {
    return await this.jobService.getBySlug(slug);
  }
}

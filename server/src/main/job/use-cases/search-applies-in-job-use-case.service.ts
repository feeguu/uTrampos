import { Injectable } from '@nestjs/common';
import { JobService } from '../job.service';
import { SearchApplyParamsDto } from '@/presentation/dtos/job/search-apply-params.dto';
import { ApplyDto } from '@/presentation/dtos/job/entities/apply.dto';

@Injectable()
export class SearchAppliesInJobUseCase {
  constructor(private readonly jobService: JobService) {}
  async execute(
    userId: string,
    jobId: string,
    query: SearchApplyParamsDto,
  ): Promise<ApplyDto[]> {
    return await this.jobService.searchApplies(userId, jobId, query);
  }
}

import { CreateJobUseCase } from '@/main/job/use-cases/create-job-use-case.service';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { CreateJobDto } from '../dtos/job/create/create-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { UserType } from '@/domain/enums/user-type.enum';
import { GetJobsUseCase } from '@/main/job/use-cases/get-jobs-use-case.service';
import { JobDto } from '../dtos/job/entities/job.dto';
import { Public } from '@/main/auth/decorators/public.decorator';
import { SearchJobParamsDto } from '../dtos/job/search-job-params.dto';

@Controller('jobs')
export class JobController {
  constructor(
    public readonly createJobUseCase: CreateJobUseCase,
    public readonly getJobsUseCase: GetJobsUseCase,
  ) {}

  @ApiBearerAuth()
  @Post()
  @Roles(UserType.COMPANY)
  async createJob(
    @Req() { user: { id: userId } }: { user: UserDto },
    @Body() createJobDto: CreateJobDto,
  ) {
    return this.createJobUseCase.execute(userId, createJobDto);
  }

  @Public()
  @Get()
  async getJobs(@Query() query: SearchJobParamsDto): Promise<JobDto[]> {
    return await this.getJobsUseCase.execute(query);
  }
}

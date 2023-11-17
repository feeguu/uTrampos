import { CreateJobUseCase } from '@/main/job/use-cases/create-job-use-case.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { CreateJobDto } from '../dtos/job/create/create-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { UserType } from '@/domain/enums/user-type.enum';
import { GetJobsUseCase } from '@/main/job/use-cases/get-jobs-use-case.service';
import { JobDto } from '../dtos/job/entities/job.dto';
import { Public } from '@/main/auth/decorators/public.decorator';
import { SearchJobParamsDto } from '../dtos/job/search-job-params.dto';
import { GetJobBySlugUseCase } from '@/main/job/use-cases/get-job-by-slug-use-case.service';
import { UpdateJobDto } from '../dtos/job/update/update-job.dto';
import { UpdateJobUseCase } from '@/main/job/use-cases/update-job-use-case.service';
import { DeleteJobUseCase } from '@/main/job/use-cases/delete-job-use-case.service';
import { NotAdmin } from '@/main/auth/decorators/not-admin.decorator';
import { CandidateApplyToJobUseCase } from '@/main/job/use-cases/candidate-apply-to-job-use-case.service';
import { CandidateWithdrawToJobUseCase } from '@/main/job/use-cases/candidate-withdraw-to-job-use-case.service';
import { SearchAppliesInJobUseCase } from '@/main/job/use-cases/search-applies-in-job-use-case.service';
import { SearchApplyParamsDto } from '../dtos/job/search-apply-params.dto';

@Controller('jobs')
export class JobController {
  constructor(
    public readonly createJobUseCase: CreateJobUseCase,
    public readonly getJobsUseCase: GetJobsUseCase,
    public readonly getJobBySlugUseCase: GetJobBySlugUseCase,
    public readonly updateJobUseCase: UpdateJobUseCase,
    public readonly deleteJobUseCase: DeleteJobUseCase,
    public readonly candidateApplyToJobUseCase: CandidateApplyToJobUseCase,
    public readonly candidateWithdrawToJobUseCase: CandidateWithdrawToJobUseCase,
    private readonly searchAppliesInJobUseCase: SearchAppliesInJobUseCase,
  ) {}

  @ApiBearerAuth()
  @Post()
  @Roles(UserType.COMPANY)
  async createJob(
    @Req() { user: { id: userId, type } }: { user: UserDto },
    @Body() createJobDto: CreateJobDto,
  ) {
    return this.createJobUseCase.execute(userId, createJobDto, type);
  }

  @Public()
  @Get()
  async getJobs(@Query() query: SearchJobParamsDto): Promise<JobDto[]> {
    return await this.getJobsUseCase.execute(query);
  }

  @Public()
  @Get(':slug')
  async getJobBySlug(@Param('slug') slug: string): Promise<JobDto> {
    return await this.getJobBySlugUseCase.execute(slug);
  }

  @Roles(UserType.COMPANY)
  @Get(':slug/applies')
  async getJobApplies(
    @Req() { user: { id: userId } }: { user: UserDto },
    @Param('slug') slug: string,
    @Query() query: SearchApplyParamsDto,
  ) {
    return await this.searchAppliesInJobUseCase.execute(userId, slug, query);
  }

  @ApiBearerAuth()
  @NotAdmin()
  @Roles(UserType.CANDIDATE)
  @Post(':slug/apply')
  async applyToJob(
    @Req() { user: { id: userId } }: { user: UserDto },
    @Param('slug') slug: string,
  ) {
    return await this.candidateApplyToJobUseCase.execute(slug, userId);
  }

  @ApiBearerAuth()
  @NotAdmin()
  @Roles(UserType.CANDIDATE)
  @Post(':slug/withdraw')
  async withdrawToJob(
    @Req() { user: { id: userId } }: { user: UserDto },
    @Param('slug') slug: string,
  ) {
    return await this.candidateWithdrawToJobUseCase.execute(slug, userId);
  }

  @ApiBearerAuth()
  @Roles(UserType.COMPANY)
  @Patch(':slug')
  async updateJob(
    @Req() { user: { id: userId, type } }: { user: UserDto },
    @Body() updateJobDto: UpdateJobDto,
    @Param('slug') slug: string,
  ) {
    return await this.updateJobUseCase.execute(
      userId,
      slug,
      updateJobDto,
      type,
    );
  }

  @ApiBearerAuth()
  @Roles(UserType.COMPANY)
  @Delete(':slug')
  async deleteJob(
    @Req() { user: { id: userId, type } }: { user: UserDto },
    @Param('slug') slug: string,
  ) {
    return await this.deleteJobUseCase.execute(userId, slug, type);
  }
}

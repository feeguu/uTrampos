import { CreateJobUseCase } from '@/main/job/use-cases/create-job-use-case.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { CreateJobDto } from '../dtos/job/create/create-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { UserType } from '@/domain/enums/user-type.enum';

@ApiBearerAuth()
@Controller('jobs')
export class JobController {
  constructor(public readonly createJobUseCase: CreateJobUseCase) {}

  @Post()
  @Roles(UserType.Company)
  async createJob(
    @Req() { user: { id: userId } }: { user: UserDto },
    @Body() createJobDto: CreateJobDto,
  ) {
    return this.createJobUseCase.execute(userId, createJobDto);
  }
}

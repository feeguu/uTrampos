import { Public } from '@/main/auth/decorators/public.decorator';
import { GetCompanyJobsUseCase } from '@/main/company/use-cases/get-company-jobs-use-case.service';
import { GetCompanyUseCase } from '@/main/company/use-cases/get-company-use-case.service';
import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { GetUserJobsUseCase } from '@/main/company/use-cases/get-user-jobs-use-case.service';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { UserType } from '@/domain/enums/user-type.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly getCompanyJobsUseCase: GetCompanyJobsUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly getUserJobsUseCase: GetUserJobsUseCase,
  ) {}

  @ApiBearerAuth()
  @Get('jobs')
  @Roles(UserType.COMPANY)
  async getJobs(@Request() req: { user: UserDto }) {
    return this.getUserJobsUseCase.execute(req.user.id);
  }

  @Public()
  @Get(':id')
  async getCompany(@Param('id') id: string) {
    return await this.getCompanyUseCase.execute(id);
  }

  @Public()
  @Get(':id/jobs')
  async getCompanyJobs(@Param('id') id: string) {
    return this.getCompanyJobsUseCase.execute(id);
  }
}

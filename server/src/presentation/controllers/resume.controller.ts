import { UserType } from '@/domain/enums/user-type.enum';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import CreateResumeUseCase from '@/main/resume/use-cases/create-resume-use-case.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateResumeDto } from '../dtos/resume/create-resume.dto';
import { UserDto } from '../dtos/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResumeDto } from '../dtos/resume/base/resume.dto';
import { GetResumeUseCase } from '@/main/resume/use-cases/get-resume-use-case.service';

@ApiBearerAuth()
@Controller('resumes')
@Roles(UserType.Candidate)
export class ResumeController {
  constructor(
    private readonly createResumeUseCase: CreateResumeUseCase,
    private readonly getResumeUseCase: GetResumeUseCase,
  ) {}

  @Get()
  async getResume(@Req() { user }: { user: UserDto }): Promise<ResumeDto> {
    return await this.getResumeUseCase.execute(user.id);
  }

  @Post()
  async createResume(
    @Req() { user }: { user: UserDto },
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<ResumeDto> {
    return await this.createResumeUseCase.execute(user.id, createResumeDto);
  }
}

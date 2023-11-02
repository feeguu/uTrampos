import { UserType } from '@/domain/enums/user-type.enum';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { GetCandidateResumeUseCase } from '@/main/candidate/use-cases/get-candidate-resume-use-case.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('candidates')
export class CandidateController {
  constructor(
    private readonly getCandidateResumeUseCase: GetCandidateResumeUseCase,
  ) {}

  @ApiBearerAuth()
  @Roles(UserType.COMPANY)
  @Get(':userId/resume')
  async getResumeFromCandidate(@Param('userId') userId: string) {
    return this.getCandidateResumeUseCase.execute(userId);
  }
}

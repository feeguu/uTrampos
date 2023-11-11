import { UserType } from '@/domain/enums/user-type.enum';
import { GetAppliesByCandidateUseCase } from '@/main/apply/use-cases/get-applies-by-candidate-use-case.service';
import { NotAdmin } from '@/main/auth/decorators/not-admin.decorator';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetByStatusQueryDto } from '../dtos/apply/get-by-status-query.dto';

@ApiBearerAuth()
@Controller('applies')
export class ApplyController {
  constructor(
    private readonly getAppliesByCandidateUseCase: GetAppliesByCandidateUseCase,
  ) {}

  @NotAdmin()
  @Roles(UserType.CANDIDATE)
  @Get()
  async getAppliesByCandidateAndStatus(
    @Request() { user: { id: userId } },
    @Query() q: GetByStatusQueryDto,
  ) {
    return this.getAppliesByCandidateUseCase.execute(userId, q.status);
  }
}

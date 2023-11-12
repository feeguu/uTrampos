import { UserType } from '@/domain/enums/user-type.enum';
import { GetAppliesByCandidateUseCase } from '@/main/apply/use-cases/get-applies-by-candidate-use-case.service';
import { NotAdmin } from '@/main/auth/decorators/not-admin.decorator';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetByStatusQueryDto } from '../dtos/apply/get-by-status-query.dto';
import { ProceedApplyUseCase } from '@/main/apply/use-cases/proceed-apply-use-case.service';
import { RejectApplyUseCase } from '@/main/apply/use-cases/reject-apply-use-case.service';

@ApiBearerAuth()
@Controller('applies')
export class ApplyController {
  constructor(
    private readonly getAppliesByCandidateUseCase: GetAppliesByCandidateUseCase,
    private readonly proceedApplyUseCase: ProceedApplyUseCase,
    private readonly rejectApplyUseCase: RejectApplyUseCase,
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

  @NotAdmin()
  @Roles(UserType.COMPANY)
  @Post(':id/proceed')
  async proceedApply(
    @Request() { user: { id: userId } },
    @Param('id') applyId: string,
  ) {
    return await this.proceedApplyUseCase.execute(applyId, userId);
  }

  @NotAdmin()
  @Roles(UserType.COMPANY)
  @Post(':id/reject')
  async rejectApply(
    @Request() { user: { id: userId } },
    @Param('id') applyId: string,
  ) {
    return await this.rejectApplyUseCase.execute(applyId, userId);
  }
}

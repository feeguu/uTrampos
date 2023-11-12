import { Injectable } from '@nestjs/common';
import { ApplyService } from '../apply.service';

@Injectable()
export class ProceedApplyUseCase {
  constructor(private readonly applyService: ApplyService) {}
  async execute(applyId: string, userId: string) {
    return await this.applyService.proceedApply(applyId, userId);
  }
}

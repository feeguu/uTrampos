import { Injectable } from '@nestjs/common';
import { ApplyService } from '../apply.service';

@Injectable()
export class RejectApplyUseCase {
  constructor(private readonly applyService: ApplyService) {}
  async execute(applyId: string, userId: string) {
    return this.applyService.rejectApply(applyId, userId);
  }
}

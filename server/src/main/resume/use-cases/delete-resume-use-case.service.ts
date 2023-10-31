import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume.service';
import { UserType } from '@/domain/enums/user-type.enum';

@Injectable()
export class DeleteResumeUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute(userId: string, resumeId: string, userType: UserType) {
    return await this.resumeService.deleteResume(userId, resumeId, userType);
  }
}

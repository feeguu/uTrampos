import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume.service';

@Injectable()
export class DeleteResumeUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute(userId: string, resumeId: string) {
    return await this.resumeService.deleteResume(userId, resumeId);
  }
}

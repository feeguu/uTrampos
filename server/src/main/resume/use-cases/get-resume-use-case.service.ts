import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume.service';

@Injectable()
export class GetResumeUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute(userId: string) {
    return await this.resumeService.getResume(userId);
  }
}

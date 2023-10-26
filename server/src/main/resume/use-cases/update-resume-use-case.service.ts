import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume.service';
import { UpdateResumeDto } from '@/presentation/dtos/resume/update/update-resume.dto';

@Injectable()
export class UpdateResumeUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute(userId: string, resumeId: string, resumeDto: UpdateResumeDto) {
    return await this.resumeService.updateResume(userId, resumeId, resumeDto);
  }
}

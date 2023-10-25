import { CreateResumeDto } from '@/presentation/dtos/resume/create/create-resume.dto';
import { ResumeService } from '../resume.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CreateResumeUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute(userId: string, createResumeDto: CreateResumeDto) {
    return await this.resumeService.createResume(userId, createResumeDto);
  }
}

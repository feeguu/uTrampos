import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume.service';

@Injectable()
export class GetAllResumesUseCase {
  constructor(private readonly resumeService: ResumeService) {}
  async execute() {
    return await this.resumeService.getAllResumes();
  }
}

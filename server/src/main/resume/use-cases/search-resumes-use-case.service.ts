import { ResumeService } from '@/main/resume/resume.service';
import { ResumeDto } from '@/presentation/dtos/resume/entities/resume.dto';
import { SearchResumeParamsDto } from '@/presentation/dtos/resume/search-resume-params.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchResumesUseCase {
  constructor(private readonly resumeService: ResumeService) {}

  async execute(
    searchResumeParamsDto: SearchResumeParamsDto,
  ): Promise<ResumeDto[]> {
    return await this.resumeService.searchResumes(searchResumeParamsDto);
  }
}

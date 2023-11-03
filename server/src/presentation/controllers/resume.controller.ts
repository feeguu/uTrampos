import { UserType } from '@/domain/enums/user-type.enum';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import CreateResumeUseCase from '@/main/resume/use-cases/create-resume-use-case.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateResumeDto } from '../dtos/resume/create/create-resume.dto';
import { UserDto } from '../dtos/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResumeDto } from '../dtos/resume/entities/resume.dto';
import { GetResumeUseCase } from '@/main/resume/use-cases/get-resume-use-case.service';
import { UpdateResumeUseCase } from '@/main/resume/use-cases/update-resume-use-case.service';
import { DeleteResumeUseCase } from '@/main/resume/use-cases/delete-resume-use-case.service';
import { UpdateResumeDto } from '../dtos/resume/update/update-resume.dto';
import { NotAdmin } from '@/main/auth/decorators/not-admin.decorator';
import { GetAllResumesUseCase } from '@/main/resume/use-cases/get-all-resumes-use-case.service';
import { SearchResumeParamsDto } from '../dtos/resume/search-resume-params.dto';
import { SearchResumesUseCase } from '@/main/resume/use-cases/search-resumes-use-case.service';

@ApiBearerAuth()
@Controller('resumes')
export class ResumeController {
  constructor(
    private readonly createResumeUseCase: CreateResumeUseCase,
    private readonly getResumeUseCase: GetResumeUseCase,
    private readonly getAllResumesUseCase: GetAllResumesUseCase,
    private readonly updateResumeUseCase: UpdateResumeUseCase,
    private readonly deleteResumeUseCase: DeleteResumeUseCase,
    private readonly searchResumesUseCase: SearchResumesUseCase,
  ) {}

  @Get()
  @Roles(UserType.CANDIDATE)
  async getResume(
    @Req() { user }: { user: UserDto },
  ): Promise<ResumeDto | ResumeDto[]> {
    if (user.type === UserType.ADMIN) {
      return await this.getAllResumesUseCase.execute();
    }
    return await this.getResumeUseCase.execute(user.id);
  }

  @ApiBearerAuth()
  @Get('/search')
  @Roles(UserType.CANDIDATE, UserType.COMPANY)
  async searchResumes(@Query() searchResumeParamsDto: SearchResumeParamsDto) {
    return await this.searchResumesUseCase.execute(searchResumeParamsDto);
  }

  @Post()
  @NotAdmin()
  @Roles(UserType.CANDIDATE)
  async createResume(
    @Req() { user }: { user: UserDto },
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<ResumeDto> {
    return await this.createResumeUseCase.execute(user.id, createResumeDto);
  }

  @Patch(':id')
  @NotAdmin()
  @Roles(UserType.CANDIDATE)
  async updateResume(
    @Req() { user }: { user: UserDto },
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<ResumeDto> {
    return await this.updateResumeUseCase.execute(user.id, id, updateResumeDto);
  }

  @Delete(':id')
  @Roles(UserType.CANDIDATE)
  async deleteResume(
    @Req() { user }: { user: UserDto },
    @Param('id') id: string,
  ) {
    if (user.type === UserType.ADMIN) {
      // TODO: deleteResumeUseCase: Delete resume even if it's not from the user
    }
    return await this.deleteResumeUseCase.execute(user.id, id, user.type);
  }
}

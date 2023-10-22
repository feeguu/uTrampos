import { Resume } from '@/domain/entities/resume/resume.entity';
import { UserDto } from './user.dto';
import { ResumeDto } from './resume/base/resume.dto';

export class CandidateDto {
  public id: string;
  public cpf: string;
  public birthDate: string;
  public user: UserDto;
  public resume: ResumeDto;
  constructor(
    id: string,
    cpf: string,
    birthDate: string,
    user: UserDto,
    resume: ResumeDto,
  ) {
    this.id = id;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.user = user;
    this.resume = resume;
  }
}

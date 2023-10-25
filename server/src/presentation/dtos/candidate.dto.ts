import { UserDto } from './user.dto';
import { ResumeDto } from './resume/entities/resume.dto';

export class CandidateDto {
  public id: string;
  public cpf: string;
  public birthDate: string;
  public user: UserDto;
  constructor(id: string, cpf: string, birthDate: string, user: UserDto) {
    this.id = id;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.user = user;
  }
}

import { Resume } from '@/domain/entities/resume/resume.entity';
import { UserDto } from './user.dto';

export class CandidateDto {
  constructor(
    public id: string,
    public cpf: string,
    public birthDate: string,
    public user: UserDto,
    public resume: Resume,
  ) {}
}

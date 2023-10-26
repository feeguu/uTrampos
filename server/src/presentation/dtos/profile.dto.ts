import { CandidateDto } from './candidate.dto';
import { CompanyDto } from './company.dto';
import { UserDto } from './user.dto';

export class ProfileDto {
  user: UserDto;
  candidate?: Omit<CandidateDto, 'user'>;
  company?: Omit<CompanyDto, 'user'>;
}

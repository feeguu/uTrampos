import { CandidateDto } from './candidate.dto';
import { CompanyDto } from './company.dto';
import { UserDto } from './user.dto';

export class ProfileDto {
  user: UserDto;
  candidate?: CandidateDto;
  company?: CompanyDto;
}

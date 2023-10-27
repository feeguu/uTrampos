import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { UserType } from '@/domain/enums/user-type.enum';
import { ProfileDto } from '@/presentation/dtos/profile.dto';
import { UserDto } from '@/presentation/dtos/user.dto';
export class GetProfileUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}
  async execute(user: UserDto): Promise<ProfileDto> {
    console.log(user);
    const res: ProfileDto = {
      user: user,
    };
    if (user.type === UserType.CANDIDATE) {
      const candidate = await this.candidateRepository.findByUserId(user.id);
      if (candidate) {
        const { user: _, ...candidateWithoutUser } = candidate;
        res.candidate = candidateWithoutUser;
      }
    } else {
      const company = await this.companyRepository.findByUserId(user.id);
      if (company) {
        const { user: _, ...companyWithoutUser } = company;
        res.company = companyWithoutUser;
      }
    }
    return res;
  }
}

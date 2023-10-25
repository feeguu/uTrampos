import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { UserType } from '@/domain/enums/user-type.enum';
import { CandidateDto } from '@/presentation/dtos/candidate.dto';
import { CompanyDto } from '@/presentation/dtos/company.dto';
import { ProfileDto } from '@/presentation/dtos/profile.dto';
import { UserDto } from '@/presentation/dtos/user.dto';
import { CandidateMapper } from '@/presentation/mappers/candidate.mapper';
import { CompanyMapper } from '@/presentation/mappers/company.mapper';

export class GetProfileUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}
  async execute(user: UserDto): Promise<ProfileDto> {
    const res: ProfileDto = {
      user: user,
    };
    if (user.type === UserType.CANDIDATE) {
      const { user: _, ...candidate } =
        await this.candidateRepository.findByUserId(user.id);
      if (candidate) res.candidate = candidate;
    } else {
      const { user: _, ...company } = await this.companyRepository.findByUserId(
        user.id,
      );
      if (company) res.company = company;
    }
    return res;
  }
}

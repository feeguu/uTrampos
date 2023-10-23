import { GetProfileUseCase } from '@/main/profile/get-profile-use-case.service';
import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';
import { CandidateDto } from '../dtos/candidate.dto';
import { CompanyDto } from '../dtos/company.dto';
import { ProfileDto } from '../dtos/profile.dto';

@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}

  @Get()
  async getProfile(@Request() req: { user: UserDto }): Promise<ProfileDto> {
    return this.getProfileUseCase.execute(req.user);
  }
}

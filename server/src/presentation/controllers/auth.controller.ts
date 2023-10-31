import { Body, Controller, Post, Request } from '@nestjs/common';
import { LoginDto } from '../dtos/auth/login.dto';
import { RegisterDto } from '../dtos/auth/register.dto';
import { RegisterUseCase } from '@/main/auth/use-cases/register-use-case.service';
import { AuthResponseDto } from '../dtos/auth/auth-response.dto';
import { LoginUseCase } from '@/main/auth/use-cases/login-use-case.service';
import { Public } from '@/main/auth/decorators/public.decorator';
import { CompanyRegisterDto } from '../dtos/auth/company-register.dto';
import { RegisterCompanyUseCase } from '@/main/auth/use-cases/register-company-use-case.service';
import { RegisterCandidateUseCase } from '@/main/auth/use-cases/register-candidate-use-case.service';
import { CandidateRegisterDto } from '../dtos/auth/candidate-register.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { UserType } from '@/domain/enums/user-type.enum';
import { NotAdmin } from '@/main/auth/decorators/not-admin.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly registerCompanyUseCase: RegisterCompanyUseCase,
    private readonly registerCandidateUseCase: RegisterCandidateUseCase,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.registerUseCase.execute(registerDto);
  }

  @ApiBearerAuth()
  @Roles(UserType.COMPANY)
  @NotAdmin()
  @Post('/register/company')
  async registerCompany(
    @Request() req,
    @Body() registerDto: CompanyRegisterDto,
  ) {
    return this.registerCompanyUseCase.execute(req.user.id, registerDto);
  }

  @ApiBearerAuth()
  @Roles(UserType.CANDIDATE)
  @NotAdmin()
  @Post('/register/candidate')
  async registerCandidate(
    @Request() req,
    @Body() registerDto: CandidateRegisterDto,
  ) {
    return this.registerCandidateUseCase.execute(req.user.id, registerDto);
  }
}

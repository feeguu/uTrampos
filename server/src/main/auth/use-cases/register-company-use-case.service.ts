import { CompanyRegisterDto } from '@/presentation/dtos/auth/company-register.dto';
import { AuthService } from '../auth.service';

export class RegisterCompanyUseCase {
  constructor(private readonly authService: AuthService) {}
  async execute(userId: string, companyRegisterDto: CompanyRegisterDto) {
    return this.authService.registerCompany(userId, companyRegisterDto);
  }
}

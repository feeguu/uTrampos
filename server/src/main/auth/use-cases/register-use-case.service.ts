import { Injectable } from '@nestjs/common';
import { AuthService } from '@/main/auth/auth.service';
import { RegisterDto } from '@/presentation/dtos/auth/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly authService: AuthService) {}
  async execute(registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}

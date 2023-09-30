import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '@/presentation/dtos/auth/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}
  async execute(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

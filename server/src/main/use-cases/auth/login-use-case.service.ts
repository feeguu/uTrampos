import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { LoginDto } from '@/presentation/dtos/auth/login.dto';
import { UserMapper } from '@/presentation/mappers/user.mapper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    console.log(user);
    if (!user || !compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return UserMapper.toDto(user);
  }
}

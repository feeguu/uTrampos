import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { RegisterDto } from '@/presentation/dtos/auth/register.dto';
import { UserMapper } from '@/presentation/mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(registerDto: RegisterDto) {
    const sameEmailUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (sameEmailUser) {
      throw new Error('Email already in use');
    }

    const password = await hash(registerDto.password, 10);

    const user = new User(
      registerDto.name,
      registerDto.email,
      password,
      registerDto.type,
    );

    const newUser = await this.userRepository.create(user);
    console.log(newUser);
    return UserMapper.toDto(newUser);
  }
}

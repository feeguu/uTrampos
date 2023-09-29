import { User } from '@/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserMapper {
  static toDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return userDto;
  }
}

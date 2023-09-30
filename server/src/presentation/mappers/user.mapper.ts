import { User } from '@/domain/entities/user.entity';
import { UserDto } from '../dtos/user.dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return userDto;
  }
}

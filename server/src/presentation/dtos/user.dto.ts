import { UserType } from '@/domain/enums/user-type.enum';

export class UserDto {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public zipCode: string,
    public type: UserType,
  ) {}
}

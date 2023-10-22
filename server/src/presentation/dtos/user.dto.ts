import { UserType } from '@/domain/enums/user-type.enum';

export class UserDto {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public zipCode: string;
  public type: UserType;
  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    zipCode: string,
    type: UserType,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.zipCode = zipCode;
    this.type = type;
  }
}

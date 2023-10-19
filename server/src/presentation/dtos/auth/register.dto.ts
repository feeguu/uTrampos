import { UserType } from '@/domain/enums/user-type.enum';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @Transform(({ value }) => value.replace(/\D/g, ''))
  phone: string;

  @IsNotEmpty()
  @IsPostalCode('BR')
  @Transform(({ value }) => value.replace(/\D/g, ''))
  zipCode: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}

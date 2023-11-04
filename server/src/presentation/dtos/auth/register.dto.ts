import { UserType } from '@/domain/enums/user-type.enum';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  Length,
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
  @IsNumberString()
  @Length(11, 11)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  phone: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  zipCode: string;

  @IsNotEmpty()
  @IsEnum(['CANDIDATE', 'COMPANY'])
  type: UserType;
}

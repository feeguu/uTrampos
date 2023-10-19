import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';

export class CandidateRegisterDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(11, 11)
  @IsNumberString()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string; // ISO 8601 - YYYY-MM-DD
}

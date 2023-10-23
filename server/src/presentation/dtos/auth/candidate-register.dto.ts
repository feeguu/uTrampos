import { IsCpf } from '@/main/validator/is-cpf.validator';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  Length,
  Matches,
  Validate,
} from 'class-validator';

export class CandidateRegisterDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(IsCpf)
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string; // ISO 8601 - YYYY-MM-DD
}

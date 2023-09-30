import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CandidateRegisterDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNumberString()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string; // ISO 8601 - YYYY-MM-DD
}

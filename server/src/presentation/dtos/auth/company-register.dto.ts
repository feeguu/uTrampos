import { CompanySize } from '@/domain/enums/company-size.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CompanyRegisterDto {
  // fields: cnpj, description, companySize
  @IsNotEmpty()
  @Length(14, 14)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNumberString()
  cnpj: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(CompanySize)
  companySize: CompanySize;
}

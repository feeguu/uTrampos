import { Level } from '@/domain/enums/level.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;
}

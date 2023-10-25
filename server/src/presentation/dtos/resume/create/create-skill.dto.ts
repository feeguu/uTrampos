import { ExperienceTime } from '@/domain/enums/experience-time.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ExperienceTime)
  experienceTime: ExperienceTime;
}

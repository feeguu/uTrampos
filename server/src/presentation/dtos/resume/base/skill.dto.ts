import { ExperienceTime } from '@/domain/enums/experience-time.enum';

export class SkillDto {
  public id: string;
  public name: string;
  public experienceTime: ExperienceTime;
  constructor(skill: SkillDto) {
    this.id = skill.id;
    this.name = skill.name;
    this.experienceTime = skill.experienceTime;
  }
}

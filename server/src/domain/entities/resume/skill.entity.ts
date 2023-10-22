import { randomUUID } from 'crypto';
import { ExperienceTime } from '../../enums/experience-time.enum';

export class Skill {
  public id: string;
  public name: string;
  public experienceTime: ExperienceTime;
  constructor(skillData: { name: string; experienceTime: ExperienceTime }) {
    this.id = randomUUID();
    this.name = skillData.name;
    this.experienceTime = skillData.experienceTime;
  }
}

import { ExperienceTime } from '../../enums/experience-time.enum';

export class Skill {
  public id: String;
  public name: String;
  public experienceTime: ExperienceTime;

  constructor(skillData: { name: String; experienceTime: ExperienceTime }) {
    this.id = crypto.randomUUID();
    this.name = skillData.name;
    this.experienceTime = skillData.experienceTime;
  }
}

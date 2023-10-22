import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @IsPositive()
  public order: number;
  constructor(section: CreateSectionDto) {
    this.title = section.title;
    this.description = section.description;
    this.order = section.order;
  }
}

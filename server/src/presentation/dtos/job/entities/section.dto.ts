export class SectionDto {
  public id: string;
  public title: string;
  public description: string;
  public order: number;
  constructor(section: SectionDto) {
    this.id = section.id;
    this.title = section.title;
    this.description = section.description;
    this.order = section.order;
  }
}

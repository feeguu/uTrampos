export class UserDto {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public zipCode: string,
  ) {}
}

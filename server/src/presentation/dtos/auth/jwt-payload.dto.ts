export class JwtPayloadDto {
  sub: string;
  email: string;
  constructor(sub: string, email: string) {
    this.sub = sub;
    this.email = email;
  }
}

export class AuthResponseDto {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}

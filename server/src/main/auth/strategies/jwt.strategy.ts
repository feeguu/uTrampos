import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { JwtPayloadDto } from '@/presentation/dtos/auth/jwt-payload.dto';
import { UserMapper } from '@/presentation/mappers/user.mapper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userRepository.find(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return UserMapper.toDto(user);
  }
}

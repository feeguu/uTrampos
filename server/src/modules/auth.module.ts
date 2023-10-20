import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmUserRepository } from '@/infra/db/typeorm/repositories/typeorm-user.repository';
import { AuthService } from '@/main/auth/auth.service';
import { LoginUseCase } from '@/main/auth/use-cases/login-use-case.service';
import { RegisterUseCase } from '@/main/auth/use-cases/register-use-case.service';
import { JwtStrategy } from '@/main/auth/strategies/jwt.strategy';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { RegisterCandidateUseCase } from '@/main/auth/use-cases/register-candidate-use-case.service';
import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { RegisterCompanyUseCase } from '@/main/auth/use-cases/register-company-use-case.service';
import { CommonValidator } from '@/main/validator/common.validator';

@Module({
  controllers: [AuthController],
  providers: [
    CommonValidator,
    {
      provide: JwtStrategy,
      useFactory: (
        userRepository: TypeOrmUserRepository,
        configService: ConfigService,
      ) => new JwtStrategy(userRepository, configService),
      inject: [TypeOrmUserRepository, ConfigService],
    },
    {
      provide: AuthService,
      useFactory: (
        userRepository: TypeOrmUserRepository,
        candidateRepository: TypeOrmCandidateRepository,
        companyRepository: TypeOrmCompanyRepository,
        jwtService: JwtService,
        commonValidator: CommonValidator,
      ) =>
        new AuthService(
          userRepository,
          candidateRepository,
          companyRepository,
          jwtService,
          commonValidator,
        ),
      inject: [
        TypeOrmUserRepository,
        TypeOrmCandidateRepository,
        TypeOrmCompanyRepository,
        JwtService,
        CommonValidator,
      ],
    },
    {
      provide: RegisterUseCase,
      useFactory: (authService: AuthService) =>
        new RegisterUseCase(authService),
      inject: [AuthService],
    },
    {
      provide: LoginUseCase,
      useFactory: (authService: AuthService) => new LoginUseCase(authService),
      inject: [AuthService],
    },
    {
      provide: RegisterCandidateUseCase,
      useFactory: (authService: AuthService) =>
        new RegisterCandidateUseCase(authService),
      inject: [AuthService],
    },
    {
      provide: RegisterCompanyUseCase,
      useFactory: (authService: AuthService) =>
        new RegisterCompanyUseCase(authService),
      inject: [AuthService],
    },
  ],
})
export class AuthModule {}

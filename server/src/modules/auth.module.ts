import { TypeOrmUserRepository } from '@/infra/db/typeorm/repositories/typeorm-user.repository';
import { LoginUseCase } from '@/main/use-cases/auth/login-use-case.service';
import { RegisterUseCase } from '@/main/use-cases/auth/register-use-case.service';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterUseCase,
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new RegisterUseCase(userRepository),
      inject: [TypeOrmUserRepository],
    },
    {
      provide: LoginUseCase,
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new LoginUseCase(userRepository),
      inject: [TypeOrmUserRepository],
    },
  ],
})
export class AuthModule {}

import { AppController } from '@/presentation/controllers/app.controller';
import { CanActivate, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth.module';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@/main/auth/guards/jwt.guard';
import { ResumeModule } from './resume.module';
import { AppGuard } from '@/main/auth/guards/app.guard';
import { RolesGuard } from '@/main/auth/guards/roles.guard';
import { JobModule } from './job.module';
import { ProfileModule } from './profile.module';
import { CompanyModule } from './company.module';
import { CandidateModule } from './candidate.module';
import { ApplyModule } from './apply.module';
import { DashboardModule } from './dashboard.module';

const GUARDS = [JwtGuard, RolesGuard];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE: Joi.string().required(),
        DB_TYPE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          issuer: 'utrampos',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmDatabaseModule,
    AuthModule,
    ResumeModule,
    JobModule,
    ProfileModule,
    CompanyModule,
    CandidateModule,
    ApplyModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (...guards: CanActivate[]) => new AppGuard(guards),
      inject: GUARDS,
    },
    ...GUARDS,
  ],
})
export class AppModule {}

import { AppController } from '@/presentation/controllers/app.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth.module';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';

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
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_TYPE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        SYNCRONIZE: Joi.boolean().default(false),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmDatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

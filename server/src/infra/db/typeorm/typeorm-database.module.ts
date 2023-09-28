import { Module } from '@nestjs/common';
import { TypeOrmUserRepository } from './repositories/typeorm-user.repository';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          database: configService.get<string>('DB_DATABASE'),
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
      imports: [ConfigService],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TypeOrmUserRepository]),
  ],
  providers: [TypeOrmUserRepository],
})
export class TypeOrmDatabaseModule {}

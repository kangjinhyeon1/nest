import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    })
  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}

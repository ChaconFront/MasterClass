import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/providers/post.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import  databaseConfig from './config/database.config'
import envirronmentValidations from './config/envirronment.validations';
@Module({
  imports: [UsersModule, PostModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:['.env'],
      load:[appConfig,databaseConfig,],//aqui se leee el appConfig y databaseConfig
      validationSchema:[envirronmentValidations],//validacion del esquema del environment
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        autoLoadEntities:configService.get<boolean>('database.autoLoadEntities'),//no usar en produccion.
        synchronize:configService.get<boolean>('database.synchronize'),
        port:configService.get<number>('database.port'),
        username:configService.get<string>('database.user'),
        password:configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        database: configService.get<string>('database.name'),

      })
    
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController, PostController],
  providers: [AppService]
})
export class AppModule {}

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

@Module({
  imports: [UsersModule, PostModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        //entities:[User],
        autoLoadEntities:true,//no usar en produccion.
        synchronize:true,
        port:configService.get<number>('DATABASE_PORT'),
        username:configService.get<string>('DATABASE_USER'),
        password:configService.get<string>('DATABASE_PASSWORD'),
        host: configService.get<string>('DATABASE_HOST'),
        database: configService.get<string>('DATABASE_NAME'),

      })
    
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController, PostController],
  providers: [AppService]
})
export class AppModule {}

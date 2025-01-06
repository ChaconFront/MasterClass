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

@Module({
  imports: [UsersModule, PostModule, AuthModule,
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory: () => ({
        type: 'postgres',
        //entities:[User],
        autoLoadEntities:true,//no usar en produccion.
        synchronize:true,
        port:5432,
        username:'postgres',
        password:'password*',
        host: 'localhost',
        database: 'nestjs-blog',

      })
    
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}

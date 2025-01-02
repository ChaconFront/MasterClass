import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/providers/post.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, PostModule, AuthModule,
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory: () => ({
        type: 'postgres',
        entities:[],
        synchronize:true,//no usar en produccion.
        port:5432,
        username:'postgres',
        password:'password*',
        host: 'localhost',
        database: 'nestjs-blog',

      })
    
    })
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}

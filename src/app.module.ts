import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/providers/post.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PostModule, AuthModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}

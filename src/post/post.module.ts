import { Module } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UsersModule],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
})
export class PostModule {}

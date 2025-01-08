import { Module } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UsersModule,TagsModule,TypeOrmModule.forFeature([Post,MetaOptions]),],
  exports:[PostService]
})
export class PostModule {}

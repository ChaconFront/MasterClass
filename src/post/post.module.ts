import { Module } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProviders } from './providers/create-post.providers';

@Module({
  controllers: [PostController],
  providers: [PostService, CreatePostProviders],
  imports: [UsersModule,TagsModule,TypeOrmModule.forFeature([Post,MetaOptions]), PaginationModule],
  exports:[PostService]
})
export class PostModule {}

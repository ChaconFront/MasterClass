import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('post')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:userId?')
  public async GetPost(@Param('userId') userId: string) {
    return await this.postService.findAll(userId);
  }

  @Post()
  public createPost(@Body() CreatePostDto: CreatePostDto) {}
}

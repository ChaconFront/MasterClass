import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './providers/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:userId?')
  public async GetPost(@Param('userId') userId: string) {
    return await this.postService.findAll(userId);
  }
}

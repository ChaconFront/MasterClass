import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('post')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:userId?')
  public async GetPost(@Param('userId') userId: string) {
    return await this.postService.findAll(userId);
  }

  @ApiOperation({
    summary: 'create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'you get a 201 response if your post is create successfully',
  })

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
  
    return this.postService.create(createPostDto);
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.update(patchPostDto)
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

}

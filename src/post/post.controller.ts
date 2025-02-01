import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post.dto';
import { ActiveUser } from 'src/auth/decorator/ative-user.decorator';
import { ActiveUserInterfaceData } from 'src/auth/interfaces/active-user.interface';

@Controller('post')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:userId?')
  public async GetPost(@Param('userId') userId: string, @Query() postquery:GetPostDto ) {
    console.log(postquery)
    return await this.postService.findAll(userId, postquery);
  }

  @ApiOperation({
    summary: 'create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'you get a 201 response if your post is create successfully',
  })

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto, @ActiveUser() user: ActiveUserInterfaceData) {

    console.log(user)
    return this.postService.create(createPostDto,user);
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

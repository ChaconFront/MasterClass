import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'you sent a get request to users endpoint';
  }

  @Post()
  public createUsers() {
    return 'you sent a Post  request to users endpoint';
  }

  @Put()
  public updateUsers() {
    return 'you sent a update request to users endpoint';
  }
}

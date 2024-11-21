import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  Headers,
  Ip,
} from '@nestjs/common';
//import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Get('/:id/:optional?')
  public getUsers(@Param('id') id: any, @Query('limit') limit: any) {
    console.log(id);
    console.log(limit);
    return 'you sent a get request to users endpoint';
  }

  /*  @Post()
  public createUsers(@Req() request: Request) {
    console.log(request)
    return 'you sent a Post  request to users endpoint';
  } */

  @Post()
  public createUsers(
    @Body() request: any,
    @Headers() Headers: any,
    @Ip() ip: any,
  ) {
    console.log(request);
    console.log(Headers);
    console.log(ip);
    return 'you sent a Post  request to users endpoint';
  }
  @Put()
  public updateUsers() {
    return 'you sent a update request to users endpoint';
  }
}

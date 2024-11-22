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
  ParseIntPipe,
  DefaultValuePipe
} from '@nestjs/common';
//import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit',new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(typeof id);
    console.log( limit);
    console.log( page);
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

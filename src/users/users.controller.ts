import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-params.dto';
import { PatchUserDto } from './dto/patch-user.dto';
//import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getUserParamDto);
    console.log(limit);
    console.log(page);
    return 'you sent a get request to users endpoint';
  }

  /*  @Post()
  public createUsers(@Req() request: Request) {
    console.log(request)
    return 'you sent a Post  request to users endpoint';
  } */

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(typeof createUserDto);
    console.log(createUserDto instanceof CreateUserDto);
    return 'you sent a Post  request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'you sent a patch request to users endpoint';
  }
}

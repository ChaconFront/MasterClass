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
import { UserService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dto/create-many-users';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'fetches a list of  registered users on the applications',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'the number of entries returned per query',
    example: 10,
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.finAll(getUserParamDto, page, limit);
  }

  /*  @Post()
  public createUsers(@Req() request: Request) {
    console.log(request)
    return 'you sent a Post  request to users endpoint';
  } */

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
  
    return this.userService.createUser(createUserDto);
  }


  @Post('create-many')
  public createManyUsers(@Body() createUsersManyDto: CreateManyUsersDto) {
    return this.userService.createMany(createUsersManyDto);
  }


  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'you sent a patch request to users endpoint';
  }
}

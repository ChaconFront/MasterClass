import { BadRequestException, Body, forwardRef, HttpException, HttpStatus, Inject, Injectable, Param, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamDto } from '../dto/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dto/create-many-users';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleProviders } from './create-google.providers';
import { GoogleUserInterface } from '../interfaces/gogle-user-interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository:Repository<User>,

    /* inyectando data source en el servicio de usuario */
    private readonly  DataSource:DataSource,

    private readonly userCreateManyProvaider:UsersCreateManyProvider,

    private readonly createUserProviders:CreateUserProvider,

    private readonly findOneByEmailProviders: FindOneUserByEmailProvider,

    private readonly findOneByGoogleIdProviders: FindOneByGoogleIdProvider,

    private readonly createGoogleProviders: CreateGoogleProviders

  ) {}


   public async createUser(@Body() createUserDto:CreateUserDto){
   return this.createUserProviders.createUser(createUserDto)
  }


  public async finAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {

    //verificando si esta autenticado.
    //const isAuth = this.authService.isAuth();
    //test the new config

    return await this.userRepository.find()
  }



  public async  findOneById(id: number) {

try {
  const user=await this.userRepository.findOneBy({id})  
  if(!user){
    throw new BadRequestException(`the user ${id} does not exist`);
  }
  return user
} catch (error) {
  throw new RequestTimeoutException('unable to process your request at the moment please try later',{
    description:'Error connecting to the database',
  }); 
} 
  }


    //creacion de multiples usuarios
    public async createMany(createUserManyDto:CreateManyUsersDto){

      return await this.userCreateManyProvaider.createMany(createUserManyDto);
  
    }

    public async findByOneEmail(email: string){

      return await this.findOneByEmailProviders.findOneByEmail(email);
    }


    public async findOneByGoogleId(googleId:string){
      return await this.findOneByGoogleIdProviders.findOneByGoogleId(googleId);
     
    }


    public async createGoogleUser(createGoogleUser: GoogleUserInterface){
      return await this.createGoogleProviders.createGoogleUser(createGoogleUser);
    }

}
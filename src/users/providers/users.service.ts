import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, Param, RequestTimeoutException } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository:Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration:ConfigType<typeof profileConfig>,

    /* inyectando data source en el servicio de usuario */
    private readonly  DataSource:DataSource,

    private readonly userCreateManyProvaider:UsersCreateManyProvider,

  ) {}


   public async createUser(@Param() createUserDto:CreateUserDto){
    //check is user exist o email to database
    let existingUser= undefined;
    try {
      existingUser=await this.userRepository.findOne({
        where:{email: createUserDto.email}
      })
    } catch (error) {
      //information which is sentitive
      throw new RequestTimeoutException('unable to process your request at the moment please try later',{
        description:'Error connecting to the database',
      }); 
    }
    //handle exeption
    if (existingUser) {
      throw new BadRequestException('the user already exist, please check your email');
    } 
    //create new User
      let newUser= await this.userRepository.create(createUserDto);
      try {
      newUser= await this.userRepository.save(newUser);
      } catch (error) {
        throw new RequestTimeoutException('unable to process your request at the moment please try later',{
          description:'Error connecting to the database',
        }); 
      }
  return newUser;
  }


  public async finAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
      /* throw new HttpException(
               {
                status: HttpStatus.MOVED_PERMANENTLY,
                err:'the api endpoint does not exist',
                fileName:'user.service.ts',
                lineNumber:88
           },
                HttpStatus.MOVED_PERMANENTLY,
              {
                cause: new Error(),
                description:'Ocurred becaused the API endpoint was permanently moved',

       }

      ) */

    //verificando si esta autenticado.
    const isAuth = this.authService.isAuth();
    //test the new config
    console.log(this.profileConfiguration.apikey)

    return await this.userRepository.find()
  }



  public async  findOneById(id: number) {

try {
  const user=await this.userRepository.findOneBy({id})  
  if(!user){
    throw new BadRequestException(`the user ${id} does not exist`);
  }
} catch (error) {
  throw new RequestTimeoutException('unable to process your request at the moment please try later',{
    description:'Error connecting to the database',
  }); 
} 
//user existing
    return 
  }


    //creacion de multiples usuarios
    public async createMany(createUserManyDto:CreateManyUsersDto){

      return this.userCreateManyProvaider.createMany(createUserManyDto)
  
    }
  }
import { forwardRef, Inject, Injectable, Param } from '@nestjs/common';
import { GetUsersParamDto } from '../dto/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository:Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration:ConfigType<typeof profileConfig>

  ) {}


   public async createUser(@Param() createUserDto:CreateUserDto){
    //check is user exist o email to database
    const existingUser= await this.userRepository.findOne({
      where:{email: createUserDto.email}
    })
    //handle exeption
    if (!existingUser) {} 
    //create new User
      let newUser= await this.userRepository.create(createUserDto);
      newUser= await this.userRepository.save(newUser);

      return newUser;
  }


  public async finAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    //verificando si esta autenticado.
    const isAuth = this.authService.isAuth();
    //test the new config
    console.log(this.profileConfiguration.apikey)

    return await this.userRepository.find()
  }

  public async  findOneById(id: number) {
    return await this.userRepository.findOneBy({
      id,
    })
  }
}

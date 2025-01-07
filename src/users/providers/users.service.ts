import { forwardRef, Inject, Injectable, Param } from '@nestjs/common';
import { GetUsersParamDto } from '../dto/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository:Repository<User>
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
    console.log(isAuth);
    console.log(getUserParamDto, limit, page);
    return await this.userRepository.find()
  }

  public findOneById(id: string) {
    return {
      id: id || 1234,
      firsName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}

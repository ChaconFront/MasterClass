import { BadRequestException, forwardRef, Inject, Injectable, Param, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProviders } from 'src/auth/providers/hashing.providers';

@Injectable()
export class CreateUserProvider {

    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @Inject(forwardRef(()=>HashingProviders)) //esto es por las dependencias circulares.
        private readonly hashingProviders: HashingProviders,
    ){}
    
   public async createUser(@Param() createUserDto:CreateUserDto){
    //check is user exist o email to database
    try {
     const existingUser = await this.userRepository.findOne({
        where:{email: createUserDto.email}
      })
      if (existingUser)   throw new BadRequestException('the user already exist, please check your email');
      
    } catch (error) {
      //information which is sentitive
      throw new RequestTimeoutException(error.message,{
        description:'Error connecting to the database',
      }); 
    }
    
      try {
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: await this.hashingProviders.hashPassword(createUserDto.password)
          });
          const savedUser = await this.userRepository.save(newUser);
          console.log('User saved:', savedUser);

          return savedUser;

      } catch (error) {
        throw new RequestTimeoutException('unable to process your request at the moment please try later',{
          description:'Error connecting to the database',
        }); 
      }
  }

}

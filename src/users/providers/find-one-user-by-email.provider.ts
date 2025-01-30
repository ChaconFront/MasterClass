import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {

    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}


    public async findOneByEmail(email:string){

        let user: User | undefined = undefined

        try {

            user = await this.userRepository.findOneBy({
                email: email,
            })

        } catch (error) {
            throw new RequestTimeoutException(error,{
                description:"Error al buscar Usuario",
            })
               }

            if (!user){
                throw new UnauthorizedException('User does exist',{
                    description:'El usuario no existe'
                })
            }

            return user;
    }

}

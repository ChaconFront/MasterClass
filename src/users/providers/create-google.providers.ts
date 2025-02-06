import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUserInterface } from '../interfaces/gogle-user-interface';


@Injectable()
export class CreateGoogleProviders {

    constructor(

        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}


    public async createGoogleUser(googleUser:GoogleUserInterface){

        try {
            const user = this.userRepository.create(googleUser);
            return this.userRepository.save(user);

        } catch (error) {
            throw new ConflictException(error, {
                description: 'Could not Create not new User'
            })
        }

    }


    
}

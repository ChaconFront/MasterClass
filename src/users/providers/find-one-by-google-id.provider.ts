import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {


    constructor(

        @InjectRepository(User)
        private readonly UserRepositoy: Repository<User>,
    ){}


    public async findOneByGoogleId(googleId:string):Promise<User>{
        return await this.UserRepositoy.findOne({
            where:{
                googleID:googleId
            }
        })
    }
}

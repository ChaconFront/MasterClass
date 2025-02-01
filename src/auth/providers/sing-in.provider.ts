import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProviders } from './hashing.providers';
import { GenerateTokensProviders } from './generate-tokens.providers';

@Injectable()
export class SingInProvider {

    constructor(

        @Inject(forwardRef(()=>UserService))
        private readonly userService:UserService,

        private readonly hashinProviders:HashingProviders,

        private readonly generateTokenProviders:GenerateTokensProviders,

    ){}

    
    public async singIn(singIndto:SignInDto){

        let user = await this.userService.findByOneEmail(singIndto.email)

        
        //comparacion de contraseña del usuario con la que esta guardada en base datos.
        let isEquals: boolean= false;

        try {
            isEquals = await this.hashinProviders.comparePassword(singIndto.password,user.password)
        } catch (error) {
            throw new RequestTimeoutException(error,{
                description:"Su contraseña no coincide o el usuario no existe",
            })
        }

        if (!isEquals) {
            throw new UnauthorizedException("Incorrect Password")
        }

        return await this.generateTokenProviders.generateTokens(user);


    }


}

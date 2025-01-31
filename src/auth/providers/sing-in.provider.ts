import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProviders } from './hashing.providers';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SingInProvider {

    constructor(

        @Inject(forwardRef(()=>UserService))
        private readonly userService:UserService,

        private readonly hashinProviders:HashingProviders,

        private readonly jwtService:JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        
    ){}

    
    public async singIn(singIndto:SignInDto){

        let user= await this.userService.findByOneEmail(singIndto.email)

        
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

        const accesToken= await this.jwtService.signAsync({
            sub: user.id,
            email:user.email,
        },{
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuser,
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accesTokenTll

        })
            console.log({accesToken: accesToken})
            return {
                accesToken
            }
    }


}

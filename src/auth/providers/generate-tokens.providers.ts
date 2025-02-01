import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/user.entity';
import { ActiveUserInterfaceData } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokensProviders {


    constructor (

        private readonly jwtService:JwtService,
        
        @Inject(jwtConfig.KEY)
        private readonly  jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}


    public async signToken<T>(userId: number, expireIn: number, payload?:T){

      return  await this.jwtService.signAsync({
                    sub: userId,
                    ...payload,
                },{
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuser,
                    secret: this.jwtConfiguration.secret,
                    expiresIn: expireIn
        
                })

    }

    public async generateTokens(user:User){

        const [accessToken,refreshToken]=await Promise.all([  
            //Generate the accessToken.
            this.signToken<Partial<ActiveUserInterfaceData>>(user.id, this.jwtConfiguration.accesTokenTll,{
                email: user.email
            }),
            //Generate the refreshToken.
            this.signToken(user.id, this.jwtConfiguration.refreshToken), 
       ])
      return {
        accessToken,
        refreshToken
      }
    }
    
}

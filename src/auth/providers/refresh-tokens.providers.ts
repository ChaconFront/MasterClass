import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProviders } from './generate-tokens.providers';
import { UserService } from 'src/users/providers/users.service';
import { ActiveUserInterfaceData } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokensProviders {

    constructor(
        @Inject(forwardRef(()=>UserService))
          private readonly userService:UserService,
          private readonly jwtService:JwtService,            
          @Inject(jwtConfig.KEY)
          private readonly  jwtConfiguration: ConfigType<typeof jwtConfig>,
          private readonly generateTokenProviders: GenerateTokensProviders,
    ){}

    public async refreshToken( refreshTokenDto:RefreshTokenDto){
        //verify the refreshToken,
       try {
             const {sub}=  await this.jwtService.verifyAsync<Pick <ActiveUserInterfaceData,'sub'>>(refreshTokenDto.refreshToken,{

            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuser,

             })

    //fetch user from the database,
            const user = await this.userService.findOneById(sub)
    //generate the tokens
            return await this.generateTokenProviders.generateTokens(user)
    
          } catch (error) {
                throw new UnauthorizedException(error)
       }
   
    }
}

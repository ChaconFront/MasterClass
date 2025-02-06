import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users.service';
import { GenerateTokensProviders } from 'src/auth/providers/generate-tokens.providers';


//este código define un servicio en NestJS que se ocupa de la 
// autenticación con Google usando OAuth2. Utiliza configuraciones 
// inyectadas para inicializar el cliente OAuth2 cuando el módulo se inicializa.
@Injectable()
export class GoogleAuthtenticatonService implements OnModuleInit {

    private oauth2Client: OAuth2Client;
    

    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration:ConfigType<typeof jwtConfig>,

        @Inject(forwardRef(()=>UserService))
        private readonly userService:UserService,

        private readonly generateTokenProviders:GenerateTokensProviders,
    ){}

    onModuleInit() {
        const clientId=this.jwtConfiguration.googlrClientId;
        const clientSecret= this.jwtConfiguration.googleClientSecret;

        this.oauth2Client= new OAuth2Client(clientId,clientSecret);
    }


    public async authentication(googleTokenDto:GoogleTokenDto){
        //verify the google token user
        const loginTicket= await this.oauth2Client.verifyIdToken({
            idToken: googleTokenDto.token,

        })

        //extract the payload from the google jwt
        const {email,sub:googleId }= loginTicket.getPayload();

        //find the user from de database usin the googleId
        const user = await this.userService.findOneByGoogleId(googleId);

        //si existe el googleId generar token
        if(user){
            return  this.generateTokenProviders.generateTokens(user)
        }

    }
}

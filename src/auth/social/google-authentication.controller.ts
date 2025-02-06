import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthtenticatonService } from './providers/google-authtenticaton.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {

    constructor(
        private readonly googleAuthtenticatonService:GoogleAuthtenticatonService,
    ){}     
     

    @Post()
    public autenticate( @Body() googleTokenDto:GoogleTokenDto){
        return this.googleAuthtenticatonService.authentication(googleTokenDto); 
    }
}

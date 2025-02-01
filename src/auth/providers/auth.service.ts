import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SingInProvider } from './sing-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProviders } from './refresh-tokens.providers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly singInProvider:SingInProvider,

    private readonly genrerateRefreshToken:RefreshTokensProviders
  ) {}

  public async SingIn(singIndto:SignInDto) {
    return await this.singInProvider.singIn(singIndto)
  }

 public async refreshTokens(refreshTokenDto: RefreshTokenDto){
    return await this.genrerateRefreshToken.refreshToken(refreshTokenDto)
 }
}

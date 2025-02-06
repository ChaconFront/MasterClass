import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProviders } from './providers/hashing.providers';
import { BcryptProviders } from './providers/bcrypt.providers';
import { SingInProvider } from './providers/sing-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProviders } from './providers/generate-tokens.providers';
import { RefreshTokensProviders } from './providers/refresh-tokens.providers';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthtenticatonService } from './social/providers/google-authtenticaton.service';

@Module({
  providers: [AuthService,{
    provide: HashingProviders,//al ser una clase abstracta que la implementa bcryptProviders la importacion se hace de esta manera
    useClass: BcryptProviders,
  }, SingInProvider, GenerateTokensProviders, RefreshTokensProviders, GoogleAuthtenticatonService],
  controllers: [AuthController, GoogleAuthenticationController],
  imports: [forwardRef(() => UsersModule), ConfigModule.forFeature((jwtConfig)), JwtModule.registerAsync(jwtConfig.asProvider())],
  exports: [AuthService, HashingProviders],
})
export class AuthModule {}

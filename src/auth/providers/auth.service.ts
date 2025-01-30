import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SingInProvider } from './sing-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly singInProvider:SingInProvider,
  ) {}

  public async SingIn(singIndto:SignInDto) {
    return await this.singInProvider.singIn(singIndto)
  }

  public isAuth() {
    return true;
  }
}

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public login(email: string, passwod: string, id: string) {
    const user = this.userService.findOneById('1234');

    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}

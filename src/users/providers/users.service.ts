import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dto/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public finAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    //verificando si esta autenticado.
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    console.log(getUserParamDto, limit, page);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  public findOneById(id: string) {
    return {
      id: id || 1234,
      firsName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}

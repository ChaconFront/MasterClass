import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dto/get-users-params.dto';

@Injectable()
export class UserService {
  public finAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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

  public findOneById(id: number) {
    return {
      id: 1234,
      firsName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}

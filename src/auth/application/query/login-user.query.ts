import {IQuery} from '@nestjs/cqrs';
import {LoginUserDto} from '../../interface/dto/login-user.dto';

export class LoginUserQuery implements IQuery {
  constructor(readonly body: LoginUserDto) {}
}

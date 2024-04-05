import {IQuery} from '@nestjs/cqrs';
import {AdminType} from 'src/types/login.type';
import {LoginAdminDto} from '../../interface/dto/login-admin.dto';

export class LoginAdminQuery implements IQuery {
  constructor(readonly type: AdminType, readonly body: LoginAdminDto) {}
}

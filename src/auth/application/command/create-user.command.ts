import {ICommand} from '@nestjs/cqrs';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateUserCommand implements ICommand {
  constructor(readonly body: CreateUserDto) {}
}

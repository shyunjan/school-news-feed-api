import {IQuery} from '@nestjs/cqrs';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from 'src/auth/dto';

export class LoginQuery implements IQuery {
  constructor(readonly body: LoginUserDto, readonly reply: FastifyReply) {}
}

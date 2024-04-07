import { IQuery } from "@nestjs/cqrs";
import { FastifyReply } from "fastify";

export class NewsQuery implements IQuery {
  // constructor(readonly body: LoginUserDto, readonly reply: FastifyReply) {}
}

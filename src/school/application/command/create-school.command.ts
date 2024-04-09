import { ICommand } from "@nestjs/cqrs";
import { FastifyReply } from "fastify";
import { SessionDto } from "src/auth/dto";
import { CreateSchoolDto } from "src/school/interface/dto/create-school.dto";

export class CreateSchoolCommand implements ICommand {
  constructor(readonly body: CreateSchoolDto, readonly session: SessionDto) {}
}

import { ICommand } from "@nestjs/cqrs";
import { SessionDto } from "src/auth/dto";
import { CreateNewsDto } from "src/news/dto";

export class CreateNewsCommand implements ICommand {
  constructor(readonly body: CreateNewsDto, readonly session: SessionDto) {}
}

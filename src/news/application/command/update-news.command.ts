import { ICommand } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";
import { CreateNewsDto } from "src/news/dto";

export class UpdateNewsCommand implements ICommand {
  constructor(
    readonly newsId: ObjectId,
    readonly body: CreateNewsDto,
    readonly session: SessionDto
  ) {}
}

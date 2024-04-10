import { ICommand } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";

export class DeleteNewsCommand implements ICommand {
  constructor(readonly newsId: ObjectId, readonly session: SessionDto) {}
}

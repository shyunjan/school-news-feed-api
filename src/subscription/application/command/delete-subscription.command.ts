import { ICommand } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";

export class DeleteSubscriptionCommand implements ICommand {
  constructor(readonly schoolId: ObjectId, readonly session: SessionDto) {}
}

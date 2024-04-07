import { ICommand } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";
import { CreateSubscriberDto } from "src/subscriber/dto";

export class CreateSubscriberCommand implements ICommand {
  constructor(readonly schoolId: ObjectId, readonly session: SessionDto) {}
}

import { IQuery } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";

export class SubscriptionNewsQuery implements IQuery {
  constructor(readonly schoolId: ObjectId, readonly session: SessionDto) {}
}

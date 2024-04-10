import { IEvent } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";

export class UpdateSubscriptionNewsEvent implements IEvent {
  constructor(public readonly newsId: ObjectId) {}
}

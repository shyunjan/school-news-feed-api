import { IEvent } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";

export class CreateSubscriptionNewsEvent implements IEvent {
  constructor(public readonly newsId: ObjectId) {}
}

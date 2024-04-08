import { IQuery } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";

export class NewsQuery implements IQuery {
  constructor(readonly newsId: ObjectId) {}
}

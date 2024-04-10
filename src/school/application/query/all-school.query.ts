import { IQuery } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { SessionDto } from "src/auth/dto";

export class AllSchoolQuery implements IQuery {
  constructor() {}
}

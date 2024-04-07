import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { SubscriberNewsQuery } from "./subscriber-news.query";
import { config } from "src/config/config";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";

@QueryHandler(SubscriberNewsQuery)
export class SubscriberNewsQueryHandler
  implements IQueryHandler<SubscriberNewsQuery>
{
  async execute(query: SubscriberNewsQuery) {}
}

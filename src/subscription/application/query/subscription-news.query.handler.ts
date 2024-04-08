import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SubscriptionNewsQuery } from "./subscription-news.query";

@QueryHandler(SubscriptionNewsQuery)
export class SubscriptionNewsQueryHandler
  implements IQueryHandler<SubscriptionNewsQuery>
{
  async execute(query: SubscriptionNewsQuery) {}
}

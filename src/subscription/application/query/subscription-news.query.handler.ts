import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SubscriptionNewsQuery } from "./subscription-news.query";
import { SubscriptionInjectionToken } from "src/subscription/Injection-token";
import { SubscriptionRepositoryImplement } from "src/subscription/infra";

@QueryHandler(SubscriptionNewsQuery)
export class SubscriptionNewsQueryHandler
  implements IQueryHandler<SubscriptionNewsQuery>
{
  constructor(
    @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepositoryImplement
  ) {}

  async execute(query: SubscriptionNewsQuery) {
    const {
      schoolId,
      session: { id: subscriberId },
    } = query;

    return this.subscriptionRepository.findSubscriptionNews(
      subscriberId,
      schoolId
    );
  }
}

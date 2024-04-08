import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { NewsInjectionToken } from "src/news/Injection-token";
import { CreateSubscriptionNewsEvent } from "src/news/domain";
import { NewsRepositoryImplement } from "src/news/infra/news.repository.implement";
import { SubscriptionInjectionToken } from "src/subscription/Injection-token";
import { SubscriptionRepositoryImplement } from "src/subscription/infra";

@EventsHandler(CreateSubscriptionNewsEvent)
export class CreateSubscriptionNewsEventHandler
  implements IEventHandler<CreateSubscriptionNewsEvent>
{
  @Inject(NewsInjectionToken.NEWS_REPOSITORY)
  private readonly newsRepository: NewsRepositoryImplement;
  @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
  private readonly subscriptionRepository: SubscriptionRepositoryImplement;

  async handle(event: CreateSubscriptionNewsEvent) {
    const { newsId } = event;
    const entities = await this.newsRepository.makeSubscriptionNewsEntities(
      newsId
    );
    await this.subscriptionRepository.createSubscriptionNews(entities);
  }
}

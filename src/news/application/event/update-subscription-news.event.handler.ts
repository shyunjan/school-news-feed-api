import {Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {UpdateSubscriptionNewsEvent} from 'src/news/domain';
import {SubscriptionInjectionToken} from 'src/subscription/Injection-token';
import {SubscriptionRepositoryImplement} from 'src/subscription/infra';

@EventsHandler(UpdateSubscriptionNewsEvent)
export class UpdateSubscriptionNewsEventHandler
  implements IEventHandler<UpdateSubscriptionNewsEvent>
{
  @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
  private readonly subscriptionRepository: SubscriptionRepositoryImplement;

  async handle(event: UpdateSubscriptionNewsEvent) {
    const {newsId} = event;
    await this.subscriptionRepository.updateSubscriptionNewsRead({news_id: newsId}, false);
  }
}

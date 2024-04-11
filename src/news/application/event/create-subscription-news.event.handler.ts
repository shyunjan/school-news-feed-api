import {Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {NewsInjectionToken} from 'src/news/Injection-token';
import {CreateSubscriptionNewsEvent} from 'src/news/domain';
import {NewsRepositoryImplement} from 'src/news/infra/news.repository.implement';
import {SubscriptionInjectionToken} from 'src/subscription/Injection-token';
import {SubscriptionRepositoryImplement} from 'src/subscription/infra';

@EventsHandler(CreateSubscriptionNewsEvent)
export class CreateSubscriptionNewsEventHandler
  implements IEventHandler<CreateSubscriptionNewsEvent>
{
  @Inject(NewsInjectionToken.NEWS_REPOSITORY)
  private readonly newsRepository: NewsRepositoryImplement;
  @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
  private readonly subscriptionRepository: SubscriptionRepositoryImplement;

  async handle(event: CreateSubscriptionNewsEvent) {
    const {newsId} = event;
    const entities = await this.newsRepository.makeSubscriptionNewsEntities(newsId);
    /* TODO: 위의 makeSubscriptionNewsEntities() 안에서 $out 쿼리를 사용하면 바로 저장이 가능하므로 수정하고 테스트한 다음 아래 코드는 제거하자 */
    await this.subscriptionRepository.createSubscriptionNews(entities);
  }
}
